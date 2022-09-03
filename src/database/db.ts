import mongoose from 'mongoose';

import { MONGO_URI } from '../utils/config';
import HttpException from '../utils/httpException';

export const connectDB = async (): Promise<void> => {
    if (MONGO_URI == null || MONGO_URI === '') {
        console.log('Mongo URI is required');
        process.exit(1);
    }

    try {
        await mongoose.connect(MONGO_URI);
        console.log('MongoDB connected');
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

export function isObjectIdValid(id: string): void {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new HttpException(`${id} is not a valid id`, 400);
    }
}
