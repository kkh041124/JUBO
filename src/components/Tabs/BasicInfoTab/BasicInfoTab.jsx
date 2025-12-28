import useJuboStore from "../../../stores/useJuboStore";
import styles from "./BasicInfoTab.module.css";

const BasicInfoTab = () => {
  const { jubo, updateField } = useJuboStore();
  return (
    <div className={styles.infoContent}>
      <div className={styles.section}>
        <h3>교회 정보</h3>
        <div className={styles.inputRow}>
          <div className={styles.inputGroup}>
            <p>교회명</p>
            <input
              type="text"
              placeholder="예: 새소망교회"
              value={jubo.churchInfo.churchName}
              onChange={(e) =>
                updateField("churchInfo", "churchName", e.target.value)
              }
            />
          </div>
          <div className={styles.inputGroup}>
            <p>담임목사</p>
            <input
              type="text"
              placeholder="예: 김철수 목사"
              value={jubo.churchInfo.ministerName}
              onChange={(e) =>
                updateField("churchInfo", "ministerName", e.target.value)
              }
            />
          </div>
        </div>
      </div>

      <div className={styles.section}>
        <h3>예배 정보</h3>
        <div className={styles.inputRow}>
          <div className={styles.inputGroup}>
            <p>예배명</p>
            <input
              type="text"
              placeholder="예: 주일 대예배"
              value={jubo.worshipInfo.worshipName}
              onChange={(e) =>
                updateField("worshipInfo", "worshipName", e.target.value)
              }
            />
          </div>
          <div className={styles.inputGroup}>
            <p>예배시간</p>
            <input
              type="text"
              placeholder="예: 오전 11:00"
              value={jubo.worshipInfo.worshipTime || ""}
              onChange={(e) =>
                updateField("worshipInfo", "worshipTime", e.target.value)
              }
            />
          </div>
        </div>
        <div className={styles.inputGroup}>
          <p>예배일</p>
          <input
            type="date"
            value={jubo.worshipInfo.serviceDate}
            onChange={(e) =>
              updateField("worshipInfo", "serviceDate", e.target.value)
            }
          />
        </div>
      </div>

      <div className={styles.section}>
        <h3>주요 성경 구절</h3>
        <div className={styles.inputGroup}>
          <p>성경 구절</p>
          <input
            type="text"
            placeholder="예: 시편 23:1"
            value={jubo.worshipInfo.bibleVerse}
            onChange={(e) =>
              updateField("worshipInfo", "bibleVerse", e.target.value)
            }
          />
        </div>
      </div>
    </div>
  );
};

export default BasicInfoTab;
