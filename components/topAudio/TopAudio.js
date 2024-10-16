import Image from "next/image";
import Link from "next/link";

const TopAudio = (props) => {
  const imageLoader = ({ src, width, quality }) => {
    return `${src}`
  }
  return (
    <div className="TopAudio">
      <Link
        href={`nghe-truyen/${props.slug}`}
        title={props.title}
        className="thumb"
      >
        <Image
        loader={imageLoader}
        src={`http://47.129.182.111:8081/rez/${props.image}`}
          width={60}
          height={60}
          alt={props.title}
          unoptimized={true} 
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
