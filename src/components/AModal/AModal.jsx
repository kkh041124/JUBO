import { useEffect } from "react";
import { X,Layers,Palette, Type } from "lucide-react";
import styles from "./AModal.module.css";
import useJuboStore from "../../stores/useJuboStore";
import { useState } from "react";

const AModal = () => {
  const {
    modalTab,
    category, setCategory,
    date, setDate,
    title, setTitle,
    content, setContent,
    saveNews,
    closeModal,
    editingId,

    // 예배 순서 관련 State
    ordercategory, setOrderCategory,
    orderTitle, setOrderTitle,
    orderContent, setOrderContent,saveOrder,
  } = useJuboStore();
  const [activeTab, setActiveTab] = useState("info");
  useEffect(() => {
    if (modalTab === "order") {
       // '직접 입력'이 아닐 경우에만 자동 완성
       if(ordercategory !== "직접 입력") {
         setOrderTitle(ordercategory);
       }
    }
  }, [ordercategory, modalTab, setOrderTitle]);


  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        closeModal();
      } else if (e.key === "Enter") {
        if (e.target.tagName !== "TEXTAREA") {
          if (modalTab === "news") saveNews();
          if (modalTab === "order") saveOrder();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [saveNews, saveOrder, closeModal, modalTab]);

  return (
    <>
      {/* ──────────────── 뉴스 탭 ──────────────── */}
      {modalTab === "news" && (
        <div className={styles.modalContainer}>
          <div className={styles.modalContent}>
            <h2>{editingId ? "소식 수정" : "새 교회 소식 추가"}</h2>
            <button onClick={closeModal}>
              <X className={styles.smallIcon} />
            </button>
          </div>

          <div className={styles.formContainer}>
            <div className={styles.inputGroup}>
              <h3>카테고리</h3>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option>일반</option>
                <option>공지사항</option>
                <option>기도제목</option>
                <option>행사</option>
                <option>봉사/모집</option>
                <option>교제/가족 소식</option>
                <option>교육/훈련</option>
              </select>
            </div>

            <div className={styles.inputGroup}>
              <h3>날짜(선택)</h3>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
          </div>

          <div className={styles.inputContainer}>
            <h3>제목</h3>
            <input
              type="text"
              placeholder="소식을 입력하세요."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className={styles.textareaContainer}>
            <h3>내용</h3>
            <textarea
              placeholder="소식 내용을 입력하세요."
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>

          <div className={styles.buttonGroup}>
            <button onClick={saveNews}>
              {editingId ? "수정 완료" : "추가하기"}
            </button>
            <button onClick={closeModal}>취소</button>
          </div>
        </div>
      )}

      {/* ──────────────── 예배 순서 탭 ──────────────── */}
      {modalTab === "order" && (
        <div className={styles.modalContainer}>
          <div className={styles.modalContent}>
            <h2>{editingId ? "예배 수정" : "예배 순서 추가"}</h2>
            <button onClick={closeModal}>
              <X className={styles.smallIcon} />
            </button>
          </div>

          <div className={styles.formContainer}>
            <div className={styles.inputGroup}>
              <h3>카테고리</h3>
              <select
                value={ordercategory}
                onChange={(e) => setOrderCategory(e.target.value)}
              >
                <option>예배로 부름 / 인도</option>
                <option>찬송</option>
                <option>신앙고백</option>
                <option>기도</option>
                <option>성경봉독</option>
                <option>찬양대 / 특송</option>
                <option>설교</option>
                <option>헌금 / 봉헌</option>
                <option>광고</option>
                <option>축도</option>
                <option>직접 입력</option>
              </select>
            </div>
          </div>

          <div className={styles.inputContainer}>
            <h3>순서명</h3>
            <input
              type="text"
              placeholder="순서명을 입력하세요"
              value={orderTitle}
              onChange={(e) => setOrderTitle(e.target.value)}
            />
          </div>

          <div className={styles.textareaContainer}>
            <h3>내용</h3>
            <textarea
              placeholder="내용을 입력하세요. (예: 1장, OOO 장로)"
              value={orderContent}
              onChange={(e) => setOrderContent(e.target.value)}
            />
          </div>

          <div className={styles.buttonGroup}>
            <button onClick={saveOrder}>
              {editingId ? "수정 완료" : "추가하기"}
            </button>
            <button onClick={closeModal}>취소</button>
          </div>
        </div>
      )}
      {/* ──────────────── 디자인 탭 ──────────────── */}
      {modalTab === "design" && (
      <div className={styles.modalContainer}>
        <div className={styles.modalContent}>
          <div className={styles.designHeader}>
            <h2>디자인 설정</h2>
            <button onClick={closeModal} className={styles.ghostButton}> 
              <X className={styles.smallIcon} />
            </button>
          </div>
          <span>주보의 템플릿, 색상, 폰트 등을 설정할 수 있습니다.</span>
        </div>
        <div className={styles.designContent}>
          <div className={styles.tabList}>
            <button
              className={`${styles.tabButton} ${activeTab === "template" ? styles.activeTab : ""}`}
              onClick={() => setActiveTab("template")}
            >
              <Layers className={styles.mediumIcon} />
              템플릿
            </button>

            <button
              className={`${styles.tabButton} ${activeTab === "design" ? styles.activeTab : ""}`}
              onClick={() => setActiveTab("design")}
            >
              <Palette className={styles.mediumIcon} />
              색상
            </button>

            <button
              className={`${styles.tabButton} ${activeTab === "font" ? styles.activeTab : ""}`}
              onClick={() => setActiveTab("font")}
            >
              <Type className={styles.mediumIcon} />
              폰트
            </button>
          </div>
          <div className={styles.tabPanel}>
            {activeTab === "template" && (<div>템플릿 목록이 여기에 표시됩니다.</div>)}
            {activeTab === "design" && (<div>색상 팔레트 설정 화면입니다.</div>)}
            {activeTab === "font" && (<div>폰트 크기 및 서체 설정 화면입니다.</div>)}
          </div>
        </div>
        <div className={styles.buttonGroup}>
          <button onClick={closeModal}>닫기</button>
        </div>
      </div>
      )}
    </>
  );
};

export default AModal;
