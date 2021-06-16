import * as dotenv from 'dotenv';//have to import becase userModel doesn't import
dotenv.config();

const secret = process.env.TOKEN_SECRET
const expTime = process.env.EXPIRATION_TIME
export default {secret, expTime}