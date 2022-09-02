import { Schema } from 'mongoose';
import { UserType } from '../types/userTypes';

import { emailRegex } from '../sanitizers/utils';

export interface IUserSchema extends UserType {
    _id: string;
}

const UserSchema = new Schema<UserType>(
    {
        username: {
            type: String,
            required: [true, 'Username is required'],
            unique: true,
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            unique: true,
            min: [6, 'Email must be at least 6 characters'],
            max: [50, 'Email must be less than 50 characters'],
            match: [emailRegex, 'Email is invalid'],
        },
        password: {
            type: String,
            required: [true, 'Password is required'],
            min: [6, 'Password must be at least 6 characters'],
            max: [50, 'Password must be less than 50 characters'],
        },
        isAdmin: {
            type: Boolean,
            default: false,
        },
        resetPasswordToken: String,
        resetPasswordExpires: Date,
    },
    {
        timestamps: true,
    }
);

export default UserSchema;
