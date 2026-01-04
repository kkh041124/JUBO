import {
  ArrowLeft,
  FileText,
  Eye,
  Download,
  Share2,
  Save,
  Calendar,
  Settings,
  Users,
  MessageSquare,
  Plus,
  Megaphone,
  HeartHandshake,
  HandHelping,
  NotebookPen,
  Trash2,
  SquarePen,
  FolderOpen,
  Minus,
  Image,
  Upload,
  X,
  /* 그라데이션용 */
  MoveDown,
  MoveLeft,
  MoveRight,
  MoveUp,
  MoveUpLeft,
  MoveUpRight,
  MoveDownLeft,
  MoveDownRight,
  Move,
} from "lucide-react";
import styles from "../pages/EditorPage.module.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import useJuboStore from "../stores/useJuboStore";
import AModal from "../components/AModal/AModal.jsx";
import logo1 from "../assets/logo1.svg";
import logo2 from "../assets/logo2.svg";
import img1 from "../assets/sampleImg1.jpg";
import img2 from "../assets/sampleImg2.jpg";
import img3 from "../assets/sampleImg3.jpg";
import img4 from "../assets/sampleImg4.jpg";
import BasicInfoTab from "../components/Tabs/BasicInfoTab/BasicInfoTab.jsx";
import OrderTab from "../components/Tabs/OrderTab/OrderTab.jsx";
import NewsTab from "../components/Tabs/NewsTab/NewsTab.jsx";
import HeaderSettingsTab from "../components/Tabs/Header/HeaderSettingTab.jsx";

