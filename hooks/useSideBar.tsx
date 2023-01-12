import { useEffect, useState } from "react";
import useComponentVisible from "./useComponentVisible";

function useSideBar() {
  const [hide, setHide] = useState(false);
  const {
    externalComponentRef: buttonSearchRef,
    ref: searchBarRef,
    isComponentVisible: searchBarVisible,
    setIsComponentVisible: setSearchBarVisible,
  } = useComponentVisible(false);
  // useEffect();
  return undefined;
}

export default useSideBar;
