import { dockerImage, languageExtension } from "../constants.js";
import { v4 as uuidv4 } from 'uuid';
import { spawn, exec, ExecException } from 'child_process';
import fs from 'fs';
import path from 'path';

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

            const result = await this.invokeDocker(language, filePath, fileName);

            // LOGIC TO CHECK THE OUTPUT OF THE CODE IF FAILED THEN SEND WRONG 
            // THIS IS RUNNER AND WILL NOT STORE SUBMISSING ON THE DATABSE ONLY 
            // SEND THE OUTPUT TO THE REDIS AND FORNTEND WILL POOL FROM REDIS
            // FRONTEND GET THE RUNNER ID 

            this.cleanupFile(filePath);

            return result;
        } catch (error) {
            console.error("Error in judge runner:", error);
            return {
                success: false,
                error: error instanceof Error ? error.message : "Unknown error occurred"
            };
        }
    }

    invokeDocker(
        language: string, 
        filePath: string, 
        fileName: string,
        cpu: string = "0.5", 
        memory: string = "256m"
    ): JudgeResult {
        const containerName = `judge-${uuidv4()}`;
        const image = dockerImage[language];

        const command = this.generateCommand(cpu, memory, containerName, image!);
        
        // LOGIC TO CHECK THE OUTPUT OF THE CODE 
        
        return {
            success: true,
            output: "",
            error: "",
            executionTime: 0
        };
    }

    private generateCommand(cpu: string, memory: string, containerName: string, image: string): string[] {
        return [
            'run', 
            '-i', 
            '--rm', 
            `--cpus=${cpu}`, 
            `--memory=${memory}`, 
            '--name', 
            containerName, 
            image, 
            'bash'
        ];
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
