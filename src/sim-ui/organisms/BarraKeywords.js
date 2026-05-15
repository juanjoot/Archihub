import Chip from '@material-ui/core/Chip'
import Box from '@material-ui/core/Box'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(0.5),
            marginBottom: 0
        },
    },
}));

const BarraKeywords = props => {
    const classes = useStyles()
    return (
        <Box className={classes.root}>
            {props.list.length > 0 &&
                <>
                    {props.list.map(l => {
                        return (
                            <>
                                <Chip size="small" label={`${l[0]}`} />
                            </>
                        )
                    })}
                </>
            }
        </Box>
    )
}

export default BarraKeywords