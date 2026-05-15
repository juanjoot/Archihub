
import Slider from '@material-ui/core/Slider'
import Box from '@material-ui/core/Box'
import MapaColombia from '../organisms/extraCard/MapaColombia'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'



const useStyles = makeStyles((theme) => ({
    info: {
        display: 'flex',
        justifyContent: 'center'
    },
    titulo: {
        marginBottom: theme.spacing(8),        
        marginTop: theme.spacing(4)

    },
    textoInfo: {
        width: 'calc(100% - 250px)',
        maxWidth: 500
    },
    mapaInfo: {
        width: 250
    }
}))


const DetalleRecurso = ({resource}) => {
    const classes = useStyles()
    // console.log(resource)
    return(
        <>
            <Typography
                variant="h3"
                className={classes.titulo}
            >
                {resource.metadata.firstLevel.title}
            </Typography>
            {resource.metadata.firstLevel.temporalCoverage && resource.metadata.firstLevel.temporalCoverage.start && resource.metadata.firstLevel.temporalCoverage.end &&
                <Box pt={3} mb={2}>
                    <Slider
                        value={[parseInt(resource.metadata.firstLevel.temporalCoverage.start.split('-')[0]), parseInt(resource.metadata.firstLevel.temporalCoverage.end.split('-')[0])]}
                        min={1944}
                        color="secondary"
                        marks
                        // disabled={true}
                        size="small"
                        max={2021}
                        // onChange={() => {}}
                        valueLabelDisplay="on"
                        aria-labelledby="range-slider"
                    />
                </Box>
            }

            <Box className={classes.info}>
                {resource.metadata.firstLevel.geographicCoverage &&
                    <>
                        {resource.metadata.firstLevel.geographicCoverage.length > 1 &&
                            <MapaColombia
                                className={classes.mapaInfo}
                                geo={resource.metadata.firstLevel.geographicCoverage}
                            />
                        }
                        {resource.metadata.firstLevel.geographicCoverage.length === 1 && resource.metadata.firstLevel.geographicCoverage[0].code === 'CO' &&
                            <MapaColombia
                                className={classes.mapaInfo}
                                geo={resource.metadata.firstLevel.geographicCoverage}
                            />
                        }
                    </>
                }
                <Box className={classes.textoInfo}>
                    <Typography>
                        {resource.metadata.firstLevel.description}
                    </Typography>
                </Box>
            </Box>
        </>
    )
}

export default DetalleRecurso