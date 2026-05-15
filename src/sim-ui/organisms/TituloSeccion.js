import { Grid } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import Typography  from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    icon: {
        fontSize:"20px",
        color:  theme.palette.primary.main
        },
    text: {
        color:  theme.palette.primary.main,
        marginLeft: "25px",
        marginBottom: "0px",
        fontSize:"17px",
        fontWeight: 700
        }
}));

const TtituloSeccion = props => {
  const classes = useStyles();
  const {texto} = props;
  const IconoTema = props.iconoTema;
  return (  


    <Grid container direction="row" alignItems="center">
        <Grid item>
            <IconoTema  className={classes.icon} />
        </Grid>
        <Grid item>
            <Typography className={classes.text} style={props.style}>
            {texto}
            </Typography> 
        </Grid>
    </Grid>      
  
    )

}

export default TtituloSeccion;
