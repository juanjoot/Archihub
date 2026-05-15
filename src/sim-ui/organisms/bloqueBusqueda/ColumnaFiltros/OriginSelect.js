import { useState } from "react";

import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Chip from "@material-ui/core/Chip";
import Box from "@material-ui/core/Box";
import { Button } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/core";

import Subtitle from "../../../atoms/Subtitle";

import PublicTwoToneIcon from '@material-ui/icons/PublicTwoTone';
import PhotoLibraryTwoToneIcon from '@material-ui/icons/PhotoLibraryTwoTone';
import FolderTwoToneIcon from "@mui/icons-material/FolderTwoTone";


const useStyles = makeStyles((theme) => ({
    btn: {
        marginBottom: 5,
        background: '#fcfcfc',
        color: '#999',
        textTransform: 'initial',
        '&.active': {
            background: theme.palette.primary.main,
            color: 'white'
        }
    },
    btnFiltrosSel: {
        backgroundColor: theme.palette.primary.main + " !important",
        color: "white !important",
    },
    btnFiltros: {
        margin: 2,
        '& svg': {
            width: 20
        }
    },
}));

const OriginSelect = (props) => {
    const classes = useStyles();
    const theme = useTheme();
    const [expanded, setExpanded] = useState(true);

    return (
        <Accordion expanded={true}>
            <AccordionSummary>
                <Subtitle>Buscar en</Subtitle>
            </AccordionSummary>
            <AccordionDetails>
                <Box>
                    <Button
                        variant="contained"
                        size="small"
                        onClick={()=>props.setOrigin('recursos')}
                        startIcon={<FolderTwoToneIcon />}
                        className={`${classes.btn} ${props.origin === 'recursos' ? 'active' : ''}`}
                        disableElevation
                    >
                        Los recursos documentales
                    </Button>

                    <Button
                        variant="contained"
                        size="small"
                        onClick={()=>props.setOrigin('colecciones')}
                        startIcon={<PhotoLibraryTwoToneIcon />}
                        className={`${classes.btn} ${props.origin === 'colecciones' ? 'active' : ''}`}
                        disableElevation
                    >
                        Las colecciones
                    </Button>

                    {/* <Button
                        variant="contained"
                        size="small"
                        onClick={()=>props.setOrigin('web')}
                        startIcon={<PublicTwoToneIcon />}
                        className={`${classes.btn} ${props.origin === 'web' ? 'active' : ''}`}
                        disableElevation
                    >
                        Los especiales web
                    </Button> */}
                </Box>
            </AccordionDetails>
        </Accordion>
    );
};

export default OriginSelect;
