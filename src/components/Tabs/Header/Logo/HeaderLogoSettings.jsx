import React, { useState } from "react";
import { Upload, X, Minus, Plus, Image } from "lucide-react";
import useJuboStore from "../../../../stores/useJuboStore";
import styles from "../../../../pages/EditorPage.module.css";

// 이미지 경로 확인 필요
import logo1 from "../../../../assets/logo1.svg";
import logo2 from "../../../../assets/logo2.svg";

const HeaderLogoSettings = () => {
  const { jubo, setLogo, setLogoPosition, setLogoSize } = useJuboStore();
  const [activeLogoTab, setActiveLogoTab] = useState("upload");

  const ReadImg = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setLogo(reader.result, file.name);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className={styles.inputGroup}>
      <h3>교회 로고</h3>
      <div className={styles.logoSection}>
        {jubo.designInfo.logoInfo.logo ? (
          <>
            <div className={styles.logoPreviewSection}>
              <div className={styles.logoPreviewWrapper}>
                <img
                  src={jubo.designInfo.logoInfo.logo}
                  alt="Uploaded Logo"
                  className={styles.logoPreview}
                />
                <button
                  className={styles.removeLogoButton}
                  onClick={() => setLogo(null, null)}
                >
                  <X className={styles.iconSmall} />
                </button>
              </div>
              <label className={styles.logoFileName}>
                <Upload className={styles.iconSmall} />
                <span>이미지 변경</span>
                <input
                  type="file"
                  onChange={ReadImg}
                  className={styles.hiddenInput}
                  accept="image/*"
                />
              </label>
            </div>
            <div className={styles.logoControls}>
              <div className={styles.logoPositionControl}>
                <h3>로고 위치</h3>
                <select
                  value={jubo.designInfo.logoInfo.logoPosition}
                  onChange={(e) => setLogoPosition(e.target.value)}
                >
                  <option value="left">좌측</option>
                  <option value="center">중앙</option>
                  <option value="right">우측</option>
                </select>
              </div>

              <div className={styles.logoSizeControl}>
                <h3>로고 크기</h3>
                <div className={styles.spacingControl}>
                  <button
                    onClick={() =>
                      setLogoSize(jubo.designInfo.logoInfo.logoSize - 1)
                    }
                  >
                    <Minus className={styles.iconSmall} />
                  </button>
                  <input
                    type="number"
                    value={jubo.designInfo.logoInfo.logoSize}
                    onChange={(e) => setLogoSize(Number(e.target.value))}
                  />
                  <button
                    onClick={() =>
                      setLogoSize(jubo.designInfo.logoInfo.logoSize + 1)
                    }
                  >
                    <Plus className={styles.iconSmall} />
                  </button>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className={styles.headerDesignTab}>
              <button
                className={`${styles.headerTabButton} ${
                  activeLogoTab === "upload" ? styles.activeDesignTab : ""
                }`}
                onClick={() => setActiveLogoTab("upload")}
              >
                업로드
              </button>
              <button
                className={`${styles.headerTabButton} ${
                  activeLogoTab === "sample" ? styles.activeDesignTab : ""
                }`}
                onClick={() => setActiveLogoTab("sample")}
              >
                샘플
              </button>
            </div>

            {activeLogoTab === "upload" && (
              <div className={styles.uploadSection}>
                <label className={styles.uploadButton}>
                  <input
                    type="file"
                    onChange={ReadImg}
                    className={styles.hiddenInput}
                    accept="image/*"
                  />
                  <div className={styles.uploadContent}>
                    <Image className={styles.iconSmall} />
                    <span className={styles.primaryText}>
                      로고 이미지 업로드
                    </span>
                    <span className={styles.secondaryText}>
                      클릭하거나 드래그하여 업로드
                    </span>
                  </div>
                </label>
              </div>
            )}

            {activeLogoTab === "sample" && (
              <div className={styles.sampleSection}>
                <p className={styles.sampleTitle}>샘플 이미지를 선택하세요</p>
                <div className={styles.sampleContainer}>
                  <div
                    className={`${styles.sampleWrapper} ${
                      jubo.designInfo.logoInfo.logo === logo1
                        ? styles.selected
                        : ""
                    }`}
                    onClick={() => setLogo(logo1, "Sample 1")}
                  >
                    <img
                      src={logo1}
                      alt="Sample 1"
                      className={styles.sampleImage}
                    />
                  </div>
                  <div
                    className={`${styles.sampleWrapper} ${
                      jubo.designInfo.logoInfo.logo === logo2
                        ? styles.selected
                        : ""
                    }`}
                    onClick={() => setLogo(logo2, "Sample 2")}
                  >
                    <img
                      src={logo2}
                      alt="Sample 2"
                      className={styles.sampleImage}
                    />
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default HeaderLogoSettings;
