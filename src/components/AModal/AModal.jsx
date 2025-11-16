import { useEffect } from "react";
import { X } from "lucide-react";
import styles from "./AModal.module.css";
import useJuboStore from "../../stores/useJuboStore";

const AModal = () => {
  const {
    category,
    setCategory,
    date,
    setDate,
    title,
    setTitle,
    content,
    setContent,
    addNews,
    closeModal,
    closeNews,
  } = useJuboStore();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        closeModal();
      } else if (e.key === "Enter") {
        addNews();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [addNews, closeModal]);

  return (
    <div className={styles.modalContainer}>
      <div className={styles.modalContent}>
        <h2>새 교회 소식 추가</h2>
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
        <button onClick={addNews}>추가</button>
        <button onClick={closeNews}>취소</button>
      </div>
    </div>
  );
};

export default AModal;
