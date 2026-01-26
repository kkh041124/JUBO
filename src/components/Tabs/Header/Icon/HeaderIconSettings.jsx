import React, { useState } from "react";
import { Upload, X, Minus, Plus } from "lucide-react";
import useJuboStore from "../../../../stores/useJuboStore";
import styles from "./HeaderIconSettings.module.css";

const HeaderIconSettings = ({ ReadIconImg }) => {
  const { jubo, setIcon, setIconSize } = useJuboStore();

  return (
    <div className={styles.inputGroup}>
      <h3>헤더 아이콘</h3>
      <div className={styles.iconSection}>
        {jubo.designInfo.iconInfo.icon ? (
          <>
            <div className={styles.iconPreviewSection}>
              <div className={styles.iconPreviewWrapper}>
                <img
                  src={jubo.designInfo.iconInfo.icon}
                  alt="Uploaded Icon"
                  className={styles.iconPreview}
                />
                <button
                  className={styles.removeIconButton}
                  onClick={() => setIcon(null, null)}
                >
                  <X className={styles.iconSmall} />
                </button>
              </div>
              <label className={styles.iconFileName}>
                <Upload className={styles.iconSmall} />
                <span>이미지 변경</span>
                <input
                  type="file"
                  onChange={ReadIconImg}
                  className={styles.hiddenInput}
                  accept="image/*"
                />
              </label>
            </div>
            <div className={styles.iconControls}>
              <div className={styles.iconSizeControl}>
                <h3>아이콘 크기</h3>
                <div className={styles.spacingControl}>
                  <button
                    onClick={() =>
                      setIconSize(jubo.designInfo.iconInfo.iconSize - 5)
                    }
                  >
                    <Minus className={styles.iconSmall} />
                  </button>
                  <input
                    type="number"
                    value={jubo.designInfo.iconInfo.iconSize}
                    onChange={(e) => setIconSize(Number(e.target.value))}
                  />
                  <span>px</span>
                  <button
                    onClick={() =>
                      setIconSize(jubo.designInfo.iconInfo.iconSize + 5)
                    }
                  >
                    <Plus className={styles.iconSmall} />
                  </button>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className={styles.uploadSection}>
            <label className={styles.uploadButton}>
              <input
                type="file"
                onChange={ReadIconImg}
                className={styles.hiddenInput}
                accept="image/*"
              />
              <div className={styles.uploadContent}>
                <Upload className={styles.iconSmall} />
                <span className={styles.primaryText}>헤더 아이콘 업로드</span>
                <span className={styles.secondaryText}>
                  클릭하거나 드래그하여 업로드
                </span>
              </div>
            </label>
          </div>
        )}
      </div>
    </div>
  );
};

export default HeaderIconSettings;
