import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

export const config = {
  baseURL: process.env.BASE_URL || 'https://qauto.forstudy.space',
  httpCredentials: {
    username: process.env.HTTP_USER || 'guest',
    password: process.env.HTTP_PASSWORD || 'welcome2qauto',
  },
};

export default config;
