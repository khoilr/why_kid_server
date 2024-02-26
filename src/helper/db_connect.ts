import * as mongoose from 'mongoose';
const connectToDB = async (uri: string) => {
    return await mongoose.connect(uri, {});
}

export {
    connectToDB,
}