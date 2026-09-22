import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';

const dz26EnvPath = path.resolve(process.cwd(), 'DZ26/.env');
const rootEnvPath = path.resolve(process.cwd(), '.env');
const envPath = fs.existsSync(dz26EnvPath) ? dz26EnvPath : rootEnvPath;

dotenv.config({ path: envPath });

export const config = {
  baseURL: process.env.BASE_URL || 'https://qauto.forstudy.space',
  httpCredentials: {
    username: process.env.HTTP_USER || 'guest',
    password: process.env.HTTP_PASSWORD || 'welcome2qauto',
  },
};

export default config;
