import mongoose, { Document, Types } from 'mongoose';

const cardSchema = new mongoose.Schema({
  cardHolder: {
    required: true,
    type: String,
  },
  expiryDate: {
    required: true,
    type: String,
  },
  cardType: {
    required: false,
    type: String,
  },
  lastFour: {
    required: true,
    type: String,
  },
  userId: {
    type: Types.ObjectId,
    ref: 'User',
  },
  customerId: {
    required: true,
    type: String,
  },
  cardToken: {
    required: true,
    type: String,
  },
});

type BaseCard = {
  cardHolder: string;
  expiryDate: string;
  cardType: string | null;
  lastFour: string;
  userId: string;
  customerId: string;
  cardToken: string;
  createdAt: Date;
  updatedAt: Date;
};

const CardModel = mongoose.model<BaseCard>('Card', cardSchema);

export type Card = Document<unknown, NonNullable<unknown>, BaseCard> &
  BaseCard & {
    _id: Types.ObjectId;
  };

export default CardModel;
