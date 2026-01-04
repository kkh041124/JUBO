// src/components/Editor/Tabs/HeaderSettingsTab.jsx
import React, { useState } from "react";
import styles from "../../../pages/EditorPage.module.css";
import HeaderTextSettings from "./HeaderText/HeaderTextSetting";
import HeaderLogoSettings from "./Logo/HeaderLogoSettings";
import HeaderBackgroundSettings from "./HeaderBackground/HeaderBackgroundSettings";

const HeaderSettingsTab = () => {
  const [activeHeaderTab, setActiveHeaderTab] = useState("text");

  return (
    <div className={styles.headerContent}>
      <div className={styles.section}>
        <h3>헤더 설정</h3>
      </div>
      
      {/* 탭 전환 버튼 */}
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

      {/* 컨텐츠 영역 */}
      {activeHeaderTab === "text" ? (
        <HeaderTextSettings />
      ) : (
        <div className={styles.headerDesignSettings}>
          <HeaderLogoSettings />
          <HeaderBackgroundSettings />
        </div>
      )}
    </div>
  );
};

export default HeaderSettingsTab;
