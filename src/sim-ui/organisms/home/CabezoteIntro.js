import React, { useRef, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import Lottie from "react-lottie";

import Box from "@material-ui/core/Box"
import Typography from "@material-ui/core/Typography"
import { makeStyles } from "@material-ui/core"
import animationData from "../../assets/anim/scroll_down.json";
import InputBase from "@material-ui/core/InputBase";
import Search from "@material-ui/icons/Search";


import { gsap } from 'gsap'
import { CSSPlugin } from 'gsap/CSSPlugin'

import home from '../../assets/home_01-min.png'

gsap.registerPlugin(CSSPlugin)

const useStyles = makeStyles((theme) => ({
    presentacion: {
        position: 'relative',
        padding: theme.spacing(2),
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '70vh',
        zIndex: 2,

        '&:before': {
            content: '""',
            top: 0,
            left: 0,
            opacity: .9,
            width: '100%',
            height: '100%',
            position: 'absolute',
        },

        [theme.breakpoints.down('lg')]: {
            flexWrap: 'wrap',
        },
        [theme.breakpoints.down('md')]: {
            justifyContent: 'center',
        },
        [theme.breakpoints.up('md')]: {
            padding: theme.spacing(6),
            paddingTop: theme.spacing(6),
            paddingBottom: theme.spacing(6),
        }
    },
    imagenIntro: {
        position: 'relative',
        width: '25%',
        zIndex: 2,

        '& img': {
            maxWidth: '100%'
        },

        [theme.breakpoints.down('lg')]: {
            width: '25%',
            marginLeft: '10%'
        },

        [theme.breakpoints.down('md')]: {
            width: '70%',
            marginLeft: '10%',
            marginRight: '10%',
            textAlign: 'center'
        }
    },
    titulo: {
        position: 'relative',
        width: '40%',
        textAlign: 'center',
        marginRight: theme.spacing(4),
        zIndex: 2,

        '& h1': {
            color: 'white',
            fontSize: '4em'
        },

        [theme.breakpoints.down('lg')]: {
            width: '40%',
            marginRight: '10%'
        },

        [theme.breakpoints.down('md')]: {
            width: '100%',
            marginLeft: '0%',
            marginRight: '0%',
            marginBottom: theme.spacing(6),
            textAlign: 'center',
            '& h1': {
                color: 'white',
                fontSize: '2.25em',
                maxWidth: 500
            }
        }
    },
    scroll: {
        marginTop: theme.spacing(8),
        '& span': {
            color: 'white',
            display: 'block',
            marginBottom: theme.spacing(1)
        }
    },
    descripcion: {
        position: 'relative',
        width: '25%',
        marginLeft: theme.spacing(8),
        marginRight: theme.spacing(4),
        zIndex: 2,

        '& h4': {
            color: 'white',
            fontSize: '1.5rem'
        },

        [theme.breakpoints.down('lg')]: {
            width: '100%',
            marginLeft: '5%',
            marginRight: '5%'
        }
    },
    searchForm: {
        border: "1px solid white",
        borderRadius: 50,
        margin: '0 auto',
        marginTop: theme.spacing(4),
        paddingRight: theme.spacing(1),
        paddingLeft: theme.spacing(2),
        maxWidth: 600,
        display: 'flex',
        alignItems: 'center',
    },
    searchIcon: {
        color: "white",
    },
    searchInput: {
        color: "white",
        width: "100%",
        padding: theme.spacing(1)
    },
}))

const CabezoteIntro = props => {
    const classes = useStyles();
    const navigate = useNavigate();
    const [input, setInput] = useState('')
    const [loaded, setLoaded] = useState(false)
    let imgRef = useRef()
    let titRef = useRef()
    let desRef = useRef()

    useEffect(() => {
        const tl = gsap.timeline()

        if (!loaded) {
            setLoaded(true)
            tl
                .add('start')
                .fromTo([imgRef.current, titRef.current], {
                    autoAlpha: 0
                }, {
                    autoAlpha: 1,
                    duration: 4
                }, 'start')
                .fromTo(desRef.current, {
                    autoAlpha: 0,
                    x: 20
                }, {
                    autoAlpha: 1,
                    x: 0,
                    duration: 4
                })
        }

    })

    const [t, i18n] = useTranslation("common");

    return (
        <>
            <Box className={classes.presentacion}>
                <Box ref={element => { imgRef.current = element }} className={classes.imagenIntro}>
                    <img src={home} />
                </Box>
                <Box ref={element => { titRef.current = element }} className={classes.titulo}>
                    <Typography
                        variant="h1"
                    >
                        {t("home.titulo")}
                    </Typography>

                    <Box>
                        <form className={classes.searchForm} onSubmit={() => { navigate(input ? '/explora/buscador?keyword=' + input : '/explora/buscador') }}>
                            <Search className={classes.searchIcon} />
                            <InputBase
                                className={classes.searchInput}
                                placeholder={t("explora.busquedaInput")}
                                inputProps={{ maxLength: 140 }}
                                onChange={(e) => setInput(e.target.value)}
                            />
                        </form>
                    </Box>


                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-around',
                            alignItems: 'center',
                            gap: '20px',
                        }}
                    >
                        <Box className={classes.scroll}>
                            <Typography
                                variant="p"
                            >
                                Explora por áreas
                            </Typography>
                            <a href='#contenido'>
                                <Lottie
                                    height={50}
                                    width={50}
                                    options={{
                                        loop: true,
                                        autoplay: true,
                                        animationData: animationData,
                                        rendererSettings: {
                                            preserveAspectRatio: "xMidYMid slice",
                                        },
                                    }}
                                />
                            </a>

                        </Box>
                        <Box className={classes.scroll}>
                            <Typography
                                variant="p"
                            >
                                Explora por estrategias
                            </Typography>
                            <a href='#contenido'>
                                <Lottie
                                    height={50}
                                    width={50}
                                    options={{
                                        loop: true,
                                        autoplay: true,
                                        animationData: animationData,
                                        rendererSettings: {
                                            preserveAspectRatio: "xMidYMid slice",
                                        },
                                    }}
                                />
                            </a>

                        </Box>
                    </div>
                </Box>
                {/* <Box ref={element => { desRef.current = element }} className={classes.descripcion}>
                    <Typography
                        variant="h4"
                    >
                        {t("home.descripcion")}
                    </Typography>
                </Box> */}
            </Box>
        </>
    )
}

export default CabezoteIntro