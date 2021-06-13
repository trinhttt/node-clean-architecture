import dotenv from 'dotenv';//have to import becase userModel doesn't import
dotenv.config();

const secret = process.env.TOKEN_SECRET
export default {secret}