import { uniqBy } from 'lodash-es';
import { create } from 'zustand';

export type CardState = {
  _id: string;
  cardHolder: string;
  expiryDate: string;
  cardType: string;
  lastFour: string;
  cardId: string;
  userId: string;
  customerId: string;
  cardToken: string;
  createdAt: string;
  updatedAt: string;
};

type CardStore = {
  cards: CardState[];
  addCard(card: CardState | CardState[]): void;
  removeCard(id: string): void;
  updateCard(id: string, card: Partial<CardState>): void;
  resetCards(): void;
};

const useCardStore = create<CardStore>((set, get) => ({
  cards: [],
  addCard(card: CardState | CardState[]) {
    const cards = Array.isArray(card) ? card : [card];
    const prevCards = get().cards;

    let newCards = [...prevCards, ...cards];
    newCards.sort(
      (a, b) =>
        (new Date(b.createdAt) as never) - (new Date(a.createdAt) as never)
    );

    // Remove duplicates
    newCards = uniqBy(newCards, '_id');

    set({
      cards: newCards,
    });
  },
  removeCard(id: string) {
    const cards = get().cards;
    const index = cards.findIndex((card) => card._id === id);

    if (index !== -1) {
      cards.splice(index, 1);
    }

    set({
      cards: [...cards],
    });
  },
  updateCard(id: string, card: Partial<CardState>) {
    const cards = get().cards;
    const index = cards.findIndex((card) => card._id === id);

    if (index !== -1) {
      cards[index] = {
        ...cards[index],
        ...card,
      };
    }

    set({
      cards: [...cards],
    });
  },
  resetCards() {
    set({
      cards: [],
    });
  },
}));

export default useCardStore;
