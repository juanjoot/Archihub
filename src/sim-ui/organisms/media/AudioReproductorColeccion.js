import React, { PureComponent } from "react";
//import css from "classnames";
import { withStyles } from "@material-ui/core/styles";

import Grid from "@material-ui/core/Grid";
import Slider from "@material-ui/core/Slider";
import Typography from "@material-ui/core/Typography";
import { alpha } from '@material-ui/core/styles/colorManipulator';
import IconButton from "@material-ui/core/IconButton";
import EditTwoToneIcon from '@material-ui/icons/EditTwoTone';
import MuteStatusIcon from "@material-ui/icons/VolumeOffTwoTone";
import UnMuteStatusIcon from "@material-ui/icons/VolumeUpTwoTone";
import PauseIcon from "@material-ui/icons/PauseCircleFilledTwoTone";
import PlayIcon from "@material-ui/icons/PlayCircleFilledTwoTone";
import StopIcon from "@material-ui/icons/StopTwoTone";
import FastForwardTwoToneIcon from '@material-ui/icons/FastForwardTwoTone';
import FastRewindTwoToneIcon from '@material-ui/icons/FastRewindTwoTone';
import CachedTwoToneIcon from '@material-ui/icons/CachedTwoTone';


import Wave from '@foobar404/wave';
import { v4 as uuidv4 } from "uuid";

