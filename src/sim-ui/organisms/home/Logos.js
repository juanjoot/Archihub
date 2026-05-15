import React from 'react'
import img1 from "../../../sim-ui/assets/imgs/Logo_govco.png"
import img2 from "../../../sim-ui/assets/imgs/Logo_MEN.png"
import { makeStyles } from "@material-ui/core"
import Box from "@material-ui/core/Box"

const useStyles = makeStyles((theme) => ({
    logos: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: theme.spacing(4),
        backgroundColor: theme.palette.primary.main,
    },
    logo: {
        width: '15%',
        maxWidth: 100,
        margin: theme.spacing(3),

        '&:nth-child(2)': {
            width: 120
        }
    },
}))

const Logos = props => {
    const classes = useStyles();
    return (
        <Box className={classes.logos}>
            <img className={classes.logo} src={img2} alt="Logo Ministerio de Educación Nacional" />
            <img className={classes.logo} src={img1} alt="Logo Gobierno de Colombia" />
        </Box>
    )
}

export default Logos