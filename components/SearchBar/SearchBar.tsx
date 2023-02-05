import { useState, useRef, RefObject, useEffect } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import useComponentVisible from "../../hooks/useComponentVisible";
import useDebounce from "@yourapp/hooks/useDebounce";
import axios from "axios";
import Avatar from "../Avatar";
import Link from "next/link";

type Props = {
  searchBarRef: RefObject<HTMLDivElement>;
  searchBarVisible: boolean;
};
type userQueryObj = {
  _id: string;
  user_name: string;
  profile_picture: string;
}[];
function SearchBar({ searchBarRef, searchBarVisible }: Props) {
  const [searchText, setSearchText] = useState("");
  const searchQuery = useDebounce(searchText, 1000);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [usersSearch, setusersSearch] = useState<userQueryObj>([]);
  useEffect(() => {
    let source = axios.CancelToken.source();
    const getSearch = async () => {
      try {
        if (searchQuery.length >= 1) {
          const searchresult = await axios.get(
            "https://insta-clone-backend-rust.vercel.app/api/v1/user/searchUser",
            {
              params: { search: searchQuery },
              cancelToken: source.token,
            }
          );
          setusersSearch(searchresult.data["users"]);
        }
      } catch (error) {}
    };
    getSearch();
    return () => {
      source.cancel;
    };
  }, [searchQuery]);
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
              value={searchText}
              onChange={(e) => {
                e.preventDefault();
                setSearchText(e.target.value);
              }}
              type="search"
              name="search"
              id="search"
            />
            {searchText.length !== 0 && (
              <button
                className="search-bar__header__input__close-icon"
                onClick={(e) => {
                  e.preventDefault;
                  setSearchText("");
                }}
              >
                <AiFillCloseCircle size={20} />
              </button>
            )}
          </div>
        </header>
        <main className="search-bar__results">
          {usersSearch.map((user) => {
            return (
              <Link
                href={`/${user.user_name}`}
                className="user-search"
                key={user._id}
              >
                <div className="user-search-avatar">
                  <Avatar src={user.profile_picture} />
                </div>
                <p>{user.user_name}</p>
              </Link>
            );
          })}
        </main>
      </div>
    </>
  );
}

export default SearchBar;
