import { useEffect, useRef, useState } from 'react';
import { Link } from "react-router-dom"
import { useTranslation } from "react-i18next";

import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

import ExploreIcon from '@material-ui/icons/ExploreTwoTone'
import ExtensionIcon from '@material-ui/icons/ExtensionTwoTone'
import CreateIcon from '@material-ui/icons/CreateTwoTone'
import ArrowBack from '@material-ui/icons/ArrowBack'

import imgExplora from '../assets/home/explora_home.svg'
import imgConoce from '../assets/home/conoce_home.svg'
import imgCrea from '../assets/home/crea_home.svg'
import imgIntro from '../assets/home/intro_home.svg'
import imgPlantas from '../assets/home/plantas_home.png'
import imgHoja from '../assets/home/hoja_home.png'
import logoCev from '../assets/home/logo_cev.png'
import logoJep from '../assets/home/logo_jep.png'
import logoSip from '../assets/home/logo_sip.png'
import logoUb from '../assets/home/logo_ub.png'

import { makeStyles } from "@material-ui/core"
import { gsap } from 'gsap'
import { CSSPlugin } from 'gsap/CSSPlugin'

gsap.registerPlugin(CSSPlugin)

export const col_explora = {
    main: '#f45353',
    dark: '#e02020'
}

export const col_conoce = {
    main: '#13c0c8',
    dark: '#019592'
}

export const col_crea = {
    main: '#ffc258',
    dark: '#e07714'
}

const useStyles = makeStyles((theme) => ({
    root: {
        position: 'fixed',
        display: 'flex',
        width: '100vw',
        height: '100vh',
        padding: '40px 60px 30px 60px',
        justifyContent: 'end',
        backgroundColor: theme.palette.primary.main
    },
    ArrowBack: {
        color: theme.palette.primary.main,
        width: '5vw',
        height: '5vw',
        position: 'absolute',
        margin: 20,
        top: 0,
        left: 0,
        zIndex: 1,
        visibility: 'hidden',
        cursor: 'pointer'
    },
    crea: {
        backgroundColor: col_crea.main,
        width: '100vw',
        height: '100vw',
        position: 'absolute',
        top: '50%',
        left: 0,
        transform: 'translate(-55%, -50%)',
        borderRadius: '100%',
        cursor: 'pointer'
    },
    explora: {
        backgroundColor: col_explora.main,
        width: '75vw',
        height: '75vw',
        position: 'absolute',
        top: '50%',
        left: 0,
        transform: 'translate(-60%, -50%)',
        borderRadius: '100%',
        cursor: 'pointer'
    },
    conoce: {
        backgroundColor: col_conoce.main,
        width: '50vw',
        height: '50vw',
        position: 'absolute',
        top: '50%',
        left: 0,
        transform: 'translate(-70%, -50%)',
        borderRadius: '100%',
        cursor: 'pointer'
    },
    infoContainer: {
        width: '50%',
        color: 'white',
        position: 'relative'
    },
    infoIntro:{
        width: '500px',
        maxWidth: '30vw',
        float: 'right'
    },
    infoImg: {
        width: '100%',
        height: 'auto',
        paddingBottom: '3em'
    },
    imgPlantas: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        width: '300px',
        maxWidth: '15vw',
        zIndex: -1
    },
    imgHoja: {
        position: 'fixed',
        zIndex: -1,
        top: '5vh',
        left: '32vw',
        width: '300px',
        maxWidth: '20vw',
        mixBlendMode: 'color-burn',
        opacity: .3
    },
    infoIntroText: {
        padding: '20px 0',
        borderTop: '1px solid white',
        borderBottom: '1px solid white',
        lineHeight: '1.4'
    },
    logoContainer: {
        height: '74px',
        position: 'absolute',
        bottom: '0',
        zIndex: 1
    },
    logo : {
        objectFit: 'contain',
        width: '25%',
        padding: '0 8px'
    },
    infoMore: {
        position: 'absolute',
        left: '10vw',
        width: '35vw',
        color: 'white',
        top: '40%',
        transform: 'translate(0, -50%)',
        zIndex: 1,
        display: 'none',
    },
    infoTitle: {
        color: 'white',
        fontFamily: "'Montserrat', sans-serif",
        textTransform: 'uppercase',
        fontWeight: 900,
        letterSpacing: '5px',
    },
    infoMoreText : {
        lineHeight: '1.4',
        color: theme.palette.primary.main,
    },
    titulo: {
        position: 'absolute',
        right: theme.spacing(10),
        top: '50%',
        color: 'white',
        transform: 'translate(0, 9vw)',
        fontWeight: 800,
        fontSize: '2vw',
        textAlign: 'center'
    },
    icon: {
        position: 'absolute',
        right: '0',
        top: '50%',
        color: 'white',
        transform: 'translate(0, -50%)',
        width: '16vw',
        height: '16vw',
        opacity: .4
    },
    imgConoce: {
        position: 'absolute',
        width: '40vw',
        left: '5vw',
        zIndex: 1,
        opacity: 0,
        pointerEvents: 'none',
        top: '8vh'
    },
    imgExplora: {
        position: 'absolute',
        width: '60vw',
        left: '0',
        bottom: '-2vh',
        zIndex: 1,
        opacity: 0,
        pointerEvents: 'none',
    },
    imgCrea: {
        position: 'fixed',
        width: '60vw',
        height: 'auto',
        left: '-2vw',
        bottom: '-5vh',
        zIndex: 1,
        opacity: 0,
        pointerEvents: 'none',
    },
    btn: {
        marginTop: theme.spacing(2),
        backgroundColor: theme.palette.primary.main,
        color: 'white',
        textTransform: 'uppercase',
        fontFamily: "'Montserrat', sans-serif",
        float: 'right',
        letterSpacing: '1px',
    }
}))

