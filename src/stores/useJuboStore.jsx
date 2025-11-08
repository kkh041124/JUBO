// /src/stores/useJuboStore.jsx
import { create } from 'zustand';

const useJuboStore = create((set) => ({
  juboList: [],
  setJuboList: (newList) => set({ juboList: newList }),

  churchName: '',
  setChurchName: (newName) => set({ churchName: newName }),

  ministerName: '',
  setMinisterName: (newName) => set({ ministerName: newName }),

  worshipName: '',
  setWorshipName: (newName) => set({ worshipName: newName }),

  serviceDate: '',
  setServiceDate: (newDate) => set({ serviceDate: newDate }),

  bibleVerse: '',
  setBibleVerse: (newVerse) => set({ bibleVerse: newVerse }),
}));

export default useJuboStore;