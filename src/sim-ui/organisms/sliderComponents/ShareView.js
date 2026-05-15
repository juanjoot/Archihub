import { Box, makeStyles, Typography } from '@material-ui/core'
import TextField from '@mui/material/TextField'
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import React, { useState, useEffect } from 'react'

const useStyles = makeStyles((theme) => ({
    root: {
        width: 300,
        position: 'fixed',
        top: 80,
        right: 75,
        padding: 5,
        borderRadius: 5,
        background: 'rgba(0,0,0,0.6)',
        backdropFilter: 'Blur(25px)',
        color: 'white'
    },
    input: {
        color: 'white',
        width: '100%',

        '& input': {
            color: 'white'
        },
        '& label': {
            color: 'white',
        },
        '& fieldset': {
            borderColor: 'rgba(255,255,255,.6)',
            borderStyle: 'dashed'
        }
    }
}))

const ShareView = props => {
    const classes = useStyles()
    const [checked, setChecked] = useState(false)
    const [url, setUrl] = useState('')

    const checkedHandle = () => {
        setChecked(!checked)
    }

    useEffect(() => {
        setUrl(`${window.location.origin}/${props.slug}${checked ? '?bloque=' + props.current : ''}`)
    }, [props.current, checked])

    console.log(props.currentCard)

    return (
        <>
            <Box
                className={classes.root}
            >

                <Typography
                    variant="caption"
                    style={{ display: 'block', marginBottom: 5, fontWeight: 'bold' }}
                >
                    Comparte esta colección:
                </Typography>

                {props.current > 1 &&
                    <FormGroup>
                        <FormControlLabel style={{ marginBottom: 5, display: 'block' }} control={<Checkbox onChange={checkedHandle} checked={checked} size="small" sx={{
                            color: 'white',
                            '&.Mui-checked': {
                                color: 'white',
                            },
                        }} />} label={<Typography variant="caption" sx={{ fontSize: 9 }}>hacer scroll a este punto</Typography>} />
                    </FormGroup>
                }


                <TextField
                    // defaultValue={`${window.location.origin}/${props.slug}${checked ? '?bloque=' + props.current : ''}`}
                    value={url}
                    className={classes.input}
                    size="small"
                    InputProps={{
                        readOnly: true,
                    }}
                />

                {props.currentCard.pieces[0].type !== 'intro' && props.currentCard.pieces[0].type !== 'texto' &&
                    <>
                        <Typography
                            variant="caption"
                            style={{ display: 'block', marginBottom: 5, marginTop: 10, fontWeight: 'bold' }}
                        >
                            Comparte este recurso:
                        </Typography>

                        <TextField
                            // defaultValue={`${window.location.origin}/${props.slug}${checked ? '?bloque=' + props.current : ''}`}
                            value={`${window.location.origin}/explora/buscador?query=${props.currentCard.pieces[0].resource.document.ident}`}
                            className={classes.input}
                            size="small"
                            InputProps={{
                                readOnly: true,
                            }}
                        />

                    </>
                }

            </Box>
        </>
    )
}

export default ShareView