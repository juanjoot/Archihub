import { makeStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider'
import Box from '@material-ui/core/Box'

const useStyles = makeStyles((theme) => ({
    rootSlider: {
        color: theme.palette.primary.main, 
    },
    disabledSlider: {
        color: theme.palette.primary.main, 
  }, 

  contenedor: {
    maxWidth: "96%",
    marginLeft: "20px"
},
}))
const RangoTiempo = props => {
    const classes = useStyles();
    const { tiempo, value, handleChange, activeSlider } = props

    let min = 1900;
    let max = new Date().getFullYear();
  
    return (
  
        <Box mt={6} mb={3} className={classes.contenedor}>                
                <Slider
                    value={value}
                    min={min}
                    color="primary"
                    onChange={handleChange}
                    disabled={activeSlider}
                    marks
                    max={max}                   
                    valueLabelDisplay="on"
                    aria-labelledby="range-slider"
                    classes={{
                        disabled: classes.disabledSlider,
                        root:classes.rootSlider
                        }}
                />
        </Box>
    )
}


export default RangoTiempo;