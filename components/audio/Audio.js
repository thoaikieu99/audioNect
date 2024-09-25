import Image from "next/image";
import Link from "next/link";

const Audio = (props) => {
  const decodeHtmlCharCodes = (str) =>
    str.replace(/(&#(\d+);)/g, (match, capture, charCode) =>
      String.fromCharCode(charCode)
    );
  return (
    <>
      <div id="1312"></div>
      <Link
        href={`/nghe-truyen/${props.slug}`}
        title={decodeHtmlCharCodes(props.content)}
      >
        <Image
          src={`/rez/${props.image}`}
          width={130}
          height={190}
          alt={props.title}
        />
        <div className="divTile">
          <h6 itemProp="name">{props.title}</h6>
        </div>
        <span className="mlieps">
          TẬP<i>{props.sotap}</i>
        </span>
      </Link>
    </>
  );
};
export default Audio;
