import * as mongoose from 'mongoose';

const connectDB = async () => {
  await mongoose.connect(process.env.MONGO_URL as string)
}

export default connectDB
