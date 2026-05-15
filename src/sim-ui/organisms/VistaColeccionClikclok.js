import React, { useEffect, useState, useRef } from "react";
import Typography from "@material-ui/core/Typography";
import PiezaRecurso from "./PiezaRecurso";
import PiezaText from "./PiezaText";
import PiezaVideoEmbebido from "./PiezaVideoEmbebido";
import PiezaImageCSS from "./PiezaImageCSS";
import PiezaImageCSSFixed from "./PiezaImageCSSFixed";
import { connect } from "react-redux";
import withWidth, { isWidthDown } from "@material-ui/core/withWidth";
import * as museo from "../../store/ducks/museo.duck";
import Box from "@material-ui/core/Box";
import MapaColombia from './extraCard/MapaColombia'
import useLocalStorage from "../hooks/setLocalStorage";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'

import { ascending } from 'd3'

import LastPageTwoToneIcon from '@mui/icons-material/LastPageTwoTone';
import ShareTwoToneIcon from '@mui/icons-material/ShareTwoTone';
import TocTwoToneIcon from '@mui/icons-material/TocTwoTone';
import KeyboardDoubleArrowUpTwoToneIcon from '@mui/icons-material/KeyboardDoubleArrowUpTwoTone';
import KeyboardArrowDownTwoToneIcon from '@mui/icons-material/KeyboardArrowDownTwoTone';
import KeyboardArrowUpTwoToneIcon from '@mui/icons-material/KeyboardArrowUpTwoTone';
import SwipeDownAltTwoToneIcon from '@mui/icons-material/SwipeDownAltTwoTone';
import { IconButton } from "@material-ui/core";
import ArrowRightAltTwoToneIcon from '@mui/icons-material/ArrowRightAltTwoTone';
import MenuRecursos from './sliderComponents/MenuRecursos'
import ShareView from './sliderComponents/ShareView'
import { useSearchParams } from "react-router-dom";
import RandomCollections from "./RandomCollections.js"

import estilos from './bloqueNarrativas/estilos'

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(ScrollToPlugin);


const useStyles = estilos;

const scrolling = {
  enabled: true,
  events: "scroll,wheel,touchmove,pointermove".split(","),
  prevent: e => e.preventDefault(),
  disable() {
    if (scrolling.enabled) {
      scrolling.enabled = false;
      window.addEventListener("scroll", gsap.ticker.tick, { passive: true });
      scrolling.events.forEach((e, i) => (i ? document : window).addEventListener(e, scrolling.prevent, { passive: false }));
    }
  },
  disableSilent() {
    if (scrolling.enabled) {
      scrolling.enabled = false;
    }
  },
  enable() {
    if (!scrolling.enabled) {
      scrolling.enabled = true;
      window.removeEventListener("scroll", gsap.ticker.tick);
      scrolling.events.forEach((e, i) => (i ? document : window).removeEventListener(e, scrolling.prevent));
      // setCurrent(i)
    }
  }
};

