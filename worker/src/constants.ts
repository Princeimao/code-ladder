export const dockerImage: Record<string, string> = {
    cpp: "", 
    python: "python:3.15.0a6-slim", 
    java: "openjdk:27-ea-slim", 
    javascript: "node:25-alpine", 
    typescript: "node:25-alpine"
} 

export const languageExtension: Record<string, string> = {
    cpp: "cpp",
    python: "py",
    java: "java",
    javascript: "js",
    typescript: "ts"
}