const styles  = theme => ({
  conetendorControles:{
    marginTop: "10px",
  },
  contenedor: {
    width: "100%",
    backgroundColor: alpha(theme.palette.primary.main, 0.3), 
    borderRadius: "5px"
  } , 
  controlsItem:{
    textAlign : "center",
    color: theme.palette.primary.main,
  }
  , 
  containerControl:{
    marginBottom: "5px"
  } , 
  volume: {
    color: theme.palette.primary.main,
    fontSize: "28px"   
  },
  controlsPlayStop:{
    color: theme.palette.primary.main,
    fontSize: "28px"
  } , 
  controlsRewind:{
    color: theme.palette.primary.main,
    fontSize: "28px",
  } , 
  controlsForward:{
    color: theme.palette.primary.main,
    fontSize: "28px",
  } , 
  duration:{
    color:theme.palette.primary.main,
    marginBottom: "0px",
    marginTop: "0px",
    marginLeft: "5px",
    marginRight: "5px",
    fontSize: "14px"
  },
  icon:{
    color: 'white'
    },
  
    btn:{  
      color: 'white' ,
      textTransform: "none",
      borderColor: 'white', 
      padding : "5px",
      marginBottom: "2px"
    },
    btnEditar: {     
      padding : "5px",
      marginBottom: "2px",
      zIndex: 4,
      backgroundColor: 'white',
      color: theme.palette.secondary.main,
      '&:hover': {
          backgroundColor: theme.palette.secondary.main,
          color: 'white'
      }
  },
  messageError:{
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  processMedia:{
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
      PAUS: "pause",
      MUTE: "mute",
      UNMUTE: "unmute",
      LOOP: "loop",
      UNLOOP: "unloop",
      STOP: "stop"
    }
  }

  export const stopAudio = (player,segmentStart) => {
    if (player) {
      let playStatus = null;      
      player.pause();
      if(segmentStart)
        player.currentTime = segmentStart;
      else
        player.currentTime = 0;
      playStatus = Player.Status.PAUSE;
      return { playStatus };
    }
    }

  export const playAudio = player => {
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
  
  export const muteAudio = player => {
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
  
  export const loopAudio = player => {
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
        newState = stopAudio(player, segmentStart);
        break;
      case Player.Status.LOOP:
        newState = loopAudio(player);
        break;
      case Player.Status.MUTE:
        newState = muteAudio(player);
        break;
      case Player.Status.PLAY:
      default:
        newState = playAudio(player);
        break;
    }
  
    return newState;
  };
  

  
export const appendZero = number => (number < 10 ? `0${number}` : number);

export const getCurrent = (time,segmentStart, segmentEnd)=>{
    let current = time
    if(typeof segmentStart !== 'undefined' && typeof segmentEnd !== 'undefined' )
        if(segmentEnd!==0){
            current = Math.abs(time-segmentStart);
        }
    return current;
}

export const getDuration = (time,segmentStart, segmentEnd)=>{
    let duration = time
    if(typeof segmentStart !== 'undefined' && typeof segmentEnd !== 'undefined' )
        if(segmentEnd!==0){
            duration = Math.abs(segmentEnd-segmentStart);
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
        player.addEventListener(name, () => callback(player,segmentEnd, segmentStart), false);      
    
    }
  };
  
  export const removeFromEvent = (player, name, callback) => {
    if (player) {
      player.removeEventListener(name, () => callback(player), false);
    }
  };

  export const removeFromSegment  = (player, name, segmentEnd, segmentStart, callback) => {
    if (player) {
      player.removeEventListener(name, () => callback(player,segmentEnd, segmentStart), false);
    }
  };
  
  

export const getProgress = (currentTime, duration,segmentStart ,segmentEnd) =>{
    let total = duration;
    let advance = currentTime;
    if(typeof segmentStart !== 'undefined' && typeof segmentEnd !== 'undefined' )
     if(segmentEnd!==0){
        total= Math.abs(segmentEnd-segmentStart);
        advance= Math.abs(currentTime-segmentStart);  
    }
  return parseFloat(100 * (advance / total));
}

export const getCurrentTime = (progress, segmentStart, segmentEnd, duration) =>{
let init = 0;
let total = duration;
if(typeof segmentStart !== 'undefined' && typeof segmentEnd !== 'undefined' )   
    if(segmentEnd!==0){
        total = Math.abs(segmentEnd-segmentStart);
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
  

class AudioReproductorColeccion extends React.PureComponent {

  timeoutValidate= 10000

  static defaultProps = {
    rounded: false,
    classes: {},
    classNames: {},
    color: '#333333',
    width: "100%",
    height: "100px"
  };

  state = {
    current: 0,
    progress: 0,
    duration: 0,
    wave: new Wave(),
    audioId: `audio--${uuidv4()}`,
    canvasId:`canvas--${uuidv4()}`,
    loopStatus: Player.Status.UNLOOP,
    playStatus: Player.Status.PAUSE,
    muteStatus: Player.Status.UNMUTE,    
    errorLoad:false
  };
 

  componentDidMount() {
    attachToEventSegment(this.player, Player.Events.CAN_PLAY,this.props.segmentStart, this.props.segmentEnd, this.handleCanPlay);
    attachToEventSegment(this.player, Player.Events.TIME_UPDATE, this.props.segmentStart, this.props.segmentEnd, this.handleSegment);
    //const options = {type:"bars"};shockwave dualbars "#ffc258","orbs"
   
    this.state.wave.fromElement(this.state.audioId, this.state.canvasId, {type:"orbs",stroke:0.5, colors:[this.props.color]} );
  
    if (this.props.autoPlay) {     
      this.triggerAction(Player.Status.PLAY);
    }

    if(this.props.segmentStart)
        if(this.props.segmentStart!==0){
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
    }
  }

  render() {

    const {    
      src,
      classes,
      handlerEdit,
      edit,
      wave,
      messageProcessError
    } = this.props;
   
   const {
      loopStatus,
      playStatus,
      muteStatus,
      progress,
      current,
      duration,
      audioId,
      canvasId,
      errorLoad
    } = this.state;

    const PlayStatusIcon = getIconByPlayerStatus(playStatus);
    const VolumenStatusIcon = getIconByVolumenStatus(muteStatus);
    const isLoopEnable = loopStatus === Player.Status.LOOP;
    const isMuteEnable = muteStatus === Player.Status.MUTE;

    console.log("render audio")
    console.log(src)

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
              className={classes.processMedia}
              >
             {messageProcessError}
          </Typography>
          </div>
        :
        <div className={classes.contenedor}>
            <audio
              id = {audioId}
              ref={node => (this.player = node)}
              controls="true"
              preload="true"
              hidden="true"
              style={{
                width:"0px",
                height:"0px"
              }}
            >
          <source src={src} />
        </audio>


        <Grid  container direction="column"  className={classes.conetendorControles} >
        {edit?
          <Grid item container>
               <IconButton
                className={classes.btnEditar}
                onClick={this.editSegment}
                size="small"
                color="white"
                >
                  <EditTwoToneIcon />
              </IconButton>             
        </Grid>
        :null}
        <Grid alignItems="center" justify="center" spacing={0} container>
                       
            <Grid   xs={11} item>
              <Grid justify="center" spacing={0} direction="row" container>
              {wave?
                <Grid justify="center" spacing={0} direction="row" container>                  
                  <canvas id={canvasId}  style={{
                      width:"100%",
                      height:"80px"
                    }} ></canvas>
                
                </Grid>
              :null}
               <Grid justify="center"  alignItems="center" spacing={0} direction="row" container>
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
                    {getFormattedTime(getCurrent(current,this.props.segmentStart, this.props.segmentEnd),getDuration(duration,this.props.segmentStart, this.props.segmentEnd))}
                  </Typography>
                </Grid>
                <Grid
                 className={classes.controlsItem} 
                  xs={8}
                  item
                >
                  <Slider
                    onChange={(_, progress) =>
                      this.handleChange(progress,this.props.segmentStart, this.props.segmentEnd, this.player)
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
                    {getFormattedTime(getDuration(duration,this.props.segmentStart, this.props.segmentEnd),getDuration(duration,this.props.segmentStart, this.props.segmentEnd))}
                  </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            
            <Grid

            className={classes.controlsItem} 
             xs={1} item>
              <VolumenStatusIcon
              className={classes.volume}
              
                onClick={() => this.triggerAction(Player.Status.MUTE)}
                focusable="true"
              />
            </Grid>
          </Grid>

       
          <Grid  className={classes.containerControl} spacing={0} direction="row"  justifyContent="space-between" alignItems="center"  container>
                
                <Grid  className={classes.controlsItem}  xs={4} item>
                  <FastRewindTwoToneIcon  onClick={() => this.handleMoveQuickly(-10,this.props.segmentStart, this.props.segmentEnd, this.player)}  className={classes.controlsRewind}     />
                </Grid>
                <Grid  className={classes.controlsItem}  xs={4} item>
                  <PlayStatusIcon   className={classes.controlsPlayStop}    
                    onClick={() => this.triggerAction(Player.Status.PLAY)}
                  focusable="true"
                  />
                    {!this.props.autoPlay ?
                    <StopIcon className={classes.controlsPlayStop}    
                    onClick={() => this.triggerAction(Player.Status.STOP, this.props.segmentStart)}
                    focusable="true"
                  />
                      :null}
                </Grid>
                <Grid  className={classes.controlsItem}  xs={4} item>
                  <FastForwardTwoToneIcon   onClick={() => this.handleMoveQuickly(10,this.props.segmentStart, this.props.segmentEnd, this.player)}  className={classes.controlsForward}   />
                </Grid>
          </Grid>
            
        </Grid>
       
        </div>}
     
       </> 
                  
    );
  }

 triggerAction = (action,segmentStart) => {
    const newState = getPlayerStateFromAction(this.player, action, segmentStart);
    if (newState) {
      this.setState(newState);
    }
  };

  handleCanPlay = (player,segmentStart ,segmentEnd)  => {
    //attachToEvent(player, Player.Events.TIME_UPDATE, this.handleTimeUpdate);

    this.setState({
      duration: player.duration
    });
  };

  handleTimeUpdate = (player,segmentStart ,segmentEnd) => {
    this.setState({
      current: player.currentTime,
      progress: getProgress(player.currentTime, player.duration, segmentStart ,segmentEnd)
    });
  };

  handleSegment = (player,segmentStart ,segmentEnd) => {
    if(segmentEnd && segmentStart)
        if(segmentEnd!==0  && segmentStart !==0 )
            if (segmentEnd && player.currentTime >= segmentEnd) {
                player.pause();
            }   
    this.handleTimeUpdate(player,segmentStart ,segmentEnd)
  };

  handleChange = (progress,segmentStart, segmentEnd,  player) => {

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
    this.props.handlerEdit();
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

}

export default withStyles(styles, { withTheme: true })(AudioReproductorColeccion);

