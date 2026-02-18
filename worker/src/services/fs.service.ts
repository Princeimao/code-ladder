import path from "path";
import fs from "fs";

class FileService {
    private tempDir: string;
    
    constructor () {
        this.tempDir = path.join(process.cwd(), "temp");
        this.ensureTempDirectory();
    }

    private ensureTempDirectory(): void {
        if (!fs.existsSync(this.tempDir)) {
            fs.mkdirSync(this.tempDir, { recursive: true });
        }
    }

    getTempDir(): string {
        return this.tempDir;
    }

    writeFile(fileName: string, code: string) {
        const filePath = path.join(this.tempDir, fileName);
        fs.writeFileSync(filePath, code);

        return filePath;
    }

    cleanupFile(filePath: string): void {
        try {
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            }
        } catch (error) {
            console.error(`Error cleaning up file ${filePath}:`, error);
        }
    }

    cleanupAllTempFiles(): void {
        try {
            const files = fs.readdirSync(this.tempDir);
            files.forEach((file: string) => {
                const filePath = path.join(this.tempDir, file);
                fs.unlinkSync(filePath);
            });
        } catch (error) {
            console.error('Error cleaning up temp files:', error);
        }
    }
}

const fileService = new FileService();
export default fileService; 