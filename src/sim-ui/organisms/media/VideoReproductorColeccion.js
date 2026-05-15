import React, { useRef } from "react";
//import css from "classnames";
import { withStyles } from "@material-ui/core/styles";


import Grid from "@material-ui/core/Grid";
import Slider from "@material-ui/core/Slider";
import Typography from "@material-ui/core/Typography";

 import { alpha } from '@material-ui/core/styles/colorManipulator';
import LoopStatusIcon from "@material-ui/icons/Repeat";
import IconButton from "@material-ui/core/IconButton";
import EditTwoToneIcon from '@material-ui/icons/EditTwoTone';
import MuteStatusIcon from "@material-ui/icons/VolumeOffTwoTone";
import UnMuteStatusIcon from "@material-ui/icons/VolumeUpTwoTone";
import PauseIcon from "@material-ui/icons/PauseCircleFilledTwoTone";
import PlayIcon from "@material-ui/icons/PlayCircleFilledTwoTone";
import StopIcon from "@material-ui/icons/StopTwoTone";
import FastForwardTwoToneIcon from '@material-ui/icons/FastForwardTwoTone';
import FastRewindTwoToneIcon from '@material-ui/icons/FastRewindTwoTone';
import FullscreenIcon from "@material-ui/icons/Fullscreen";
import CachedTwoToneIcon from '@material-ui/icons/CachedTwoTone';
 

import Wave from '@foobar404/wave';
import { v4 as uuidv4 } from "uuid";

