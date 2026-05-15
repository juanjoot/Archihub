import { useEffect, useRef, useState } from "react";
import WaveSurfer from 'wavesurfer.js';
import RegionPlugin from 'wavesurfer.js/dist/plugin/wavesurfer.regions.min.js';
import { v4 as uuidv4 } from "uuid";
import { makeStyles } from "@material-ui/core/styles";
import { alpha } from '@material-ui/core/styles/colorManipulator';
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import PlayArrowIcon from "@material-ui/icons/PlayArrowTwoTone";
import PlayLessonIcon from '@material-ui/icons/SkipNextTwoTone';
import SaveTwoToneIcon from '@material-ui/icons/SaveTwoTone';
import StopIcon from "@material-ui/icons/StopTwoTone";
import ArrowLeft from "@material-ui/icons/ArrowLeftTwoTone";
import ArrowRight from "@material-ui/icons/ArrowRightTwoTone";
import PauseIcon from "@material-ui/icons/Pause";
import Grid from "@material-ui/core/Grid";
import { stubFalse } from "lodash";
import { useTranslation } from "react-i18next"



const useStyles = makeStyles(theme => ({
  contenedor: {
    //backgroundColor: theme.palette.primary.main,
    backgroundColor: alpha(theme.palette.primary.main, 0.3), 
    width: "100%",
    padding : "5px"
  },
  contenedorVideo:{
    position: "relative", 
    width: "100%"
  },
  conetedorControles:{
    marginTop:"10px",
    marginRight:"10px",
  },
  media: {
    width: "100%"
  },
  list: {
    padding: 0
  },
  listItem: {
    //paddingBottom: 0
  },
  buttons: {
    padding:0,
    marginTop:"10px",
  },


  icon2:{
    textAlign : "center",
   color: theme.palette.primary.main
  },
  btn:{
    padding: "2px",
  },
  duration:{
    color: theme.palette.primary.main,
    margin: 0,
    fontSize: "13px"
  },
  borderSegment:{
    margin: "2px",
    borderWidth: "1px", 
    borderColor: theme.palette.primary.main, 
    borderStyle: 'solid',
    borderRadius: '4px',
  },

  icon:{
    textAlign : "center",    
    color: theme.palette.primary.main
    },
  
    btn:{    
      color: "white",///theme.palette.secondary.main ,
      textTransform: "none",
      borderColor: "white",///theme.palette.secondary.main ,
      padding : "5px",
      marginBottom: "10px", 
      },
      btnGuardar: {
        padding : "5px",
        marginBottom: "5px", 
        marginTop: "5px", 
        zIndex: 4,
        backgroundColor: 'white',
        color: theme.palette.secondary.main,
        '&:hover': {
            backgroundColor: theme.palette.secondary.main,
            color: 'white'
        }
    },
    btnGuardarVideo: { 
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
    video:{
      display: "block",
      width: "100%"
    }, 
    wave:{
      marginRight: "5px", 
      width: "100%"
    }
}));

const MediaEdicionColeccion = ( props ) => {
  const wavesurfer = useRef(null);
  const {src,partial, segmentStart,segmentEnd,  handlerSaveSegment , isVideo} = props
  const [t, i18n] = useTranslation("common")
  let initStartSegment = 0
  let initEndtSegment = 0
  if(typeof segmentStart !== 'undefined' && typeof segmentEnd !== 'undefined' )
  if(segmentEnd!==0){
    initStartSegment = segmentStart;
    initEndtSegment = segmentEnd;
  }

  const [playerReady, setPlayerReady] = useState(false);
  const [startSegment, setStartSegment] = useState(initStartSegment);
  const [endSegment, setEndSegment] = useState(initEndtSegment);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const wavesurferId = `wavesurfer--${ uuidv4()}`;
  const videoId = `video--${ uuidv4()}`;
  const audioId = `audio--${uuidv4()}`;

  const partialRender = false;
  if(partial)
    partialRender = true

  useEffect(() => {
    if(isVideo){
      wavesurfer.current = WaveSurfer.create({
        container: `#${wavesurferId}`,
        backgroundColor: "#8e8e8e",
        waveColor: "#6e6e6e",
        progressColor: "#ffffff",
        cursorWidth: 3,
        cursorColor: "#2a5080",
        backend: 'MediaElement',        
        barWidth: 3,
        normalize: true,       
        partialRender:partialRender,
        responsive: true,
        fillParent: true,
        plugins: [
          RegionPlugin.create({
              regionsMaxLength: 1,
              regions: [
                 {
                      id: "region",
                      start: initStartSegment,
                      end: initEndtSegment,
                      loop: true,
                      color: 'hsla(200, 50%, 70%, 0.5)',
                      minLength: 1,
                      width: 4
                  }
              ]
          })
      ]
      });

      var mediaElt = document.querySelector("#"+videoId);
      wavesurfer.current.load(mediaElt,[0.0,0.0, 0.0, 0.0,0.0]);
    }    
    else{
      wavesurfer.current = WaveSurfer.create({
      container: `#${wavesurferId}`,
      backgroundColor: "#8e8e8e",
      backend: 'MediaElement',
      waveColor: "#6e6e6e",
      progressColor: "#ffffff",
      cursorWidth: 3,
      cursorColor: "#2a5080",
      barWidth: 3,
      normalize: true,
      partialRender:partialRender,    
      responsive: true,
      fillParent: true,
      plugins: [
        RegionPlugin.create({
            regionsMaxLength: 1,
            regions: [
               {
                    id: "region",
                    start: initStartSegment,
                    end: initEndtSegment,
                    loop: true,
                    color: 'hsla(200, 50%, 70%, 0.5)',
                    minLength: 1,
                    width: 4
                }
            ]
        })
    ]
    });

    var mediaElt = document.querySelector("#"+audioId);
    wavesurfer.current.load(mediaElt,[0.0,0.0, 0.0, 0.0,0.0]);
  }
    
    wavesurfer.current.on("ready", () => {
      setPlayerReady(true);
      setDuration(wavesurfer.current.getDuration() );
      if (initEndtSegment===0){
        wavesurfer.current.regions.list["region"].onResize(wavesurfer.current.getDuration(), "end") 
        setEndSegment(wavesurfer.current.getDuration() );
      }
    });

    wavesurfer.current.on("audioprocess", () => {
     setCurrentTime(wavesurfer.current.getCurrentTime() )
    });

    wavesurfer.current.regions.list["region"].on("update-end", () => {
      changeStartSegment(wavesurfer.current.regions.list["region"].start);
      changeEndSegment(wavesurfer.current.regions.list["region"].end);
         });    

    const handleResize = wavesurfer.current.util.debounce(() => {
      wavesurfer.current.empty();
      wavesurfer.current.drawBuffer();
    }, 150);

    wavesurfer.current.on("play", () => setIsPlaying(true));
    wavesurfer.current.on("pause", () => setIsPlaying(false));
    window.addEventListener("resize", handleResize, false);
  }, [src]);


  const togglePlayback = () => {
    if (!isPlaying) {
     wavesurfer.current.play();
    } else {
      wavesurfer.current.pause();
    }
  };

  const saveSegment  = (event) =>{
    wavesurfer.current.stop();
    if( handlerSaveSegment)
      handlerSaveSegment(wavesurfer.current.regions.list["region"].start, wavesurfer.current.regions.list["region"].end)
  }

  const changeStartSegment = (time) =>{
      setStartSegment(time);
  }

  const changeEndSegment = (time) =>{
    setEndSegment(time);
}

 const appendZero = number => (number < 10 ? `0${number}` : number);
 const getFormattedTime = time => {
    const dateTime = new Date(0, 0, 0, 0, 0, time, 0); 
    const dateTimeH = appendZero(dateTime.getHours()); 
    const dateTimeM = appendZero(dateTime.getMinutes());
    const dateTimeS = appendZero(dateTime.getSeconds());  
    return `${dateTimeH}:${dateTimeM}:${dateTimeS}`;
  };

  const changeRegion = (action,region) =>{

    if(action=="up" && region=="start" )
      if(wavesurfer.current.regions.list["region"].start+1<=duration){
        wavesurfer.current.regions.list["region"].onResize(1, "start") 
        changeStartSegment(wavesurfer.current.regions.list["region"].start+1);
      }
    if(action=="down" && region=="start" )
      if(wavesurfer.current.regions.list["region"].start-1>0){
        wavesurfer.current.regions.list["region"].onResize(-1, "start");
        changeStartSegment(wavesurfer.current.regions.list["region"].start-1); 
      }
    
      if(action=="up" && region=="end" )
        if(wavesurfer.current.regions.list["region"].end+1<=duration){
          wavesurfer.current.regions.list["region"].onResize(+1, "end") 
          changeEndSegment(wavesurfer.current.regions.list["region"].end+1);
        }
      if(action=="down" && region=="end" )
        if(wavesurfer.current.regions.list["region"].end-1>0){
          wavesurfer.current.regions.list["region"].onResize(-1, "end")
          changeEndSegment(wavesurfer.current.regions.list["region"].end-1);
        
        } 
    
  }

  const  playSegment = () => {
    wavesurfer.current.regions.list["region"].play();
    setIsPlaying(true)
  };
  const stopPlayback = () => wavesurfer.current.stop();

  const classes = useStyles();

  let transportPlayButton;

  if (!isPlaying) {
    transportPlayButton = (
      <IconButton className={classes.btn}  onClick={togglePlayback}>
        <PlayArrowIcon className={classes.icon} />
      </IconButton>
    );
  } else {
    transportPlayButton = (
      <IconButton className={classes.btn}  onClick={togglePlayback}>
        <PauseIcon className={classes.icon} />
      </IconButton>
    );
  }

  return (
    <>
      <div className={classes.contenedor}>
        <Grid container direction="column">
        {isVideo?
           <Grid item container>
            <div className={classes.contenedorVideo}>
              <video
                  className={classes.video}
                  id = {videoId}
                  preload="true"  
                  src={src}
                  >              
              </video>
              <IconButton
                  className={classes.btnGuardarVideo}
                  onClick={saveSegment}
                  size="small"
                  color="white"
                  >
                    <SaveTwoToneIcon />
                </IconButton>
                </div>
              </Grid>
            : 
            <Grid item container > 
                 <audio
                      id = {audioId}                    
                      
                      preload="false"
                      hidden="true"
                      src={src}
                      style={{
                        width:"0px",
                        height:"0px"
                      }}
                    />        
              <IconButton
                className={classes.btnGuardar}
                onClick={saveSegment}
                size="small"
                color="white"
                >
                  <SaveTwoToneIcon />
              </IconButton>        
        
            </Grid>}
       
        <Grid item container  className={classes.conetedorControles}     >
          <Grid  
            xs={1} item>
              <Grid  spacing={0} direction="column"  justify="space-between" alignItems="center"  container>
              <IconButton className={classes.btn}  onClick={playSegment}>
                  <PlayLessonIcon className={classes.icon} />
                </IconButton>
              {transportPlayButton}           
              <IconButton className={classes.btn}  onClick={stopPlayback}>
                <StopIcon className={classes.icon} />
              </IconButton>
             </Grid>
            </Grid>
          <Grid   xs={11} item  id={wavesurferId}   />
          </Grid>
         
          <Grid item container className={classes.buttons}>           
            <Grid item xs={9} container justify="space-around">

              <Grid item>
              <Grid item xs={12} container  alignItems="center" justifyContent="center" className={classes.borderSegment}  >
                <Typography      
                    align="center"
                    gutterBottom
                    noWrap
                    className={classes.duration}  
                  >
                  {t("crea.narrativeManager.media.edition.start")}: {getFormattedTime(startSegment)}
                  </Typography>
                < ArrowLeft className={classes.icon2} onClick={() => changeRegion("down", "start")} />
                < ArrowRight className={classes.icon2} onClick={() => changeRegion("up", "start")} />
                  </Grid>
              </Grid>
              <Grid item>
              <Grid item xs={12} container alignItems="center" justifyContent="center" className={classes.borderSegment} >
                 <Typography      
                    align="center"
                    gutterBottom
                    noWrap
                    className={classes.duration}  
                  >
                  {t("crea.narrativeManager.media.edition.end")}: {getFormattedTime(endSegment)}
                  </Typography>
                < ArrowLeft className={classes.icon2} onClick={() => changeRegion("down", "end")} />
                < ArrowRight className={classes.icon2} onClick={() => changeRegion("up", "end")} />
                  </Grid>
         
              </Grid>
              
            </Grid>
            <Grid item xs={3}>
              
            <Typography      
                    align="center"
                    gutterBottom
                    noWrap
                    className={classes.duration}  
                  >
                  {getFormattedTime(currentTime )} / {getFormattedTime(duration )}
                  </Typography>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </>
  );
}

export default MediaEdicionColeccion;
