import { z } from 'zod';

export const expiryDateMask = [/\d/, /\d/, '/', /\d/, /\d/];

export const cvvMask = [/\d/, /\d/, /\d/];

export const creditCardRegex = /\d{4}\s\d{4}\s\d{4}\s\d{4}/;

export const expiryDateRegex = /^([1-9]|0[1-9]|1[0-2])\/?([0-9]{2})$/;

export const cvvRegex = /^\d{3}$/;

export const createSchema = z.object({
  number: z.string().refine((value) => value.match(creditCardRegex), {
    message: 'Invalid credit card number',
  }),
  cardHolder: z.string(),
  expiryDate: z.string().refine(
    (value) => {
      const isMatch = value.match(expiryDateRegex);
      const [month, year] = value.split('/');
      const isCurrentYear = new Date().getFullYear() % 2000 === Number(year);
      const isCurrentMonth = Number(month) === new Date().getMonth() + 1;

      if (!isMatch) return false;
      if (Number(month) > 12) return false;
      if (Number(year) < new Date().getFullYear() % 2000) return false;
      if (isCurrentYear && isCurrentMonth) return false;

      return true;
    },
    {
      message: 'Invalid expiry date',
    }
  ),
  cvv: z
    .string()
    .length(3)
    .refine((value) => value.match(expiryDateRegex), {
      message: 'Invalid CVV',
    }),
  cardToken: z.string(),
  cardType: z.string(),
  lastFour: z.string().length(4),
});

export const chargeSchema = z.object({
  amount: z.number().positive({ message: 'Amount must be greater than zero' }),
  currency: z.string().default('thb'),
});
