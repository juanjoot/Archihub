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

const ChildrenQuestions = props => {

}

const MultipleQuestions = props => {
    const classes = useStyles()
    const [data, setData] = useState(null)
    const [validated, setValidated] = useState(false)

    useEffect(() => {
        const data_temp = props.data.map(d => {
            let index = -1
            d.data = d.data.sort(() => Math.random() - .5)
            d.data.map((d_, i) => {
                if (d_.result) index = i
            })
            d['result'] = index
            d['value'] = -1
            return d
        })

        data_temp.sort(() => Math.random() - .5)

        setData(data_temp)
    }, [props.data])

    const handleUpdate = (parent, child) => {
        const data_temp = [...data]
        data_temp[parent]['value'] = child
        setValidated(false)
        setData(data_temp)
    }

    const resetAll = () => {
        const data_temp = props.data.map(d => {
            let index = -1
            d.data = d.data.sort(() => Math.random() - .5)
            d.data.map((d_, i) => {
                if (d_.result) index = i
            })
            d['result'] = index
            d['value'] = -1
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
            {data?.map((d, i) => {
                return (
                    <Box>
                        <p style={{ margin: 0, fontWeight: 'bold', marginTop: 20 }}>{d.text}</p>


                        {
                            d.data.map((d_, i_) => {
                                return (
                                    <Box
                                        className={`${classes.box} ${validated && i_ === d.value ? d_.result && i_ === d.result ? 'true' : 'false' : ''} ${i_ === 0 ? 'first' : ''}`}
                                        onClick={() => handleUpdate(i, i_)}
                                    >
                                        <IconButton
                                            className={classes.icon}
                                        >
                                            {i_ !== d.value ? <RadioButtonUncheckedIcon /> : <RadioButtonCheckedIcon />}
                                        </IconButton>

                                        <p style={{ margin: 0 }}>{d_.text}</p>
                                    </Box>
                                )
                            })
                        }
                    </Box>
                )
            })}

            <Box
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    marginTop: 20
                }}
            >
                {data &&
                    <>
                        {data.filter(d => d.value > -1).length === data.length && !validated &&
                            <Button
                                variant="contained"
                                color="primary"
                                style={{ marginRight: 20 }}
                                onClick={validateAll}
                            >
                                Verificar mis respuestas
                            </Button>
                        }
                    </>
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

export default MultipleQuestions