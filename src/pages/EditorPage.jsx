import {
  ArrowLeft,
  FileText,
  Eye,
  Download,
  Share2,
  Save,
  Calendar,
  Settings,
  Users,
  MessageSquare,
  Plus,
  Megaphone,
  HeartHandshake,
  HandHelping,
  NotebookPen,
  Trash2,
  SquarePen,
  User,
  Music,
  BookHeart,
  Heart,
  BookOpen,
  Music4,
  Mic,
  Gift,
  Sparkles,
  MoreHorizontal,
  GripVertical,
  FolderOpen,
  Minus,
} from "lucide-react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  useSortable,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import styles from "../pages/EditorPage.module.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import useJuboStore from "../stores/useJuboStore";
import AModal from "../components/AModal/AModal.jsx";

const SortableOrderItem = ({ order, index, editOrder, deleteOrder }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: order.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 999 : "auto",
    opacity: isDragging ? 0.5 : 1,
    touchAction: "none",
    position: "relative",
  };

  const categoryClass =
    order.ordercategory === "예배로 부름 / 인도"
      ? "call"
      : order.ordercategory === "찬송"
      ? "hymn"
      : order.ordercategory === "신앙고백"
      ? "creed"
      : order.ordercategory === "기도"
      ? "prayer"
      : order.ordercategory === "성경봉독"
      ? "scripture"
      : order.ordercategory === "찬양대 / 특송"
      ? "choir"
      : order.ordercategory === "설교"
      ? "sermon"
      : order.ordercategory === "헌금 / 봉헌"
      ? "offering"
      : order.ordercategory === "광고"
      ? "notice"
      : order.ordercategory === "축도"
      ? "benediction"
      : order.ordercategory === "직접 입력"
      ? "custom"
      : "";

  const CategoryIcon =
    order.ordercategory === "예배로 부름 / 인도"
      ? User
      : order.ordercategory === "찬송"
      ? Music
      : order.ordercategory === "신앙고백"
      ? BookHeart
      : order.ordercategory === "기도"
      ? Heart
      : order.ordercategory === "성경봉독"
      ? BookOpen
      : order.ordercategory === "찬양대 / 특송"
      ? Music4
      : order.ordercategory === "설교"
      ? Mic
      : order.ordercategory === "헌금 / 봉헌"
      ? Gift
      : order.ordercategory === "광고"
      ? Megaphone
      : order.ordercategory === "축도"
      ? Sparkles
      : order.ordercategory === "직접 입력"
      ? MoreHorizontal
      : null;

  return (
    <div ref={setNodeRef} style={style} className={styles.orderItem}>
      <div className={styles.leftGroup} {...attributes} {...listeners}>
        <GripVertical className={styles.dragHandle} />
      </div>

      {CategoryIcon && <CategoryIcon className={styles.icon} />}

      <div className={styles.indexBadge}>{index + 1}</div>

      <div className={styles.orderDetails}>
        <div className={styles.orderHeader}>
          <p className={styles[categoryClass]}>{order.ordercategory}</p>
        </div>
        <h3>{order.orderTitle}</h3>
        <span>{order.orderContent}</span>
      </div>

      <div className={styles.orderActions}>
        <button className={styles.editBtn} onClick={() => editOrder(order)}>
          <SquarePen className={styles.Actionicon} />
        </button>
        <button className={styles.deleteBtn} onClick={() => deleteOrder(order)}>
          <Trash2 className={styles.Actionicon} />
        </button>
      </div>
    </div>
  );
};

