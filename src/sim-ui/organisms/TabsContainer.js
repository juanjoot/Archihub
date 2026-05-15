import { makeStyles } from "@material-ui/core"
import { Box } from "@material-ui/core";
import IconButton from '@mui/material/IconButton';
import DescriptionIcon from "@material-ui/icons/Description"
import Tooltip from '@mui/material/Tooltip'

const useStyles = makeStyles((theme) => ({
    iconView: {
        '& path, & polygon': {
            fill: 'white'
        }
    },
    btn: {
        borderRadius: 50,
        backgroundColor: 'rgba(25,68,124,0.6) !important',
        // boxShadow: '5px 5px 10px #173d70, -5px -5px 10px #1c4b88',
        width: 50,
        height: 50,
        marginRight: '10px !important',
    },
    btnActive: {
        borderRadius: 50,
        backgroundColor: 'rgb(191 202 217) !important',
        width: 50,
        height: 50,
        marginRight: '10px !important',
        '& path, & polygon': {
            fill: theme.palette.primary.main + ' !important'
        }
    },
    childContainer: {
        display: 'inline-flex',
        maxWidth: 200,
        alignItems: 'center',
        borderRadius: 50,
        paddingRight: 25,
        backgroundColor: 'rgba(25,68,124,0.6) !important',
        border: '1px solid rgba(255,255,255,0.1)',
        margin: 5,
        marginTop: 0,

        '&.active': {
            backgroundColor: 'rgb(191 202 217) !important',
            color: theme.palette.primary.main,
        }
    }
}))


const TabsContainer = props => {
    const classes = useStyles()

    return (
        <>

            {props.list.map((d, i) => {
                return (
                    <Tooltip
                        title={d.name}
                    >
                        <Box
                            className={`${classes.childContainer} ${props.current === i ? 'active' : ''}`}
                            onClick={() => props.callback(i)}
                        >
                            <IconButton
                                size='small'
                                className={props.current === i ? classes.btnActive : classes.btn}
                            >
                                {d.icon}
                            </IconButton>
                            {d.name}
                        </Box>

                    </Tooltip>
                )
            })}
        </>
    )
}

export default TabsContainer