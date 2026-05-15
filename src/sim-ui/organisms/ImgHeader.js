import { Typography, Box } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    imagenDestacada: {
        height: '70vh',
        display: 'flex',
        alignItems: 'center',
        paddingLeft: theme.spacing(2)
    }
}))

const ImgHeader = props => {
    const classes = useStyles()

    return (
        <>
            <Box className={classes.imagenDestacada}>
                <Box>
                    <Typography color='textPrimary' variant="h1">
                        {props.title}
                    </Typography>

                    <Typography color='textPrimary' variant="h5">
                        {props.description}
                    </Typography>
                </Box>
            </Box>
        </>
    )
}

export default ImgHeader