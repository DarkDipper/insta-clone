import Image from "next/image";

type Props = {
  src?: string;
};
export default function Avatar({
  src = "https://i.imgur.com/uITbeDy.png",
}: Props) {
  // const [Loaded, setLoaded] = useState(false);
  return (
    <div className="avatar">
      <Image
        src={src}
        alt="avatar"
        sizes="100%"
        fill
        draggable={false}
        // onLoadingComplete={() => setLoaded(true)}
      />
    </div>
  );
}
