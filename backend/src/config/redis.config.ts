import { createClient } from 'redis';
import { getEnv } from './env.config.js';


const REDIS_USERNAME = getEnv("REDIS_USERNAME");
const REDIS_PASSWORD = getEnv("REDIS_PASSWORD");
const REDIS_HOST = getEnv("REDIS_HOST");
const REDIS_PORT = getEnv("REDIS_PORT");

const client = createClient({
    username: REDIS_USERNAME,
    password: REDIS_PASSWORD,
    socket: {
        host: REDIS_HOST,
        port: Number(REDIS_PORT)
    }
});

client.on('error', err => console.log('Redis Client Error', err));

await client.connect();

export default client;

// await client.set('foo', 'bar');
// const result = await client.get('foo');
// console.log(result);

