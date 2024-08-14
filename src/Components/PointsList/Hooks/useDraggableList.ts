import { useEffect, useState } from "react";

interface Props {
  touchAreaHeight: number;
  maxVisibleItems: number;
  itemSize: number;
  itemsCount: number;
}

export const useDraggableList = ({
  touchAreaHeight,
  maxVisibleItems,
  itemSize,
  itemsCount,
}: Props) => {
  const maxVisibleHeight = Math.min(
    maxVisibleItems * itemSize + 28,
    itemsCount * itemSize + 28
  );
  /* console.log("maxVisibleHeight", maxVisibleHeight);
   */
  const midVisibleHeight =
    itemsCount > 3 ? 3 * itemSize + 28 : itemsCount * itemSize + 28;
  const minVisibleHeight = touchAreaHeight;

  const minMidCenter = (midVisibleHeight - minVisibleHeight) / 2;
  const midMaxCenter =
    (maxVisibleHeight - midVisibleHeight) / 2 + midVisibleHeight;

  const height = Math.min(
    itemSize * (itemsCount ?? 0) + touchAreaHeight,
    maxVisibleHeight
  );
  /*   console.log("height", height); */

  const getVisibleHeight = (actualHeight: number) => {
    if (actualHeight > midMaxCenter) {
      return maxVisibleHeight;
    }
    if (actualHeight <= midMaxCenter && actualHeight >= minMidCenter) {
      return midVisibleHeight;
    }
    return minVisibleHeight;
  };

  const [visibleHeight, setVisibleHeight] = useState(minVisibleHeight);
  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    setVisibleHeight(
      Math.min(maxVisibleItems * itemSize + 28, itemsCount * itemSize + 28)
    );
  }, [itemsCount]);

  const onTouchStart = ({
    changedTouches,
  }: React.TouchEvent<HTMLButtonElement>) => {
    setDragging(true);
    const { pageY: initialY } = changedTouches.item(0);
    const initVisibleHeight = visibleHeight;

    const onTouchMove = ({ changedTouches }: globalThis.TouchEvent) => {
      const touchData = changedTouches.item(0);
      if (!touchData) return;
      const { pageY: actualY } = touchData;
      const deltaY = actualY - initialY;
      if (deltaY > height) {
        return;
      }
      const changedVisibleHeight = initVisibleHeight - deltaY;
      if (
        changedVisibleHeight > maxVisibleHeight ||
        changedVisibleHeight < touchAreaHeight
      ) {
        return;
      }
      setVisibleHeight(changedVisibleHeight);
    };

    window.addEventListener("touchmove", onTouchMove);
    window.ontouchend = ({ changedTouches }) => {
      setDragging(false);
      const { pageY: actualY } = changedTouches.item(0) as Touch;
      const deltaY = actualY - initialY;
      const changedVisibleHeight = initVisibleHeight - deltaY;

      setVisibleHeight(getVisibleHeight(changedVisibleHeight)!);
      window.removeEventListener("touchmove", onTouchMove);
      window.ontouchend = null;
    };
  };

  const isFullOpen = visibleHeight === maxVisibleHeight;

  const setHeight = (type: "min" | "mid" | "max") => {
    switch (type) {
      case "min":
        setVisibleHeight(touchAreaHeight);
        break;
      case "mid":
        setVisibleHeight(midVisibleHeight);
        break;
      case "max":
        setVisibleHeight(maxVisibleHeight);
        break;

      default:
        break;
    }
  };

  const visibleHeightType =
    visibleHeight === minVisibleHeight
      ? "min"
      : visibleHeight === midVisibleHeight
        ? "mid"
        : "max";

  return {
    visibleHeight: {
      value: visibleHeight,
      type: visibleHeightType,
    },
    onTouchStart,
    dragging,
    height,
    isFullOpen,
    setHeight,
  };
};