const HomeDesktop = props => {
    const classes = useStyles()
    const [t, i18n] = useTranslation("common");

    const [selected, setSelected] = useState(null)

    const creaRef = useRef()
    const exploraRef = useRef()
    const conoceRef = useRef()
    const introRef = useRef()
    const creaTit = useRef()
    const exploraTit = useRef()
    const conoceTit = useRef()

    const exploraImg = useRef()
    const creaImg = useRef()
    const conoceImg = useRef()

    const exploraInfo = useRef()
    const creaInfo = useRef()
    const conoceInfo = useRef()

    const creaIcon = useRef()
    const exploreIcon = useRef()
    const conoceIcon = useRef()

    const closeCrea = useRef()
    const closeConoce = useRef()
    const closeExplora = useRef()


    const hojaImg = useRef()
    const plantasImg = useRef()

    useEffect(() => {
        const tl = gsap.timeline()

        tl.add('start')
            // .fromTo([creaRef.current], { scale: 0 }, { x: '-55%', width: '100vw', height: '100vw', scale: 1, duration: 1, ease: 'power2', delay: .5 })
            .fromTo([exploraRef.current], { scale: 0 }, { x: '-60%', width: '75vw', height: '75vw', scale: 1, duration: 1, ease: 'power2', delay: -.75 })
            .fromTo([conoceRef.current], { scale: 0 }, { x: '-70%', width: '50vw', height: '50vw', scale: 1, duration: 1, ease: 'power2', delay: -.75 })
            // .fromTo([creaTit.current], { autoAlpha: 0 }, { autoAlpha: 1, duration: .2, ease: 'power2' })
            .fromTo([exploraTit.current], { autoAlpha: 0 }, { autoAlpha: 1, duration: .2, ease: 'power2' })
            .fromTo([conoceTit.current], { autoAlpha: 0 }, { autoAlpha: 1, duration: .2, ease: 'power2' })
            .fromTo([introRef.current], { autoAlpha: 0 }, { autoAlpha: 1, duration: 4.5, ease: 'power2' }, 'start')
            .fromTo([hojaImg.current],  { autoAlpha: 0, scale: 0 }, { autoAlpha: 0.3, scale: 1, duration: 1 })

    }, [exploraRef, conoceRef])

    const openCrea = () => {
        if (selected === null) {
            setSelected('crea')

            const tl_crea = gsap.timeline()
            tl_crea.add('start')
                .to([creaIcon.current], { css: { 'opacity': 0 }, duration: 0 }, 'start')
                .to([closeCrea.current], { css: { 'visibility': 'visible' }, duration: 0 }, 'start')
                // .to([creaTit.current], { css: { 'opacity': 0 }, duration: 0 }, 'start')
                // .to([creaInfo.current], { css: { 'display': 'block', 'opacity': 0 }, duration: 0 })
                .to([conoceRef.current], { x: '-100%', duration: 1, ease: 'power1' })
                .to([exploraRef.current], { x: '-100%', duration: 1, ease: 'power1' }, 'start')
                // .to([creaImg.current], { css: { 'left': '-50px', opacity: 1 }, duration: 1, ease: 'power1' }, 'start')
                // .to([creaRef.current], { width: '130vw', height: '130vw', duration: .75, ease: 'power2' }, 'start')
                // .to([creaInfo.current], { css: { 'opacity': 1 }, duration: 0.75 }, 'start')

        } else if (selected === 'crea') {
            setSelected(null)

            const tl_crea = gsap.timeline()
                .to([creaIcon.current], { css: { 'opacity': .4 }, duration: 0 }, 'start')
                .to([closeCrea.current], { css: { 'visibility': 'hidden' }, duration: 0 }, 'start')
                // .to([creaTit.current], { css: { 'opacity': 1 }, duration: 0 }, 'start')
                // .to([creaImg.current], { css: { 'left': '-100%', opacity: 0 }, duration: 1, ease: 'power1' })
                .to([exploraRef.current], { x: '-60%', duration: 1, ease: 'power2' }, 'start')
                .to([conoceRef.current], { x: '-70%', duration: 1, ease: 'power2', delay: -.5 })
                // .to([creaRef.current], { width: '100vw', height: '100vw', duration: .75, ease: 'power2' }, 'start')
                // .to([creaInfo.current], { css: { 'opacity': 0 }, duration: 0.75 }, 'start')
                // .to([creaInfo.current], { css: { 'display': 'none' }, duration: 0 })    
        }
    }

    const openConoce = () => {
        if (selected === null) {
            setSelected('conoce')

            const tl_conoce = gsap.timeline()
            tl_conoce.add('start')
                .to([conoceIcon.current], { css: { 'opacity': 0 }, duration: 0 }, 'start')
                .to([closeConoce.current], { css: { 'visibility': 'visible' }, duration: 0 }, 'start')
                .to([conoceTit.current], { css: { 'opacity': 0 }, duration: 0 }, 'start')
                .to([conoceInfo.current], { css: { 'display': 'block', 'opacity': 0 }, duration: 0 })
                .to([exploraRef.current], { x: '-100%', duration: 1, ease: 'power1' })
                // .to([creaRef.current], { x: '-100%', duration: 1, ease: 'power1' }, 'start')
                .to([conoceImg.current], { css: { 'left': '5vw', opacity: 1 }, duration: 1, ease: 'power1' }, 'start')
                .to([conoceRef.current], {  x: '-55%',width: '130vw', height: '130vw', duration: .75, ease: 'power2' }, 'start')
                .to([conoceInfo.current], { css: { 'opacity': 1 }, duration: 0.75 }, 'start')
        } else if (selected === 'conoce') {
            setSelected(null)

            const tl_conoce = gsap.timeline()
            tl_conoce.add('start')
                .to([conoceIcon.current], { css: { 'opacity': .4 }, duration: 0 }, 'start')
                .to([closeConoce.current], { css: { 'visibility': 'hidden' }, duration: 0 }, 'start')
                .to([conoceTit.current], { css: { 'opacity': 1 }, duration: 0 }, 'start')
                .to([conoceImg.current], { css: { 'left': '-100%', opacity: 0 }, duration: 1, ease: 'power1' })
                .to([exploraRef.current], { x: '-60%', duration: 1, ease: 'power2' }, 'start')
                // .to([creaRef.current], { x: '-55%', duration: 1, ease: 'power2', delay: -.5 })
                .to([conoceRef.current], { x: '-70%', width: '50vw', height: '50vw', duration: .75, ease: 'power2' }, 'start')
                .to([conoceInfo.current], { css: { 'opacity': 0 }, duration: 0.75 }, 'start')
                .to([conoceInfo.current], { css: { 'display': 'none' }, duration: 0 })
        }
    }

    const openExplora = () => {
        if (selected === null) {
            setSelected('explora')

            const tl_explora = gsap.timeline()
            tl_explora.add('start')
                .to([closeExplora.current], { css: { 'visibility': 'visible' }, duration: 0 }, 'start')
                .to([exploreIcon.current], { css: { 'opacity': 0 }, duration: 0 }, 'start')
                .to([exploraTit.current], { css: { 'opacity': 0 }, duration: 0 }, 'start')
                .to([exploraInfo.current], { css: { 'display': 'block', 'opacity': 0 }, duration: 0 })
                .to([conoceRef.current], { x: '-100%', duration: 1, ease: 'power1' })
                // .to([creaRef.current], { x: '-100%', duration: 1, ease: 'power1' }, 'start')
                .to([exploraImg.current], { css: { 'left': '0', opacity: 1 }, duration: 1, ease: 'power1' }, 'start')
                .to([exploraRef.current], { x: '-55%', width: '130vw', height: '130vw', duration: .75, ease: 'power2' }, 'start')
                .to([exploraInfo.current], { css: { 'opacity': 1 }, duration: 0.75 }, 'start')
            } else if (selected === 'explora') {
            setSelected(null)

            const tl_explora = gsap.timeline()
            tl_explora.add('start')
                .to([closeExplora.current], { css: { 'visibility': 'hidden' }, duration: 0 }, 'start')
                .to([exploreIcon.current], { css: { 'opacity': .4 }, duration: 0 }, 'start')
                .to([exploraTit.current], { css: { 'opacity': 1 }, duration: 0 }, 'start')
                .to([exploraImg.current], { css: { 'left': '-100%', opacity: 0 }, duration: 1, ease: 'power1' })
                // .to([creaRef.current], { x: '-55%', duration: 1, ease: 'power2' }, 'start')
                .to([conoceRef.current], { x: '-70%', duration: 1, ease: 'power2', delay: -.5 })
                .to([exploraRef.current], { x: '-60%', width: '75vw', height: '75vw', duration: .75, ease: 'power2' }, 'start')
                .to([exploraInfo.current], { css: { 'opacity': 0 }, duration: 0.75 }, 'start')
                .to([exploraInfo.current], { css: { 'display': 'none' }, duration: 0 })
        }
    }

    return (
        <Box className={classes.root}>
            <ArrowBack onClick={openCrea} className={classes.ArrowBack} ref={closeCrea}/>
            <ArrowBack onClick={openExplora} className={classes.ArrowBack} ref={closeExplora}/>
            <ArrowBack onClick={openConoce} className={classes.ArrowBack} ref={closeConoce}/>
            {/* <img src={imgCrea} ref={creaImg} className={classes.imgCrea}/>
            <Box
                className={classes.crea}
                ref={creaRef}
                onClick={openCrea}
            >
                <Box>
                    <CreateIcon 
                        ref={creaIcon}
                        className={classes.icon}
                        style={{transform: 'translate(0, -50%) rotate(180deg)'}}
                    />
                    <Typography
                        variant="h5"
                        className={classes.titulo}
                        ref={creaTit}
                    >
                        {t("home.crea")}
                    </Typography>
                </Box>
            </Box> */}
            <img src={imgExplora} ref={exploraImg} className={classes.imgExplora}/>
            <Box
                className={classes.explora}
                ref={exploraRef}
                onClick={openExplora}
            >
                <Box>
                    <ExploreIcon ref={exploreIcon} className={classes.icon}/>
                    <Typography
                        variant="h5"
                        className={classes.titulo}
                        ref={exploraTit}
                    >
                        {t("home.explora")}
                    </Typography>
                </Box>
            </Box>
            <img src={imgConoce} ref={conoceImg} className={classes.imgConoce}/>
            <Box
                className={classes.conoce}
                ref={conoceRef}
                onClick={openConoce}
            >
                <Box>
                    <ExtensionIcon 
                        ref={conoceIcon}
                        className={classes.icon}
                        style={{transform: 'translate(0, -55%) rotate(-25deg)'}}
                    />
                    <Typography
                        variant="h5"
                        className={classes.titulo}
                        ref={conoceTit}
                    >
                        {t("home.conoce")}
                    </Typography>
                </Box>
            </Box>

            <Box
                className={classes.infoContainer}
                ref={introRef}
            >
                <img src={imgPlantas} className={classes.imgPlantas} ref={plantasImg}/>
                <img src={imgHoja} className={classes.imgHoja} ref={hojaImg}/>
                <Box className={classes.infoIntro}>
                    
                    <img className={classes.infoImg} src={imgIntro} />
                    <Typography variant="h6" className={classes.infoIntroText}>
                        {t("home.introText")}
                    </Typography>
                </Box>
                <Box className={classes.logoContainer}>
                    <img src={logoCev} className={classes.logo}/>
                    <img src={logoSip} className={classes.logo}/>
                    <img src={logoJep} className={classes.logo}/>
                    <img src={logoUb} className={classes.logo}/>
                </Box>
            </Box>
            
            {/* <Box className={classes.infoMore} ref={conoceInfo} style={{top: '60%'}}>
                <Typography variant="h2" className={classes.infoTitle}>
                    {t("home.conoce")}
                </Typography>
                <Typography variant="h6" className={classes.infoMoreText}>
                    {t("home.conoceIntro")}
                </Typography>

                <Link to="/conoce">
                    <Button
                        variant="contained"
                        size="small"
                        className={classes.btn}
                    >
                        {t("home.conoceBtn")}
                    </Button>
                </Link>
            </Box> */}

            <Box className={classes.infoMore} ref={exploraInfo}>
                <Typography variant="h2" className={classes.infoTitle}>
                    {t("home.explora")}
                </Typography>
                <Typography variant="h6" className={classes.infoMoreText}>
                    {t("home.exploraIntro")}
                </Typography>

                <Link to="/explora/buscador">
                    <Button
                        variant="contained"
                        size="small"
                        className={classes.btn}
                    >
                        {t("home.exploraBtn")}
                    </Button>
                </Link>
            </Box>

            <Box className={classes.infoMore} ref={creaInfo}>
                <Typography variant="h2" className={classes.infoTitle}>
                    {t("home.crea")}
                </Typography>
                <Typography variant="h6" className={classes.infoMoreText}>
                    {t("home.creaIntro")}
                </Typography>

                <Link to="/crea">
                    <Button
                        variant="contained"
                        size="small"
                        className={classes.btn}
                    >
                        {t("home.creaBtn")}
                    </Button>
                </Link>
            </Box>
        </Box>
    )
}

export default HomeDesktop