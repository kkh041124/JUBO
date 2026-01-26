import React from "react";
import useJuboStore from "../../../stores/useJuboStore";
import styles from "./BulletinTemplate.module.css";

const BulletinTemplate = () => {
  const { jubo } = useJuboStore();
  const { churchInfo, worshipInfo, designInfo, news, order } = jubo;

  const { textInfo, logoInfo, backgroundInfo, iconInfo } = designInfo;

  return (
    <div className={styles.container}>
      <main className={styles.mainContent}>
        {/* 헤더 섹션 */}
        <div className={styles.headerSection}>
          <div className={styles.headerText}>
            <div className={styles.headerTopInfo}>
              <p className={styles.churchTitle}>
                {churchInfo.churchName || "ROK AIR FORCE CHURCH"}
              </p>
              <p>A (36842) 경북 예천군 유천면 매실로 357 사서함 322-1</p>
              <p>P (내선) 2260, 2262 / 053-650-4682</p>
            </div>
          </div>

          {logoInfo.logo && (
            <div className={styles.headerLogo}>
              <img
                src={logoInfo.logo}
                alt="교회 로고"
                style={{
                  width: `${logoInfo.logoSize}px`,
                  height: "auto",
                }}
              />
            </div>
          )}

          {!logoInfo.logo && (
            <div className={styles.headerLogoPlaceholder}>
              {iconInfo.icon ? (
                <img
                  src={iconInfo.icon}
                  alt="교회 아이콘"
                  style={{
                    width: `${iconInfo.iconSize}px`,
                    height: "auto",
                  }}
                />
              ) : (
                <svg
                  className={styles.churchIcon}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 200 120"
                >
                  <rect height="60" rx="2" width="40" x="20" y="10"></rect>
                  <path d="M40 25 v30 M25 35 h30" strokeWidth="3"></path>
                  <rect height="60" width="100" x="50" y="40"></rect>
                  <rect height="30" width="60" x="70" y="55"></rect>
                  <line x1="90" x2="90" y1="55" y2="85"></line>
                  <line x1="110" x2="110" y1="55" y2="85"></line>
                  <line x1="70" x2="130" y1="70" y2="70"></line>
                  <line x1="10" x2="160" y1="105" y2="105"></line>
                  <line x1="15" x2="155" y1="100" y2="100"></line>
                </svg>
              )}
            </div>
          )}
        </div>

        {/* 타이틀 카드 */}
        <div className={styles.titleCard}>
          <div className={styles.titleIcon}>
            <svg
              className={styles.starIcon}
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M12 2L15 9H21L16 13L18 20L12 16L6 20L8 13L3 9H9L12 2Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              ></path>
              <path
                d="M2 12h20M12 2v20"
                stroke="currentColor"
                strokeLinecap="round"
                strokeWidth="1.5"
              ></path>
            </svg>
          </div>
          <h1 className={styles.churchName}>
            {churchInfo.churchName || "예천기지교회"}
          </h1>
        </div>

        {/* 예배 정보 헤더 */}
        <div className={styles.worshipInfoHeader}>
          <div className={styles.issueInfo}>
            <span className={styles.issueNumber}>
              제
              {worshipInfo.serviceDate
                ? worshipInfo.serviceDate.split(".")[1]
                : "2"}
              호 {worshipInfo.serviceDate || "2026. 1. 11."}
            </span>
          </div>
          <div className={styles.worshipTitle}>
            <h2 className={styles.mainTitle}>
              {worshipInfo.worshipName || "주일예배"}
            </h2>
            <span className={styles.englishTitle}>Sunday Worship</span>
          </div>
        </div>

        {/* 성경 구절 */}
        <div className={styles.verseSection}>
          <p className={styles.versText}>
            {worshipInfo.bibleVerseContent
              ? worshipInfo.bibleVerseContent
              : '"하나님은 영이시니 예배하는 자가\n영과 진리로 예배할지니라"'}
            <span className={styles.verseRef}>
              {worshipInfo.bibleVerse || "(요 4:24)"}
            </span>
          </p>
        </div>

        {/* 예배 순서 */}
        <div className={styles.worshipOrderSection}>
          {order && order.length > 0 ? (
            <div className={styles.worshipGuideSection}>
              <div className={styles.orderList}>
                {order.map((item, idx) => (
                  <div key={item.id} className={styles.orderItem}>
                    <span className={styles.orderCategory}>
                      {item.ordercategory}
                    </span>
                    <span className={styles.dottedLine}></span>
                    {item.orderTitle && (
                      <span className={styles.orderTitle}>
                        {item.orderTitle}
                      </span>
                    )}
                    {item.orderContent && (
                      <span className={styles.dottedLine}></span>
                    )}
                    {item.orderContent && (
                      <span className={styles.orderContent}>
                        {item.orderContent}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className={styles.orderList}>
              <div className={styles.orderItem}>
                <span className={styles.orderCategory}>인도</span>
                <span className={styles.dottedLine}></span>
                <span className={styles.orderContent}>손평인 목사</span>
              </div>
              <div className={styles.orderItem}>
                <span className={styles.orderCategory}>신앙고백</span>
                <span className={styles.dottedLine}></span>
                <span className={styles.orderTitle}>사도신경</span>
                <span className={styles.dottedLine}></span>
                <span className={styles.orderContent}>다 같이</span>
              </div>
              <div className={styles.orderItem}>
                <span className={styles.orderCategory}>예배찬양</span>
                <span className={styles.dottedLine}></span>
                <span className={styles.dottedLine}></span>
                <span className={styles.orderContent}>다 같이</span>
              </div>
            </div>
          )}
        </div>

        {/* 소식 섹션 */}
        {news && news.length > 0 && (
          <div className={styles.newsSection}>
            <h3 className={styles.sectionTitle}>소식</h3>
            {news.map((item) => (
              <div key={item.id} className={styles.newsItem}>
                <div className={styles.newsHeader}>
                  <span className={styles.newsCategory}>[{item.category}]</span>
                  <span className={styles.newsDate}>{item.date}</span>
                </div>
                <h4 className={styles.newsTitle}>{item.title}</h4>
                <p className={styles.newsContent}>{item.content}</p>
              </div>
            ))}
          </div>
        )}

        {/* 하단 바 */}
        <div className={styles.bottomBar}></div>
      </main>
    </div>
  );
};

export default BulletinTemplate;
