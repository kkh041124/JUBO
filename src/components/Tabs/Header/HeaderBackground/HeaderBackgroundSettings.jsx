// src/components/Editor/Tabs/Header/HeaderBackgroundSettings.jsx
import React, { useState } from "react";
import styles from "./HeaderBackgroundSettings.module.css";

// 방금 만든 3개 컴포넌트 불러오기
import BackgroundSolidSettings from "../Background/SolidSettings/BackgroundSolidSettings";
import BackgroundGradientSettings from "../Background/GradientSettings/BackgroundGradientSettings";
import BackgroundImageSettings from "../Background/ImageSettings/BackgroundImageSettings";

const HeaderBackgroundSettings = () => {
  const [activeBackType, setActiveBackType] = useState("solid");

  return (
    <div className={styles.inputGroup}>
      <h3>헤더 배경</h3>
      <div className={styles.headerBackgroundSection}>
        {/* 상단 탭 버튼 */}
        <div className={styles.headerDesignTab}>
          <button
            className={`${styles.headerTabButton} ${
              activeBackType === "solid" ? styles.activeDesignTab : ""
            }`}
            onClick={() => setActiveBackType("solid")}
          >
            단색
          </button>
          <button
            className={`${styles.headerTabButton} ${
              activeBackType === "gradient" ? styles.activeDesignTab : ""
            }`}
            onClick={() => setActiveBackType("gradient")}
          >
            그라데이션
          </button>
          <button
            className={`${styles.headerTabButton} ${
              activeBackType === "image" ? styles.activeDesignTab : ""
            }`}
            onClick={() => setActiveBackType("image")}
          >
            이미지
          </button>
        </div>

        {/* 조건부 렌더링 */}
        {activeBackType === "solid" && <BackgroundSolidSettings />}
        {activeBackType === "gradient" && <BackgroundGradientSettings />}
        {activeBackType === "image" && <BackgroundImageSettings />}
      </div>
    </div>
  );
};

export default HeaderBackgroundSettings;
