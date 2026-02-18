import { dockerImage, languageExtension } from "../constants.js";
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';
import path from 'path';
import Docker from 'dockerode'
import readline from 'readline'

interface JudgeTask {
    questionId: string;
    language: string;
    code: string;
    userId: string;
}

interface JudgeResult {
    success: boolean;
    output?: string;
    error?: string;
    executionTime?: number;
}

export class JudgeService {
    private tempDir: string;

    constructor() {
        this.tempDir = path.join(process.cwd(), "temp");
        this.ensureTempDirectory();
    }

    private ensureTempDirectory(): void {
        if (!fs.existsSync(this.tempDir)) {
            fs.mkdirSync(this.tempDir, { recursive: true });
        }
    }

    async runner(task: JudgeTask): Promise<JudgeResult> {
        const { questionId, language, code, userId } = task;
        
        try {
            const fileName = `${uuidv4()}.${languageExtension[language]}`;
            const filePath = path.join(this.tempDir, fileName);

            fs.writeFileSync(filePath, code);

            const docker = await this.invokeDocker(language);
            const container = docker.container;
            // QUERY DATABASE FOR THE QUESTION (THINKING FOR NOSQL BASED FOR QUESTIONS)

            container.start();
            container.exec({Cmd: ["docker", "cp", filePath, `${docker.containerName}:/app`]});

            this.cleanupFile(filePath);
            
        } catch (error) {
            console.error("Error in judge runner:", error);
            return {
                success: false,
                error: error instanceof Error ? error.message : "Unknown error occurred"
            };
        }
    }

    async invokeDocker(
        language: string, 
        cpu: string = "0.5", 
        memory: string = "256m"
    ): Promise<{container: Docker.Container, containerName: string}> {

        const DOCKER_SOCKET_PATH = process.env.DOCKER_SOCKET_PATH;
        if(!DOCKER_SOCKET_PATH) {
            throw new Error("DOCKER SOCKET PATH IS NOT DEFINED")
        }

        const docker = new Docker({
            socketPath: DOCKER_SOCKET_PATH
        });

        // CREATE DOCKER CONTAINER
        const containerName = `judge-${uuidv4()}`
        const container = await docker.createContainer({
            name: containerName,
            Image: dockerImage[language],
            Cmd: ['bash'],
            Tty: true,
            HostConfig: {
                CpuShares: Number(cpu) * 1024,
                Memory: Number(memory) * 1024 * 1024,
                Binds: [`${this.tempDir}:/app`], 
                AutoRemove: true,
            }, 
            StopTimeout: 10 // this has to be dynamic as per question. 
        }).catch((error) => {
            console.error("Error in invoking docker:", error);
            throw error;
        });

        return {
            container, 
            containerName
        }
    }

    async runTestCases(questionId: string, docker: Docker.Container, fileName: string) {
        try {
            // CALL R2 (CloudFlare BUCKET) for the test case file;
            const file = '/testcase file';
            const stream = fs.createReadStream(file);

            const rl = readline.createInterface({
                input: stream,
                crlfDelay: Infinity
            });

            const exec = await docker.exec({
                Cmd: ["node", `/app/${fileName}`], 
                AttachStderr: true,
                AttachStdin: true, 
                AttachStdout: true,
                Tty: false
            })
            
        } catch (error) {
            console.log(error, "Error while runni`ng tests")
        }
    }

    private getExecutionCommand(language: string, fileName: string): string {
        switch (language) {
            case 'javascript':
            case 'typescript':
                return `node /app/${fileName}`;
            case 'python':
                return `python /app/${fileName}`;
            case 'java':
                const className = fileName.replace('.java', '');
                return `cd /app && javac ${fileName} && java ${className}`;
            case 'cpp':
                const exeName = fileName.replace('.cpp', '');
                return `cd /app && g++ ${fileName} -o ${exeName} && ./${exeName}`;
            default:
                throw new Error(`Unsupported language: ${language}`);
        }
    }

    private cleanupFile(filePath: string): void {
        try {
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
                console.log(`Cleaned up file: ${filePath}`);
            }
        } catch (error) {
            console.error(`Error cleaning up file ${filePath}:`, error);
        }
    }

    public cleanupAllTempFiles(): void {
        try {
            const files = fs.readdirSync(this.tempDir);
            files.forEach((file: string) => {
                const filePath = path.join(this.tempDir, file);
                fs.unlinkSync(filePath);
            });
            console.log(`Cleaned up ${files.length} temporary files`);
        } catch (error) {
            console.error('Error cleaning up temp files:', error);
        }
    }
}
