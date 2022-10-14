import { arrayMoveImmutable } from "array-move";
import * as React from "react";
import { HiDotsVertical } from "react-icons/hi";
import { RiDragDropLine } from "react-icons/ri";
import {
  SortableContainer,
  SortableElement,
  SortableHandle,
} from "react-sortable-hoc";
import { ShopItemContext } from "./ShopItemContext";
import styles from "./ShopItem.module.css";

const DragHandle = SortableHandle(() => (
  <span className={styles.card__drag}>
    <RiDragDropLine size={25} />{" "}
  </span>
));

const SortableContainerComp: any = SortableContainer(
  ({ children }: { children: React.ReactNode }) => {
    return <div className={styles.card__container}>{children}</div>;
  }
);

const SortableItem: any = SortableElement(
  ({ value, index }: { value: any; index: number }) => {
    const handleChange = (e: any) => {
      const { name, checked } = e.target;
    };
    return (
      <div key={index} className={styles.card}>
        <div className={styles.input__checkbox}>
          <input
            type="checkbox"
            name={`checkbox-${value.id}`}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className={styles.card__left}>
          <div className={styles.card__img}>
            <img src={value.image} alt="" />
          </div>
          <div>
            <div className={styles.card__title}>{value.title}</div>
            <div className={styles.card__descp}>{value.description}</div>
          </div>
        </div>
        <div className={styles.card__fixed}>Fixed Price</div>
        <div className={styles.card__price}>{value.price}</div>
        <div className={styles.card__right}>
          <DragHandle />
          <HiDotsVertical size={25} />
        </div>
      </div>
    );
  }
);

export default function ShopItemGrid() {
  const { items, setItems } = React.useContext(ShopItemContext);

  const onSortEnd = ({
    oldIndex,
    newIndex,
  }: {
    oldIndex: number;
    newIndex: number;
  }) => setItems(arrayMoveImmutable(items, oldIndex, newIndex));

  return (
    <div>
      <SortableContainerComp onSortEnd={onSortEnd} useDragHandle>
        {items.map((item: any, index: number) => (
          <SortableItem key={index} index={index} value={item} />
        ))}
      </SortableContainerComp>
    </div>
  );
}
