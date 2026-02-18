import {string, z} from 'zod';

export const jugdementSchema = z.object({
    questionId: z.string(), 
    language: z.enum(["cpp", "python", "java", "javascript", "typescript"]), 
    code: z.string(), 
})