import "dotenv/config"

export const getEnv = (name: string) => {
    const value = process.env[name];
    if (!value) {
        throw new Error(`Environment variable ${name} is not defined`);
    }
    return value;
}