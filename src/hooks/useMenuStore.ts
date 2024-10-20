import { create } from "zustand";

interface MenuState {
  show: boolean;
  setShow: (show: boolean) => void;
}

const useMenuStore = create<MenuState>((set) => ({
  show: false,
  setShow: (show) => set({ show }),
}));

export default useMenuStore;
