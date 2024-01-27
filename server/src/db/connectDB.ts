import * as mongoose from 'mongoose';

const connectDB = async (): Promise<void> => {
  await mongoose.connect(process.env.MONGO_URL as string)
}

export default connectDB
