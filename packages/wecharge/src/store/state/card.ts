export type CardState = {
  _id: string;
  cardHolder: string;
  expiryDate: string;
  cardType: string | null;
  lastFour: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
};
