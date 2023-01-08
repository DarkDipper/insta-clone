import { useState, useRef } from "react";
import { AiFillCloseCircle } from "react-icons/ai";

function SearchBar() {
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [Show, setShow] = useState(false);
  return (
    <>
      <button
        style={{ position: "absolute", right: "0", top: "0" }}
        onClick={() => {
          // setShow((preShow) => !preShow);
          // console.log("You click");
          if (searchInputRef.current !== null) {
            searchInputRef.current.focus();
          }
        }}
      >
        Click
      </button>
      <div
        className={`search-bar`}
        onClick={(e) => {
          // e.preventDefault();
          e.stopPropagation();
        }}
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
