type Props = {
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
};

export default function IconButton({
  children,
  onClick,
  className = "",
}: Props): JSX.Element {
  return (
    <button className={`icon-button ${className}`} onClick={onClick}>
      {children}
    </button>
  );
}
