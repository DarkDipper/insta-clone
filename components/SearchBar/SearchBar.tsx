import { useState, useRef, RefObject } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import useComponentVisible from "../../hooks/useComponentVisible";

type Props = {
  searchBarRef: RefObject<HTMLDivElement>;
  searchBarVisible: boolean;
};

function SearchBar({ searchBarRef, searchBarVisible }: Props) {
  const searchInputRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <div
        ref={searchBarRef}
        className={`search-bar ${searchBarVisible ? "show" : ""}`}
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
