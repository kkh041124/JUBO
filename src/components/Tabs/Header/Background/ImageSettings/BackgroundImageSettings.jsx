import React, { useState } from "react";
import { Upload, X, Image } from "lucide-react";
import useJuboStore from "../../../../../stores/useJuboStore";
import styles from "./BackgroundImageSettings.module.css";

import img1 from "../../../../../assets/sampleImg1.jpg";
import img2 from "../../../../../assets/sampleImg2.jpg";
import img3 from "../../../../../assets/sampleImg3.jpg";
import img4 from "../../../../../assets/sampleImg4.jpg";

const BackgroundImageSettings = () => {
  const { jubo, setBackGroundImage, setImgOpacity } = useJuboStore();
  const [activeBackImgTab, setActiveBackImgTab] = useState("upload");
  const { backgroundImage, imgopacity } = jubo.designInfo.backgroundInfo;

  const ReadBgImg = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setBackGroundImage(reader.result, file.name);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className={styles.imageUploadSection}>
      <div className={styles.imageSection}>
        {backgroundImage ? (
          <>
            <div className={styles.imgPreviewSection}>
              <div className={styles.imgPreviewWrapper}>
                <img
                  src={backgroundImage}
                  alt="Uploaded image"
                  className={styles.imgPreview}
                />
                <button
                  className={styles.removeImgButton}
                  onClick={() => setBackGroundImage(null, null)}
                >
                  <X className={styles.iconSmall} />
                </button>
              </div>
              <label className={styles.imgFileName}>
                <Upload className={styles.iconSmall} />
                <span>이미지 변경</span>
                <input
                  type="file"
                  onChange={ReadBgImg}
                  className={styles.hiddenInput}
                  accept="image/*"
                />
              </label>
            </div>
            <div className={styles.imgControls}>
              <div className={styles.imgOpacityControl}>
                <h3>투명도 크기</h3>
                <div className={styles.spacingControl}>
                  <span>{imgopacity}%</span>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={imgopacity}
                    onChange={(e) => setImgOpacity(e.target.value)}
                    style={{
                      backgroundSize: `${imgopacity}% 100%`,
                    }}
                  />
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className={styles.headerDesignTab}>
              <button
                className={`${styles.headerTabButton} ${
                  activeBackImgTab === "upload" ? styles.activeDesignTab : ""
                }`}
                onClick={() => setActiveBackImgTab("upload")}
              >
                업로드
              </button>
              <button
                className={`${styles.headerTabButton} ${
                  activeBackImgTab === "sample" ? styles.activeDesignTab : ""
                }`}
                onClick={() => setActiveBackImgTab("sample")}
              >
                샘플
              </button>
            </div>

            {activeBackImgTab === "upload" && (
              <div className={styles.uploadSection}>
                <label className={styles.uploadButton}>
                  <input
                    type="file"
                    onChange={ReadBgImg}
                    className={styles.hiddenInput}
                    accept="image/*"
                  />
                  <div className={styles.uploadContent}>
                    <Image className={styles.iconSmall} />
                    <span className={styles.primaryText}>
                      배경 이미지 업로드
                    </span>
                    <span className={styles.secondaryText}>
                      클릭하거나 드래그하여 업로드
                    </span>
                  </div>
                </label>
              </div>
            )}

            {activeBackImgTab === "sample" && (
              <div className={styles.sampleSection}>
                <p className={styles.sampleTitle}>샘플 이미지를 선택하세요</p>
                <div className={styles.headerSampleGrid}>
                  {[
                    { img: img1, name: "Sample 1" },
                    { img: img2, name: "Sample 2" },
                    { img: img3, name: "Sample 3" },
                    { img: img4, name: "Sample 4" },
                  ].map((sample) => (
                    <div
                      key={sample.name}
                      className={`${styles.headerSampleItem} ${
                        backgroundImage === sample.img ? styles.selected : ""
                      }`}
                      onClick={() =>
                        setBackGroundImage(sample.img, sample.name)
                      }
                    >
                      <img
                        src={sample.img}
                        alt={sample.name}
                        className={styles.headerSampleImage}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default BackgroundImageSettings;
