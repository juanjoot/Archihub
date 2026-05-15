import React, { useState, useEffect } from 'react'
import { Box } from '@material-ui/core'
import { Typography } from '@material-ui/core'
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { IconButton } from '@material-ui/core';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';
import CachedIcon from '@material-ui/icons/Cached';
import { Button } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    box: {
        display: 'flex',
        alignItems: 'center',
        borderTop: '1px dashed rgba(255,255,255,.1)',
        paddingTop: 10,
        paddingBottom: 10,
        cursor: 'pointer',
        transition: 'all 0.2s ease',

        '&.first': {
            borderTop: 'none',
        },

        '&:hover': {
            background: 'rgba(255,255,255,.1)'
        },

        '&.true': {
            background: 'rgba(126,209,84,.1)'
        },

        '&.false': {
            background: 'rgba(195,62,23,.3)'
        }
    },
    icon: {
        '& path': {
            fill: 'white'
        }
    },
    reload: {
        background: 'rgba(255,255,255,0.1)'
    }
}))

const Question = props => {
    const classes = useStyles()
    const [data, setData] = useState(null)
    const [validated, setValidated] = useState(false)

    useEffect(() => {
        const data_temp = props.data.map(d => {
            d['value'] = false
            return d
        })

        data_temp.sort(() => Math.random() - .5)

        setData(data_temp)
    }, [props.data])

    const handleUpdate = i => {
        const data_temp = [...data]
        data_temp[i]['value'] = !data_temp[i]['value']
        setValidated(false)
        setData(data_temp)
    }

    const resetAll = () => {
        const data_temp = props.data.map(d => {
            d['value'] = false
            return d
        })

        data_temp.sort(() => Math.random() - .5)

        setData(data_temp)
        setValidated(false)
    }

    const validateAll = () => {
        setValidated(true)
    }

    return (
        <Box>
            <p style={{ width: '100%', textAlign: 'center', fontSize: 17, opacity: .4, marginTop: -40, marginBottom: 30 }}>Test de selección múltiple</p>
            <p style={{ fontSize: 15, fontStyle: 'italic', marginBottom: 10, opacity: .7, textAlign: 'left', paddingLeft: 50 }}>Selecciona una o varias opciones:</p>

            {data?.map((d, i) => {
                return (
                    <>
                        {validated ? <>
                            <Box
                                className={`${classes.box} ${d.value === d.estado ? 'true' : 'false'} ${i === 0 ? 'first' : ''}`}
                                onClick={() => handleUpdate(i)}
                            >
                                <IconButton
                                    className={classes.icon}
                                >
                                    {!d.value ? <RadioButtonUncheckedIcon /> : <RadioButtonCheckedIcon />}
                                </IconButton>
                                <p style={{ margin: 0 }}>{d.texto}</p>
                            </Box>
                        </> : <>
                            <Box
                                className={`${classes.box} ${i === 0 ? 'first' : ''}`}
                                onClick={() => handleUpdate(i)}
                            >
                                <IconButton
                                    className={classes.icon}
                                >
                                    {!d.value ? <RadioButtonUncheckedIcon /> : <RadioButtonCheckedIcon />}
                                </IconButton>
                                <p style={{ margin: 0 }}>{d.texto}</p>
                            </Box>
                        </>}
                    </>
                )
            })}

            <Box
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    marginTop: 20
                }}
            >
                {data?.filter(d => d.value).length > 0 && !validated &&
                    <Button
                        variant="contained"
                        color="primary"
                        style={{ marginRight: 20 }}
                        onClick={validateAll}
                    >
                        Verificar mis respuestas
                    </Button>
                }

                <IconButton
                    className={`${classes.icon} ${classes.reload}`}
                    onClick={() => resetAll()}
                >
                    <CachedIcon />
                </IconButton>
            </Box>
        </Box>
    )
}

export default Question