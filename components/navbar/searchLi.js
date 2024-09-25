import TopAudio from "../topAudio/TopAudio";

const SearchLi = (props) => {
  const ListAudio = props.listTop.rows.map((value, index) => {
    let audio = value;
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
export default SearchLi;
