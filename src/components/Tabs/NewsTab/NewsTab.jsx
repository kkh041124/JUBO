import useJuboStore from "../../../stores/useJuboStore";
import styles from "./NewsTab.module.css";
import {
  Plus,
  MessageSquare,
  Megaphone,
  HeartHandshake,
  Calendar,
  HandHelping,
  Users,
  NotebookPen,
  SquarePen,
  Trash2,
} from "lucide-react";
const CATEGORY_STYLES = {
  "일반": "normal",
  "공지사항": "notice",
  "기도제목": "prayer",
  "행사": "event",
  "봉사/모집": "volunteer",
  "교제/가족 소식": "family",
  "교육/훈련": "education",
};

const CATEGORY_ICONS = {
  "일반": MessageSquare,
  "공지사항": Megaphone,
  "기도제목": HeartHandshake,
  "행사": Calendar,
  "봉사/모집": HandHelping,
  "교제/가족 소식": Users,
  "교육/훈련": NotebookPen,
};
const NewsTab = () => {
  const { jubo, editNews, deleteNews, openModal } = useJuboStore();
  return (
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
                  CATEGORY_STYLES[news.category] || "normal";
                const CategoryIcon =
                  CATEGORY_ICONS[news.category] || MessageSquare;
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
  );
};

export default NewsTab;
