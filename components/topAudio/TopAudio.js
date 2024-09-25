import Image from "next/image";
import Link from "next/link";

const TopAudio = (props) => {
  return (
    <div className="TopAudio">
      <Link
        href={`nghe-truyen/${props.slug}`}
        title={props.title}
        className="thumb"
      >
        <Image
          src={`/rez/${props.image}`}
          width={60}
          height={60}
          alt={props.title}
        />
      </Link>

      <h3 className="title">
        <Link href={`nghe-truyen/${props.slug}`} title={props.title}>
          {props.title}
        </Link>
      </h3>
      <p className="chapter">
        <Link href={`nghe-truyen/${props.slug}`} title={props.title}>
          Tap {props.sotap}
        </Link>
      </p>
    </div>
  );
};
export default TopAudio;
