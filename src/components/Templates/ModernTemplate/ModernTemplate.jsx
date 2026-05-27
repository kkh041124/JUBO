import React, { useEffect, useState } from "react";
import {
  Church,
  Megaphone,
  Calendar,
  ArrowRight,
  User,
  Heart,
  Gift,
} from "lucide-react";
import useJuboStore from "../../../stores/useJuboStore";
import styles from "./ModernTemplate.module.css";

const ModernTemplate = () => {
  const [isDark, setIsDark] = useState(false);
  const { jubo } = useJuboStore();
  const { designInfo, churchInfo, worshipInfo, order, news } = jubo;
  const { backgroundInfo, textInfo } = designInfo;

  // 다크모드 자동 감지
  useEffect(() => {
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;
    setIsDark(prefersDark);
  }, []);

  const getBackgroundStyle = () => {
    switch (backgroundInfo.backgroundType) {
      case "solid":
        return { backgroundColor: backgroundInfo.backgroundColor };
      case "gradient":
        return {
          background: `linear-gradient(${backgroundInfo.gradientdirection}, ${backgroundInfo.gradientcolorfirst}, ${backgroundInfo.gradientcolorsecond})`,
        };
      case "image":
        return {
          backgroundImage: `url(${backgroundInfo.backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        };
      default:
        return { backgroundColor: backgroundInfo.backgroundColor };
    }
  };
  const date = new Date()
  return (
    <div className={`${styles.mainContainer} ${isDark ? styles.dark : ""}`}>
      {/* SECTION 1: WORSHIP TEMPLATE */}
      <div className={`${styles.sectionCard} ${isDark ? styles.dark : ""}`}>
        <header className={styles.header}>
          <div className={styles.headerTop}>
            <div className={styles.headerLeft}>
              <span className={styles.vision}>{textInfo.vision || "Vision 2025"}</span>
              <span className={styles.motto}>{textInfo.motto || "Reach Higher"}</span>
            </div>
            <div className={styles.headerRight}>
              <span className={styles.headerTitle}>{textInfo.headerTitle || "APOSTLES"}</span>
              <Church />
            </div>
          </div>
          <div className={styles.backgroundSection} style={getBackgroundStyle()}>
            {backgroundInfo.backgroundType !== "image" && (
              <>
                <img
                  alt="Background"
                  className={`${styles.backgroundImage} ${isDark ? styles.dark : ""}`}
                  src="https://images.unsplash.com/photo-1519817650390-64a93db51149?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
                />
                <div
                  className={`${styles.backgroundGradient} ${isDark ? styles.dark : ""}`}
                ></div>
              </>
            )}
          </div>
          <div className={styles.titleSection}>
            <h1 className={styles.mainTitle}>{churchInfo.churchName || "Paul"}</h1>
          </div>
        </header>

        <section
          className={`${styles.worshipSection} ${isDark ? styles.dark : ""}`}
        >
          <div className={styles.sectionHeader}>
            <h2>예배 순서</h2>
            <span className={styles.sectionHeaderTime}>{worshipInfo.serviceDate || date.toLocaleDateString()}</span>
          </div>
          <div className={styles.worshipContent}>
            {order && order.length > 0 ? (
              order.map((item, index) => (
                <OrderRow
                  key={item.id}
                  title={item.orderTitle || item.ordercategory}
                  content={item.orderContent || "다함께"}
                  isDark={isDark}
                />
              ))
            ) : (
              <>
                <OrderRow
                  title="예배를 위한 기도"
                  content="다함께"
                  isDark={isDark}
                />
                <OrderRow title="찬양" content="다함께" isDark={isDark} />
                <OrderRow title="설교" content="김대상 목사" isDark={isDark} />
              </>
            )}
          </div>
        </section>

        <section
          className={`${styles.scriptureSection} ${isDark ? styles.dark : ""}`}
        >
          <div className={styles.scriptureHeader}>
            <h2>설교 본문</h2>
            <span>|</span>
            <span className={styles.scriptureReference}>{worshipInfo.bibleVerse || "빌립보서 3:13-14"}</span>
          </div>
          <div className={styles.scriptureContent}>
            <p
              className={`${styles.scriptureText} ${isDark ? styles.dark : ""}`}
            >
              {worshipInfo.bibleVerseContent || "형제들아 나는 아직 내가 잡은 줄로 여기지 아니하고 오직 한 일 즉 뒤에 있는 것은 잊어버리고 앞에 있는 것을 잡으려고 푯대를 향하여 그리스도 예수 안에서 하나님이 위에서 부르신 부름의 상을 위하여 달려가노라"}
            </p>
          </div>
        </section>

        <div className={`${styles.footer} ${isDark ? styles.dark : ""}`}>
          <p>© 2025 Apostles Community Church. All rights reserved.</p>
        </div>
      </div>

      {/* SECTION 2: MODERN NEWS TEMPLATE */}
      <div
        className={`${styles.newsCard} ${isDark ? styles.dark : ""} ${styles.withDelay}`}
      >
        <header className={styles.newsHeader}>
          <div className={styles.newsHeaderBg}></div>
          <div className={styles.newsHeaderContent}>
            <div className={styles.newsHeaderLeft}>
              <h1 className={styles.newsHeaderTitle}>광고</h1>
              <span className={styles.newsHeaderSubtitle}>Apostles</span>
            </div>
            <div className={styles.newsHeaderIcon}>
              <Megaphone size={80} strokeWidth={1.5} />
            </div>
          </div>
        </header>

        <main className={styles.newsMain}>
          {news && news.length > 0 ? (
            news.map((item, index) => (
              <NewsItem key={item.id} index={(index + 1).toString()} title={item.title} isDark={isDark}>
                <p>{item.content}</p>
                <p style={{ fontSize: "0.875rem", color: "#666", marginTop: "0.5rem" }}>
                  {item.date}
                </p>
              </NewsItem>
            ))
          ) : (
            <NewsItem index="1" title="Mission Week" isDark={isDark}>
            <p>
              <span className={styles.inlineSpan}>기간:</span> 12월 5일(금) -
              7일(주일)
            </p>
            <p>
              <span className={styles.inlineSpan}>찬양축제:</span> 12월 5일(금)
              20:00 ISAIAH6TYONE
            </p>
            <div className={styles.subList}>
              <p>12월 6일(토) 16:00 Team Luke Worship</p>
              <p
                style={{
                  color: "#dc2626",
                  fontWeight: 500,
                  marginTop: "0.25rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                }}
              >
                <ArrowRight size={12} /> 홈페이지 신청 필수 (선착순 400명)
              </p>
              <p style={{ marginTop: "0.25rem" }}>
                12월 7일(주일) 15:30 In the LORD
              </p>
            </div>
            <p
              style={{
                marginTop: "0.5rem",
                fontSize: "0.875rem",
                color: "#6b7280",
              }}
            >
              ※ 선교컨퍼런스, 단기선교 파송식, 선교헌신작정 등
            </p>
          </NewsItem>
          )}
        </main>
        <footer
          className={`${styles.newsBrFooter} ${isDark ? styles.dark : ""}`}
        >
          © 2025 APOSTLES Community. All rights reserved.
        </footer>
      </div>
    </div>
  );
};

const OrderRow = ({ title, content, isDark }) => (
  <div className={styles.orderRow}>
    <span className={styles.orderTitle}>{title}</span>
    <div className={`${styles.dottedLine} ${isDark ? styles.dark : ""}`}></div>
    <span className={`${styles.orderContent} ${isDark ? styles.dark : ""}`}>
      {content}
    </span>
  </div>
);

const NewsItem = ({ index, title, children, isDark }) => (
  <section className={styles.newsItem}>
    <h2 className={`${styles.newsItemTitle} ${isDark ? styles.dark : ""}`}>
      <span className={styles.newsNumber}>{index}.</span> {title}
    </h2>
    <div className={`${styles.newsItemContent} ${isDark ? styles.dark : ""}`}>
      {children}
    </div>
  </section>
);

export default ModernTemplate;
