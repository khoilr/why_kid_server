import * as dotenv from 'dotenv';
dotenv.config();

// const MONGODB_CONN_STR = process.env.MONGODB_CONN_STR ?? ""
const DB_NAME = process.env.DB_NAME ?? ""
const PORT = process.env.PORT ?? 3000;
const CONNECTION_URI = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@wke.j6kd3h0.mongodb.net/${process.env.DB_NAME}`;
const FILE_BUCKET = process.env.FILE_BUCKET ?? '';
const BLOB_URI = process.env.BLOB_URI ?? 'http://103.157.218.126:42000';

export {
    CONNECTION_URI,
    DB_NAME,
    PORT,
    FILE_BUCKET,
    BLOB_URI,
}