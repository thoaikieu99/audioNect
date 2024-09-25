import { useEffect, useRef, useState } from "react";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import PerfectScrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";
import { Container, Row } from "react-bootstrap";
import { useCookies } from "react-cookie";
import { getApiAddViews } from "../services/apiServices";
const NodeRSA = require("node-rsa");
const AudioPlay = (props) => {
  const { audio } = props;
  const [playlist, setPlaylist] = useState("");
  useEffect(() => {
    const key1 = new NodeRSA();
    let data2 =
      "-----BEGIN RSA PRIVATE KEY-----MIIBOQIBAAJBAJR0XQoVGAA82ryNnUrEg7zrKm2qkWKPRPWCLXV1XXKTp96iqzGuXZFPnXemuvchmCPW5LSmQLXL5rA2DxOfGE8CAwEAAQJAWerNO8EhA2vYlSI1Zkb3ACN0VG5eltLuUsHhZOaMjkuhJniZRTJ/mRTrep5uSAilh9XIiNO5EpDTD08IzOrUMQIhANuwkriblKRHYPqrfJ2mzc0cPBQeobcLwNY+QTYPpjl5AiEArP225ij7YBLYr46U+LYy7k9ef+2+g2TON/vy5jyUNgcCIAvv3zkKsxvuCPX15XKHgr03YIhTVcQlblf10ANI/GY5AiBXBlehV5KF1VVOk9Lbf4UFn8XxY1+I6AhZ35RlQKpqtwIgJkbNqu0ZwYizS1BzXaHUAF5Mfln5jyAQHPBVXJ1WoAE=-----END RSA PRIVATE KEY-----";
    key1.importKey(data2, "pkcs1-pem");
    const decryptedString = key1.decrypt(audio.link_audio, "utf8").slice(1, -1);
    setPlaylist(decryptedString.split("<br>"));
  }, []);

  const STARTTIME = "startime-" + audio.id;
  const SPEED = "startspeed-" + audio.id;
  const INDEXAU = "track-" + audio.id;
  const LINKAU = "linkk-" + audio.id;
  const MAXAGE = 7 * 24 * 3600;

  const [isplaya, setIsplaya] = useState(false);
  const [stsv1, setStsv1] = useState(true);
  const [timeoff, setTimeoff] = useState(0);

  const [cookies, setCookie] = useCookies();

  const [covertTime, setCovertTime] = useState();
  const [hidetime, setHidetime] = useState(false);
  //setData cookies
  const [cookieTime, setCookieTime] = useState();
  const [cookieIndex, setCookieIndex] = useState();
  const [cookieSpeed, setCookieSpeed] = useState();
  const [cookieLink, setCookieLink] = useState();
  const [isclick, setIsclick] = useState(false);

  //data hien tai
  const [speed, setSpeed] = useState(1);
  const [checkCook, setCheckCook] = useState(false);
  const [currentTrack, setTrackIndex] = useState(0);
  const buttonRef = useRef(null);

  useEffect(() => {
    setCookieLink(cookies[LINKAU]);
    setCookieIndex(cookies[INDEXAU]);
    setCookieTime(cookies[STARTTIME]);
    setCookieSpeed(cookies[SPEED]);
    if (cookies[STARTTIME]) {
      setCheckCook(true);
      const coverTime = (totalSeconds) => {
        let hours = Math.floor(totalSeconds / 3600);
        totalSeconds %= 3600;
        let minutes = Math.floor(totalSeconds / 60);
        let seconds = totalSeconds % 60;
        let time = `${hours < 10 ? "0" + hours : hours}:${
          minutes < 10 ? "0" + minutes : minutes
        }:${seconds < 10 ? "0" + seconds : seconds}`;
        return time;
      };
      setCovertTime(coverTime(cookies[STARTTIME]));
    }
  }, []);

  useEffect(() => {
    buttonRef.current.audio.current.playbackRate = speed;
  }, [buttonRef, speed]);

  const addv = async () => {
    await getApiAddViews(audio.id);
  };
  useEffect(() => {
    const timer = setTimeout(() => {
      addv();
    }, 200);
    return () => clearTimeout(timer);
  }, [audio.id]);

  useEffect(() => {
    const collection = document.getElementsByClassName("audio active");
    collection[0].scrollIntoView(false);
  }, [currentTrack]);

  const handleClickPrevious = () => {
    setTrackIndex((currentTrack) => (currentTrack > 1 ? currentTrack - 1 : 0));
  };
  const handleClickNext = () => {
    setTrackIndex((currentTrack) =>
      currentTrack < playlist.length - 1 ? currentTrack + 1 : 0
    );
  };
  const handleEnd = () => {
    setTrackIndex((currentTrack) =>
      currentTrack < playlist.length - 1 ? currentTrack + 1 : 0
    );
  };

  const saveLocal = (currentTime, scr) => {
    if (isplaya) {
      let time = parseInt(currentTime);
      if (time && speed && currentTrack !== "" && scr) {
        setCookie(STARTTIME, time, { maxAge: MAXAGE });
        setCookie(SPEED, speed, { maxAge: MAXAGE });
        setCookie(INDEXAU, currentTrack, { maxAge: MAXAGE });
        setCookie(LINKAU, scr, { maxAge: MAXAGE });
      }
    }
  };

  const hangeClick = (ev) => {
    let id = parseInt(ev.target.id);
    setTrackIndex(id);
  };
  const formatTime = (timer) => {
    const getSeconds = `0${timer % 60}`.slice(-2);
    const minutes = `${Math.floor(timer / 60)}`;
    const getMinutes = `0${minutes % 60}`.slice(-2);
    const getHours = `0${Math.floor(timer / 3600)}`.slice(-2);

    return `${getHours} : ${getMinutes} : ${getSeconds}`;
  };
  var timmmmm;
  let ListAudio =
    playlist !== "" ? (
      playlist.map((value, index) => {
        return (
          <div
            key={"audio-" + index}
            id={index}
            className={`audio ${currentTrack === index ? "active" : ""}`}
            onClick={hangeClick}
          >
            Tập {index + 1}
          </div>
        );
      })
    ) : (
      <div
        key={"audio-" + 1}
        id={0}
        className={`audio active`}
        onClick={hangeClick}
      >
        Tập {0 + 1}
      </div>
    );

  const loaded = () => {
    let audio = buttonRef?.current?.audio?.current;

    if (audio) {
      audio.playbackRate = speed;
      if (isclick) {
        setIsclick(false);
        audio.currentTime = parseInt(cookieTime);
        audio?.play();
      }
    }
  };

  const ngheTiepClick = () => {
    setIsclick(true);
    let position = cookieLink.search("fileatf.synology.me");
    if (position == -1) {
      sv1();
    } else {
      svVip();
    }

    setTrackIndex(cookieIndex);
    if (cookieIndex === currentTrack) {
      let audio = buttonRef?.current?.audio?.current;
      audio.currentTime = parseInt(cookieTime);
    }
    setSpeed(cookieSpeed);
  };
  const connPlay = () => {
    setIsplaya(true);
    console.log("aplay");
  };
  const connPause = () => {
    setIsplaya(false);
    console.log("apau");
  };
  const ll = (
    <AudioPlayer
      header={<h3 style={{ textAlign: "center" }}>{audio.title}</h3>}
      src={playlist[currentTrack]}
      onPlay={connPlay}
      onPause={connPause}
      showSkipControls
      customAdditionalControls={[]}
      customVolumeControls={[]}
      onLoadedData={loaded}
      progressJumpSteps={{ backward: 10000, forward: 10000 }}
      showDownloadProgress
      onClickNext={handleClickNext}
      onClickPrevious={handleClickPrevious}
      onEnded={handleEnd}
      footer={
        <>
          <input
            type="range"
            min="0.1"
            max="5"
            step={0.1}
            value={speed}
            onChange={(e) => setSpeed(e.target.value)}
            style={{ width: "calc(100% - 36px)" }}
          />
          <span> {speed}x</span>
        </>
      }
      ref={buttonRef}
      onListen={(ec) => saveLocal(ec.target.currentTime, ec.target.currentSrc)}
    />
  );
  const sv1 = () => {
    setStsv1(true);
  };
  const svVip = () => {
    const aa = playlist;
    aa.forEach((item, index, array) => {
      array[index] = array[index].replace(
        "archive.org/download",
        "fileatf.synology.me/audio"
      );
    });
    setPlaylist(aa);

    setStsv1(false);
  };
  function clearTime() {
    clearTimeout(timmmmm);
  }
  useEffect(() => {
    timmmmm = setInterval(() => {
      if (timeoff < 1) {
        let audio = buttonRef?.current?.audio?.current;
        audio.pause();
        clearTime();
        return 1;
      }
      console.log(timeoff);
      setTimeoff((timeoff) => timeoff - 1);
    }, 1000);
    return () => clearTime();
  }, [timeoff]);
  return (
    <div className="d-flex res justify-content-center align-items-center ">
      <div className="AudioPlay col-12 col-sm-7 col-md-6 rounded-3 shadow-lg bg-body ">
        <div className="list">
          {ll}
          <div
            className="ngheTiep"
            style={checkCook ? { display: "block" } : { display: "none" }}
          >
            <span className="tii" onClick={ngheTiepClick}>
              Nghe Tiếp {covertTime}
            </span>
          </div>
          <div style={{ position: "relative", paddingBottom: "10px" }}>
            <span
              className={`tii ${stsv1 ? "acc" : null}`}
              style={{ padding: "0 20px 0 20px" }}
              onClick={sv1}
            >
              Sv1
            </span>
            <span
              className={`tii ${stsv1 ? null : "acc"}`}
              style={{ padding: "0 20px 0 20px" }}
              onClick={svVip}
            >
              Sv-Vip
            </span>
            <select
              className={`form-select ${hidetime ? "abcd" : null}`}
              style={{
                width: "100px",
                padding: "0 1rem 0 0.45rem",
                display: "inline",
                position: "absolute",
                right: "0",
              }}
              onChange={(e) => {
                if (e.target.value != 0) {
                  setTimeoff(e.target.value * 60);
                  setHidetime(true);
                }
              }}
              defaultValue="0"
            >
              <option value="0">Hẹn giờ</option>
              <option value="10">10 phút</option>
              <option value="20">20 phút</option>
              <option value="30">30 phút</option>
              <option value="40">40 phút</option>
              <option value="60">60 phút</option>
              <option value="90">90 phút</option>
              <option value="120">120 phút</option>
              <option value="180">180 phút</option>
            </select>
            <span
              className={`${hidetime ? null : "abcd"}`}
              style={{
                paddingRight: "20px",
                display: "inline",
                position: "absolute",
                right: "0",
              }}
              onClick={() => {
                clearTime();
                setHidetime(false);
              }}
            >
              {formatTime(timeoff)}
            </span>
          </div>
          <PerfectScrollbar>
            <Container>
              <Row className="justify-content-md-center">
                <div className="lisAudio">{ListAudio}</div>
              </Row>
            </Container>
          </PerfectScrollbar>
        </div>
      </div>
    </div>
  );
};

export default AudioPlay;
