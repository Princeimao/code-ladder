import Docker from 'dockerode'
import { v4 as uuidv4 } from 'uuid';
import { dockerImage, languageExtension } from '../constants.js';
import type Stream from 'node:stream';
import fs from 'fs';
import tar from 'tar-stream';
import { Readable } from 'stream';

export class DockerService {
    private language: string;
    private tempCode: string;
    private containerName: string;
    private docker: Docker;

    constructor (lang: string, temp: string) {
        this.language = lang;
        this.tempCode = temp;
        this.containerName = `judge-${uuidv4()}`;
        this.docker = new Docker();
    }

    async createContainer(): Promise<Docker.Container> {
        try {
        const container = await this.docker.createContainer({
            name: this.containerName,
            Image: dockerImage[this.language],
            Tty: true,
            HostConfig: {
                CpuPercent: 20,
                Memory: 1024 * 1024 * 256,
            }, 
            StopTimeout: 10
        });
        
        await this.copyFile();
        return container;

        } catch (error) {
            console.error("Error in invoking docker:", error);
            throw error;
        }
    }

    async execution(): Promise<Stream.Duplex> {
        try {
            const container = await this.docker.getContainer(this.containerName);
            const command = this.getExecutionCommand(this.language);
            const exec = await container.exec({
                Cmd: [command],
                AttachStderr: true,
                AttachStdin: true, 
                AttachStdout: true,
                Tty: true
            })
            
            const stream = await exec.start({
                hijack: true, 
                stdin: true, 
            })
            return stream;
        } catch (error) {
            console.error("Error in starting container:", error);
            throw error;
        }
    }

    private async copyFile() {
        const container = await this.docker.getContainer(this.containerName);
        await container.start();

        const pack = tar.pack();
        const code = fs.readFileSync(this.tempCode);
        const fileName = `tempCode.${languageExtension[this.language]}`
        pack.entry({ name: fileName }, code);
        pack.finalize();

        await container.putArchive(pack, {path: "tmp"});
    }

    private getExecutionCommand(language: string): string {
        switch (language) {
            case 'javascript':
            case 'typescript':
                return `node /tmp/tempCode.js`;
            case 'python':
                return `python /tmp/tempCode.py`;
            case 'java':
                return `cd /tmp && javac tempCode.java && java tempCode`;
            case 'cpp':
                return `cd /tmp && g++ tempCode.cpp -o tempCode && ./tempCode`;
            default:
                throw new Error(`Unsupported language: ${language}`);
        }
    }
}