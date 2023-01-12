import Link from "next/link";
import { MouseEvent, RefObject, forwardRef } from "react";
type Props = {
  Icon: React.ReactNode;
  title: string;
  hide: boolean;
  redDot?: boolean;
  handleItem: (e: MouseEvent) => void;
};

const SideBarItem = forwardRef<HTMLDivElement, Props>(
  ({ Icon, title, hide, redDot = false, handleItem }: Props, ref) => {
    return (
      <div
        ref={ref}
        className={`side-bar__item ${hide ? "hide" : ""}`}
        onClick={handleItem}
      >
        <div className="side-bar__item__wrapper">
          <div
            className={`side-bar__item__wrapper--icon ${
              redDot ? "red-dot" : ""
            }`}
          >
            {Icon}
          </div>
          <p className={`side-bar__item__wrapper--text`}>{title}</p>
        </div>
      </div>
    );
  }
);
SideBarItem.displayName = "SideBarItem";
export default SideBarItem;
