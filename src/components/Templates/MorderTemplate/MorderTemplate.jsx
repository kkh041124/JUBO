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
import styles from "./MorderTemplate.module.css";

const MorderTemplate = () => {
  const [isDark, setIsDark] = useState(false);

  // 다크모드 자동 감지
  useEffect(() => {
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;
    setIsDark(prefersDark);
  }, []);

  return (
    <div className={`${styles.mainContainer} ${isDark ? styles.dark : ""}`}>
      {/* SECTION 1: WORSHIP TEMPLATE */}
      <div className={`${styles.sectionCard} ${isDark ? styles.dark : ""}`}>
        <header className={styles.header}>
          <div className={styles.headerTop}>
            <div className={styles.headerLeft}>
              <span className={styles.vision}>Vision 2025</span>
              <span className={styles.motto}>Reach Higher</span>
            </div>
            <div className={styles.headerRight}>
              <span className={styles.headerTitle}>APOSTLES</span>
              <Church />
            </div>
          </div>
          <div className={styles.backgroundSection}>
            <img
              alt="Background"
              className={`${styles.backgroundImage} ${isDark ? styles.dark : ""}`}
              src="https://images.unsplash.com/photo-1519817650390-64a93db51149?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
            />
            <div
              className={`${styles.backgroundGradient} ${isDark ? styles.dark : ""}`}
            ></div>
          </div>
          <div className={styles.titleSection}>
            <h1 className={styles.mainTitle}>Paul</h1>
          </div>
        </header>

        <section
          className={`${styles.worshipSection} ${isDark ? styles.dark : ""}`}
        >
          <div className={styles.sectionHeader}>
            <h2>예배 순서</h2>
            <span className={styles.sectionHeaderTime}>2025. 11. 30</span>
          </div>
          <div className={styles.worshipContent}>
            <OrderRow
              title="예배를 위한 기도"
              content="다함께"
              isDark={isDark}
            />
            <OrderRow title="찬양" content="다함께" isDark={isDark} />

            <div className={`${styles.infoBox} ${isDark ? styles.dark : ""}`}>
              <p>김현진 간사</p>
              <p style={{ fontStyle: "italic" }}>In the Lord</p>
            </div>

            <OrderRow
              title="대표기도"
              content={
                <div style={{ textAlign: "right" }}>
                  <span style={{ display: "block", fontWeight: 500 }}>
                    기신자팀 김병완 셀장
                  </span>
                  <span
                    style={{
                      display: "block",
                      fontSize: "0.75rem",
                      color: "#888888",
                    }}
                  >
                    다음주: 신정식 집사
                  </span>
                </div>
              }
              isDark={isDark}
            />

            <OrderRow title="봉헌" content="다함께" isDark={isDark} />

            <div style={{ paddingTop: "0.5rem" }}>
              <OrderRow title="설교" content="김대상 목사" isDark={isDark} />
              <div
                className={`${styles.lectureInfo} ${isDark ? styles.dark : ""}`}
              >
                <p>빌립보서 3:13-14</p>
                <p>하나님의 사람들(5)</p>
                <h3
                  className={`${styles.lectureTitle} ${isDark ? styles.dark : ""}`}
                >
                  바울: 푯대를 향하여 달려간 사람
                </h3>
              </div>
            </div>

            <OrderRow title="결단찬양&기도" content="다함께" isDark={isDark} />
            <div
              className={`${styles.infoSubtext} ${isDark ? styles.dark : ""}`}
            >
              나는 오늘도 가네
            </div>

            <OrderRow title="축도" content="김대상 목사" isDark={isDark} />

            <OrderRow
              title="결혼자 인사"
              content={
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.25rem",
                  }}
                >
                  한상우 <Heart size={12} style={{ color: "#f472b6" }} /> 안은정
                </span>
              }
              isDark={isDark}
            />

            <OrderRow
              title="사임 인사"
              content="김호수 목사, 김용음 목사, 김가은 간사"
              isDark={isDark}
            />
            <OrderRow title="광고" content="이성욱 목사" isDark={isDark} />
            <OrderRow title="파송" content="다함께" isDark={isDark} />

            <div
              className={`${styles.infoSubtext} ${isDark ? styles.dark : ""}`}
            >
              유월절 어린 양의 피로
            </div>
          </div>
        </section>

        <section
          className={`${styles.scriptureSection} ${isDark ? styles.dark : ""}`}
        >
          <div className={styles.scriptureHeader}>
            <h2>설교 본문</h2>
            <span>|</span>
            <span className={styles.scriptureReference}>빌립보서 3:13-14</span>
          </div>
          <div className={styles.scriptureContent}>
            <p
              className={`${styles.scriptureText} ${isDark ? styles.dark : ""}`}
            >
              <span className={styles.verseNumber}>13</span>
              형제들아 나는 아직 내가 잡은 줄로 여기지 아니하고 오직 한 일 즉
              뒤에 있는 것은 잊어버리고 앞에 있는 것을 잡으려고
              <span className={styles.verseNumber}>14</span>
              푯대를 향하여 그리스도 예수 안에서 하나님이 위에서 부르신 부름의
              상을 위하여 달려가노라
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

          <NewsItem index="2" title="For You 초청예배" isDark={isDark}>
            <p style={{ marginBottom: "0.5rem" }}>
              태신자 초청예배가 12월 28일(주일)에 있습니다. 믿지 않는 지인을
              초청해 주세요.
            </p>
            <div
              className={`${styles.infoHighlight} ${isDark ? styles.dark : ""}`}
            >
              <div
                style={{
                  display: "flex",
                  gap: "0.5rem",
                  marginBottom: "0.5rem",
                }}
              >
                <span style={{ marginTop: "0.25rem" }}>
                  <Calendar size={14} />
                </span>
                <div style={{ fontSize: "0.875rem" }}>
                  12월 14일, 21일에 '새가족 등록처'에서{" "}
                  <span style={{ fontWeight: "bold" }}>방문카드</span> 배부
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  gap: "0.5rem",
                  color: "#dc2626",
                  fontWeight: 500,
                }}
              >
                <span style={{ marginTop: "0.25rem" }}>
                  <ArrowRight size={14} />
                </span>
                <div style={{ fontSize: "0.875rem" }}>
                  홈페이지 신청 태신자만 식사지원 가능!
                </div>
              </div>
            </div>
            <p
              style={{
                fontWeight: "bold",
                marginTop: "0.5rem",
                textAlign: "right",
                fontSize: "0.875rem",
              }}
            >
              모집 마감: 12월 14일(주일) 23:59
            </p>
          </NewsItem>

          <NewsItem index="3" title="선교사 성탄 선물 보내기" isDark={isDark}>
            <p>
              <span className={styles.inlineSpan}>대상:</span> 파송, 공동파송 및
              협력 선교사
            </p>
            <div
              className={`${styles.taglineBox} ${isDark ? styles.dark : ""}`}
            >
              <p style={{ marginTop: 0 }}>
                <span style={{ fontWeight: "bold", color: "#0056b3" }}>
                  오프라인:
                </span>{" "}
                헌금 봉투에 '선교사 성탄 선물' 기재
              </p>
              <p>
                <span style={{ fontWeight: "bold", color: "#0056b3" }}>
                  온라인:
                </span>{" "}
                농협 301-0098-4361-11 (이승재88성탄)
              </p>
            </div>
            <p style={{ marginTop: "0.5rem" }}>
              <span className={styles.inlineSpan}>금액:</span> 소포당 15만원
              (자율 동참)
            </p>
            <p
              style={{
                fontWeight: "bold",
                marginTop: "0.5rem",
                textAlign: "right",
                fontSize: "0.875rem",
              }}
            >
              마감: 11월 30일 Today
            </p>
          </NewsItem>

          <NewsItem index="4" title="둠치둠치 김치나눔" isDark={isDark}>
            <p style={{ fontSize: "0.875rem", marginBottom: "0.5rem" }}>
              김장 김치에 사랑을 담아 이웃에게 전달합니다.
            </p>
            <ul
              style={{
                listStyleType: "disc",
                paddingLeft: "1.25rem",
                margin: 0,
                fontSize: "0.875rem",
              }}
            >
              <li>
                <span className={styles.inlineSpan}>일시:</span> 12월 13일(토)
                12:00 - 15:00
              </li>
              <li>
                <span className={styles.inlineSpan}>장소:</span> 사랑의
                연탄나눔운동 대구본부
              </li>
              <li>
                <span className={styles.inlineSpan}>인원:</span> 30명 (편한
                복장)
              </li>
              <li>
                <span className={styles.inlineSpan}>후원:</span> 500만원 (김치
                120-140박스)
              </li>
            </ul>
          </NewsItem>

          <div className={styles.gridContainer}>
            <div className={styles.gridItem}>
              <h3
                className={`${styles.gridItemTitle} ${isDark ? styles.dark : ""}`}
                style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
              >
                <User size={18} /> 사역자 사임
              </h3>
              <p
                className={`${styles.gridItemText} ${isDark ? styles.dark : ""}`}
              >
                김호수 목사, 김용음 목사, 김가은 간사님께서 사임하십니다. 앞길을
                위해 기도해주세요.
              </p>
            </div>
            <div className={styles.gridItem}>
              <h3
                className={`${styles.gridItemTitle} ${isDark ? styles.dark : ""}`}
                style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
              >
                <Gift size={18} /> 사랑방 편성
              </h3>
              <p
                className={`${styles.gridItemText} ${isDark ? styles.dark : ""}`}
              >
                1차 발표: 12월 14일 / 최종: 28일
                <br />
                홈페이지 공지사항 참조
              </p>
            </div>
          </div>
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

export default MorderTemplate;
