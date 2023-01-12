import { useState, useEffect, useRef } from "react";

export default function useComponentVisible(initialIsVisible: boolean) {
  const [isComponentVisible, setIsComponentVisible] =
    useState(initialIsVisible);
  const externalComponentRef = useRef<HTMLDivElement>(null);
  const ref = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      // console.log(externalComponentRef === event.currentTarget);
      if (
        externalComponentRef.current &&
        !externalComponentRef.current.contains(event.target as Node)
      ) {
        // console.log("First if");
        setIsComponentVisible(false);
      } else if (externalComponentRef.current === null) {
        // console.log("Second if");
        setIsComponentVisible(false);
      }
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  return {
    externalComponentRef,
    ref,
    isComponentVisible,
    setIsComponentVisible,
  };
}
