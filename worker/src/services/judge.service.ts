import { dockerImage, languageExtension } from "../constants.js";
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';
import path from 'path';
import Docker from 'dockerode'
import readline from 'readline'
import { DockerService } from "./docker.service.js";
import fileService from "./fs.service.js";

interface JudgeTask {
    questionId: string;
    language: string;
    code: string;
    userId: string;
}

export class JudgeService {
    
    async runner(task: JudgeTask): Promise<void> {
        const { questionId, language, code, userId } = task;
        try {
            const fileName = `${uuidv4()}.${languageExtension[language]}`;
            const filePath = fileService.writeFile(fileName, code);

            const docker = new DockerService(language, filePath);
            const container = await docker.createContainer();
            
            fileService.cleanupFile(filePath);
            await this.runTestCases(questionId, docker, fileName);
        } catch (error) {
            console.error("Error in judge runner:", error);
        }
    }

    async runTestCases(questionId: string, docker: DockerService, fileName: string) {
        try {
            // CALL R2 (CloudFlare BUCKET) for the test case file;
            const file = path.join(process.cwd(), "test", "123.txt");
            const stream = fs.createReadStream(file);

            const rl = readline.createInterface({
                input: stream,
                crlfDelay: Infinity
            });
            
            console.log("we got here")
            const cont = await docker.execution();

            for await (const line of rl) {
                cont.write(line + "\n");
            }

        } catch (error) {
            console.log(error, "Error while runni`ng tests")
        }
    }
}
