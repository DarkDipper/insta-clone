import Link from "next/link";

type Props = {
  Icon: React.ReactNode;
  title: string;
};

export default function SideBarItem({ Icon, title }: Props) {
  return (
    <Link href="#" className="side-bar__item">
      <div className="side-bar__item__wrapper">
        {Icon}
        <p>{title}</p>
      </div>
    </Link>
  );
}
