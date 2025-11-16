// /src/stores/useJuboStore.jsx
import { create } from "zustand";

const worshipInfoSlice = (set) => ({
  juboList: [],
  setJuboList: (newList) => set({ juboList: newList }),

  churchName: "",
  setChurchName: (newName) => set({ churchName: newName }),

  ministerName: "",
  setMinisterName: (newName) => set({ ministerName: newName }),

  worshipName: "",
  setWorshipName: (newName) => set({ worshipName: newName }),

  serviceDate: "",
  setServiceDate: (newDate) => set({ serviceDate: newDate }),

  bibleVerse: "",
  setBibleVerse: (newVerse) => set({ bibleVerse: newVerse }),
});

const newsModal = (set, get) => ({
  isModalOpen: false,
  openModal: () => set({ isModalOpen: true }),
  closeModal: () => set({ isModalOpen: false }),

  category: "일반",
  setCategory: (newCategory) => set({ category: newCategory }),
  date: "",
  setDate: (newDate) => set({ date: newDate }),
  title: "",
  setTitle: (newTitle) => set({ title: newTitle }),
  content: "",
  setContent: (newContent) => set({ content: newContent }),

  addNews: () => {
    const { category, date, title, content, juboList } = get();
    if (!title.trim()) return alert("제목을 입력해주세요!");
    const newNews = {
      id: Date.now(),
      category,
      date,
      title,
      content,
    };

    set({ juboList: [...juboList, newNews] });

    set({
      category: "일반",
      date: "",
      title: "",
      content: "",
    });

    get().closeModal();
  },
  closeNews: () => {
    set({
      category: "일반",
      date: "",
      title: "",
      content: "",
    });
    get().closeModal();
  },
  deleteNews: (it) => {
    const { juboList } = get();
    const updatedList = juboList.filter((news) => news.id !== it.id);
    set({ juboList: updatedList });
  },
  editNews: (it) => {
    set({
      category: it.category,
      date: it.date,
      title: it.title,
      content: it.content,
    });
    get().openModal();
  },
});
const useJuboStore = create((set, get) => ({
  ...worshipInfoSlice(set),
  ...newsModal(set, get),
}));

export default useJuboStore;