const EditorPage = () => {
  const {
    jubo,
    updateField,
    deleteNews,
    editNews,
    deleteOrder,
    editOrder,
    isModalOpen,
    openModal,
    closeModal,
    reOrder,
    setHeaderInfo,
    updateFontSize,
    image,
    logoPosition,
    setLogo,
    setLogoSize,
    setLogoPosition,
    backgroundColor,
    imgopacity,
    setImgOpacity,
    setBackGroundColor,
    setGradientColorFirst,
    setGradientColorSecond,
    setGradientDirection,
    setBackGroundImage,
  } = useJuboStore();

  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("info");
  const [activeHeaderTab, setActiveHeaderTab] = useState("text");
  const [activeLogoTab, setActiveLogoTab] = useState("upload");
  const [activeBackType, setActiveBackType] = useState("solid");
  const [activeBackImgTab, setActiveBackImgTab] = useState("upload");
  const ReadImg = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = () => {
      setLogo(reader.result, file.name);
    };

    reader.readAsDataURL(file);
  };

  const ReadBgImg = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = () => {
      setBackGroundImage(reader.result, file.name);
    };

    reader.readAsDataURL(file);
  };

  const POSITION_MAP = {
    "to left": { label: "좌측", icon: MoveLeft },
    "to right": { label: "우측", icon: MoveRight },
    "to top": { label: "상단", icon: MoveUp },
    "to bottom": { label: "하단", icon: MoveDown },
    "to left top": { label: "좌상단", icon: MoveUpLeft },
    "to right top": { label: "우상단", icon: MoveUpRight },
    "to left bottom": { label: "좌하단", icon: MoveDownLeft },
    "to right bottom": { label: "우하단", icon: MoveDownRight },
  };
  const gradientdirection = jubo.designInfo.backgroundInfo.gradientdirection;
  const SelectedIcon = POSITION_MAP[gradientdirection]?.icon;

  return (
    <div className={styles.editorpageContainer}>
      <div className={styles.editorpageHeader}>
        <div className={styles.headerSection}>
          <button
            className={`${styles.iconButton} ${styles.ghostButton}`}
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className={styles.icon} />
            <span>돌아가기</span>
          </button>
        </div>

        <div className={`${styles.headerSection} ${styles.titleContainer}`}>
          <FileText className={styles.pageIcon} />
          <span className={styles.title}>
            {jubo.churchInfo.churchName || "교회명 미입력"}
          </span>
        </div>

        <div className={styles.iconGroup}>
          <button className={`${styles.iconButton} ${styles.lightButton}`}>
            <FolderOpen className={styles.icon} />
            <span>불러오기</span>
          </button>
          <button className={`${styles.iconButton} ${styles.lightButton}`}>
            <Save className={styles.icon} />
            <span>저장</span>
          </button>
          <button
            className={`${styles.iconButton} ${styles.lightButton}`}
            onClick={() => openModal("design")}
          >
            <Settings className={styles.icon} />
            <span>디자인</span>
          </button>
          <button className={`${styles.iconButton} ${styles.lightButton}`}>
            <Eye className={styles.icon} />
            <span>미리보기</span>
          </button>
          <button className={`${styles.iconButton} ${styles.lightButton}`}>
            <Download className={styles.icon} />
            <span>다운로드</span>
          </button>
          <button className={`${styles.iconButton} ${styles.primaryButton}`}>
            <Share2 className={styles.icon} />
            <span>공유</span>
          </button>
        </div>
      </div>

      <div className={styles.editorBody}>
        <div className={styles.editorContainer}>
          <div className={styles.editorTitle}>
            <FileText className={styles.pageIconLarge} />
            <h1>주보 편집</h1>
          </div>

          <div className={styles.headerBar}>
            <button
              className={activeTab === "info" ? styles.activeTab : ""}
              onClick={() => setActiveTab("info")}
            >
              <Calendar className={styles.icon} />
              <span>기본정보</span>
            </button>
            <button
              className={activeTab === "header" ? styles.activeTab : ""}
              onClick={() => setActiveTab("header")}
            >
              <Settings className={styles.icon} />
              <span>헤더설정</span>
            </button>
            <button
              className={activeTab === "order" ? styles.activeTab : ""}
              onClick={() => setActiveTab("order")}
            >
              <Users className={styles.icon} />
              <span>예배순서</span>
            </button>
            <button
              className={activeTab === "news" ? styles.activeTab : ""}
              onClick={() => setActiveTab("news")}
            >
              <MessageSquare className={styles.icon} />
              <span>교회소식</span>
            </button>
          </div>

          {activeTab === "info" ? (
            <BasicInfoTab />
          ) : null}

          {activeTab === "header" ? (
            // <div className={styles.headerContent}>
            //   <div className={styles.section}>
            //     <h3>헤더 설정</h3>
            //   </div>
            //   <div className={styles.headerTab}>
            //     <button
            //       className={`${styles.headerTabButton} ${
            //         activeHeaderTab === "text" ? styles.activeHeaderTab : ""
            //       }`}
            //       onClick={() => setActiveHeaderTab("text")}
            //     >
            //       텍스트 설정
            //     </button>
            //     <button
            //       className={`${styles.headerTabButton} ${
            //         activeHeaderTab === "design" ? styles.activeHeaderTab : ""
            //       }`}
            //       onClick={() => setActiveHeaderTab("design")}
            //     >
            //       디자인 설정
            //     </button>
            //   </div>
            //   {activeHeaderTab === "text" ? (
            //     <div className={styles.headerTextSettings}>
            //       <div className={styles.inputGroup}>
            //         <h3>슬로건</h3>
            //         <div className={styles.controlRow}>
            //           <input
            //             type="text"
            //             className={styles.textInput}
            //             placeholder="슬로건 입력"
            //             value={jubo.designInfo.textInfo.slogan}
            //             onChange={(e) =>
            //               setHeaderInfo("slogan", e.target.value)
            //             }
            //           />
            //           <div className={styles.spacingControl}>
            //             <button
            //               onClick={() =>
            //                 updateFontSize(
            //                   "slogan",
            //                   Number(
            //                     jubo.designInfo.textInfo.fontsize.sloganfont - 1
            //                   )
            //                 )
            //               }
            //             >
            //               <Minus className={styles.iconSmall} />
            //             </button>
            //             <input
            //               type="number"
            //               value={jubo.designInfo.textInfo.fontsize.sloganfont}
            //               onChange={(e) =>
            //                 updateFontSize("sloganfont", e.target.value)
            //               }
            //             />
            //             <span>px</span>
            //             <button
            //               onClick={() =>
            //                 updateFontSize(
            //                   "slogan",
            //                   Number(
            //                     jubo.designInfo.textInfo.fontsize.sloganfont + 1
            //                   )
            //                 )
            //               }
            //             >
            //               <Plus className={styles.iconSmall} />
            //             </button>
            //           </div>
            //         </div>
            //       </div>
            //       <div className={styles.inputGroup}>
            //         <h3>제목</h3>
            //         <div className={styles.controlRow}>
            //           <input
            //             type="text"
            //             className={styles.textInput}
            //             placeholder="제목 입력"
            //             value={jubo.designInfo.textInfo.title}
            //             onChange={(e) => setHeaderInfo("title", e.target.value)}
            //           />
            //           <div className={styles.spacingControl}>
            //             <button
            //               onClick={() =>
            //                 updateFontSize(
            //                   "title",
            //                   Number(
            //                     jubo.designInfo.textInfo.fontsize.titlefont - 1
            //                   )
            //                 )
            //               }
            //             >
            //               <Minus className={styles.iconSmall} />
            //             </button>
            //             <input
            //               type="number"
            //               value={jubo.designInfo.textInfo.fontsize.titlefont}
            //               onChange={(e) =>
            //                 updateFontSize("titlefont", e.target.value)
            //               }
            //             />
            //             <span>px</span>
            //             <button
            //               onClick={() =>
            //                 updateFontSize(
            //                   "title",
            //                   Number(
            //                     jubo.designInfo.textInfo.fontsize.titlefont + 1
            //                   )
            //                 )
            //               }
            //             >
            //               <Plus className={styles.iconSmall} />
            //             </button>
            //           </div>
            //         </div>
            //       </div>
            //       <div className={styles.inputGroup}>
            //         <h3>부제목</h3>
            //         <div className={styles.controlRow}>
            //           <input
            //             type="text"
            //             className={styles.textInput}
            //             placeholder="부제목 입력"
            //             value={jubo.designInfo.textInfo.subtitle}
            //             onChange={(e) =>
            //               setHeaderInfo("subtitle", e.target.value)
            //             }
            //           />
            //           <div className={styles.spacingControl}>
            //             <button
            //               onClick={() =>
            //                 updateFontSize(
            //                   "subtitle",
            //                   Number(
            //                     jubo.designInfo.textInfo.fontsize.subtitlefont -
            //                       1
            //                   )
            //                 )
            //               }
            //             >
            //               <Minus className={styles.iconSmall} />
            //             </button>
            //             <input
            //               type="number"
            //               value={jubo.designInfo.textInfo.fontsize.subtitlefont}
            //               onChange={(e) =>
            //                 updateFontSize("subtitlefont", e.target.value)
            //               }
            //             />
            //             <span>px</span>
            //             <button
            //               onClick={() =>
            //                 updateFontSize(
            //                   "subtitle",
            //                   Number(
            //                     jubo.designInfo.textInfo.fontsize.subtitlefont +
            //                       1
            //                   )
            //                 )
            //               }
            //             >
            //               <Plus className={styles.iconSmall} />
            //             </button>
            //           </div>
            //         </div>
            //       </div>
            //     </div>
            //   ) : null}
            //   {activeHeaderTab === "design" ? (
            //     <div className={styles.headerDesignSettings}>
            //       <div className={styles.inputGroup}>
            //         <h3>교회 로고</h3>
            //         <div className={styles.logoSection}>
            //           {jubo.designInfo.logoInfo.logo ? (
            //             <>
            //               <div className={styles.logoPreviewSection}>
            //                 <div className={styles.logoPreviewWrapper}>
            //                   <img
            //                     src={jubo.designInfo.logoInfo.logo}
            //                     alt="Uploaded Logo"
            //                     className={styles.logoPreview}
            //                   />
            //                   <button
            //                     className={styles.removeLogoButton}
            //                     onClick={() => setLogo(null, null)}
            //                   >
            //                     <X className={styles.iconSmall} />
            //                   </button>
            //                 </div>
            //                 <label className={styles.logoFileName}>
            //                   <Upload className={styles.iconSmall} />
            //                   <span>이미지 변경</span>
            //                   <input
            //                     type="file"
            //                     onChange={ReadImg}
            //                     className={styles.hiddenInput}
            //                     accept="image/*"
            //                   />
            //                 </label>
            //               </div>
            //               <div className={styles.logoControls}>
            //                 <div className={styles.logoPositionControl}>
            //                   <h3>로고 위치</h3>
            //                   <select
            //                     value={jubo.designInfo.logoInfo.logoPosition}
            //                     onChange={(e) =>
            //                       setLogoPosition(e.target.value)
            //                     }
            //                   >
            //                     <option value="left">좌측</option>
            //                     <option value="center">중앙</option>
            //                     <option value="right">우측</option>
            //                   </select>
            //                 </div>

            //                 <div className={styles.logoSizeControl}>
            //                   <h3>로고 크기</h3>
            //                   <div className={styles.spacingControl}>
            //                     <button
            //                       onClick={() =>
            //                         setLogoSize(
            //                           jubo.designInfo.logoInfo.logoSize - 1
            //                         )
            //                       }
            //                     >
            //                       <Minus className={styles.iconSmall} />
            //                     </button>
            //                     <input
            //                       type="number"
            //                       value={jubo.designInfo.logoInfo.logoSize}
            //                       onChange={(e) =>
            //                         setLogoSize(Number(e.target.value))
            //                       }
            //                     />
            //                     <button
            //                       onClick={() =>
            //                         setLogoSize(
            //                           jubo.designInfo.logoInfo.logoSize + 1
            //                         )
            //                       }
            //                     >
            //                       <Plus className={styles.iconSmall} />
            //                     </button>
            //                   </div>
            //                 </div>
            //               </div>
            //             </>
            //           ) : (
            //             <>
            //               <div className={styles.headerDesignTab}>
            //                 <button
            //                   className={`${styles.headerTabButton} ${
            //                     activeLogoTab === "upload"
            //                       ? styles.activeDesignTab
            //                       : ""
            //                   }`}
            //                   onClick={() => setActiveLogoTab("upload")}
            //                 >
            //                   업로드
            //                 </button>
            //                 <button
            //                   className={`${styles.headerTabButton} ${
            //                     activeLogoTab === "sample"
            //                       ? styles.activeDesignTab
            //                       : ""
            //                   }`}
            //                   onClick={() => setActiveLogoTab("sample")}
            //                 >
            //                   샘플
            //                 </button>
            //               </div>

            //               {activeLogoTab === "upload" && (
            //                 <div className={styles.uploadSection}>
            //                   <label className={styles.uploadButton}>
            //                     <input
            //                       type="file"
            //                       onChange={ReadImg}
            //                       className={styles.hiddenInput}
            //                       accept="image/*"
            //                     />
            //                     <div className={styles.uploadContent}>
            //                       <Image className={styles.iconSmall} />
            //                       <span className={styles.primaryText}>
            //                         로고 이미지 업로드
            //                       </span>
            //                       <span className={styles.secondaryText}>
            //                         클릭하거나 드래그하여 업로드
            //                       </span>
            //                     </div>
            //                   </label>
            //                 </div>
            //               )}

            //               {activeLogoTab === "sample" && (
            //                 <div className={styles.sampleSection}>
            //                   <p className={styles.sampleTitle}>
            //                     샘플 이미지를 선택하세요
            //                   </p>
            //                   <div className={styles.sampleContainer}>
            //                     <div
            //                       className={`${styles.sampleWrapper} ${
            //                         jubo.designInfo.logoInfo.logo === logo1
            //                           ? styles.selected
            //                           : ""
            //                       }`}
            //                       onClick={() => setLogo(logo1, "Sample 1")}
            //                     >
            //                       <img
            //                         src={logo1}
            //                         alt="Sample 1"
            //                         className={styles.sampleImage}
            //                       />
            //                     </div>
            //                     <div
            //                       className={`${styles.sampleWrapper} ${
            //                         jubo.designInfo.logoInfo.logo === logo2
            //                           ? styles.selected
            //                           : ""
            //                       }`}
            //                       onClick={() => setLogo(logo2, "Sample 2")}
            //                     >
            //                       <img
            //                         src={logo2}
            //                         alt="Sample 2"
            //                         className={styles.sampleImage}
            //                       />
            //                     </div>
            //                   </div>
            //                 </div>
            //               )}
            //             </>
            //           )}
            //         </div>
            //       </div>
            //       {/* 헤더 배경 설정 영역 */}
            //       <div className={styles.inputGroup}>
            //         <h3>헤더 배경</h3>
            //         <div className={styles.headerBackgroundSection}>
            //           <div className={styles.headerDesignTab}>
            //             <button
            //               className={`${styles.headerTabButton} ${
            //                 activeBackType === "solid"
            //                   ? styles.activeDesignTab
            //                   : ""
            //               }`}
            //               onClick={() => setActiveBackType("solid")}
            //             >
            //               단색
            //             </button>
            //             <button
            //               className={`${styles.headerTabButton} ${
            //                 activeBackType === "gradient"
            //                   ? styles.activeDesignTab
            //                   : ""
            //               }`}
            //               onClick={() => setActiveBackType("gradient")}
            //             >
            //               그라데이션
            //             </button>
            //             <button
            //               className={`${styles.headerTabButton} ${
            //                 activeBackType === "image"
            //                   ? styles.activeDesignTab
            //                   : ""
            //               }`}
            //               onClick={() => setActiveBackType("image")}
            //             >
            //               이미지
            //             </button>
            //           </div>

            //           {activeBackType === "solid" && (
            //             <div className={styles.solidColorPicker}>
            //               <input
            //                 type="color"
            //                 value={
            //                   jubo.designInfo.backgroundInfo.backgroundColor
            //                 }
            //                 onChange={(e) => setBackGroundColor(e.target.value)}
            //               />
            //               <div>
            //                 <p>배경 색상</p>
            //                 {jubo.designInfo.backgroundInfo.backgroundColor ? (
            //                   <span>
            //                     {jubo.designInfo.backgroundInfo.backgroundColor}
            //                   </span>
            //                 ) : (
            //                   <span>헤더의 배경 색상을 선택합니다.</span>
            //                 )}
            //               </div>
            //             </div>
            //           )}

            //           {activeBackType === "gradient" && (
            //             <div className={styles.gradientPicker}>
            //               <div className={styles.gradientColorItem}>
            //                 <input
            //                   type="color"
            //                   value={
            //                     jubo.designInfo.backgroundInfo
            //                       .gradientcolorfirst
            //                   }
            //                   onChange={(e) =>
            //                     setGradientColorFirst(e.target.value)
            //                   }
            //                 />
            //                 <div>
            //                   <p>시작 색상</p>
            //                   <span>그라데이션의 시작 지점 색상입니다.</span>
            //                 </div>
            //               </div>

            //               <div className={styles.gradientColorItem}>
            //                 <input
            //                   type="color"
            //                   value={
            //                     jubo.designInfo.backgroundInfo
            //                       .gradientcolorsecond
            //                   }
            //                   onChange={(e) =>
            //                     setGradientColorSecond(e.target.value)
            //                   }
            //                 />
            //                 <div>
            //                   <p>끝 색상</p>
            //                   <span>
            //                     그라데이션이 끝나는 지점의 색상입니다.
            //                   </span>
            //                 </div>
            //               </div>

            //               <div className={styles.directionSelector}>
            //                 <p>방향</p>
            //                 <div className={styles.selectWrapper}>
            //                   <div className={styles.iconBox}>
            //                     {SelectedIcon ? (
            //                       <SelectedIcon size={18} />
            //                     ) : (
            //                       <div className={styles.noIcon} />
            //                     )}
            //                   </div>
            //                   <select
            //                     value={
            //                       jubo.designInfo.backgroundInfo
            //                         .gradientdirection
            //                     }
            //                     onChange={(e) =>
            //                       setGradientDirection(e.target.value)
            //                     }
            //                   >
            //                     {Object.entries(POSITION_MAP).map(
            //                       ([value, { label }]) => (
            //                         <option key={value} value={value}>
            //                           {label}
            //                         </option>
            //                       )
            //                     )}
            //                   </select>
            //                 </div>
            //               </div>
            //             </div>
            //           )}
            //           {activeBackType === "image" && (
            //             <div className={styles.imageUploadSection}>
            //               <div className={styles.imageSection}>
            //                 {jubo.designInfo.backgroundInfo.backgroundImage ? (
            //                   <>
            //                     <div className={styles.imgPreviewSection}>
            //                       <div className={styles.imgPreviewWrapper}>
            //                         <img
            //                           src={
            //                             jubo.designInfo.backgroundInfo
            //                               .backgroundImage
            //                           }
            //                           alt="Uploaded image"
            //                           className={styles.imgPreview}
            //                         />
            //                         <button
            //                           className={styles.removeImgButton}
            //                           onClick={() =>
            //                             setBackGroundImage(null, null)
            //                           }
            //                         >
            //                           <X className={styles.iconSmall} />
            //                         </button>
            //                       </div>
            //                       <label className={styles.imgFileName}>
            //                         <Upload className={styles.iconSmall} />
            //                         <span>이미지 변경</span>
            //                         <input
            //                           type="file"
            //                           onChange={ReadBgImg}
            //                           className={styles.hiddenInput}
            //                           accept="image/*"
            //                         />
            //                       </label>
            //                     </div>
            //                     <div className={styles.imgControls}>
            //                       <div className={styles.imgOpacityControl}>
            //                         <h3>투명도 크기</h3>
            //                         <div className={styles.spacingControl}>
            //                           <span>
            //                             {
            //                               jubo.designInfo.backgroundInfo
            //                                 .imgopacity
            //                             }
            //                             %
            //                           </span>
            //                           <input
            //                             type="range"
            //                             min="0"
            //                             max="100"
            //                             value={
            //                               jubo.designInfo.backgroundInfo
            //                                 .imgopacity
            //                             }
            //                             onChange={(e) =>
            //                               setImgOpacity(e.target.value)
            //                             }
            //                             style={{
            //                               backgroundSize: `${jubo.designInfo.backgroundInfo.imgopacity}% 100%`,
            //                             }}
            //                           />
            //                         </div>
            //                       </div>
            //                     </div>
            //                   </>
            //                 ) : (
            //                   <>
            //                     <div className={styles.headerDesignTab}>
            //                       <button
            //                         className={`${styles.headerTabButton} ${
            //                           activeBackImgTab === "upload"
            //                             ? styles.activeDesignTab
            //                             : ""
            //                         }`}
            //                         onClick={() =>
            //                           setActiveBackImgTab("upload")
            //                         }
            //                       >
            //                         업로드
            //                       </button>
            //                       <button
            //                         className={`${styles.headerTabButton} ${
            //                           activeBackImgTab === "sample"
            //                             ? styles.activeDesignTab
            //                             : ""
            //                         }`}
            //                         onClick={() =>
            //                           setActiveBackImgTab("sample")
            //                         }
            //                       >
            //                         샘플
            //                       </button>
            //                     </div>

            //                     {activeBackImgTab === "upload" && (
            //                       <div className={styles.uploadSection}>
            //                         <label className={styles.uploadButton}>
            //                           <input
            //                             type="file"
            //                             onChange={ReadBgImg}
            //                             className={styles.hiddenInput}
            //                             accept="image/*"
            //                           />
            //                           <div className={styles.uploadContent}>
            //                             <Image className={styles.iconSmall} />
            //                             <span className={styles.primaryText}>
            //                               배경 이미지 업로드
            //                             </span>
            //                             <span className={styles.secondaryText}>
            //                               클릭하거나 드래그하여 업로드
            //                             </span>
            //                           </div>
            //                         </label>
            //                       </div>
            //                     )}

            //                     {activeBackImgTab === "sample" && (
            //                       <div className={styles.sampleSection}>
            //                         <p className={styles.sampleTitle}>
            //                           샘플 이미지를 선택하세요
            //                         </p>
            //                         {/* header 전용 그리드 */}
            //                         <div className={styles.headerSampleGrid}>
            //                           <div
            //                             className={`${
            //                               styles.headerSampleItem
            //                             } ${
            //                               jubo.designInfo.backgroundInfo
            //                                 .backgroundImage === img1
            //                                 ? styles.selected
            //                                 : ""
            //                             }`}
            //                             onClick={() =>
            //                               setBackGroundImage(img1, "Sample 1")
            //                             }
            //                           >
            //                             <img
            //                               src={img1}
            //                               alt="Sample 1"
            //                               className={styles.headerSampleImage}
            //                             />
            //                           </div>

            //                           <div
            //                             className={`${
            //                               styles.headerSampleItem
            //                             } ${
            //                               jubo.designInfo.backgroundInfo
            //                                 .backgroundImage === img2
            //                                 ? styles.selected
            //                                 : ""
            //                             }`}
            //                             onClick={() =>
            //                               setBackGroundImage(img2, "Sample 2")
            //                             }
            //                           >
            //                             <img
            //                               src={img2}
            //                               alt="Sample 2"
            //                               className={styles.headerSampleImage}
            //                             />
            //                           </div>

            //                           <div
            //                             className={`${
            //                               styles.headerSampleItem
            //                             } ${
            //                               jubo.designInfo.backgroundInfo
            //                                 .backgroundImage === img3
            //                                 ? styles.selected
            //                                 : ""
            //                             }`}
            //                             onClick={() =>
            //                               setBackGroundImage(img3, "Sample 3")
            //                             }
            //                           >
            //                             <img
            //                               src={img3}
            //                               alt="Sample 3"
            //                               className={styles.headerSampleImage}
            //                             />
            //                           </div>

            //                           <div
            //                             className={`${
            //                               styles.headerSampleItem
            //                             } ${
            //                               jubo.designInfo.backgroundInfo
            //                                 .backgroundImage === img4
            //                                 ? styles.selected
            //                                 : ""
            //                             }`}
            //                             onClick={() =>
            //                               setBackGroundImage(img4, "Sample 4")
            //                             }
            //                           >
            //                             <img
            //                               src={img4}
            //                               alt="Sample 4"
            //                               className={styles.headerSampleImage}
            //                             />
            //                           </div>
            //                         </div>
            //                       </div>
            //                     )}
            //                   </>
            //                 )}
            //               </div>
            //             </div>
            //           )}
            //         </div>
            //       </div>
            //     </div>
            //   ) : null}
            // </div>
            <HeaderSettingsTab />
          ) : null}

          {activeTab === "order" ? (
            <OrderTab />
          ) : null}

          {activeTab === "news" ? (
            <NewsTab />
          ) : null}
        </div>

        <div className={styles.previewContainer}>
          <div className={styles.previewTitle}>
            <Eye className={styles.icon} />
            <h2>실시간 미리보기</h2>
          </div>
          <div className={styles.previewContent}>
            <p>{jubo.churchInfo.churchName}</p>
            <p>{jubo.designInfo.textInfo.slogan}</p>
            <p>{jubo.designInfo.textInfo.title}</p>
            <p>{jubo.designInfo.textInfo.subtitle}</p>
            <span>
              그라데이션 방향:{" "}
              {POSITION_MAP[gradientdirection]?.label || "미설정"}
            </span>{" "}
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className={styles.overlay} onClick={() => closeModal()}>
          <div
            className={styles.modalWrapper}
            onClick={(e) => e.stopPropagation()}
          >
            <AModal />
          </div>
        </div>
      )}
    </div>
  );
};

export default EditorPage;
