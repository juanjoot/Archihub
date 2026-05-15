import React, { useState, useEffect } from 'react'
import { makeStyles } from "@material-ui/core"
import { Box } from '@material-ui/core'
import * as Levels from './AdvancedBoxOpts/levels'

const useStyles = makeStyles(theme => ({
    labelRoot: {
        borderBottom: '1px solid rgba(255,255,255,.1)',
        display: 'flex',
        alignItems: 'center',
        padding: 5,

        '&.active': {
            background: 'rgba(255,255,255,.1)'
        }
    },
    activator: {
        border: '2px solid rgba(255,255,255,.2)',
        color: 'rgba(255,255,255,.4)',
        fontWeight: 'bold',
        padding: 5,
        borderRadius: 5,
        marginRight: 15,

        '&.active span': {
            color: 'white'
        },

        '&.active': {
            borderColor: 'white'
        }
    },
    text: {
        textTransform: 'lowercase',
        fontStyle: 'italic',
        color: 'rgba(255,255,255,.6)'
    }
}))

const Label = props => {
    const classes = useStyles()
    const [activator, setActivator] = useState(props.activator)
    const [active, setActive] = useState(false)

    const setSubstring = (text, keyword) => {
        const index = text.indexOf(keyword)
        if(index === 0 && keyword !== ''){
            const firstPart = text.substring(0, index)
            const secondPart = text.substring(index + keyword.length, text.length)
            setActivator(
                <><span>{keyword}</span>{secondPart}</>
            )
            setActive(true)

            if(!props.hovered.includes(props.index)) props.setHovered([...props.hovered, props.index])
        } else {
            setActivator(props.activator)
            setActive(false)

            if(props.hovered.includes(props.index)) props.setHovered(props.hovered.filter(e => e !== props.index))
        }
        
    }

    useEffect(() => {
        setSubstring(props.activator, props.keyword)
    }, [props.keyword])

    return (
        <Box
            className={`${classes.labelRoot} ${props.className} ${props.selected === props.index ? 'active' : ''}`}
            // onMouseEnter={() => props.setNewSelected(props.index)}
        >
            <Box className={`${classes.activator} ${active ? 'active' : ''}`}>{activator}:</Box>
            <Box className={classes.text}>{props.text}</Box>
        </Box>
    )
}

const AdvancedBox = props => {
    const [level, setLevel] = useState(0)
    const [selected, setSelected] = useState(-1)
    const [hovered, setHovered] = useState([])
    const [active, setActive] = useState(false)

    const setNewActive = (i) => {
        
    }

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.keyCode === 9) {
                e.preventDefault()
                console.log('tab pressed')

                if (hovered.length === 1) {
                    setSelected(hovered[0])
                }
            }
        }
        
        document.addEventListener('keydown', handleKeyDown)

        return () => {
            document.removeEventListener('keydown', handleKeyDown)
        }
    })

    useEffect(()=>{
        
    }, [selected])

    return (
        <Box className={props.className}>
            {Levels.level_0.map((e, i) => {
                return (
                    <Label
                        className={`${i === selected ? 'active' : ''}`}
                        activator={e.activator}
                        text={e.text}
                        index={i}
                        hovered={hovered}
                        setHovered={setHovered}
                        selected={selected}
                        keyword={props.keyword}
                    />
                )
            })}
        </Box>
    )
}

export default AdvancedBox