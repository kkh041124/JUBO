import { create } from "zustand";
import { arrayMove } from "@dnd-kit/sortable";

const useJuboStore = create((set, get) => ({
  jubo: {
    churchInfo: {
      churchName: "",
      ministerName: "",
    },
    worshipInfo: {
      worshipName: "",
      worshipTime: "",
      serviceDate: "",
      bibleVerse: "",
    },
    news: [],
    order: [],
    selectedTemplate:"",

  },

  updateField: (section, key, value) =>
    set((state) => ({
      jubo: {
        ...state.jubo,
        [section]: {
          ...state.jubo[section],
          [key]: value,
        },
      },
    })),

  isModalOpen: false,
  editingId: null,
  modalTab: "",

  category: "일반",
  date: "",
  title: "",
  content: "",

  setCategory: (v) => set({ category: v }),
  setDate: (v) => set({ date: v }),
  setTitle: (v) => set({ title: v }),
  setContent: (v) => set({ content: v }),

  ordercategory: "예배로 부름 / 인도",
  orderTitle: "",
  orderContent: "",
  setOrderCategory: (v) => set({ ordercategory: v }),
  setOrderTitle: (v) => set({ orderTitle: v }),
  setOrderContent: (v) => set({ orderContent: v }),
  setSelectedTemplate: (v) => set({ selectedTemplate: v }),
  openModal: (tabType) => set({ isModalOpen: true, editingId: null, modalTab: tabType }),
  closeModal: () => set({
    isModalOpen: false,
    editingId: null,
    category: "일반",
    date: "",
    title: "",
    content: ""
  }),

  saveNews: () => {
    const { category, date, title, content, editingId, jubo } = get();
    if (!title.trim()) return alert("제목을 입력해주세요!");

    let newNewsList;
    if (editingId) {
      newNewsList = jubo.news.map((item) =>
        item.id === editingId
          ? { ...item, category, date, title, content }
          : item
      );
    } else {
      const newNews = {
        id: Date.now(),
        category,
        date,
        title,
        content,
      };
      newNewsList = [...jubo.news, newNews];
    }
    set({
      jubo: {
        ...jubo,
        news: newNewsList,
      },
    });
    get().closeModal();
  },

  deleteNews: (it) => {
    const { jubo } = get();
    set({
      jubo: {
        ...jubo,
        news: jubo.news.filter((news) => news.id !== it.id),
      },
    });
  },

  editNews: (it) => {
    set({
      editingId: it.id,
      category: it.category,
      date: it.date,
      title: it.title,
      content: it.content,
      isModalOpen: true,
    });
  },

  saveOrder: () => {
    const { ordercategory, orderTitle, orderContent, jubo, editingId } = get();
    if (!orderTitle.trim()) return alert("순서명을 입력해주세요!");

    let newOrderList;
    if (editingId) {
      newOrderList = jubo.order.map((item) =>
        item.id === editingId
          ? { ...item, ordercategory, orderTitle, orderContent }
          : item
      );
    } else {
      const newOrder = {
        id: Date.now(),
        ordercategory,
        orderTitle,
        orderContent,
      };
      newOrderList = [...jubo.order, newOrder];
    }
    set({
      jubo: {
        ...jubo,
        order: newOrderList,
      },
    });
    get().closeModal();
  },

  deleteOrder: (it) => {
    const { jubo } = get();
    set({
      jubo: {
        ...jubo,
        order: jubo.order.filter((order) => order.id !== it.id),
      },
    });
  },

  editOrder: (it) => {
    set({
      editingId: it.id,
      ordercategory: it.ordercategory,
      orderTitle: it.orderTitle,
      orderContent: it.orderContent,
      isModalOpen: true,
    });
  },

  reOrder: (activeId, overId) => {
    set((it) => {
      const oldIndex = it.jubo.order.findIndex((item) => item.id === activeId);
      const newIndex = it.jubo.order.findIndex((item) => item.id === overId);
      
      return {
        jubo: {
          ...it.jubo,
          order: arrayMove(it.jubo.order, oldIndex, newIndex)
        }
      }
    })
  },
}));

export default useJuboStore;
