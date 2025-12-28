import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  User,
  Music,
  BookHeart,
  Heart,
  BookOpen,
  Music4,
  Mic,
  Gift,
  Megaphone,
  Sparkles,
  MoreHorizontal,
  GripVertical,
  SquarePen,
  Trash2,
} from "lucide-react";
import styles from "./SortableOrderItem.module.css";

const SortableOrderItem = ({ order, index, editOrder, deleteOrder }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: order.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 999 : "auto",
    opacity: isDragging ? 0.5 : 1,
    touchAction: "none",
    position: "relative",
  };

  const categoryClass =
    order.ordercategory === "예배로 부름 / 인도"
      ? "call"
      : order.ordercategory === "찬송"
      ? "hymn"
      : order.ordercategory === "신앙고백"
      ? "creed"
      : order.ordercategory === "기도"
      ? "prayer"
      : order.ordercategory === "성경봉독"
      ? "scripture"
      : order.ordercategory === "찬양대 / 특송"
      ? "choir"
      : order.ordercategory === "설교"
      ? "sermon"
      : order.ordercategory === "헌금 / 봉헌"
      ? "offering"
      : order.ordercategory === "광고"
      ? "notice"
      : order.ordercategory === "축도"
      ? "benediction"
      : order.ordercategory === "직접 입력"
      ? "custom"
      : "";

  const CategoryIcon =
    order.ordercategory === "예배로 부름 / 인도"
      ? User
      : order.ordercategory === "찬송"
      ? Music
      : order.ordercategory === "신앙고백"
      ? BookHeart
      : order.ordercategory === "기도"
      ? Heart
      : order.ordercategory === "성경봉독"
      ? BookOpen
      : order.ordercategory === "찬양대 / 특송"
      ? Music4
      : order.ordercategory === "설교"
      ? Mic
      : order.ordercategory === "헌금 / 봉헌"
      ? Gift
      : order.ordercategory === "광고"
      ? Megaphone
      : order.ordercategory === "축도"
      ? Sparkles
      : order.ordercategory === "직접 입력"
      ? MoreHorizontal
      : null;

  return (
    <div ref={setNodeRef} style={style} className={styles.orderItem}>
      <div className={styles.leftGroup} {...attributes} {...listeners}>
        <GripVertical className={styles.dragHandle} />
      </div>

      {CategoryIcon && <CategoryIcon className={styles.icon} />}

      <div className={styles.indexBadge}>{index + 1}</div>

      <div className={styles.orderDetails}>
        <div className={styles.orderHeader}>
          <p className={styles[categoryClass]}>{order.ordercategory}</p>
        </div>
        <h3>{order.orderTitle}</h3>
        <span>{order.orderContent}</span>
      </div>

      <div className={styles.orderActions}>
        <button className={styles.editBtn} onClick={() => editOrder(order)}>
          <SquarePen className={styles.Actionicon} />
        </button>
        <button className={styles.deleteBtn} onClick={() => deleteOrder(order)}>
          <Trash2 className={styles.Actionicon} />
        </button>
      </div>
    </div>
  );
};

export default SortableOrderItem;