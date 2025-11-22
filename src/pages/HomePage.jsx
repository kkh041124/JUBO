import { FileText, Palette, Download, Share2 } from "lucide-react";
import styles from "./HomePage.module.css";
import { useNavigate } from "react-router-dom";
const features = [
  {
    icon: FileText,
    title: "다양한 템플릿",
    description: "전통형, 모던형, 미니멀형 등 다양한 주보 템플릿을 선택",
  },
  {
    icon: Palette,
    title: "커스텀마이징",
    description: "색상, 폰트, 배경 이미지 등을 자유롭게 변경",
  },
  {
    icon: Download,
    title: "PDF/이미지 저장",
    description: "PDF 다운로드 및 이미지 형식으로 저장 가능",
  },
  {
    icon: Share2,
    title: "SNS 공유",
    description: "QR코드 생성 및 소셜미디어 공유 기능",
  },
];

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.homepageContainer}>
      <div className={styles.homepageHeader}>
        <FileText color="white" className={styles.Icon} />
        <div className={styles.homepageTitle}>
          <h1>JUBO</h1>
          <p>디지털 주보 제작</p>
        </div>
      </div>

      <div className={styles.homepageContent}>
        <div className={styles.homepageDiscription}>
          <h1>쉽고 빠른 디지털 주보 제작</h1>
          <p>
            종이 주보를 대신할 수 있는 아름다운 디지털 주보를 몇 분 안에
            만들어보세요!
          </p>
          <p>템플릿 선택부터 공유까지 모든 과정이 간단합니다.</p>

          <div className={styles.buttonRow}>
            <button
              className={styles.addBtn}
              onClick={() => navigate("/editor")}
            >
              새 주보 만들기
            </button>
            <button
              className={styles.editBtn}
              onClick={() => navigate("/test")}
            >
              이어서 편집하기
            </button>
          </div>
        </div>

        <div className={styles.homepageFeatures}>
          <h1>주요 기능</h1>
          <div className={styles.featuresGrid}>
            {features.map((feature, index) => (
              <div key={index} className={styles.featureItem}>
                <feature.icon className={styles.featureIcon} />
                <h2>{feature.title}</h2>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.homepageGetStarted}>
          <h2>지금 바로 시작하세요</h2>
          <p>몇 분만에 전문적인 디지털 주보를 만들 수 있습니다</p>
          <button className={styles.startBtn}>주보 만들러 가기</button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
