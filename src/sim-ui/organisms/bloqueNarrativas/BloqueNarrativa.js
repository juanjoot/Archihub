import React, { useEffect, useState, useRef } from 'react'
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import { useSearchParams } from "react-router-dom"
import MainLayout from '../../layout/MainLayout'
import useLocalStorage from '../../hooks/setLocalStorage'
import { makeStyles } from "@material-ui/core/styles"
import { Box } from '@material-ui/core'

import LastPageTwoToneIcon from '@mui/icons-material/LastPageTwoTone'
import ShareTwoToneIcon from '@mui/icons-material/ShareTwoTone'
import TocTwoToneIcon from '@mui/icons-material/TocTwoTone'
import KeyboardDoubleArrowUpTwoToneIcon from '@mui/icons-material/KeyboardDoubleArrowUpTwoTone'
import KeyboardArrowDownTwoToneIcon from '@mui/icons-material/KeyboardArrowDownTwoTone'
import KeyboardArrowUpTwoToneIcon from '@mui/icons-material/KeyboardArrowUpTwoTone'
import SwipeDownAltTwoToneIcon from '@mui/icons-material/SwipeDownAltTwoTone'
import { IconButton } from "@material-ui/core"

import PiezaImageCSSFixed from '../PiezaImageCSSFixed'


gsap.registerPlugin(ScrollTrigger)
gsap.registerPlugin(ScrollToPlugin)

const useStyles = makeStyles((theme) => ({
    sideNav: {
        position: 'fixed',
        right: 0,
        width: 60,
        top: 100,
        transition: 'all 0.25s ease',

        '&.showIndex': {
            right: 250
        }
    },
    contenedorTarjeta: {
        maxWidth: 650,
        width: '100%',

        '&.frame': {
            width: '80vw',
            maxWidth: 'none'
        }
    },
    cajaIndice: {
        width: 250,
        height: 'calc(100% - 70px)',
        paddingTop: 70,
        position: 'fixed',
        top: 0,
        right: -250,
        backgroundColor: '#222',
        transition: 'all 0.25s ease',
        overflow: 'auto',

        '&.showIndex': {
            right: 0
        },

        '& h2': {
            color: '#999',
            fontSize: 16,
            margin: 2,
            marginTop: 10,
            marginLeft: 20,
            borderBottom: '1px dashed #333',
            paddingBottom: 5,
            textTransform: 'lowercase',
            textIndent: 13,
            position: 'relative',
            cursor: 'pointer',

            '&:hover': {
                '&::before': {
                    background: '#777'
                }
            },

            '&.active': {
                color: 'white',
                fontWeight: 'bold',

                '&::first-letter': {
                    fontWeight: 'bold',
                    textTransform: "uppercase",
                    color: 'white'
                },
            },

            '&::first-letter': {
                textTransform: "uppercase",
                color: '#999'
            },

            '&::before': {
                content: '""',
                width: 10,
                height: 10,
                borderRadius: 10,
                background: '#444',
                position: 'absolute',
                top: 5,
                left: -3
            }
        },

        '& h3': {
            color: 'white',
            fontSize: 14,
            margin: 2,
            marginTop: 3,
            marginLeft: 8
        }
    },
    iconSideNav: {
        width: 50,
        height: 50,
        // border: '1px solid rgba(255,255,255,.5)',
        backgroundColor: 'rgba(255,255,255,.1)',
        borderRadius: 50,
        marginBottom: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',

        '&:hover': {
            backgroundColor: 'rgba(0,0,0,.6)',
        },

        '&.hidden': {
            visibility: 'hidden'
        },

        '&.active': {
            border: '1px solid rgba(255,255,255,.6)',
            backgroundColor: 'rgba(255,255,255,.8)',
            '& path': {
                fill: '#333'
            },
        },
        '& path': {
            fill: 'white'
        }
    },
    numCardDisplay: {
        // border: '1px solid rgba(0,0,0,.3)',
        backgroundColor: 'rgba(0,0,0,.3)',
        width: 50,
        borderRadius: 12,
        marginBottom: 10,
        fontSize: 12,
        textAlign: 'center',
        '& div': {
            padding: 5,
            color: 'white',
        },
        '& div:first-child': {
            backgroundColor: 'rgba(255,255,255,.1)',
            '-webkit-border-top-left-radius': 12,
            '-webkit-border-top-right-radius': 12,
            '-moz-border-radius-topleft': 12,
            '-moz-border-radius-topright': 12,
            'border-top-left-radius': 12,
            'border-top-right-radius': 12,
            fontWeight: 'bold'
            // color: '#333'
        }
    },
    mapa: {
        width: 250,
        border: '1px solid rgba(255,255,255,.2)',
        backgroundColor: 'rgba(0,0,0,.3)',

        '& svg': {
            marginBottom: -5
        }
    },
    root: {
        transition: 'all 0.25s ease',
        left: 0,

        '&.showIndex': {
            left: -250
        }
    },
    mapaBox: {
        width: 'calc(100% - 130px)',
        paddingLeft: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',

        '& .texto': {
            color: 'white',
            paddingLeft: 20,
            fontSize: 20,
            maxWidth: 500,
            width: 'calc(100% - 250px)'
        },

        [theme.breakpoints.down('sm')]: {
            flexWrap: 'wrap',

            '& .texto': {
                width: '100%',
                marginTop: 20
            }
        }
    },
    colTitle: {
        position: 'absolute',
        color: 'white',
        borderBottom: '1px solid white',
        fontSize: '40px',
        top: '70px',
        padding: '20px',
        width: 'calc(100% - 160px)',
        textAlign: 'center',
        backdropFilter: 'Blur(50px)',
        fontWeight: 'bold',
        paddingTop: 35,
        paddingBottom: 35,
        left: 50,

        [theme.breakpoints.down('sm')]: {
            fontSize: 30
        }
    }
}))