const VistaColeccion = (props) => {
  const [current, setCurrentNum] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();
  // const [currentIndice, setCurrentIndice] = useState(null);
  // const [scrollActive, setScrollActive] = useLocalStorage('scrollActive', isWidthDown('sd', props.width) ? false : true);
  const [scrollActive, setScrollActive] = useState(false);
  const [indexView, setIndex] = useState(false);
  const [shareView, setShare] = useState(false);
  const [indice, setIndice] = useState(null);
  const { handleCerrar, coleccion, value, handleChange } = props;
  const classes = useStyles();
  const [cards, setCards] = useState(null)
  const [reduceCards, setReduceCards] = useState(null)
  const main = useRef(null)
  const cardsRef = useRef([])
  cardsRef.current = []

  // isWidthDown('sd', props.width) ? setScrollActive(false) : setScrollActive(scrollActive)

  let currentIndice = null

  let timer1 = null

  useEffect(() => {
    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [])

  const setCurrent = n => {
    clearTimeout(timer1)
    timer1 = setTimeout(setCurrentNum(n), 100)
  }

  useEffect(() => {

  }, [searchParams])

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

  const renderCard = (card, i, width) => {

    const addToRefs = el => {
      if (el && !cardsRef.current.includes(el)) {
        cardsRef.current.push(el);
      }
    };
    return (
      <>
        {card.type ?
          <>
            {card.type === 'intro' &&
              <Box
                style={{
                  minHeight: '100vh',
                  position: 'relative'
                }}
                id={`tarjeta_${i}`}
                key={`${i}_card`}
                ref={addToRefs}
              >
                <PiezaImageCSS center={true} key={"coverage_image"} piece={coleccion["cover_page"]} path={coleccion["cover_page"]["path"]} portada={true} />
                <Typography
                  variant="h1"
                  className={classes.colTitle}
                >
                  {coleccion["title"]}
                </Typography>
              </Box>
            }

            {card.type === 'mapa' &&
              <Box
                style={{
                  minHeight: 'calc(100vh - 80px)',
                  position: 'relative',
                  paddingTop: 80,
                  paddingBottom: 300,
                  display: 'flex',
                  alignItems: 'center',
                  alignContent: 'center',
                  flexWrap: 'wrap'
                }}
                key={`${i}_card`}
                id={`tarjeta_${i}`}
                ref={addToRefs}
              >
                <Box
                  className={classes.mapaBox}
                >
                  <MapaColombia
                    fColor="#fff"
                    sColor="#fff"
                    bColor='none'
                    dColor='rgba(191,202,217,.4)'
                    pColor='#fff'
                    className={classes.mapa}
                    width={1000}
                    height={1500}
                    geo={coleccion["geographicCoverage"].length > 0 ? coleccion["geographicCoverage"] : []}
                  />

                  <Box
                    className="texto"
                  >
                    {coleccion["description"]}
                  </Box>
                </Box>

                {!isWidthDown('sm', width) &&
                  <RandomCollections />
                }

              </Box>
            }
          </>
          : <>
            {card.pieces && card.pieces[0].type === 'texto' ?
              <>
                <Box
                  className={classes.rootText}
                  key={`${i}_card`}
                  id={`tarjeta_${i}`}
                  ref={addToRefs}
                >
                  <PiezaText
                    key={"i_text"}
                    piece={card}
                    value={card.pieces[0].value}
                    piececover={coleccion["cover_page"]}
                    lectura={true}
                  />
                </Box>
              </>
              :
              <>
                {card.pieces && card.pieces[0].type !== 'recurso_externo' && <>
                  <Box
                    style={{
                      minHeight: '100vh',
                      position: 'relative',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white'
                    }}
                    key={`${i}_card`}
                    id={`tarjeta_${i}`}
                    ref={addToRefs}
                  >
                    {(current === i || current - 1 === i || current + 1 === i) &&
                      <Box
                        className={`${classes.contenedorTarjeta}`}
                      >
                        <PiezaRecurso
                          place={"conoce"}
                          key={i + "_recurso"}
                          piece={card.pieces[0]}
                          lectura={true}
                          // copyLink={copyLink}
                          idSection={`section${i + 1}`}
                        />
                      </Box>
                    }
                  </Box>
                </>}

                {card.pieces && card.pieces[0].type === 'recurso_externo' && <>
                  <Box
                    style={{
                      minHeight: '100vh',
                      position: 'relative',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white'
                    }}
                    key={`${i}_card`}
                    id={`tarjeta_${i}`}
                    ref={addToRefs}
                  >
                    {(current === i || current - 1 === i || current + 1 === i) &&
                      <Box
                        className={`${classes.contenedorTarjeta} frame`}
                      >
                        <PiezaVideoEmbebido
                          path={card.pieces[0].path}
                          input={card.pieces[0].value}
                          text={card.pieces[0].alt}
                          lectura={true}
                        />
                      </Box>
                    }
                  </Box>
                </>}
              </>
            }
          </>}
      </>
    )
  }

  useEffect(() => {
    isWidthDown('sd', props.width) ? setScrollActive(false) : setScrollActive(scrollActive)
    coleccion.cards.sort((a, b) => ascending(parseInt(a.order), parseInt(b.order)))
    if (coleccion.cards && coleccion.cards.length) {
      const reduce_cards = coleccion.cards.reduce((a, b, i) => {
        let temp = a
        if (i === 1) {
          temp = [{
            type: a['pieces'][0]['type'],
            total: 1
          }]
        }

        const index = temp.find(d => d['type'] === b['pieces'][0]['type'])

        if (index) {
          index.total++
        }
        else {
          temp.push({
            type: b['pieces'][0]['type'],
            total: 1
          })
        }

        return temp
      })

      let card_array = []
      let index_array = []
      let pos = 0
      coleccion.cards.forEach((c, i) => {
        if (card_array.length > 0) {
          let c_last = card_array[card_array.length - 1]
          if (c_last.pieces[0].type === 'texto' && c.pieces[0].type === 'texto') {
            const last_ = typeof c_last.pieces[0].value === 'string' ? JSON.parse(c_last.pieces[0].value) : c_last.pieces[0].value
            const new_ = typeof c.pieces[0].value === 'string' ? JSON.parse(c.pieces[0].value) : c.pieces[0].value

            last_['blocks'] = [...last_['blocks'], ...new_['blocks']]

            // c_last.pieces[0].value = JSON.stringify(last_)
            card_array.push({ ...c, id_pos: pos + 2 })
          } else {
            card_array.push({ ...c, id_pos: pos + 2 })
            pos++
          }

          if (c.pieces[0].type === 'texto') {
            const value = JSON.parse(c.pieces[0].value)
            value.blocks.forEach(b => {
              const type = b.type
              const txt = b.text
              if (type === 'header-two' && txt !== '' && txt !== ' ') {
                index_array.push({
                  variant: 'h2',
                  text: b.text,
                  pos: pos
                })
              } else if (type === 'header-two') {
                // index_array.push({
                //   variant: 'h3',
                //   text: b.text,
                //   pos: pos
                // })
              }
            })
          }
        }
        else {
          if (c.pieces[0].type === 'texto') {
            const value = JSON.parse(c.pieces[0].value)
            value.blocks.forEach(b => {
              const type = b.type
              const txt = b.text
              if (type === 'header-two' && txt !== '' && txt !== ' ') {
                index_array.push({
                  variant: 'h2',
                  text: b.text,
                  pos: pos + 1
                })
              } else if (type === 'header-two') {
                // index_array.push({
                //   variant: 'h3',
                //   text: b.text,
                //   pos: pos
                // })
              }
            })
          }
          card_array.push({ ...c, id_pos: pos + 2 })
          pos++
        }
      })

      setCards([{ type: 'intro', id_pos: 0, pieces: [{ type: 'intro' }] }, { type: 'mapa', id_pos: 1, pieces: [{ type: 'intro' }] }, ...card_array])
      setReduceCards(reduce_cards)
      setIndice(index_array)

    }

  }, [coleccion])

  const setIndexView = () => {
    setIndex(!indexView)
  }

  const setShareView = () => {
    setShare(!shareView)
  }

  useEffect(() => {
    setTimeout(configureScroll(), 250)
  }, [cards, scrollActive])

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
    if (current < cards.length - 1) {
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

  return (
    <>
      {cards &&
        <Box ref={main} style={{ position: 'relative' }} className={`${classes.root} ${indexView && 'showIndex'}`}>
          <PiezaImageCSSFixed key={"coverage_image"} piece={coleccion["cover_page"]} portada={true} />

          {cards.map((c, i) => renderCard(c, i, props.width))}


          {!isWidthDown('sm', props.width) &&
            <>
              <RandomCollections />

              <MenuRecursos
                cards={cards}
                current={current}
                goToNCard={goToNCard}
              />

              <Box
                className={`${classes.sideNav} ${indexView && 'showIndex'}`}
                key="sidenav_main"
              >
                {/* <IconButton key="1_sidenav" onClick={changeScrollAnim} className={`${classes.iconSideNav} ${scrollActive ? 'active' : ''}`}>
                  <SwipeDownAltTwoToneIcon />
                </IconButton> */}
                <IconButton key="2_sidenav" onClick={setShareView} className={`${classes.iconSideNav} ${shareView ? 'active' : ''}`}>
                  <ShareTwoToneIcon />
                </IconButton>
                <IconButton onClick={setIndexView} key="3_sidenav" className={`${classes.iconSideNav} ${indexView ? 'active' : ''}`}>
                  {!indexView ? <>
                    <TocTwoToneIcon />
                  </> : <>
                    <ArrowRightAltTwoToneIcon />
                  </>}
                </IconButton>
                <IconButton onClick={() => goToNCard(0)} key="6_sidenav" className={`${classes.iconSideNav} ${current < 4 ? 'hidden' : ''}`}>
                  <KeyboardDoubleArrowUpTwoToneIcon />
                </IconButton>
                <IconButton onClick={goToPreviousChapter} key="7_sidenav" className={`${classes.iconSideNav} ${getIndiceIndex(current) <= 0 ? 'hidden' : ''}`}>
                  <LastPageTwoToneIcon
                    style={{
                      transform: 'rotate(-90deg)'
                    }}
                  />
                </IconButton>
                <IconButton onClick={() => goToPrevious()} key="4_sidenav" className={`${classes.iconSideNav} ${current === 0 ? 'hidden' : ''}`}>
                  <KeyboardArrowUpTwoToneIcon />
                </IconButton>
                <Box className={`${classes.numCardDisplay}`}>

                  <div>{`${current + 1}`}</div>
                  <div>{`${cards.length}`}</div>

                </Box>
                <IconButton onClick={() => goToNext()} key="5_sidenav" className={`${classes.iconSideNav} ${current == cards.length - 1 ? 'hidden' : ''}`}>
                  <KeyboardArrowDownTwoToneIcon />
                </IconButton>
                <IconButton onClick={goToNextChapter} key="8_sidenav" className={`${classes.iconSideNav} ${getIndiceIndex(current) >= indice.length - 1 ? 'hidden' : ''}`}>
                  <LastPageTwoToneIcon
                    style={{
                      transform: 'rotate(90deg)'
                    }}
                  />
                </IconButton>
              </Box>
            </>
          }


          <Box
            className={`${classes.cajaIndice} ${indexView && 'showIndex'}`}
          >
            {indice &&
              <>
                {indice.map((i, index) => {
                  return (
                    <Typography
                      variant={i.variant}
                      className={`${getIndiceIndex(current) === index ? 'active' : ''}`}
                      onClick={() => goToNCard(i.pos + 1)}
                    >
                      {i.text}
                    </Typography>
                  )
                })}
              </>
            }

            {
              !indexView && shareView &&
              <>
                <ShareView
                  slug={coleccion.slug}
                  current={current}
                  currentCard={cards[current]}
                />
              </>
            }

          </Box>
        </Box>
      }

    </>
  );
};
const mapStateToProps = (store) => ({
  openLienzoCrea: store.museo.openLienzoCrea,
  activeCollection: store.museo.activeCollection,
});

export default connect(mapStateToProps, museo.actions)(withWidth()(VistaColeccion))