import {FileText,Palette,Download,Share2} from "lucide-react"
import styles from "./HomePage.module.css"


const features = [
  {
    icon: FileText,
    title: "다양한 템플릿",
    description: "전통형, 모던형, 미니멀형 등 다양한 주보 템플릿을 선택"
  },
  {
    icon: Palette,
    title: "커스텀마이징",
    description: "색상, 폰트, 배경 이미지 등을 자유롭게 변경"
  },
  {
    icon: Download,
    title: "PDF/이미지 저장",
    description: "PDF 다운로드 및 이미지 형식으로 저장 가능"
  },
  { 
    icon: Share2,
    title: "SNS 공유",
    description: "SNS, 이메일 등 다양한 방법으로 주보 공유"
  }
];

const HomePage = () => {
  return (
    <div className={styles.homepageContainer} >
      <div className ={styles.homepageHeader}>
        <FileText color ='white' className = {styles.Icon}/>
        <div className={styles.homepageTitle}>
          <h1>JUBO</h1>
          <p>디지털 주보 제작</p>
        </div>
      </div>
      <div className={styles.homepageContent}>
        <div className={styles.homepageDiscription}>
          <h1>쉽고 빠른 디지털 주보 제작</h1>
          <p>종이 주보를 대신할 수 있는 간편한 디지털 주보를 몇 분 안에 만들어 보세요!</p>
          <p> 템플릿 선택부터 공유까지 모든 과정이 간단합니다!</p>
          <button className={styles.addBtn}>새 주보 만들기 {'>'}</button>
          <button className={styles.editBtn}>이어서  편집하기 </button>
        </div>
        <div className={styles.homepageTemplate}>
          <h1>템플릿 선택</h1>
          <p>각 템플릿을 클릭하면 더 자세한 미리보기를 볼 수 있습니다.</p>
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
      </div>
    </div>
  );
};

export default HomePage;