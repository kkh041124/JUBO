import React from "react";
import {
  MoveLeft, MoveRight, MoveUp, MoveDown,
  MoveUpLeft, MoveUpRight, MoveDownLeft, MoveDownRight,
} from "lucide-react";
import useJuboStore from "../../../../../stores/useJuboStore";
import styles from "../../../../../pages/EditorPage.module.css";

const POSITION_MAP = {
  "to left": { label: "좌측", icon: MoveLeft },
  "to right": { label: "우측", icon: MoveRight },
  "to top": { label: "상단", icon: MoveUp },
  "to bottom": { label: "하단", icon: MoveDown },
  "to left top": { label: "좌상단", icon: MoveUpLeft },
  "to right top": { label: "우상단", icon: MoveUpRight },
  "to left bottom": { label: "좌하단", icon: MoveDownLeft },
  "to right bottom": { label: "우하단", icon: MoveDownRight },
};

const BackgroundGradientSettings = () => {
  const {
    jubo,
    setGradientColorFirst,
    setGradientColorSecond,
    setGradientDirection,
  } = useJuboStore();

  const { gradientcolorfirst, gradientcolorsecond, gradientdirection } =
    jubo.designInfo.backgroundInfo;
  
  const SelectedIcon = POSITION_MAP[gradientdirection]?.icon;

  return (
    <div className={styles.gradientPicker}>
      <div className={styles.gradientColorItem}>
        <input
          type="color"
          value={gradientcolorfirst}
          onChange={(e) => setGradientColorFirst(e.target.value)}
        />
        <div>
          <p>시작 색상</p>
          <span>그라데이션의 시작 지점 색상입니다.</span>
        </div>
      </div>

      <div className={styles.gradientColorItem}>
        <input
          type="color"
          value={gradientcolorsecond}
          onChange={(e) => setGradientColorSecond(e.target.value)}
        />
        <div>
          <p>끝 색상</p>
          <span>그라데이션이 끝나는 지점의 색상입니다.</span>
        </div>
      </div>

      <div className={styles.directionSelector}>
        <p>방향</p>
        <div className={styles.selectWrapper}>
          <div className={styles.iconBox}>
            {SelectedIcon ? (
              <SelectedIcon size={18} />
            ) : (
              <div className={styles.noIcon} />
            )}
          </div>
          <select
            value={gradientdirection}
            onChange={(e) => setGradientDirection(e.target.value)}
          >
            {Object.entries(POSITION_MAP).map(([value, { label }]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default BackgroundGradientSettings;
