import webShare from "react-web-share-api";
import { isMobile } from "react-device-detect";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import ShareIcon from "@material-ui/icons/Share";
// import MoreVertIcon from "@material-ui/icons/MoreVert";
// import BookmarkIcon from "@material-ui/icons/Bookmark";
// import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";

const ShareButton = ({ share, isSupported }) =>
  isSupported ? (
    <IconButton
      aria-label="compartir recurso"
      edge="start"
      size="small"
      onClick={share}
      style={{ display: isMobile ? "inline" : "none" }}
    >
      <ShareIcon />
    </IconButton>
  ) : null;

const WebShareButton = webShare()(ShareButton);

const ToolbarExplora = (props) => {
  return (
    <Toolbar>
      {/* <IconButton aria-label="opciones del recurso" edge="start" size="small">
        <MoreVertIcon />
      </IconButton> */}

      {/* <IconButton
        aria-label="guardar en mi biblioteca"
        className={props.favoriteClass}
        onClick={props.handleFav}
        edge="start"
        size="small"
      >
        {!props.selected && <BookmarkBorderIcon />}

        {props.selected && <BookmarkIcon color="secondary" />}
      </IconButton> */}

      <WebShareButton config={props.webShareConfig} />
    </Toolbar>
  );
};

export default ToolbarExplora;
