import { type Request, type Response } from "express";
import { exec, spawn } from 'child_process'
import fs from "fs";
import path from "path";
import { jugdementSchema } from "../schema/juggement.schema.js";
import { searchUser } from "../utils/user.utils.js";
import { dockerImage, languageExtension } from "../constants.js";
import { v4 as uuidv4 } from 'uuid';

export const judgement = async (req: Request, res: Response) => {
    try {
        // user will come form the middleware if the user is loggedIn 
        // const userId = req.user.id;

        const userId = "1"

        // check if the user is valid
        const user = await searchUser(userId);

        if (user?.success == false) {
            res.status(400).json({
                error: user.error,
                message: "Invalid user"
            })
            return
        }

        const {success, data, error} = jugdementSchema.safeParse(req.body)


        if(!success){
            res.status(400).json({
                error: error.issues[0],
                message: "Invalid request" 
            });
            return 
        }

        const {questionId, language, code} = data;
        
        // send the task to queue and worker will invoke the docker and run test cases 
        // using node child preocess (exec) to use the shell

        // MAKE SURE THAT TEMP FOLDER ALWAYS EXISTS
        const fileName = `${uuidv4()}.${languageExtension[language]}`;
        const filePath = path.join(process.cwd(), "src", "temp", `${fileName}`);
        const file = fs.writeFileSync(filePath, code);

        // const command = `docker run -i --cpus=0.5 --memory=256m --name ${containerName} ${image}`

        // exec(command, (error, stdout, stderr) => {
        //     try {
        //         console.log(stdout);
        //     } catch (error) {
        //         console.log(error);
        //     }
        // }); 
        
        const containerName = dockerImage[language];
        const image = dockerImage[language];
        const docker = spawn('docker', ['run', '-i','--rm', '--cpus=0.5', '--memory=256m', '--name', containerName, image, "bash"]);

        exec(`docker cp ${filePath} ${containerName}:/app/${fileName}`, (error) => {
            if (error) {
                console.log(error);
            }
                                // PUT EXEC COMMAND HERE
            exec(`docker exec -i ${containerName} sh node /app/${fileName}`)
        });

        docker.stdout.on('data', (data) => {
            console.log(`stdout: ${data}`);
        });

        docker.stderr.on('data', (data) => {
            console.log(`stderr: ${data}`);
        });

        docker.on('exit', (code) => {
            console.log(`Child process exited with code ${code}`);
        });

        return res.status(200).json({
            message: "Code submitted successfully"
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ 
            message: "Internal server error" 
        });
    }
}


// an route for testing features
export const test = (req: Request, res: Response) =>{
    try {
        const code = req.body.code;
        const filePath = path.join(process.cwd(), "src", "temp", "123.java");
        const file = fs.writeFileSync(filePath, code);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ 
            message: "Internal server error" 
        });
    }  
}