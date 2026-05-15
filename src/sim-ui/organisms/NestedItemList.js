import { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import Box from '@material-ui/core/Box'
import ListItem from '@material-ui/core/ListItem'
import Checkbox from '@material-ui/core/Checkbox'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import Collapse from '@material-ui/core/Collapse'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import IconButton from '@material-ui/core/IconButton'
import ExpandLess from '@material-ui/icons/ExpandLess'
import FolderIcon from '@material-ui/icons/Folder'
import ExpandMore from '@material-ui/icons/ExpandMore'
import LoopIcon from '@material-ui/icons/Loop';
import FolderOpenTwoToneIcon from '@mui/icons-material/FolderOpenTwoTone';

import * as ResourceGroupService from "../../services/ResourceGroupService";
import SimpleItemList from './SimpleItemList'

const useStyles = makeStyles((theme) => ({
    root: {
        paddingTop: 0,
        paddingBottom: 0
    },
    odd: {
        background: theme.palette.primary.dark
    },
    even: {
        background: theme.palette.primary.main
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
        maxWidth: 600
    },
    nested: {
        marginLeft: theme.spacing(2),
        // marginLeft: theme.spacing(3),
        borderLeft: '1px solid #dcdcdc',
    },
    icon: {
        '& path': {
            fill: 'white'
        }
    }
}))

const NestedItemList = props => {
    const classes = useStyles()

    const [open, setOpen] = useState(false)
    const [selected, setSelected] = useState(false)
    const [loading, setLoading] = useState(false)
    const [children, setChildren] = useState([])

    const handleClick = () => {
        setOpen(!open);
    }

    useEffect(() => {
        if (children.length === 0 && open) {
            setLoading(true)
            // props.setLoading(true)
            ResourceGroupService.serviceListFirstLevelLazy(props.id).then(data => {
                console.log(data)
                setChildren(data)
                setLoading(false)
                // props.setLoading(false)
            })
        }
    }, [open])

    useEffect(() => {
        setLoading(false)
        // props.setLoading(false)
        if (props.fondo) {
            const f = props.fondo.find(r => r ? r.id === props.id : false)
            f ? setSelected(true) : setSelected(false)
        }
        // props.fondo.id === props.id ? setSelected(true) : setSelected(false)
    }, [props.fondo])

    return (
        <>
            <ListItem button className={`${props.class} ${classes.root}`}>
                <Checkbox
                    checked={selected}
                    edge="start"
                    style={{
                        // color: "white"
                    }}
                    onClick={() => { selected ? props.setFondo({ name: props.name, id: props.id }, false) : props.setFondo({ name: props.name, id: props.id }) }}
                />

                {!loading ? <>
                    <ListItemIcon>
                        <FolderOpenTwoToneIcon className={classes.icon} />
                    </ListItemIcon>
                </> : <Box mr={4}>
                    <ListItemIcon>
                        <LoopIcon className={classes.icon} />
                    </ListItemIcon>
                </Box>}


                <ListItemText
                //  style={{ color: 'white' }} 
                 primary={props.name} onClick={handleClick} />

                <ListItemSecondaryAction onClick={handleClick}>
                    <IconButton edge="end" aria-label="comments">
                        {open && !loading ? <ExpandLess className={classes.icon} /> : <>{!loading ? <ExpandMore className={classes.icon} /> : <></>}</>}
                    </IconButton>
                </ListItemSecondaryAction>
            </ListItem>

            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding className={props.class}>

                    {children.map((c, index) => {
                        return (c.children !== true ? (
                            <>
                                <SimpleItemList
                                    name={c.text}
                                    class={`${classes.nested} ${index % 2 === 0 ? classes.even : classes.odd}`}
                                    setFondo={props.setFondo}
                                    fondo={props.fondo}
                                    id={c.id}
                                />
                            </>
                        ) : (
                            <>
                                <NestedItemList
                                    name={c.text}
                                    class={`${classes.nested} ${index % 2 === 0 ? classes.even : classes.odd}`}
                                    children={c.children}
                                    id={c.id}
                                    path={`${props.path}|${props.id}`}
                                    setFondo={props.setFondo}
                                    fondo={props.fondo}
                                />
                            </>
                        ))
                    })}
                </List>
            </Collapse>
        </>
    )
}

export default NestedItemList