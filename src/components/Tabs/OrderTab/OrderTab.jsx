import useJuboStore from "../../../stores/useJuboStore";
import styles from "./OrderTab.module.css";
import { Plus } from "lucide-react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import SortableOrderItem from "../../Items/SortableOrderItem/SortableOrderItem.jsx";

const OrderTab = () => {
  const { jubo, editOrder, deleteOrder, openModal, reOrder } = useJuboStore();

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      reOrder(active.id, over.id);
    }
  };

  return (
    <div className={styles.orderContent}>
      <div className={styles.section}>
        <h3>예배 순서</h3>
        <button
          onClick={() => openModal("order")}
          className={styles.addNewsButton}
        >
          <Plus className={styles.iconSmall} />
          <p>예배 추가</p>
        </button>
      </div>
      <div className={styles.orderWrapper}>
        <div className={styles.orderListContainer}>
          {jubo.order.length === 0 ? (
            <p>추가된 예배 순서가 없습니다.</p>
          ) : (
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={jubo.order.map((order) => order.id)}
                strategy={verticalListSortingStrategy}
              >
                {jubo.order.map((order, index) => (
                  <SortableOrderItem
                    key={order.id}
                    order={order}
                    index={index}
                    editOrder={editOrder}
                    deleteOrder={deleteOrder}
                  />
                ))}
              </SortableContext>
            </DndContext>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderTab;
