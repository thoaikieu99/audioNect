import TopAudio from "./TopAudio";

const ListTopAudio = (props) => {
  const ListAudio = props.listTop?.data.map((value, index) => {
    let audio = value.Audio;
    return (
      <li className="aaa" key={"listTop-" + index}>
        <TopAudio
          title={audio?.title}
          slug={audio.slug}
          image={audio.image}
          sotap={audio.sotap}
        />
      </li>
    );
  });

  return (
    <div className="ListTopAudi">
      <ul className="ultop">{ListAudio}</ul>
    </div>
  );
};
export default ListTopAudio;
