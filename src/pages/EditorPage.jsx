import {
  ArrowLeft, FileText, Eye, Download, Share2, Save, Calendar, Settings,
  Users, MessageSquare, Plus, Megaphone, HeartHandshake, HandHelping,
  NotebookPen, Trash2, SquarePen, CalendarDays
} from "lucide-react";
import styles from "../pages/EditorPage.module.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import useJuboStore from "../stores/useJuboStore";
import AModal from "../components/AModal/AModal.jsx";

const EditorPage = () => {
  const {
    jubo,
    
    updateField,
    deleteNews,
    editNews,
    
    isModalOpen,
    openModal,
    closeModal,
  } = useJuboStore();

  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("info");

  return (
    <div className={styles.editorpageContainer}>
      {/* 헤더 영역 */}
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

          {/* 탭 메뉴 */}
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

          {/* 1. 기본정보 탭 */}
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
                      onChange={(e) => updateField("churchInfo", "churchName", e.target.value)}
                    />
                  </div>
                  <div className={styles.inputGroup}>
                    <p>담임목사</p>
                    <input
                      type="text"
                      placeholder="예: 김철수 목사"
                      value={jubo.churchInfo.ministerName}
                      onChange={(e) => updateField("churchInfo", "ministerName", e.target.value)}
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
                      onChange={(e) => updateField("worshipInfo", "worshipName", e.target.value)}
                    />
                  </div>
                  <div className={styles.inputGroup}>
                    <p>예배시간</p>
                    <input
                      type="text"
                      placeholder="예: 오전 11:00"
                      // worshipTime 필드가 스토어 초기값에 없다면 추가 필요
                      value={jubo.worshipInfo.worshipTime || ""} 
                      onChange={(e) => updateField("worshipInfo", "worshipTime", e.target.value)}
                    />
                  </div>
                </div>
                <div className={styles.inputGroup}>
                  <p>예배일</p>
                  <input
                    type="date"
                    value={jubo.worshipInfo.serviceDate}
                    onChange={(e) => updateField("worshipInfo", "serviceDate", e.target.value)}
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
                    onChange={(e) => updateField("worshipInfo", "bibleVerse", e.target.value)}
                  />
                </div>
              </div>
            </div>
          ) : null}

          {/* 2. 헤더 설정 탭 */}
          {activeTab === "header" ? (
            <div className={styles.headerContent}>
              <p>헤더설정 탭 내용</p>
            </div>
          ) : null}

          {/* 3. 예배 순서 탭 */}
          {activeTab === "order" ? (
            <div className={styles.orderContent}>
              <div className={styles.section}>
                <h3>예배 순서</h3>
                <button onClick={() => openModal("order")} className={styles.addNewsButton}>
                  <Plus className={styles.iconSmall} />
                  <p>예배 추가</p>
                </button>
              </div>
              <div className={styles.newsWrapper}>
                <div className={styles.newsListContainer}>
                  {jubo.news.length === 0 ? (
                    <p>추가된 소식이 없습니다.</p>
                  ) : (
                    jubo.news.map((news) => {
                      const categoryClass =
                        news.category === "일반" ? "normal" :
                        news.category === "공지사항" ? "notice" :
                        news.category === "기도제목" ? "prayer" :
                        news.category === "행사" ? "event" :
                        news.category === "봉사/모집" ? "volunteer" :
                        news.category === "교제/가족 소식" ? "family" :
                        news.category === "교육/훈련" ? "education" : "";

                      const CategoryIcon =
                        news.category === "일반" ? MessageSquare :
                        news.category === "공지사항" ? Megaphone :
                        news.category === "기도제목" ? HeartHandshake :
                        news.category === "행사" ? Calendar :
                        news.category === "봉사/모집" ? HandHelping :
                        news.category === "교제/가족 소식" ? Users :
                        news.category === "교육/훈련" ? NotebookPen : null;

                      return (
                        <div key={news.id} className={styles.newsItem}>
                          {CategoryIcon && <CategoryIcon className={styles.icon} />}
                          <div className={styles.newsDetails}>
                            <div className={styles.newsHeader}>
                              <p className={styles[categoryClass]}>{news.category}</p>
                              {news.date && <p>{news.date}</p>}
                            </div>
                            <h3>{news.title}</h3>
                            <span>{news.content}</span>
                          </div>
                          <div className={styles.newsActions}>
                            <button className={styles.editBtn} onClick={() => editNews(news)}>
                              <SquarePen className={styles.Actionicon} />
                            </button>
                            <button className={styles.deleteBtn} onClick={() => deleteNews(news)}>
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

          {/* 4. 교회 소식 탭 */}
          {activeTab === "news" ? (
            <div className={styles.newsContent}>
              <div className={styles.section}>
                <h3>교회 소식</h3>
                <button onClick={() => openModal("news")} className={styles.addNewsButton}>
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
                        news.category === "일반" ? "normal" :
                        news.category === "공지사항" ? "notice" :
                        news.category === "기도제목" ? "prayer" :
                        news.category === "행사" ? "event" :
                        news.category === "봉사/모집" ? "volunteer" :
                        news.category === "교제/가족 소식" ? "family" :
                        news.category === "교육/훈련" ? "education" : "";

                      const CategoryIcon =
                        news.category === "일반" ? MessageSquare :
                        news.category === "공지사항" ? Megaphone :
                        news.category === "기도제목" ? HeartHandshake :
                        news.category === "행사" ? Calendar :
                        news.category === "봉사/모집" ? HandHelping :
                        news.category === "교제/가족 소식" ? Users :
                        news.category === "교육/훈련" ? NotebookPen : null;

                      return (
                        <div key={news.id} className={styles.newsItem}>
                          {CategoryIcon && <CategoryIcon className={styles.icon} />}
                          <div className={styles.newsDetails}>
                            <div className={styles.newsHeader}>
                              <p className={styles[categoryClass]}>{news.category}</p>
                              {news.date && <p>{news.date}</p>}
                            </div>
                            <h3>{news.title}</h3>
                            <span>{news.content}</span>
                          </div>
                          <div className={styles.newsActions}>
                            <button className={styles.editBtn} onClick={() => editNews(news)}>
                              <SquarePen className={styles.Actionicon} />
                            </button>
                            <button className={styles.deleteBtn} onClick={() => deleteNews(news)}>
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

        {/* 미리보기 섹션 */}
        <div className={styles.previewContainer}>
          <div className={styles.previewTitle}>
            <Eye className={styles.icon} />
            <h2>실시간 미리보기</h2>
          </div>
          <div className={styles.previewContent}>
            <p>{jubo.churchInfo.churchName}</p>
          </div>
        </div>
      </div>

      {/* 모달 */}
      {isModalOpen && (
        <div className={styles.overlay} onClick={() => closeModal()}>
          <div className={styles.modalWrapper} onClick={(e) => e.stopPropagation()}>
            <AModal />
          </div>
        </div>
      )}
    </div>
  );
};

export default EditorPage;
