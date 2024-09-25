import { useEffect, useState } from "react";

import { getOneAudio } from "@/components/services/apiServices";
import { useRouter } from "next/router";
import AudioPlay from "@/components/media/AudioPlay";

const MediaAudio = (props) => {
  const router = useRouter();
  const { nam } = router.query;
  const [ifAudio, setIfAudio] = useState();
  const { dataA } = props;

  useEffect(() => {
    const getIf = async () => {
      if (nam) {
        setIfAudio(dataA.data?.audio);
      }
    };
    getIf();
  }, [nam, dataA.data]);

  return <>{ifAudio ? <AudioPlay audio={ifAudio} /> : ""}</>;
};
export default MediaAudio;
export async function getServerSideProps(ctx) {
  const { nam } = ctx.params;

  const dataA = await getOneAudio(nam);
  return { props: { dataA } };
}
