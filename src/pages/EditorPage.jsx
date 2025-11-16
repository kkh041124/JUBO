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
  CalendarDays,
  HandHelping,
  NotebookPen,
  Trash2,
  SquarePen,
} from "lucide-react";
import styles from "../pages/EditorPage.module.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import useJuboStore from "../stores/useJuboStore";
import AModal from "../components/AModal/AModal.jsx";

const EditorPage = () => {
  const {
    juboList,
    churchName,
    ministerName,
    worshipName,
    serviceDate,
    bibleVerse,
    setChurchName,
    setMinisterName,
    setWorshipName,
    setServiceDate,
    setBibleVerse,
    isModalOpen,
    openModal,
    closeModal,
    closeNews,
    category,
    date,
    title,
    content,
    deleteNews,
    editNews,
  } = useJuboStore();

  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("info");

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
          <span className={styles.title}>{churchName}</span>
        </div>

        <div className={`${styles.headerSection} ${styles.buttonGroup}`}>
          <div className={styles.saveStatus}>
            <Save className={styles.iconSmall} />
            <span>자동 저장됨</span>
          </div>
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
                      value={churchName}
                      onChange={(e) => setChurchName(e.target.value)}
                    />
                  </div>
                  <div className={styles.inputGroup}>
                    <p>담임목사</p>
                    <input
                      type="text"
                      placeholder="예: 김철수 목사"
                      value={ministerName}
                      onChange={(e) => setMinisterName(e.target.value)}
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
                      value={worshipName}
                      onChange={(e) => setWorshipName(e.target.value)}
                    />
                  </div>
                  <div className={styles.inputGroup}>
                    <p>예배시간</p>
                    <input type="text" placeholder="예: 오전 11:00" />
                  </div>
                </div>
                <div className={styles.inputGroup}>
                  <p>예배일</p>
                  <input type="date" />
                </div>
              </div>

              <div className={styles.section}>
                <h3>주요 성경 구절</h3>
                <div className={styles.inputGroup}>
                  <p>성경 구절</p>
                  <input type="text" placeholder="예: 시편 23:1" />
                </div>
              </div>
            </div>
          ) : null}
          {activeTab === "header" ? (
            <div className={styles.headerContent}>
              <p>헤더설정 탭 내용</p>
            </div>
          ) : null}
          {activeTab === "order" ? (
            <div className={styles.orderContent}>
              <p>예배순서 탭 내용</p>
            </div>
          ) : null}
          {activeTab === "news" ? (
            <div className={styles.newsContent}>
              <div className={styles.section}>
                <h3>교회 소식</h3>
                <button
                  onClick={() => openModal()}
                  className={styles.addNewsButton}
                >
                  <Plus className={styles.iconSmall} />
                  <p>소식 추가</p>
                </button>
              </div>
              <div className={styles.newsWrapper}>
                <div className={styles.newsListContainer}>
                  {juboList.length === 0 ? (
                    <p>추가된 소식이 없습니다.</p>
                  ) : (
                    juboList.map((news) => {
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
            <p>{churchName}</p>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <div className={styles.overlay} onClick={() => closeNews()}>
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
