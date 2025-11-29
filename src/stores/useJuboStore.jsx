import { create } from "zustand";

const useJuboStore = create((set, get) => ({
  // 데이터 구조
  jubo: {
    churchInfo: {
      churchName: "",
      ministerName: "",
    },
    worshipInfo: {
      worshipName: "",
      worshipTime:"",
      serviceDate: "",
      bibleVerse: "",
    },
    news: [],
    order:[],
  },

  // 공통 업데이트 함수
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

  // 모달 UI 상태
  isModalOpen: false,
  editingId: null, // 수정 모드인지 확인하기 위한 ID 상태 추가
  modalTab : "", // "news" 또는 "order"

  //뉴스 data
  category: "일반",
  date: "",
  title: "",
  content: "",

  setCategory: (v) => set({ category: v }),
  setDate: (v) => set({ date: v }),
  setTitle: (v) => set({ title: v }),
  setContent: (v) => set({ content: v }),
  //예배순서 data
  ordercategory : "예배로 부름 / 인도",
  orderTitle: "",
  orderContent: "",
  setOrderCategory: (v) => set({ ordercategory: v }),
  setOrderTitle: (v) => set({ orderTitle: v }),
  setOrderContent: (v) => set({ orderContent: v }),


  openModal: (tabType) => set({ isModalOpen: true, editingId: null, modalTab : tabType}), // 열 때는 수정 모드 초기화
  closeModal: () => set({
      isModalOpen: false,
      editingId: null,
      category: "일반",
      date: "",
      title: "",
      content: ""
  }),

  // 뉴스 저장 (추가 + 수정 통합 로직)
  saveNews: () => {
    const { category, date, title, content, editingId, jubo } = get();

    if (!title.trim()) return alert("제목을 입력해주세요!");

    let newNewsList;

    if (editingId) {
      // 수정 모드: 기존 ID를 찾아 교체
      newNewsList = jubo.news.map((item) =>
        item.id === editingId
          ? { ...item, category, date, title, content }
          : item
      );
    } else {
      // 생성 모드: 새 아이템 추가
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
      editingId: it.id, // 수정할 ID 저장
      category: it.category,
      date: it.date,
      title: it.title,
      content: it.content,
      isModalOpen: true,
    });
  },
  saveOrder: () => {
    const {ordercategory, orderTitle, orderContent, jubo, editingId } = get();
    
    if (!orderTitle.trim()) return alert("순서명을 입력해주세요!");

    let newOrderList;

    if (editingId) {
      // 수정 모드: 기존 ID를 찾아 교체
      newOrderList = jubo.order.map((item) =>
        item.id === editingId
          ? { ...item, ordercategory,orderTitle, orderContent }
          : item
      );
    } else {
      // 생성 모드: 새 아이템 추가
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
  deleteOrder:(it)=>{
    const { jubo } = get();
    set({
      jubo: {
        ...jubo,
        order: jubo.order.filter((order) => order.id !== it.id),
      },
    });
  },
  editOrder:(it)=>{
    set({
      editingId: it.id, // 수정할 ID 저장
      ordercategory: it.ordercategory,
      orderTitle: it.orderTitle,
      orderContent: it.orderContent,
      isModalOpen: true,
    });
  },
}));

export default useJuboStore;
