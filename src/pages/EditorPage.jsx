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
} from "lucide-react";
import styles from '../pages/EditorPage.module.css';
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const EditorPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("info");

  return (
    <div className={styles.editorpageContainer}>
      <div className={styles.editorpageHeader}>
        <div className={styles.headerSection}>
          <button className={`${styles.iconButton} ${styles.ghostButton}`} onClick={() => navigate(-1)}>
            <ArrowLeft className={styles.icon} />
            <span>돌아가기</span>
          </button>
        </div>

        <div className={`${styles.headerSection} ${styles.titleContainer}`}>
          <FileText className={styles.pageIcon} />
          <span className={styles.title}>공군예천교회</span>
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
          
        </div>

        <div className={styles.previewContainer}>
          <div className={styles.previewTitle}>
            <Eye className={styles.icon} />
            <h2>실시간 미리보기</h2>
          </div>
          <div className={styles.previewContent}>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditorPage;
