import { Minus, Plus } from "lucide-react";
import useJuboStore from "../../../../stores/useJuboStore";
import styles from "./HeaderTextSetting.module.css";

const HeaderTextSettings = () => {
  const { jubo, setHeaderInfo, updateFontSize } = useJuboStore();

  // 반복되는 UI를 렌더링하는 헬퍼 함수
  const renderControl = (label, key, fontKey) => (
    <div className={styles.inputGroup}>
      <h3>{label}</h3>
      <div className={styles.controlRow}>
        <input
          type="text"
          className={styles.textInput}
          placeholder={`${label} 입력`}
          value={jubo.designInfo.textInfo[key]}
          onChange={(e) => setHeaderInfo(key, e.target.value)}
        />
        <div className={styles.spacingControl}>
          <button
            onClick={() =>
              updateFontSize(
                key,
                Number(jubo.designInfo.textInfo.fontsize[fontKey] - 1)
              )
            }
          >
            <Minus className={styles.iconSmall} />
          </button>
          <input
            type="number"
            value={jubo.designInfo.textInfo.fontsize[fontKey]}
            onChange={(e) => updateFontSize(fontKey, e.target.value)}
          />
          <span>px</span>
          <button
            onClick={() =>
              updateFontSize(
                key,
                Number(jubo.designInfo.textInfo.fontsize[fontKey] + 1)
              )
            }
          >
            <Plus className={styles.iconSmall} />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className={styles.headerTextSettings}>
      {renderControl("슬로건", "slogan", "sloganfont")}
      {renderControl("제목", "title", "titlefont")}
      {renderControl("부제목", "subtitle", "subtitlefont")}
    </div>
  );
};

export default HeaderTextSettings;
