import { useEffect, useState } from "react";

import { getOneAudio } from "@/components/services/apiServices";
import { useRouter } from "next/router";
import AudioPlay from "@/components/media/AudioPlay";
import Loading from "@/components/ui/loading";
import LoadingModel from "@/components/ui/loadingModel";

const MediaAudio = () => {
  const router = useRouter();
  const { nam } = router.query;
  const [ifAudio, setIfAudio] = useState();
  const [isLoad, setIsLoad] = useState(true);

  const getIf = async () => {
    if (nam) {
      const dataA = await getOneAudio(nam);
      setIfAudio(dataA.data?.audio);
      setIsLoad(false);
    }
  };
  useEffect(() => {
    setIsLoad(true);
    getIf();
  }, [nam]);
  if (isLoad) {
    return <LoadingModel />;
  }

  return <>{ifAudio ? <AudioPlay audio={ifAudio} /> : ""}</>;
};
export default MediaAudio;
