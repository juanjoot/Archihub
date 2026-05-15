import { makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import { Grid } from "@material-ui/core";
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import VolumeUpTwoToneIcon from '@material-ui/icons/VolumeUpTwoTone';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import SupervisedUserCircleTwoToneIcon from '@material-ui/icons/SupervisedUserCircleTwoTone';
import TurnedInTwoToneIcon from '@material-ui/icons/TurnedInTwoTone';
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    marginBottom: "10px",
    height : "50px"
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    backgroundColor : theme.palette.secondary.main,
  },
  containerIcon: {   
    //height : "100%"
    marginBottom: "15px",
    marginTop: "15px",

  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  iconAudio: {
    color: theme.palette.primary.light
  },
  iconTag: {
    color: theme.palette.primary.light
  },
  title:{
    fontSize: "14px",
    color: theme.palette.primary.main
  },
  author:{
    fontSize: "10px",
    color: theme.palette.primary.main
  },
  date:{
    fontSize: "12px",
    color: theme.palette.primary.main

     
  }
}));

const TarjetaResumenAudio = props => {
  const classes = useStyles();
  const theme = useTheme();
  const {data} = props;

  return (
    <Card id={data.ident} className={classes.root} elevation={2}>
       <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"          
        >
        <Grid  className={classes.cover} item xs={1} >
              <Grid
                container
                direction="row"              
                alignItems="center"
                justifyContent="center"
                className={classes.containerIcon}
              >
              <VolumeUpTwoToneIcon   className={classes.iconAudio} />
            </Grid>
        </Grid>

        <Grid item xs={7}>
            <Grid
              container
              direction="column"              
              alignItems="flex-start"
              justifyContent="flex-start"
              
            >
                <Grid item xs zeroMinWidth>
                  <Typography  className={classes.title}>
                  {data.metadata.firstLevel.title}
                  </Typography>
                </Grid>
                <Grid item xs zeroMinWidth>
                  <Typography  className={classes.author} >
                  {data.metadata.firstLevel.authors[0]}
                  </Typography>
                </Grid>
          </Grid>
        </Grid>

        <Grid item xs={2}>
          <Grid
            container
            direction="row"              
            alignItems="flex-end"
            justifyContent="flex-end"
            zeroMinWidth
          >
            <Typography className={classes.date}>
            {data.metadata.firstLevel.creationDate}
            </Typography>
          </Grid>
        </Grid>
        <Grid item xs={1}>
              <Grid
                container
                direction="row"              
                alignItems="center"
                justifyContent="space-evenly"
              >
                 <SupervisedUserCircleTwoToneIcon   /> 
                 <SupervisedUserCircleTwoToneIcon  />
                 
            </Grid>
        </Grid>


        <Grid item xs={1}>
              <Grid
                container
                direction="row"              
                alignItems="center"
                justifyContent="center"
              >
            <TurnedInTwoToneIcon className={classes.iconTag} />
            </Grid>
        </Grid>

        </Grid>
      
    </Card>
  );
}
export default TarjetaResumenAudio;