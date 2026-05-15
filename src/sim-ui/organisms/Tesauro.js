import { useEffect, useState } from 'react';
import Box from '@material-ui/core/Box'
import { makeStyles } from '@material-ui/core/styles'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Accordion from '@material-ui/core/Accordion'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import * as ResourceGroupService from "../../services/ResourceGroupService";

import List from '@material-ui/core/List'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

import Lottie from 'react-lottie';
import animationData from '../../assets/loading_cev_conoce.json'

import Fondos from './Fondos'
import NestedItemList from './NestedItemList'
import SimpleItemList from './SimpleItemList'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        display: 'flex',
        paddingTop: theme.spacing(4)
    },
    tabs: {
        // backgroundColor: theme.palette.grey[100],
    },
    accordeons: {
        flexGrow: 1,
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2)
    },
    listado: {
        flexGrow: 1,
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
        maxWidth:600
    },
    nested: {
        paddingLeft: theme.spacing(3),
        marginLeft: theme.spacing(3),
        borderLeft: '1px solid #dcdcdc',
    }
}))

const Tesauro = props => {
    const classes = useStyles()
    const [open, setOpen] = useState(0)

    const [root, setRoot] = useState([])
    const [path, setPath] = useState("11-OI")

    useEffect(()=>{
        ResourceGroupService.serviceListFirstLevelLazy(path).then(data => {console.log("hola mundo");setRoot(data)})
    }, [path])

    return (
        <Box mt={4}>
            <Box class={classes.root}>
                <Tabs
                    orientation="vertical"
                    value={open}
                    class={classes.tabs}
                    centered
                    onChange={(e, value) => { console.log(value); setOpen(value) }}
                >
                    <Tab label="Fondos" />
                </Tabs>

                {open === 0 &&
                    <Fondos
                        fondo={props.fondo}
                        setFondo={props.setFondo}
                        root={root}
                        setLoading={props.setLoading}
                    />
                }

                {open === 1 &&
                    <Box class={classes.accordeons}>
                        <Accordion elevation={2}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Typography>Tipo entidad 1</Typography>
                            </AccordionSummary>
                            <AccordionDetails>

                            </AccordionDetails>
                        </Accordion>
                        <Accordion elevation={2}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel2a-content"
                                id="panel2a-header"
                            >
                                <Typography>Tipo entidad 2</Typography>
                            </AccordionSummary>
                            <AccordionDetails>

                            </AccordionDetails>
                        </Accordion>
                    </Box>
                }


            </Box>
        </Box>
    )
}

export default Tesauro