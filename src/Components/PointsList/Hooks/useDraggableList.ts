import { useEffect, useState } from "react";

interface Props {
  touchAreaHeight: number;
  maxVisibleItems: number;
  itemSize: number;
  itemsCount: number;
}

const getSizes = ({
  maxVisibleItems,
  itemsCount,
  itemSize,
  touchAreaHeight,
}: {
  maxVisibleItems: number;
  itemsCount: number;
  itemSize: number;
  touchAreaHeight: number;
}) => {
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
  return {
    maxVisibleHeight,
    midVisibleHeight,
    minVisibleHeight,
    minMidCenter,
    midMaxCenter,
    height,
  };
};

export const useDraggableList = (props: Props) => {
  const { touchAreaHeight, itemsCount } = props;

  const {
    maxVisibleHeight,
    midVisibleHeight,
    minVisibleHeight,
    minMidCenter,
    midMaxCenter,
    height,
  } = getSizes(props);

  const getStateFromCurrentHeight = (actualHeight: number) => {
    if (actualHeight > midMaxCenter) {
      return "max";
    }
    if (actualHeight <= midMaxCenter && actualHeight >= minMidCenter) {
      return "mid";
    }
    return "min";
  };

  const [visibleHeight, setVisibleHeight] = useState(minVisibleHeight);
  const [state, setState] = useState<"min" | "mid" | "max">("mid");
  const [dragging, setDragging] = useState(false);

  const setHeight = (type: "min" | "mid" | "max") => {
    console.log(type);

    switch (type) {
      case "min":
        console.log("ehre");

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

  useEffect(() => {
    setHeight(state);
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
      const newState = getStateFromCurrentHeight(changedVisibleHeight);
      setState(newState);
      setHeight(newState);
      window.removeEventListener("touchmove", onTouchMove);
      window.ontouchend = null;
    };
  };

  const isFullOpen = visibleHeight === maxVisibleHeight;

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
