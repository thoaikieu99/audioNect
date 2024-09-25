"use client";
import Audio from "./Audio";

const ListAudio = (props) => {
  let listAudio = props?.onList;
  if (props.listTop) {
    listAudio = props.listTop?.data;
  }
  let mdd = 4;
  if (props.mdsize) {
    mdd = props.mdsize;
  }
  const ListAudio = listAudio?.map((value, index) => {
    let audio = value;
    if (value.Audio) {
      audio = value.Audio;
    }
    return (
      <div
        className={`col-6 col-sm-3 col-lg-2 col-md-${mdd} cardAudio`}
        key={`audio-${index}`}
      >
        <Audio
          slug={audio.slug}
          image={`${audio.image}`}
          sotap={audio.sotap}
          title={audio.title}
          content={audio.content}
        />
      </div>
    );
  });

  return (
    <div className="ListAudio">
      <div className="row">{ListAudio}</div>
    </div>
  );
};
export default ListAudio;
