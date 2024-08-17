import { RouterProvider } from "react-router-dom";
import { router } from "../../Routes/router";
import { useEffect, useRef } from "react";

export const App = () => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let ts: number | undefined;
    const onTouchStart = (e: TouchEvent) => {
      ts = e.touches[0].clientY;
    };
    const onTouchMove = (e: TouchEvent) => {
      if (ref.current) {
        const scroll = ref.current.scrollTop;
        const te = e.changedTouches[0].clientY;
        if (scroll <= 0 && ts! < te) {
          e.preventDefault();
        }
      } else {
        e.preventDefault();
      }
    };
    document.documentElement.addEventListener("touchstart", onTouchStart, {
      passive: false,
    });
    document.documentElement.addEventListener("touchmove", onTouchMove, {
      passive: false,
    });
  }, []);

  return (
    <div ref={ref} className="w-screen h-screen">
      <RouterProvider router={router} />
    </div>
  );
};
