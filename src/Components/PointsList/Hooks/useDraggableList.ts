import { useCallback, useEffect, useState } from "react";

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

  const setHeight = useCallback(
    (type: "min" | "mid" | "max") => {
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
    },
    [maxVisibleHeight, midVisibleHeight, touchAreaHeight]
  );

  useEffect(() => {
    setHeight(state);
  }, [itemsCount, setHeight, state]);

  /*   const onTouchStart = ({ */
  const onPointerDown = ({
    pageY: initialY,
  }: React.PointerEvent<HTMLButtonElement>) => {
    setDragging(true);
    /*     const { pageY: initialY } = changedTouches.item(0); */
    const initVisibleHeight = visibleHeight;

    const onPointerMove = ({ pageY: actualY }: PointerEvent) => {
      /*       const touchData = changedTouches.item(0);
      if (!touchData) return;
      const { pageY: actualY } = touchData; */
      const deltaY = actualY - initialY;
      console.log(actualY);

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

    window.addEventListener("pointermove", onPointerMove);
    window.onpointerup = ({ pageY: actualY }) => {
      setDragging(false);
      /*       const { pageY: actualY } = changedTouches.item(0) as Touch; */
      const deltaY = actualY - initialY;
      const changedVisibleHeight = initVisibleHeight - deltaY;
      const newState = getStateFromCurrentHeight(changedVisibleHeight);
      setState(newState);
      setHeight(newState);
      window.removeEventListener("pointermove", onPointerMove);
      window.onpointerup = null;
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
    onPointerDown,
    dragging,
    height,
    isFullOpen,
    setHeight,
  };
};
