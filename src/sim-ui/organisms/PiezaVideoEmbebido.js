import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import withWidth from "@material-ui/core/withWidth";
import { useTranslation } from "react-i18next";
import { Typography } from "@material-ui/core";
import { loadAsync } from "jszip";
import VisitUrl from "./VisitUrl";

const isYoutube = (youtubeLink) => {
  if (!youtubeLink) return false;
  return youtubeLink.match(/youtube\.com/);
};

const isYoutubeShort = (youtubeLink) => {
  if (!youtubeLink) return false;
  return youtubeLink.match(/youtu\.be/);
};

const isSpreaker = (youtubeLink) => {
  if (!youtubeLink) return false;
  return youtubeLink.match(/spreaker\.com/);
};

const isTimeline = (youtubeLink) => {
  if (!youtubeLink) return false;
  return youtubeLink.match(/knightlab\.com/);
};

const isArcgis = (youtubeLink) => {
  if (!youtubeLink) return false;
  return youtubeLink.match(/arcgis\.com/);
};

const isSoundcloud = (youtubeLink) => {
  if (!youtubeLink) return false;
  return youtubeLink.match(/soundcloud\.com/);
};

const isCev = (link) => {
  if (!link) return false;
  return link.match(/comisiondelaverdad\.co/);
};

const youtubeToEmbed = (youtubeLink) => {
  if (!youtubeLink) return false;
  const regExp =
    /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  const match = youtubeLink.match(regExp);
  return match && match[7].length == 11 ? match[7] : false;
};