const scrolling = {
    enabled: true,
    events: "scroll,wheel,touchmove,pointermove".split(","),
    prevent: e => e.preventDefault(),
    disable() {
        if (scrolling.enabled) {
            scrolling.enabled = false
            window.addEventListener("scroll", gsap.ticker.tick, { passive: true })
            scrolling.events.forEach((e, i) => (i ? document : window).addEventListener(e, scrolling.prevent, { passive: false }))
        }
    },
    disableSilent() {
        if (scrolling.enabled) {
            scrolling.enabled = false
        }
    },
    enable() {
        if (!scrolling.enabled) {
            scrolling.enabled = true
            window.removeEventListener("scroll", gsap.ticker.tick)
            scrolling.events.forEach((e, i) => (i ? document : window).removeEventListener(e, scrolling.prevent))
            // setCurrent(i)
        }
    }
}


const BloqueNarrativa = props => {
    const classes = useStyles()
    const [current, setCurrentNum] = useState(0)
    const [searchParams, setSearchParams] = useSearchParams()
    // const [scrollActive, setScrollActive] = useLocalStorage('scrollActive', false)
    const [scrollActive, setScrollActive] = useState(false)
    const [cards, setCards] = useState(null)
    const [indexView, setIndex] = useState(false)
    const [shareView, setShare] = useState(false)
    const [indice, setIndice] = useState(null)
    const cardsRef = useRef([])
    let timer1 = null
    let timer2 = null

    const addToRefs = el => {
        if (el && !cardsRef.current.includes(el)) {
            cardsRef.current.push(el)
            configureScroll()
        }
    }

    useEffect(() => {
        return () => {
            ScrollTrigger.getAll().forEach(t => t.kill())
        }
    }, [])

    const setCurrent = n => {
        clearTimeout(timer1)
        timer1 = setTimeout(setCurrentNum(n), 100)
    }

    const getIndiceIndex = (current_) => {
        let i_ = -1
        // let timer = null

        indice.forEach((i, index) => {
            const pos = i.pos + 1

            if (pos === current_) {
                i_ = index
            } else if (current_ > pos) {
                i_ = index
            }
        })

        return i_
    }

    const goToSection = (section, anim, i) => {
        if (scrolling.enabled) {
            scrolling.disable();
            gsap.to(window, {
                scrollTo: { y: section, autoKill: false },
                onComplete: () => { scrolling.enable(); setCurrent(i); },
                duration: .5
            });

            anim && anim.restart();
        }
    }

    const goToSectionNAnim = (section, anim, i) => {
        scrolling.enabled && setCurrent(i)
    }

    const configureScroll = (force = false) => {
        !force && ScrollTrigger.getAll().forEach(t => t.kill())

        if (cardsRef?.current.length > 0 && scrollActive && !force) {
            cardsRef?.current.forEach((c, i) => {
                const section = c

                const intoAnim = gsap.fromTo(
                    section,
                    {
                        opacity: 1
                    },
                    {
                        opacity: 1,
                    }
                )

                ScrollTrigger.create({
                    trigger: section,
                    start: "top bottom-=10",
                    end: "bottom top+=10",
                    onEnter: () => { goToSection(section, intoAnim, i); },
                    onEnterBack: () => goToSectionNAnim(section, null, i)
                })

                scrolling.enable()
            })
        } else if (!scrollActive || force) {
            cardsRef?.current.forEach((c, i) => {
                const section = c

                const intoAnim = gsap.fromTo(
                    section,
                    {
                        opacity: 1
                    },
                    {
                        opacity: 1
                    }
                )

                !force && ScrollTrigger.create({
                    trigger: section,
                    start: "top center",
                    end: "bottom center",
                    onEnter: () => goToSectionNAnim(section, intoAnim, i),
                    onEnterBack: () => goToSectionNAnim(section, null, i)
                })

                force && scrolling.enable()
                force && configureScroll()
            })
        }

        if (searchParams.get("bloque")) {
            setTimeout(goToNCard(parseInt(searchParams.get("bloque"))), 500)
        }
    }

    const setIndexView = () => {
        setIndex(!indexView)
    }

    const setShareView = () => {
        setShare(!shareView)
    }

    const changeScrollAnim = e => {
        scrollActive ? setScrollActive(false) : setScrollActive(true)
    }

    const goToPrevious = () => {
        if (current > 0) {
            scrolling.disable()

            gsap.to(window, {
                scrollTo: { y: cardsRef.current[current - 1], autoKill: false },
                onComplete: () => {
                    scrolling.enable()
                    setCurrent(current - 1)
                },
                duration: .5
            });
        }
    }

    const goToNext = () => {
        if (current < cardsRef.current.length - 1) {
            scrolling.disable()

            gsap.to(window, {
                scrollTo: { y: cardsRef.current[current + 1], autoKill: false },
                onComplete: () => {
                    scrolling.enable()
                    setCurrent(current + 1)
                },
                duration: .5
            });
        }
    }

    const goToNCard = n => {
        scrolling.disable()

        gsap.to(window, {
            scrollTo: { y: cardsRef.current[n], autoKill: false, offset: -20 },
            onComplete: () => {
                scrolling.enable()
                setCurrent(n)
            },
            duration: 1.5
        });
    }

    const goToNextChapter = () => {
        goToNCard(indice[getIndiceIndex(current) + 1].pos + 1)
    }

    const goToPreviousChapter = () => {
        goToNCard(indice[getIndiceIndex(current) - 1].pos + 1)
    }

    useEffect(() => {
        setTimeout(configureScroll(), 200)
    }, [])

    useEffect(() => {
        setCards(props.children.length)
    }, [props.children])

    return (
        <>
            {props.children &&
                <MainLayout>
                    <Box style={{ position: 'relative' }} className={`${classes.root} ${indexView && 'showIndex'}`}>

                        <PiezaImageCSSFixed key={"coverage_image"} piece={props.background} portada={true} />

                        {React.Children.map(props.children, (c, i) =>
                            React.cloneElement(c, {
                                ref: ref => addToRefs(ref),
                                goToNCard: { goToNCard }
                            })
                        )}

                        <Box
                            className={`${classes.sideNav} ${indexView && 'showIndex'}`}
                            key="sidenav_main"
                        >
                            <IconButton key="1_sidenav" onClick={changeScrollAnim} className={`${classes.iconSideNav} ${scrollActive ? 'active' : ''}`}>
                                <SwipeDownAltTwoToneIcon />
                            </IconButton>
                            {/* <IconButton key="2_sidenav" onClick={setShareView} className={`${classes.iconSideNav} ${shareView ? 'active' : ''}`}>
                                <ShareTwoToneIcon />
                            </IconButton> */}

                            <IconButton onClick={() => goToNCard(0)} key="6_sidenav" className={`${classes.iconSideNav} ${current < 4 ? 'hidden' : ''}`}>
                                <KeyboardDoubleArrowUpTwoToneIcon />
                            </IconButton>

                            <IconButton onClick={() => goToPrevious()} key="4_sidenav" className={`${classes.iconSideNav} ${current === 0 ? 'hidden' : ''}`}>
                                <KeyboardArrowUpTwoToneIcon />
                            </IconButton>
                            <Box className={`${classes.numCardDisplay}`}>

                                <div>{`${current + 1}`}</div>
                                <div>{`${cards}`}</div>

                            </Box>
                            <IconButton onClick={() => goToNext()} key="5_sidenav" className={`${classes.iconSideNav} ${current == cards - 1 ? 'hidden' : ''}`}>
                                <KeyboardArrowDownTwoToneIcon />
                            </IconButton>

                        </Box>
                    </Box>
                </MainLayout>
            }
        </>

    )
}

export default BloqueNarrativa