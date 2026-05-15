import { useEffect } from 'react';
import Chip from '@material-ui/core/Chip'
import Box from '@material-ui/core/Box'
import { makeStyles } from '@material-ui/core/styles'
import { connect } from "react-redux"
import * as museo from "../../store/ducks/museo.duck"

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(0.5),
            marginBottom: 0
        },
    },
}));

const BarraChips = props => {
    const classes = useStyles()
    return (
        <>
            <Box component="nav" pt={2} className={classes.root}>
                {props.totalExplora !== null &&
                    <Chip size="small" label={`Total de resultados: ${props.totalExplora}`} onClick={() => { props.setTabSelected(0) }} />
                }

                {props.searchkeyword !== '' &&
                    <Chip variant="outlined" size="small" label={props.searchkeyword} onDelete={() => { props.keyword('') }} />
                }

                {props.temporalRangeExplora !== null &&
                    <Chip variant="outlined" size="small" label={props.temporalRangeExplora} onDelete={() => { props.setTempRange(null) }} />
                }

                {props.dptoExplora !== null &&
                    <Chip variant="outlined" size="small" label={props.dptoExplora.nombre} onDelete={() => { props.setDpto(null) }} />
                }
            </Box>
        </>
    )
}


const mapStateToProps = store => ({
    searchkeyword: store.museo.keyword,
    dptoExplora: store.museo.dptoExplora,
    mpioExplora: store.museo.mpioExplora,
    temporalRangeExplora: store.museo.temporalRangeExplora,
    totalExplora: store.museo.totalExplora
});

export default connect(mapStateToProps, museo.actions)(BarraChips);