const styles = theme => ({
  conetendorControles:{
    marginTop: "10px",
  },
  contenedorVideo: {
    position: "relative",
    width: "100%"
  },
  contenedor: {
    width: "100%",
    padding: "5px",    
    backgroundColor: alpha(theme.palette.primary.main, 0.3), 
    borderRadius: "5px"
  },
  contenedorEmbed: {
    width: "100%",
    height: "100vh",
    padding: "5px",
    backgroundColor: alpha(theme.palette.primary.main, 0.3), 
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    borderRadius: "5px"
  },
  controlsItem: {
    textAlign: "center",
    color: theme.palette.primary.main,
  }
  ,
  volume: {
    color: theme.palette.primary.main,
    fontSize: "28px"   
  },
  controlsPlayStop: {
    color: theme.palette.primary.main,
    fontSize: "28px"    
  },
  controlsRewind:{
    color: theme.palette.primary.main,
    fontSize: "28px"
  } , 
  controlsForward:{
    color: theme.palette.primary.main,
    fontSize: "28px"
  } ,
  duration: {
    color: theme.palette.primary.main,
    marginBottom: "0px",
    marginTop: "0px",
    marginLeft: "5px",
    marginRight: "5px",
    fontSize: "14px"
  },
  icon: {
    color: theme.palette.primary.main
  },

  btn: {
    color: 'white',
    textTransform: "none",
    borderColor: 'white',
    padding: "5px",
    marginBottom: "2px"
  },
  btnEditar: {
    position: "absolute",
    top: "5px",
    left: "5px",
    zIndex: 4,
    backgroundColor: 'white',
    color: theme.palette.secondary.main,
    '&:hover': {
      backgroundColor: theme.palette.secondary.main,
      color: 'white'
    }
  },
  video: {
    display: "block",
    width: "100%",
    maxHeight: 400,
    backgroundColor: '#111'
  },
  videoEmbed: {
    width: "100%",
    display: "block",
    aspectRatio: "16/9",
    maxHeight: "calc(100vh - 100px)"
  },
  messageError:{
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  processVideo:{
    color: theme.palette.secondary.main,
    marginLeft: "20px"
  }

});


const Player = {
  Events: {
    TIME_UPDATE: "timeupdate",
    CAN_PLAY: "canplaythrough"
  },
  Status: {
    PLAY: "play",
    PAUSE: "pause",
    MUTE: "mute",
    UNMUTE: "unmute",
    LOOP: "loop",
    UNLOOP: "unloop",
    STOP: "stop"
  }
}

export const stopVideo = (player, segmentStart) => {
  if (player) {
    let playStatus = null;
    player.pause();
    if (segmentStart)
      player.currentTime = segmentStart;
    else
      player.currentTime = 0;
    playStatus = Player.Status.PAUSE;
    return { playStatus };
  }
}

export const playVideo = player => {
  if (player) {
    let playStatus = null;

    if (player.paused) {
      player.play();
      playStatus = Player.Status.PLAY;
    } else {
      player.pause();
      playStatus = Player.Status.PAUSE;
    }

    return { playStatus };
  }

  return null;
};

export const muteVideo = player => {
  if (player) {
    let muteStatus = null;

    if (player.muted) {
      player.muted = false;
      muteStatus = Player.Status.UNMUTE;
    } else {
      player.muted = true;
      muteStatus = Player.Status.MUTE;
    }

    return { muteStatus };
  }

  return null;
};

export const loopVideo = player => {
  if (player) {
    let loopStatus = null;

    if (player.loop) {
      player.loop = false;
      loopStatus = Player.Status.UNLOOP;
    } else {
      player.loop = true;
      loopStatus = Player.Status.LOOP;
    }

    return { loopStatus };
  }

  return null;
};

export const getPlayerStateFromAction = (player, action, segmentStart) => {
  let newState = null;

  switch (action) {
    case Player.Status.STOP:
      newState = stopVideo(player, segmentStart);
      break;
    case Player.Status.LOOP:
      newState = loopVideo(player);
      break;
    case Player.Status.MUTE:
      newState = muteVideo(player);
      break;
    case Player.Status.PLAY:
    default:
      newState = playVideo(player);
      break;
  }

  return newState;
};



export const appendZero = number => (number < 10 ? `0${number}` : number);

export const getCurrent = (time, segmentStart, segmentEnd) => {
  let current = time
  if (typeof segmentStart !== 'undefined' && typeof segmentEnd !== 'undefined')
    if (segmentEnd !== 0) {
      current = Math.abs(time - segmentStart);
    }
  return current;
}

export const getDuration = (time, segmentStart, segmentEnd) => {
  let duration = time
  if (typeof segmentStart !== 'undefined' && typeof segmentEnd !== 'undefined')
    if (segmentEnd !== 0) {
      duration = Math.abs(segmentEnd - segmentStart);
    }
  return duration;
}

export const getFormattedTime = (time, duration) => {

  const dateTime = new Date(0, 0, 0, 0, 0, time, 0);
  const dateDuration= new Date(0, 0, 0, 0, 0, duration, 0);
  const dateTimeH = appendZero(dateTime.getHours())
  const dateTimeM = appendZero(dateTime.getMinutes());
  const dateTimeS = appendZero(dateTime.getSeconds());
  let format = `${dateTimeH}:${dateTimeM}:${dateTimeS}`
  if(dateDuration.getHours()<=0)
    format = `${dateTimeM}:${dateTimeS}`
  
  return format;
};

export const getIconByPlayerStatus = playerStatus => {
  switch (playerStatus) {
    case Player.Status.PAUSE:
      return PlayIcon;
    case Player.Status.PLAY:
    default:
      return PauseIcon;
  }
};


export const getIconByVolumenStatus = muteStatus => {
  switch (muteStatus) {
    case Player.Status.MUTE:
      return MuteStatusIcon;
    case Player.Status.UNMUTE:
    default:
      return UnMuteStatusIcon;
  }
};




export const attachToEvent = (player, name, callback) => {
  if (player) {
    player.addEventListener(name, () => callback(player), false);
  }
};

export const attachToEventSegment = (player, name, segmentEnd, segmentStart, callback) => {
  if (player) {
    player.addEventListener(name, () => callback(player, segmentEnd, segmentStart), false);

  }
};

export const removeFromEvent = (player, name, callback) => {
  if (player) {
    player.removeEventListener(name, () => callback(player), false);
  }
};

export const removeFromSegment = (player, name, segmentEnd, segmentStart, callback) => {
  if (player) {
    player.removeEventListener(name, () => callback(player, segmentEnd, segmentStart), false);
  }
};



export const getProgress = (currentTime, duration, segmentStart, segmentEnd) => {
  let total = duration;
  let advance = currentTime;
  if (typeof segmentStart !== 'undefined' && typeof segmentEnd !== 'undefined')
    if (segmentEnd !== 0) {
      total = Math.abs(segmentEnd - segmentStart);
      advance = Math.abs(currentTime - segmentStart);
    }
  return parseFloat(100 * (advance / total));
}

export const getCurrentTime = (progress, segmentStart, segmentEnd, duration) => {
  let init = 0;
  let total = duration;
  if (typeof segmentStart !== 'undefined' && typeof segmentEnd !== 'undefined')
    if (segmentEnd !== 0) {
      total = Math.abs(segmentEnd - segmentStart);
      init = segmentStart;
    }
  return init + parseFloat((progress * total) / 100);
}


export const getCurrentTimeAdd = (add, currentTime ,segmentStart, segmentEnd, duration) =>{
  let init = 0;
  let total = duration;
  if(typeof segmentStart !== 'undefined' && typeof segmentEnd !== 'undefined' )   
      if(segmentEnd!==0){
          total = Math.abs(segmentEnd-segmentStart);
          init = segmentStart;
      }
  let newTime = add+currentTime
  
  if(newTime>total)  
    newTime = total
  if(newTime<init)  
    newTime = init
      
    return newTime;
  }

class VideoReproductorColeccion extends React.PureComponent {

  timeoutValidate= 10000

  state = {
    current: 0,
    progress: 0,
    duration: 0,
    wave: new Wave(),
    videoId: `video--${uuidv4()}`,
    canvasId: `canvas--${uuidv4()}`,
    loopStatus: Player.Status.UNLOOP,
    playStatus: Player.Status.PAUSE,
    muteStatus: Player.Status.UNMUTE,
    videoLoad: false,
    videoDuration:0.0,
    firstAction:false,
    errorLoad:false
  };


  componentDidMount() {
    attachToEventSegment(this.player, Player.Events.CAN_PLAY, this.props.segmentStart, this.props.segmentEnd, this.handleCanPlay);
    attachToEventSegment(this.player, Player.Events.TIME_UPDATE, this.props.segmentStart, this.props.segmentEnd, this.handleSegment);
    //const options = {type:"bars"};shockwave dualbars "#ffc258","orbs"
    if (this.props.wave)
      this.state.wave.fromElement(this.state.videoId, this.state.canvasId, { type: "dualbars", stroke: 0.5, colors: [this.props.color] });

    if (this.props.autoPlay) {
      this.triggerAction(Player.Status.PLAY);
      this.executeFirstAction();
      this.updateDuration(this.props.src);
  
    }else{
      if (!this.state.videoLoad){
        this.updateDuration(this.props.src,true);
      }
    }

    if (this.props.segmentStart)
      if (this.props.segmentStart !== 0) {
        this.player.currentTime = this.props.segmentStart;
      }
 
      // this.isValidAudioUrl(this.props.src);
  }

  componentWillUnmount() {
    if (this.player) {
      removeFromEvent(
        this.player,
        Player.Events.TIME_UPDATE,
        this.handleTimeUpdate
      );
      removeFromSegment(
        this.player,
        Player.Events.TIME_UPDATE,
        this.handleSegment
      );
      removeFromEvent(this.player, Player.Events.CAN_PLAY, this.handleCanPlay);

      this.player = null;
      this.videoref = null;
    }
  }

  render() {
    const {
      wave,
      src,
      classes,
      handlerEdit,
      edit,
      embed,
      messageProcessError
    } = this.props;
    const {
      loopStatus,
      playStatus,
      muteStatus,
      progress,
      current,
      duration,
      videoId,
      canvasId,
      videoLoad,
      videoDuration,
      firstAction,
      errorLoad
    } = this.state;

    const PlayStatusIcon = getIconByPlayerStatus(playStatus);
    const VolumenStatusIcon = getIconByVolumenStatus(muteStatus);
    const isLoopEnable = loopStatus === Player.Status.LOOP;
    const isMuteEnable = muteStatus === Player.Status.MUTE;
    return (
      <>
        {errorLoad?
         <div className={classes.messageError}>        
                <CachedTwoToneIcon
              className={classes.volume}
              /><Typography
              align="center"
              gutterBottom
              noWrap
              variant="body2"
              className={classes.processVideo}
              >
             {messageProcessError}
          </Typography>
          </div>
        :<div     ref={node => (this.videoref = node)} className={embed ? classes.contenedorEmbed : classes.contenedor}>
          <div className={classes.contenedorVideo}>
            
            <video
              className={embed ? classes.videoEmbed : classes.video}
              id={videoId}
              ref={node => (this.player = node)}
              preload="metadata"
              // preload="true"                    
              onClick={this.clickVideo}
            >
              {videoLoad ?
              <source src={src+"#t="+videoDuration} type={this.props.type} />:null}
            </video>
            {edit ?

              <IconButton
                className={classes.btnEditar}
                onClick={this.editSegment}
                size="small"
                color="white"
              >
                <EditTwoToneIcon />
              </IconButton>

              : null}
          </div>
          <Grid container direction="column"  className={classes.conetendorControles}>

            <Grid alignItems="center" justify="center" spacing={0} container>
              {wave ?
                <Grid className={classes.controlsItem} xs={12} item>
                  <canvas id={canvasId} style={{
                    width: "100%",
                    height: "50px"
                  }} ></canvas>

                </Grid>
                : null}

     

              <Grid xs={11} item>
                <Grid justify="center" alignItems="center" spacing={0} direction="row" container>
                  <Grid
                    className={classes.controlsItem}
                    xs={2}
                    item
                  >
                    <Typography
                      align="center"
                      gutterBottom
                      noWrap
                      className={classes.duration}
                    >
                      {getFormattedTime(getCurrent(current, this.props.segmentStart, this.props.segmentEnd),getDuration(duration, this.props.segmentStart, this.props.segmentEnd))}
                    </Typography>
                  </Grid>
                  <Grid

                    className={classes.controlsItem}
                    xs={8}
                    item
                  >
                    <Slider
                      onChange={(_, progress) =>
                        this.handleChange(progress, this.props.segmentStart, this.props.segmentEnd, this.player)
                      }
                      variant="determinate"
                      color="primary"
                      value={progress}
                    />
                  </Grid>
                  <Grid
                    className={classes.controlsItem}
                    xs={2}
                    item
                  >
                    <Typography
                      align="center"
                      gutterBottom
                      noWrap
                      className={classes.duration}
                    >
                      {getFormattedTime(getDuration(duration, this.props.segmentStart, this.props.segmentEnd),getDuration(duration, this.props.segmentStart, this.props.segmentEnd))}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid
                /* className={classes["player-centered-grid-item"]} */
                className={classes.controlsItem}
                xs={1} item>
                <VolumenStatusIcon
                  className={classes.volume}
                  onClick={() => this.triggerAction(Player.Status.MUTE)}
                  focusable="true"
                />
              </Grid>          
            </Grid>
            <Grid spacing={0} direction="row"  justifyContent="space-between" alignItems="center" container>
              <Grid xs={11} item>
                <Grid spacing={0} direction="row"  justifyContent="space-between" alignItems="center" container>
                    <Grid  className={classes.controlsItem}  xs={4} item>
                          <FastRewindTwoToneIcon  onClick={() => this.handleMoveQuickly(-10,this.props.segmentStart, this.props.segmentEnd, this.player)}  className={classes.controlsRewind}     />
                    </Grid>   
                    <Grid  className={classes.controlsItem}  xs={4} item>
                      <PlayStatusIcon className={classes.controlsPlayStop}
                            onClick={() => this.triggerAction(Player.Status.PLAY)}
                            focusable="true"
                          />
                          {!this.props.autoPlay ?
                            <StopIcon className={classes.controlsPlayStop}
                              onClick={() => this.triggerAction(Player.Status.STOP, this.props.segmentStart)}
                              focusable="true"
                            />
                            : null}
                      </Grid> 
                      <Grid  className={classes.controlsItem}  xs={4} item>
                        <FastForwardTwoToneIcon   onClick={() => this.handleMoveQuickly(10,this.props.segmentStart, this.props.segmentEnd, this.player)}  className={classes.controlsForward}   />
                      </Grid>
                  </Grid>
                </Grid>
                <Grid
                /* className={classes["player-centered-grid-item"]} */
                className={classes.controlsItem}
                xs={1} item>
                <FullscreenIcon
                  className={classes.volume}
                  onClick={() => this.toggleFullScreen(this.player)}
                  focusable="true"
                />
              </Grid>
              </Grid>
          </Grid>
        </div>
        }
      </>
    );
  }


   setErrorLoad = () =>{
    this.setState({
      errorLoad:true
    })
  }

   isValidAudioUrl = (urlToCheck) =>{
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), this.timeoutValidate)
    return fetch(urlToCheck, {signal: controller.signal, method: 'HEAD'})//, mode: 'no-cors' 
      .then(res => res )
      .catch(err => {
        console.log("Error",err);
      this.setErrorLoad();
    });
  }


  
  updateDuration = (src,midProgress=false) => {
    let media = new Audio(src);
    media.onloadedmetadata  = () => {
      this.setState({
        videoLoad: true,
        videoDuration:midProgress?(media.duration/2):0
      });  
    }; 
  }

  executeFirstAction = () => {
    if(!this.state.firstAction){
      this.player.currentTime = 0
      this.setState({
         firstAction:true
       });
     }
  }

  triggerAction = (action, segmentStart) => {
    const newState = getPlayerStateFromAction(this.player, action, segmentStart);  
    if (newState) {
      this.setState(newState);
    }
    this.executeFirstAction();   
  };

  handleCanPlay = (player, segmentStart, segmentEnd) => { 
    this.setState({
      duration: player.duration
    });
  };

  handleTimeUpdate = (player, segmentStart, segmentEnd) => {

  if(this.state.firstAction){
   this.setState({
      current: player.currentTime,
      progress: getProgress(player.currentTime, player.duration, segmentStart, segmentEnd)
    });
  }
  };

  handleSegment = (player, segmentStart, segmentEnd,firstAction) => {
    if (segmentEnd && segmentStart)
      if (segmentEnd !== 0 && segmentStart !== 0)
        if (segmentEnd && player.currentTime >= segmentEnd) {
          player.pause();
        }
    this.handleTimeUpdate(player, segmentStart, segmentEnd)
  };

  handleChange = (progress, segmentStart, segmentEnd, player) => {
    if (player) {
      const currentTime = getCurrentTime(progress, segmentStart, segmentEnd, player.duration);
      if (!isNaN(currentTime)) {
        player.currentTime = currentTime;
      }

      this.setState({
        progress,
        currentTime
      });
    }
  };

  handleMoveQuickly = (add,segmentStart, segmentEnd,  player) => {
    this.executeFirstAction();   
    if (player) {      
      const currentTime = getCurrentTimeAdd(add, player.currentTime ,segmentStart, segmentEnd, player.duration) 
      if (!isNaN(currentTime)) {
        player.currentTime = currentTime;
      }
    }
    this.setState({
      current: player.currentTime,
      progress: getProgress(player.currentTime, player.duration, segmentStart ,segmentEnd)
    });  
  };

  editSegment = (ev) => {
    if (this.props.handlerEdit)
      this.props.handlerEdit();
  }

  clickVideo = (ev) => {
    this.triggerAction(Player.Status.PAUSE);
  }


  toggleFullScreen = (el) => {
    if (
      document.fullscreenElement || 
      document.webkitFullscreenElement || 
      document.webkitIsFullscreen||
      document.msFullscreenElement||
      document.mozFullScreen  
    ) {
      this.exitFullScreen(document);
    } else{
      this.openFullScreen(el);
    }
   
  }

  openFullScreen = (el) => {   
    if (el.requestFullscreen) {
      el.requestFullscreen();        
    } else if (el.msRequestFullscreen) {  
      el.msRequestFullscreen()
    } else if (el.mozRequestFullScreen) {
      el.mozRequestFullScreen();
    } else if (el.webkitRequestFullscreen) {
      el.webkitRequestFullscreen();
    }
  }



  exitFullScreen = (el) => {
    if (el.exitFullscreen) {
      el.exitFullscreen();  
    } else if (el.msExitFullscreen) {     
      el.msExitFullscreen()
    } else if (el.mozRequestFullScreen) {
      el.mozRequestFullScreen();
    } else if (el.webkitExitFullscreen) {
      el.webkitExitFullscreen();

    }
  }
  


}

export default withStyles(styles, { withTheme: true })(VideoReproductorColeccion);

