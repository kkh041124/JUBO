import useJuboStore from "../../../../stores/useJuboStore";
import styles from "./HeaderTextSetting.module.css";

const HeaderTextSettings = () => {
  const { jubo, setHeaderInfo, selectedTemplate } = useJuboStore();

  const getTemplateType = () => {
    if (selectedTemplate === "📋 기본 템플릿" || selectedTemplate === "BulletinTemplate") {
      return "BulletinTemplate";
    } else if (selectedTemplate === "✨ 모던 템플릿" || selectedTemplate === "ModernTemplate") {
      return "ModernTemplate";
    }
    return "";
  };

  const templateType = getTemplateType();

  const renderControl = (label, key) => (
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
      </div>
    </div>
  );

  return (
    <div className={styles.headerTextSettings}>
      {templateType === "BulletinTemplate" && (
        <>
          {renderControl("슬로건", "slogan")}
          {renderControl("제목", "title")}
          {renderControl("부제목", "subtitle")}
        </>
      )}
      {templateType === "ModernTemplate" && (
        <>
          {renderControl("비전", "vision")}
          {renderControl("모토", "motto")}
          {renderControl("헤더 타이틀", "headerTitle")}
        </>
      )}
      {(!templateType || templateType === "") && (
        <>
          {renderControl("슬로건", "slogan")}
          {renderControl("제목", "title")}
          {renderControl("부제목", "subtitle")}
          {renderControl("비전", "vision")}
          {renderControl("모토", "motto")}
          {renderControl("헤더 타이틀", "headerTitle")}
        </>
      )}
    </div>
  );
};

export default HeaderTextSettings;
