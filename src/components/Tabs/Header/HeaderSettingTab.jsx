// src/components/Editor/Tabs/HeaderSettingsTab.jsx
import styles from "./HeaderSettingTab.module.css";
import HeaderTextSettings from "./HeaderText/HeaderTextSetting";
import HeaderLogoSettings from "./Logo/HeaderLogoSettings";
import HeaderIconSettings from "./Icon/HeaderIconSettings";
import HeaderBackgroundSettings from "./HeaderBackground/HeaderBackgroundSettings";
import { useState } from "react";
import useJuboStore from "../../../stores/useJuboStore";

const HeaderSettingsTab = ({ ReadIconImg }) => {
  const [activeHeaderTab, setActiveHeaderTab] = useState("text");
  const { selectedTemplate } = useJuboStore();

  const getTemplateType = () => {
    if (selectedTemplate === "📋 기본 템플릿" || selectedTemplate === "BulletinTemplate") {
      return "BulletinTemplate";
    } else if (selectedTemplate === "✨ 모던 템플릿" || selectedTemplate === "MorderTemplate") {
      return "MorderTemplate";
    }
    return "";
  };

  const templateType = getTemplateType();

  const getTabButtons = () => {
    if (templateType === "BulletinTemplate") {
      return (
        <>
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
              activeHeaderTab === "header" ? styles.activeHeaderTab : ""
            }`}
            onClick={() => setActiveHeaderTab("header")}
          >
            헤더 설정
          </button>
          <button
            className={`${styles.headerTabButton} ${
              activeHeaderTab === "logo" ? styles.activeHeaderTab : ""
            }`}
            onClick={() => setActiveHeaderTab("logo")}
          >
            로고 설정
          </button>
        </>
      );
    } else if (templateType === "MorderTemplate") {
      return (
        <>
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
        </>
      );
    } else {
      return (
        <>
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
        </>
      );
    }
  };

  const getTabContent = () => {
    if (templateType === "BulletinTemplate") {
      switch (activeHeaderTab) {
        case "text":
          return <HeaderTextSettings />;
        case "header":
          return <HeaderBackgroundSettings />;
        case "logo":
          return (
            <div className={styles.headerDesignSettings}>
              <HeaderLogoSettings />
              <HeaderIconSettings ReadIconImg={ReadIconImg} />
            </div>
          );
        default:
          return <HeaderTextSettings />;
      }
    } else if (templateType === "MorderTemplate") {
      return activeHeaderTab === "text" ? (
        <HeaderTextSettings />
      ) : (
        <HeaderBackgroundSettings />
      );
    } else {
      return activeHeaderTab === "text" ? (
        <HeaderTextSettings />
      ) : (
        <div className={styles.headerDesignSettings}>
          <HeaderLogoSettings />
          <HeaderIconSettings ReadIconImg={ReadIconImg} />
          <HeaderBackgroundSettings />
        </div>
      );
    }
  };

  return (
    <div className={styles.headerContent}>
      <div className={styles.section}>
        <h3>헤더 설정</h3>
      </div>

      {/* 탭 전환 버튼 */}
      <div className={styles.headerTab}>
        {getTabButtons()}
      </div>

      {/* 컨텐츠 영역 */}
      {getTabContent()}
    </div>
  );
};

export default HeaderSettingsTab;