const spreakerToEmbed = (spreakerLink) => {
  if (!spreakerLink) return false;
  const regExp = /^.*((player\?))\??episode_id?=?([^#&?]*).*/;
  const match = spreakerLink.match(regExp);
  return match && match[3].length == 8 ? match[3] : false;
};

const timelineToEmbed = (timelineLink) => {
  if (!timelineLink) return false;
  const regExp =
    /^.*((cdn.knightlab\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(index.html\?))\??source?=?([^#&?]*).*/;
  const match = timelineLink.match(regExp);
  return match && match[7].length == 44 ? match[7] : false;
};

const arcgisToEmbed = (arcgisLink) => {
  if (!arcgisLink) return false;
  const regExp =
    /^.*((arcgis\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(index.html\?))\??webmap?=?([^#&?]*).*/;
  const match = arcgisLink.match(regExp);
  return match && match[7].length == 32 ? match[7] : false;
};

const useStyles = makeStyles((theme) => ({
  card: {
    borderWidth: 1,
    borderColor: "lightgrey",
  },
  video: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
  },
  input: {
    marginBottom: 10,
  },
  alt: {
    padding: "0.5em",
    color: "#2a5080",
  },
}));

const PiezaVideoEmbebido = (props) => {
  const classes = useStyles();
  const { handleChangeVideoPiece, path, input, position, text } = props;
  const [url, setUrl] = useState(input);
  const [alt, setAlt] = useState(text);
  const [finalUrl, setFinalUrl] = useState(path);
  const [validUrl, SetValidUrl] = useState(true);
  const [t, i18n] = useTranslation("common");
  function handleChangeAltText(e) {
    setAlt(e.target.value);
  }

  //Video Youtube
  const handleChangeUrl = async (e) => {
    let idVideo = "";

    if (e?.target?.value) {
      idVideo = e.target.value;
      setUrl(e.target.value);
    } else idVideo = e;

    if (isYoutube(idVideo)) {
      if (isYoutube(idVideo)["0"] === "youtube.com") {
        setFinalUrl(`https://youtube.com/embed/${youtubeToEmbed(idVideo)}`);
        return;
      }
    }
    if (isYoutubeShort(idVideo)) {
      if (isYoutubeShort(idVideo)["0"] === "youtu.be") {
        setFinalUrl(`https://youtube.com/embed/${youtubeToEmbed(idVideo)}`);
        return;
      }
    }
    if (isSpreaker(idVideo)) {
      if (isSpreaker(idVideo)["0"] === "spreaker.com") {
        setFinalUrl(
          `https://widget.spreaker.com/player?episode_id=${spreakerToEmbed(
            idVideo,
          )}&theme=light&playlist=false`,
        );
        return;
      }
    }
    if (isTimeline(idVideo)) {
      if (isTimeline(idVideo)["0"] === "knightlab.com") {
        setFinalUrl(
          `https://cdn.knightlab.com/libs/timeline3/latest/embed/index.html?source=${timelineToEmbed(
            idVideo,
          )}`,
        );
        return;
      }
    }
    if (isArcgis(idVideo)) {
      if (isArcgis(idVideo)["0"] === "arcgis.com") {
        setFinalUrl(
          `http://arcgis.com/apps/Embed/index.html?webmap=${arcgisToEmbed(
            idVideo,
          )}`,
        );
        return;
      }
    }
    if (isSoundcloud(idVideo)) {
      if (isSoundcloud(idVideo)["0"] === "soundcloud.com") {
        setFinalUrl(idVideo);
        return;
      }
    }
    if (isCev(idVideo)) {
      if (isCev(idVideo)["0"] === "comisiondelaverdad.co") {
        setFinalUrl(idVideo);
        return;
      }
    }

    let resp = await checkUrlFrameOptions(idVideo);

    if (!resp) {
      SetValidUrl(false);
    }

    setFinalUrl(idVideo);
  };

  let blockHeight = null;
  switch (props.width) {
    case "xs":
      blockHeight = 200;
      break;
    case "sm":
      blockHeight = 400;
      break;
    case "md":
      blockHeight = 500;
      break;
    default:
      blockHeight = 700;
  }

  isSpreaker(input) ? (blockHeight = 200) : (blockHeight = blockHeight);
  isTimeline(input) ? (blockHeight = 505) : (blockHeight = blockHeight);
  isArcgis(input) ? (blockHeight = 505) : (blockHeight = blockHeight);
  isSoundcloud(input) ? (blockHeight = 200) : (blockHeight = blockHeight);

  // useEffect(()=>{
  //   props.lectura ? setFinalUrl(props.path) : blockHeight = blockHeight
  // }, [props.lectura])

  useEffect(() => {
    if (handleChangeVideoPiece)
      handleChangeVideoPiece(finalUrl, url, position, alt);
  }, [finalUrl]);

  useEffect(() => {
    if (handleChangeVideoPiece)
      handleChangeVideoPiece(finalUrl, url, position, alt);
  }, [alt]);

  useEffect(() => {
    handleChangeUrl(path);
  }, []);



  const checkUrlFrameOptions = (apiurl) => {
    return fetch(
      "https://header-inspector.repalash.workers.dev/?" +
        new URLSearchParams({
          apiurl: apiurl,
          headers: "x-frame-options",
        }),
      {
        method: "GET",
      },
    )
      .then((r) => r.json())
      .then((json) => {
        let xFrameOp = (json.headers["x-frame-options"] || "").toLowerCase();
        // deny all requests
        if (xFrameOp === "deny") return false;
        // deny if different origin
        if (xFrameOp === "sameorigin" && json.origin !== window.location.origin)
          return false;
        return true;
      });
  };

  return (
    <>
      {props.lectura ? (
        <>
          {validUrl ? (
            <iframe
              target="_parent"
              src={finalUrl}
              alt={alt}
              className={classes.video}
              frameborder="0"
              style={{ height: blockHeight }}
            />
          ) : (
            <VisitUrl finalUrl={finalUrl} />
           
          )}

          {/* <Typography  variant="body1" mt={2} className={classes.alt}>{t("crea.narrativeManager.resources.description")} {alt}</Typography> */}
          {/* <hr /> */}
        </>
      ) : (
        <Card className={classes.card} variant="outlined">
          <>
            <input
              onChange={handleChangeUrl}
              value={url}
              type="text"
              className={`form-control ${classes.input}`}
              required
              placeholder={t(
                "crea.narrativeManager.resources.enterTheLinkHere",
              )}
            />

            <input
              onChange={handleChangeAltText}
              value={alt}
              type="text"
              className={`form-control ${classes.input}`}
              required
              placeholder={t(
                "crea.narrativeManager.resources.enterAltTextHere",
              )}
            />

            <frame
              src={finalUrl}
              alt={alt}
              className={classes.video}
              frameborder="0"
              style={{ height: blockHeight }}
            />
            <Typography variant="body1" mt={2} className={classes.alt}>
              {t("crea.narrativeManager.resources.description")} {alt}
            </Typography>
          </>
        </Card>
      )}
    </>
  );
};

export default withWidth()(PiezaVideoEmbebido);
