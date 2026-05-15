import React, { useEffect, useState, useRef } from "react";
import Typography from "@material-ui/core/Typography";
import PiezaRecurso from "../PiezaRecurso";
import PiezaText from "../PiezaText";
import PiezaVideoEmbebido from "../PiezaVideoEmbebido";
import PiezaImageCSS from "../PiezaImageCSS";
import PiezaImageCSSFixed from "../PiezaImageCSSFixed";
import { connect } from "react-redux";
import withWidth, { isWidthDown } from "@material-ui/core/withWidth";
import * as museo from "../../../store/ducks/museo.duck";
import Box from "@material-ui/core/Box";
import MapaColombia from '../extraCard/MapaColombia'
import * as CollectionService from "../../../../src/services/CollectionService";
import * as Scroll from 'react-scroll';
import { Button, makeStyles } from "@material-ui/core";
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';

import { useSearchParams } from "react-router-dom";
import RandomCollections from "../RandomCollections.js"

import estilos from '../bloqueNarrativas/estilos'
import Lottie from 'react-lottie';
import animationData from '../../../assets/loading_cev.json'

const useStyles = estilos;
const scroll = Scroll.animateScroll;


const useStyles_pagination = makeStyles((theme) => ({
    paginationRoot: {
        background: 'white',
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        paddingBottom: 50
    }
}))

const Ligera = (props) => {
    const [current, setCurrentNum] = useState(0);
    const [searchParams, setSearchParams] = useSearchParams();
    const { coleccion } = props;
    const classes = useStyles();
    const classes_pagination = useStyles_pagination();
    const [cards, setCards] = useState([])
    const [loading, setLoading] = useState(false)
    const [page, setPage] = useState(null)
    const main = useRef(null)
    const cardsRef = useRef([])
    cardsRef.current = []

    // isWidthDown('sd', props.width) ? setScrollActive(false) : setScrollActive(scrollActive)


    useEffect(() => {
        if (searchParams.get('page')) {
            setPage(parseInt(searchParams.get('page')))
        } else {
            setPage(0)
        }
    }, [searchParams])

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
                                    className={`${classes.rootText} ligera`}
                                    key={`${i}_card`}
                                    id={`tarjeta_${i}`}
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
        if (page >= 0 && page !== null) {
            setLoading(true)
            CollectionService.getCollectionBySlugDBPagination(coleccion.slug, page).then(
                (d) => {
                    let card_array = []
                    setLoading(false)
                    card_array.push({ pieces: [d], id_pos: 0 })
                    setCards([...cards, ...card_array])

                },
                error => {
                    console.log(error)
                }
            )
        }

    }, [page])

    const nextPage = () => {
        let newPage = page + 1
        setPage(newPage)
    }


    return (
        <>
            {cards &&
                <Box key={JSON.stringify(cards)} ref={main} style={{ position: 'relative' }} className={`${classes.root}`}>
                    <PiezaImageCSSFixed key={"coverage_image"} piece={coleccion["cover_page"]} portada={true} />


                    {cards.map((c, i) => renderCard(c, i, props.width))}

                    {page < coleccion.pages.length - 1 && !loading &&
                        <Box
                            className={classes_pagination.paginationRoot}
                        >
                            <Button
                                onClick={nextPage}
                                color="primary"
                                startIcon={<KeyboardArrowDownIcon />}
                            >
                                Seguir leyendo
                            </Button>
                        </Box>
                    }

                    {loading &&
                        <Box
                            className={classes_pagination.paginationRoot}
                        >
                            <Lottie height={150} width={150} options={
                                {
                                    loop: true,
                                    autoplay: true,
                                    title: 'Cargando...',
                                    animationData: animationData,
                                    rendererSettings: {
                                        preserveAspectRatio: 'xMidYMid slice'
                                    }
                                }
                            } />
                        </Box>
                    }


                    {!isWidthDown('sm', props.width) &&
                        <>
                            <RandomCollections />
                        </>
                    }
                </Box>
            }

        </>
    );
};
const mapStateToProps = (store) => ({
    openLienzoCrea: store.museo.openLienzoCrea,
    activeCollection: store.museo.activeCollection,
});

export default connect(mapStateToProps, museo.actions)(withWidth()(Ligera))