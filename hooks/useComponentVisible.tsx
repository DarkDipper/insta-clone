import { useState, useEffect, useRef } from "react";

export default function useComponentVisible(initialIsVisible: boolean) {
  const [isComponentVisible, setIsComponentVisible] =
    useState(initialIsVisible);
  const externalComponentRef = useRef<HTMLButtonElement>(null);
  const ref = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      if (
        externalComponentRef.current &&
        !externalComponentRef.current.isEqualNode(event.target as Node)
      ) {
        setIsComponentVisible(false);
      } else if (externalComponentRef.current === null) {
        // console.log("You clicked outside");
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
