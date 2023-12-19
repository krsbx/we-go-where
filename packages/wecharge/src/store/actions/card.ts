import { ChargeSchema, CreditCardSchema } from '../../schemas/card';
import axios from '../axios';
import useCardStore, { CardState } from '../state/card';

export async function addCard(payload: CreditCardSchema) {
  const { data } = await axios.post<CardState>('/cards', payload);

  const { addCard } = useCardStore.getState();

  addCard(data);

  return data;
}

export async function getCards(
  params: Record<string, unknown> = {
    page: 1,
    limit: 'all',
  }
) {
  const { data } = await axios.get<{
    data: CardState[];
    page: {
      size: number;
      current: number;
      totalPages: number;
    };
  }>('/cards', { params });

  const { addCard } = useCardStore.getState();

  addCard(data.data);

  return data;
}

export async function deleteCard(cardId: string) {
  await axios.delete(`/cards/${cardId}`);

  const { removeCard } = useCardStore.getState();

  removeCard(cardId);
}

export async function chargeCard(cardId: string, payload: ChargeSchema) {
  await axios.post(`/cards/${cardId}/charges`, {
    currency: payload.currency,
    amount: +payload.amount,
  });
}
