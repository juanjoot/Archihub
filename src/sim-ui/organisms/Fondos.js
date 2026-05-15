import { useEffect, useState } from 'react';
import Box from '@material-ui/core/Box'
import { makeStyles } from '@material-ui/core/styles'

import List from '@material-ui/core/List'

import NestedItemList from './NestedItemList'
import SimpleItemList from './SimpleItemList'

const useStyles = makeStyles((theme) => ({
    odd: {
        background: theme.palette.primary.dark
    },
    even: {
        background: theme.palette.primary.main
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
        // paddingLeft: theme.spacing(2),
        // paddingRight: theme.spacing(2),
        maxWidth:800,
        overflow: 'hidden',
    },
    nested: {
        paddingLeft: theme.spacing(3),
        marginLeft: theme.spacing(3),
        borderLeft: '1px solid #dcdcdc',
    }
}))

const Fondos = props => {
    const classes = useStyles()
    return(
        <Box className={classes.listado}>
            <List
                disablePadding
                component="nav"
                aria-labelledby="nested-list-subheader"
            >
                {props.root.map((i, index) => {
                    if(i.children)
                        return(<>
                            <NestedItemList
                                name={`${i.text}`}
                                children={i.children}
                                id={i.id}
                                path=""
                                setFondo={props.setFondo}
                                setLoading={props.setLoading}
                                fondo={props.fondo}
                                class={index % 2 === 0 ? classes.even : classes.odd}
                                // key={`${i.id}-${props.fondo}`}
                            />
                        </>)
                    else
                        return(<>
                            <SimpleItemList
                                id={i.id}
                                name={i.text}
                                subname={i.text2}
                                setFondo={props.setFondo}
                                fondo={props.fondo}
                            />
                        </>)
                })}
            </List>
        </Box>
    )
}

export default Fondos