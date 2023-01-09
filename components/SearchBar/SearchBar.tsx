import { useState, useRef } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import useComponentVisible from "../../hooks/useComponentVisible";

function SearchBar() {
  const searchInputRef = useRef<HTMLInputElement>(null);
  const {
    externalComponentRef,
    ref,
    isComponentVisible,
    setIsComponentVisible,
  } = useComponentVisible(false);
  // console.log("re-render");
  return (
    <>
      <button
        ref={externalComponentRef}
        style={{ position: "absolute", right: "0", top: "0" }}
        onClick={(e) => {
          e.preventDefault();
          setIsComponentVisible((prev) => {
            return !prev;
          });
          if (searchInputRef.current !== null) {
            searchInputRef.current.focus();
          }
        }}
      >
        Click
      </button>
      <div
        ref={ref}
        className={`search-bar ${isComponentVisible ? "show" : ""}`}
      >
        <header className="search-bar__header">
          <h2 className="search-bar__header__title">Search</h2>
          <div className="search-bar__header__input">
            <input
              ref={searchInputRef}
              type="search"
              name="search"
              id="search"
            />
            <button className="search-bar__header__input__close-icon">
              <AiFillCloseCircle size={20} />
            </button>
          </div>
        </header>
        <main className="search-bar__results"></main>
      </div>
    </>
  );
}

export default SearchBar;
