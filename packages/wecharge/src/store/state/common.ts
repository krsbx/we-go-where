import { create } from 'zustand';

type CommonStore = {
  isSelecting: boolean;
  setIsSelecting(isSelecting: boolean): void;
  selected: string;
  setSelected(selected: string): void;
};

const useCommonStore = create<CommonStore>((set) => ({
  isSelecting: false,
  setIsSelecting(isSelecting) {
    set({
      isSelecting,
    });
  },
  selected: '',
  setSelected(selected) {
    set({
      selected,
    });
  },
}));

export default useCommonStore;
