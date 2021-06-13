import dotenv from 'dotenv';//?? differ from db/index
dotenv.config();

const secret = process.env.TOKEN_SECRET
export default {secret}