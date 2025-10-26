import {FileText} from "lucide-react"
import styles from "./HomePage.module.css"


const HomePage = () => {
  return (
    <div>
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
      </div>
    </div>
  );
};

export default HomePage;