const EditorPage = () => {
  const {
    jubo,
    updateField,
    deleteNews,
    editNews,
    deleteOrder,
    editOrder,
    isModalOpen,
    openModal,
    closeModal,
    reOrder,
    setHeaderInfo,
    updateFontSize,
  } = useJuboStore();

  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("info");
  const [activeHeaderTab, setActiveHeaderTab] = useState("text");
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      reOrder(active.id, over.id);
    }
  };

  return (
    <div className={styles.editorpageContainer}>
      <div className={styles.editorpageHeader}>
        <div className={styles.headerSection}>
          <button
            className={`${styles.iconButton} ${styles.ghostButton}`}
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className={styles.icon} />
            <span>돌아가기</span>
          </button>
        </div>

        <div className={`${styles.headerSection} ${styles.titleContainer}`}>
          <FileText className={styles.pageIcon} />
          <span className={styles.title}>
            {jubo.churchInfo.churchName || "교회명 미입력"}
          </span>
        </div>

        <div className={styles.iconGroup}>
          <button className={`${styles.iconButton} ${styles.lightButton}`}>
            <FolderOpen className={styles.icon} />
            <span>불러오기</span>
          </button>
          <button className={`${styles.iconButton} ${styles.lightButton}`}>
            <Save className={styles.icon} />
            <span>저장</span>
          </button>
          <button
            className={`${styles.iconButton} ${styles.lightButton}`}
            onClick={() => openModal("design")}
          >
            <Settings className={styles.icon} />
            <span>디자인</span>
          </button>
          <button className={`${styles.iconButton} ${styles.lightButton}`}>
            <Eye className={styles.icon} />
            <span>미리보기</span>
          </button>
          <button className={`${styles.iconButton} ${styles.lightButton}`}>
            <Download className={styles.icon} />
            <span>다운로드</span>
          </button>
          <button className={`${styles.iconButton} ${styles.primaryButton}`}>
            <Share2 className={styles.icon} />
            <span>공유</span>
          </button>
        </div>
      </div>

      <div className={styles.editorBody}>
        <div className={styles.editorContainer}>
          <div className={styles.editorTitle}>
            <FileText className={styles.pageIconLarge} />
            <h1>주보 편집</h1>
          </div>

          <div className={styles.headerBar}>
            <button
              className={activeTab === "info" ? styles.activeTab : ""}
              onClick={() => setActiveTab("info")}
            >
              <Calendar className={styles.icon} />
              <span>기본정보</span>
            </button>
            <button
              className={activeTab === "header" ? styles.activeTab : ""}
              onClick={() => setActiveTab("header")}
            >
              <Settings className={styles.icon} />
              <span>헤더설정</span>
            </button>
            <button
              className={activeTab === "order" ? styles.activeTab : ""}
              onClick={() => setActiveTab("order")}
            >
              <Users className={styles.icon} />
              <span>예배순서</span>
            </button>
            <button
              className={activeTab === "news" ? styles.activeTab : ""}
              onClick={() => setActiveTab("news")}
            >
              <MessageSquare className={styles.icon} />
              <span>교회소식</span>
            </button>
          </div>

          {activeTab === "info" ? (
            <div className={styles.infoContent}>
              <div className={styles.section}>
                <h3>교회 정보</h3>
                <div className={styles.inputRow}>
                  <div className={styles.inputGroup}>
                    <p>교회명</p>
                    <input
                      type="text"
                      placeholder="예: 새소망교회"
                      value={jubo.churchInfo.churchName}
                      onChange={(e) =>
                        updateField("churchInfo", "churchName", e.target.value)
                      }
                    />
                  </div>
                  <div className={styles.inputGroup}>
                    <p>담임목사</p>
                    <input
                      type="text"
                      placeholder="예: 김철수 목사"
                      value={jubo.churchInfo.ministerName}
                      onChange={(e) =>
                        updateField(
                          "churchInfo",
                          "ministerName",
                          e.target.value
                        )
                      }
                    />
                  </div>
                </div>
              </div>

              <div className={styles.section}>
                <h3>예배 정보</h3>
                <div className={styles.inputRow}>
                  <div className={styles.inputGroup}>
                    <p>예배명</p>
                    <input
                      type="text"
                      placeholder="예: 주일 대예배"
                      value={jubo.worshipInfo.worshipName}
                      onChange={(e) =>
                        updateField(
                          "worshipInfo",
                          "worshipName",
                          e.target.value
                        )
                      }
                    />
                  </div>
                  <div className={styles.inputGroup}>
                    <p>예배시간</p>
                    <input
                      type="text"
                      placeholder="예: 오전 11:00"
                      value={jubo.worshipInfo.worshipTime || ""}
                      onChange={(e) =>
                        updateField(
                          "worshipInfo",
                          "worshipTime",
                          e.target.value
                        )
                      }
                    />
                  </div>
                </div>
                <div className={styles.inputGroup}>
                  <p>예배일</p>
                  <input
                    type="date"
                    value={jubo.worshipInfo.serviceDate}
                    onChange={(e) =>
                      updateField("worshipInfo", "serviceDate", e.target.value)
                    }
                  />
                </div>
              </div>

              <div className={styles.section}>
                <h3>주요 성경 구절</h3>
                <div className={styles.inputGroup}>
                  <p>성경 구절</p>
                  <input
                    type="text"
                    placeholder="예: 시편 23:1"
                    value={jubo.worshipInfo.bibleVerse}
                    onChange={(e) =>
                      updateField("worshipInfo", "bibleVerse", e.target.value)
                    }
                  />
                </div>
              </div>
            </div>
          ) : null}

          {activeTab === "header" ? (
            <div className={styles.headerContent}>
              <div className={styles.section}>
                <h3>헤더 설정</h3>
              </div>
              <div className={styles.headerTab}>
                <button
                  className={`${styles.headerTabButton} ${
                    activeHeaderTab === "text" ? styles.activeHeaderTab : ""
                  }`}
                  onClick={() => setActiveHeaderTab("text")}
                >
                  텍스트 설정
                </button>
                <button
                  className={`${styles.headerTabButton} ${
                    activeHeaderTab === "design" ? styles.activeHeaderTab : ""
                  }`}
                  onClick={() => setActiveHeaderTab("design")}
                >
                  디자인 설정
                </button>
              </div>
              {activeHeaderTab === "text" ? (
                <div className={styles.headerTextSettings}>
                  <div className={styles.inputGroup}>
                    <h3>슬로건</h3>
                    <div className={styles.controlRow}>
                      <input
                        type="text"
                        className={styles.textInput}
                        placeholder="슬로건 입력"
                        value={jubo.designInfo.headerInfo.slogan}
                        onChange={(e) =>
                          setHeaderInfo("slogan", e.target.value)
                        }
                      />
                      <div className={styles.spacingControl}>
                        <button
                          onClick={() =>
                            updateFontSize(
                              "slogan",
                              Number(
                                jubo.designInfo.headerInfo.fontsize.sloganfont -
                                  1
                              )
                            )
                          }
                        >
                          <Minus className={styles.iconSmall} />
                        </button>
                        <input
                          type="number"
                          value={jubo.designInfo.headerInfo.fontsize.sloganfont}
                          onChange={(e) =>
                            updateFontSize("sloganfont", e.target.value)
                          }
                        />
                        <span>px</span>
                        <button
                          onClick={() =>
                            updateFontSize(
                              "slogan",
                              Number(
                                jubo.designInfo.headerInfo.fontsize.sloganfont +
                                  1
                              )
                            )
                          }
                        >
                          <Plus className={styles.iconSmall} />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className={styles.inputGroup}>
                    <h3>제목</h3>
                    <div className={styles.controlRow}>
                      <input
                        type="text"
                        className={styles.textInput}
                        placeholder="제목 입력"
                        value={jubo.designInfo.headerInfo.title}
                        onChange={(e) => setHeaderInfo("title", e.target.value)}
                      />
                      <div className={styles.spacingControl}>
                        <button
                          onClick={() =>
                            updateFontSize(
                              "title",
                              Number(
                                jubo.designInfo.headerInfo.fontsize.titlefont -
                                  1
                              )
                            )
                          }
                        >
                          <Minus className={styles.iconSmall} />
                        </button>
                        <input
                          type="number"
                          value={jubo.designInfo.headerInfo.fontsize.titlefont}
                          onChange={(e) =>
                            updateFontSize("titlefont", e.target.value)
                          }
                        />
                        <span>px</span>
                        <button
                          onClick={() =>
                            updateFontSize(
                              "title",
                              Number(
                                jubo.designInfo.headerInfo.fontsize.titlefont +
                                  1
                              )
                            )
                          }
                        >
                          <Plus className={styles.iconSmall} />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className={styles.inputGroup}>
                    <h3>부제목</h3>
                    <div className={styles.controlRow}>
                      <input
                        type="text"
                        className={styles.textInput}
                        placeholder="부제목 입력"
                        value={jubo.designInfo.headerInfo.subtitle}
                        onChange={(e) =>
                          setHeaderInfo("subtitle", e.target.value)
                        }
                      />
                      <div className={styles.spacingControl}>
                        <button
                          onClick={() =>
                            updateFontSize(
                              "subtitle",
                              Number(
                                jubo.designInfo.headerInfo.fontsize
                                  .subtitlefont - 1
                              )
                            )
                          }
                        >
                          <Minus className={styles.iconSmall} />
                        </button>
                        <input
                          type="number"
                          value={
                            jubo.designInfo.headerInfo.fontsize.subtitlefont
                          }
                          onChange={(e) =>
                            updateFontSize("subtitlefont", e.target.value)
                          }
                        />
                        <span>px</span>
                        <button
                          onClick={() =>
                            updateFontSize(
                              "subtitle",
                              Number(
                                jubo.designInfo.headerInfo.fontsize
                                  .subtitlefont + 1
                              )
                            )
                          }
                        >
                          <Plus className={styles.iconSmall} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ) : null}
              {activeHeaderTab === "design" ? (
                <div className={styles.headerDesignSettings}>
                  <p>디자인 설정 내용</p>
                </div>
              ) : null}
            </div>
          ) : null}

          {activeTab === "order" ? (
            <div className={styles.orderContent}>
              <div className={styles.section}>
                <h3>예배 순서</h3>
                <button
                  onClick={() => openModal("order")}
                  className={styles.addNewsButton}
                >
                  <Plus className={styles.iconSmall} />
                  <p>예배 추가</p>
                </button>
              </div>
              <div className={styles.orderWrapper}>
                <div className={styles.orderListContainer}>
                  {jubo.order.length === 0 ? (
                    <p>추가된 예배 순서가 없습니다.</p>
                  ) : (
                    <DndContext
                      sensors={sensors}
                      collisionDetection={closestCenter}
                      onDragEnd={handleDragEnd}
                    >
                      <SortableContext
                        items={jubo.order.map((order) => order.id)}
                        strategy={verticalListSortingStrategy}
                      >
                        {jubo.order.map((order, index) => (
                          <SortableOrderItem
                            key={order.id}
                            order={order}
                            index={index}
                            editOrder={editOrder}
                            deleteOrder={deleteOrder}
                          />
                        ))}
                      </SortableContext>
                    </DndContext>
                  )}
                </div>
              </div>
            </div>
          ) : null}

          {activeTab === "news" ? (
            <div className={styles.newsContent}>
              <div className={styles.section}>
                <h3>교회 소식</h3>
                <button
                  onClick={() => openModal("news")}
                  className={styles.addNewsButton}
                >
                  <Plus className={styles.iconSmall} />
                  <p>소식 추가</p>
                </button>
              </div>
              <div className={styles.newsWrapper}>
                <div className={styles.newsListContainer}>
                  {jubo.news.length === 0 ? (
                    <p>추가된 소식이 없습니다.</p>
                  ) : (
                    jubo.news.map((news) => {
                      const categoryClass =
                        news.category === "일반"
                          ? "normal"
                          : news.category === "공지사항"
                          ? "notice"
                          : news.category === "기도제목"
                          ? "prayer"
                          : news.category === "행사"
                          ? "event"
                          : news.category === "봉사/모집"
                          ? "volunteer"
                          : news.category === "교제/가족 소식"
                          ? "family"
                          : news.category === "교육/훈련"
                          ? "education"
                          : "";

                      const CategoryIcon =
                        news.category === "일반"
                          ? MessageSquare
                          : news.category === "공지사항"
                          ? Megaphone
                          : news.category === "기도제목"
                          ? HeartHandshake
                          : news.category === "행사"
                          ? Calendar
                          : news.category === "봉사/모집"
                          ? HandHelping
                          : news.category === "교제/가족 소식"
                          ? Users
                          : news.category === "교육/훈련"
                          ? NotebookPen
                          : null;

                      return (
                        <div key={news.id} className={styles.newsItem}>
                          {CategoryIcon && (
                            <CategoryIcon className={styles.icon} />
                          )}
                          <div className={styles.newsDetails}>
                            <div className={styles.newsHeader}>
                              <p className={styles[categoryClass]}>
                                {news.category}
                              </p>
                              {news.date && <p>{news.date}</p>}
                            </div>
                            <h3>{news.title}</h3>
                            <span>{news.content}</span>
                          </div>
                          <div className={styles.newsActions}>
                            <button
                              className={styles.editBtn}
                              onClick={() => editNews(news)}
                            >
                              <SquarePen className={styles.Actionicon} />
                            </button>
                            <button
                              className={styles.deleteBtn}
                              onClick={() => deleteNews(news)}
                            >
                              <Trash2 className={styles.Actionicon} />
                            </button>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            </div>
          ) : null}
        </div>

        <div className={styles.previewContainer}>
          <div className={styles.previewTitle}>
            <Eye className={styles.icon} />
            <h2>실시간 미리보기</h2>
          </div>
          <div className={styles.previewContent}>
            <p>{jubo.churchInfo.churchName}</p>
            <p>{jubo.designInfo.headerInfo.slogan}</p>
            <p>{jubo.designInfo.headerInfo.title}</p>
            <p>{jubo.designInfo.headerInfo.subtitle}</p>
            <span>
              현재 크기: {jubo.designInfo.headerInfo.fontsize.titlefont}px
            </span>{" "}
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className={styles.overlay} onClick={() => closeModal()}>
          <div
            className={styles.modalWrapper}
            onClick={(e) => e.stopPropagation()}
          >
            <AModal />
          </div>
        </div>
      )}
    </div>
  );
};

export default EditorPage;
