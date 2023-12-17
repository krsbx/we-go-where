import mongoose, { Document, Types } from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    avatar: {
      required: false,
      type: String,
    },
    email: {
      unique: true,
      required: true,
      type: String,
    },
    username: {
      unique: true,
      required: true,
      type: String,
    },
    password: {
      unique: true,
      required: true,
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

type BaseUser = {
  avatar: string | null;
  email: string;
  username: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
};

export type AuthedUser = BaseUser & {
  _id: string;
};

const UserModel = mongoose.model<BaseUser>('User', userSchema);

export type User = Document<unknown, NonNullable<unknown>, BaseUser> &
  BaseUser & {
    _id: Types.ObjectId;
  };

export default UserModel;
