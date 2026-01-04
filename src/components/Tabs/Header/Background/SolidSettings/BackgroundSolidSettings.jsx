import React from "react";
import useJuboStore from "../../../../../stores/useJuboStore";
import styles from "../../../../../pages/EditorPage.module.css";

const BackgroundSolidSettings = () => {
  const { jubo, setBackGroundColor } = useJuboStore();
  const bgColor = jubo.designInfo.backgroundInfo.backgroundColor;

  return (
    <div className={styles.solidColorPicker}>
      <input
        type="color"
        value={bgColor}
        onChange={(e) => setBackGroundColor(e.target.value)}
      />
      <div>
        <p>배경 색상</p>
        {bgColor ? (
          <span>{bgColor}</span>
        ) : (
          <span>헤더의 배경 색상을 선택합니다.</span>
        )}
      </div>
    </div>
  );
};

export default BackgroundSolidSettings;