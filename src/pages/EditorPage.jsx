import {
  ArrowLeft,
  FileText,
  Eye,
  Download,
  Share2,
  Save,
  Calendar,
  Settings,
  FolderOpen,
  Users,
  MessageSquare,
} from "lucide-react";
import styles from "../pages/EditorPage.module.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import useJuboStore from "../stores/useJuboStore";
import AModal from "../components/AModal/AModal.jsx";
import BasicInfoTab from "../components/Tabs/BasicInfoTab/BasicInfoTab.jsx";
import OrderTab from "../components/Tabs/OrderTab/OrderTab.jsx";
import NewsTab from "../components/Tabs/NewsTab/NewsTab.jsx";
import HeaderSettingsTab from "../components/Tabs/Header/HeaderSettingTab.jsx";
import BulletinTemplate from "../components/Templates/BulletinTemplate/BulletinTemplate.jsx";
import MorderTemplate from "../components/Templates/MorderTemplate/MorderTemplate.jsx";

const EditorPage = () => {
  const {
    jubo,
    isModalOpen,
    openModal,
    closeModal,
    setIcon,
    selectedTemplate,
    setSelectedTemplate,
    saveToLocalStorage,
    loadFromLocalStorage,
  } = useJuboStore();

  const navigate = useNavigate();

  const ReadIconImg = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = () => {
      setIcon(reader.result, file.name);
    };

    reader.readAsDataURL(file);
  };

  const [activeTab, setActiveTab] = useState("info");

  useEffect(() => {
    if (!selectedTemplate) {
      setSelectedTemplate("📋 기본 템플릿");
    }
    // 페이지 로드 시 저장된 데이터 자동 로드 (선택사항)
    // loadFromLocalStorage();
  }, [selectedTemplate, setSelectedTemplate]);
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
          <button
            className={`${styles.iconButton} ${styles.lightButton}`}
            onClick={() => loadFromLocalStorage()}
          >
            <FolderOpen className={styles.icon} />
            <span>불러오기</span>
          </button>
          <button
            className={`${styles.iconButton} ${styles.lightButton}`}
            onClick={() => saveToLocalStorage()}
          >
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

          <div className={styles.tabContent}>
            {activeTab === "info" ? <BasicInfoTab /> : null}

            {activeTab === "header" ? (
              <HeaderSettingsTab ReadIconImg={ReadIconImg} />
            ) : null}

            {activeTab === "order" ? <OrderTab /> : null}

            {activeTab === "news" ? <NewsTab /> : null}
          </div>
        </div>

        <div className={styles.previewContainer}>
          <div className={styles.previewTitle}>
            <Eye className={styles.icon} />
            <h2>실시간 미리보기</h2>
          </div>
          <div className={styles.previewContent}>
            {selectedTemplate === "📋 기본 템플릿" || !selectedTemplate ? (
              <BulletinTemplate />
            ) : selectedTemplate === "✨ 모던 템플릿" ? (
              <MorderTemplate />
            ) : (
              <BulletinTemplate />
            )}
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
