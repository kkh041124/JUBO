import { create } from "zustand";
import { arrayMove } from "@dnd-kit/sortable";

const initialJuboState = {
  churchInfo: {
    churchName: "",
    ministerName: "",
    churchLocation: "",
    phone: "",
  },
  worshipInfo: {
    worshipName: "",
    worshipTime: "",
    serviceDate: "",
    bibleVerse: "",
    bibleVerseContent: "",
  },
  designInfo: {
    textInfo: {
      slogan: "",
      title: "",
      subtitle: "",
      vision: "Vision 2025",
      motto: "Reach Higher",
      headerTitle: "APOSTLES",
    },
    logoInfo: {
      logo: null,
      logoName: "",
      logoSize: 40,
      logoPosition: "left",
    },
    backgroundInfo: {
      backgroundImage: null,
      backgroundName: null,
      backgroundColor: "#4a6fa5",
      gradientcolorfirst: "#ffffff",
      gradientcolorsecond: "#000000",
      gradientdirection: "to left",
      imgopacity: 0,
      backgroundType: "solid",
    },
  },
  news: [],
  order: [],
};

const useJuboStore = create((set, get) => ({
  jubo: initialJuboState,
  resetJubo: () => set({ jubo: initialJuboState, selectedTemplate: "📋 기본 템플릿" }),

  selectedTemplate: "",

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

  setSelectedTemplate: (template) => set({ selectedTemplate: template }),

  setHeaderInfo: (type, content) =>
    set((state) => ({
      jubo: {
        ...state.jubo,
        designInfo: {
          ...state.jubo.designInfo,
          textInfo: {
            ...state.jubo.designInfo.textInfo,
            [type]: content,
          },
        },
      },
    })),

  setLogo: (image, name) =>
    set((state) => ({
      jubo: {
        ...state.jubo,
        designInfo: {
          ...state.jubo.designInfo,
          logoInfo: {
            ...state.jubo.designInfo.logoInfo,
            logo: image,
            logoName: name,
          },
        },
      },
    })),
  setLogoPosition: (position) =>
    set((state) => ({
      jubo: {
        ...state.jubo,
        designInfo: {
          ...state.jubo.designInfo,
          logoInfo: {
            ...state.jubo.designInfo.logoInfo,
            logoPosition: position,
          },
        },
      },
    })),

  setLogoSize: (size) =>
    set((state) => {
      let validatedSize = size;

      if (size < 40) {
        validatedSize = 40;
      } else if (size > 120) {
        validatedSize = 120;
      }

      return {
        jubo: {
          ...state.jubo,
          designInfo: {
            ...state.jubo.designInfo,
            logoInfo: {
              ...state.jubo.designInfo.logoInfo,
              logoSize: validatedSize,
            },
          },
        },
      };
    }),

  setBackGroundImage: (image, name) =>
    set((state) => ({
      jubo: {
        ...state.jubo,
        designInfo: {
          ...state.jubo.designInfo,
          backgroundInfo: {
            ...state.jubo.designInfo.backgroundInfo,
            backgroundImage: image,
            backgroundName: name,
          },
        },
      },
    })),
  setBackGroundColor: (color) =>
    set((state) => ({
      jubo: {
        ...state.jubo,
        designInfo: {
          ...state.jubo.designInfo,
          backgroundInfo: {
            ...state.jubo.designInfo.backgroundInfo,
            backgroundColor: color,
          },
        },
      },
    })),
  setImgOpacity: (opacity) =>
    set((state) => ({
      jubo: {
        ...state.jubo,
        designInfo: {
          ...state.jubo.designInfo,
          backgroundInfo: {
            ...state.jubo.designInfo.backgroundInfo,
            imgopacity: opacity,
          },
        },
      },
    })),
  setGradientColorFirst: (color) =>
    set((state) => ({
      jubo: {
        ...state.jubo,
        designInfo: {
          ...state.jubo.designInfo,
          backgroundInfo: {
            ...state.jubo.designInfo.backgroundInfo,
            gradientcolorfirst: color,
          },
        },
      },
    })),
  setGradientColorSecond: (color) =>
    set((state) => ({
      jubo: {
        ...state.jubo,
        designInfo: {
          ...state.jubo.designInfo,
          backgroundInfo: {
            ...state.jubo.designInfo.backgroundInfo,
            gradientcolorsecond: color,
          },
        },
      },
    })),
  setGradientDirection: (direction) =>
    set((state) => ({
      jubo: {
        ...state.jubo,
        designInfo: {
          ...state.jubo.designInfo,
          backgroundInfo: {
            ...state.jubo.designInfo.backgroundInfo,
            gradientdirection: direction,
          },
        },
      },
    })),
  setBackgroundType: (type) =>
    set((state) => ({
      jubo: {
        ...state.jubo,
        designInfo: {
          ...state.jubo.designInfo,
          backgroundInfo: {
            ...state.jubo.designInfo.backgroundInfo,
            backgroundType: type,
          },
        },
      },
    })),
  openModal: (tabType) =>
    set({ isModalOpen: true, editingId: null, modalTab: tabType }),
  closeModal: () =>
    set({
      isModalOpen: false,
      editingId: null,
      category: "일반",
      date: "",
      title: "",
      content: "",
    }),

  saveNews: () => {
    const { category, date, title, content, editingId, jubo } = get();
    if (!title.trim()) return alert("제목을 입력해주세요!");

    let newNewsList;
    if (editingId) {
      newNewsList = jubo.news.map((item) =>
        item.id === editingId
          ? { ...item, category, date, title, content }
          : item,
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
          : item,
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
          order: arrayMove(it.jubo.order, oldIndex, newIndex),
        },
      };
    });
  },

  // 로컬스토리지에 전체 데이터 저장
  saveToLocalStorage: () => {
    const { jubo, selectedTemplate } = get();
    const dataToSave = {
      jubo,
      selectedTemplate,
      savedAt: new Date().toISOString(),
    };
    try {
      localStorage.setItem("juboData", JSON.stringify(dataToSave));
      alert("저장되었습니다!");
      return true;
    } catch (error) {
      console.error("저장 실패:", error);
      alert("저장에 실패했습니다.");
      return false;
    }
  },

  // 로컬스토리지에서 데이터 로드
  loadFromLocalStorage: () => {
    try {
      const savedData = localStorage.getItem("juboData");
      if (savedData) {
        const { jubo, selectedTemplate } = JSON.parse(savedData);
        set({
          jubo,
          selectedTemplate,
        });
        return true;
      }
    } catch (error) {
      console.error("로드 실패:", error);
      return false;
    }
  },
}));

export default useJuboStore;
