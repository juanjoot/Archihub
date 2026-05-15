import React, { useState } from 'react'
import { makeStyles, withStyles } from "@material-ui/core/styles";
import BloqueNarrativa from '../sim-ui/organisms/bloqueNarrativas/BloqueNarrativa'
import { Box } from '@material-ui/core'
import PiezaImageCSS from '../sim-ui/organisms/PiezaImageCSS'
import Typography from "@material-ui/core/Typography";
import ExpandInfo from '../sim-ui/organisms/bloqueNarrativas/ExpandInfo';
import Questions from '../sim-ui/organisms/bloqueNarrativas/Questions';
import MultipleQuestions from '../sim-ui/organisms/bloqueNarrativas/MultipleQuestions';
import { Button } from '@material-ui/core';

import objetivosMisionales from '../data/comoNavegar/objetivosMisionales';
import opcionesArchivo from '../data/comoNavegar/opcionesArchivo';
import opcionesTest from '../data/comoNavegar/opcionesTest';
import infoArchivo from '../data/comoNavegar/infoArchivo';

import logo from "../assets/imgs/logo-comision.png"
import transmedia from "../assets/imgs/computador-transmedia.png"
import archivo from "../assets/imgs/computador-archivo.png"
import libros from "../assets/imgs/libros-informe.png"

const id_background = 'e75638c0-bfcb-4f04-9a8d-6ad3ebd2b4f8'

const useStyles = makeStyles((theme) => ({
    root: {
        '& p': {
            fontSize: 20,
            maxWidth: 650,
            margin: '0 auto',

            '&.indexText': {
                textAlign: 'left',
                marginTop: 40,
                paddingTop: 10,
                borderTop: '1px solid rgba(255,255,255,0.3)',
                fontSize: 15
            }
        },
        '& a': {
            boxShadow: 'inset 0 -10px 0 rgba(42,80,120,.1)',
            color: '#2a5080',
            textDecoration: 'none',
            transition: 'all 0.2s ease',
            fontWeight: 'bold',

            '&:hover': {
                boxShadow: 'inset 0 -30px 0 rgba(42,80,120,.1)',
            }
        },
        '& .bold': {
            fontWeight: 'bold'
        },
        '& h2': {
            fontSize: 35,
            textAlign: 'center',
            fontWeight: 'bold'
        },
        '& h3': {
            fontSize: 28,
            color: theme.palette.primary.main,
            fontWeight: 'bold',
            textAlign: 'center'
        },
        '& br': {
            display: 'block',
            margin: '10px 0'
        },
        '& .index': {
            fontSize: 12,
            borderRadius: 10,
            margin: 5,
            marginLeft: 3,
            position: 'relative',
            top: -5,
            background: 'white',
            color: theme.palette.primary.main,
            fontWeight: 'bold',
            width: 15,
            textAlign: 'center',
            lineHeight: '15px',
            height: 15,
            display: 'inline-block'
        },
        '&.dark': {
            '& a': {
                boxShadow: 'inset 0 -10px 0 rgba(255,255,255,.3)',
                color: 'white',
                textDecoration: 'none',
                transition: 'all 0.2s ease',

                '&:hover': {
                    boxShadow: 'inset 0 -30px 0 rgba(255,255,255,.35)',
                }
            }
        }
    },
    botonUrl: {
        width: 'calc(33.33% - 20px)',
        padding: 10,
        textAlign: 'center',
        border: '3px solid rgba(42,80,120,.1)',
        borderRadius: 5,
        fontWeight: 'bold',
        fontSize: 20,
        margin: 10,
        color: '#2A5080',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        display: 'flex',
        alignItems: 'center',
        height: '15vw',

        '&:hover': {
            border: '3px solid rgba(42,80,120,.12)',
            background: 'rgba(42,80,120,.1)'
        },

        '&.active': {
            background: '#2A5080',
            color: 'white'
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
}));

const IntroInteractiva = props => {
    const classes = useStyles()
    const goToAnchor = i => {
        props.goToNCard.goToNCard(i)
    }
    return (
        <Box
            style={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 'calc(100% - 70px)',
                paddingBottom: '50vh',
                minHeight: '100vh',
                // background: '#19447c',
                color: 'white'
            }}
            className={classes.root}
        >
            <Box>
                <p>¡Hola! Estás a punto de descubrir el Archivo del Esclarecimiento, parte del Legado que la <span className='bold'>Comisión de la Verdad</span> deja a las futuras generaciones de colombianos y colombianas como <span className='bold'>tú</span>.</p>
                <Typography
                    variant="h2"
                    style={{ marginTop: 40 }}
                >
                    ¿Sabes qué es la Comisión de la Verdad?
                </Typography>

                <Box
                    style={{
                        display: 'flex',
                        justifyContent: 'space-around',
                        margin: '0 auto',
                        marginTop: 20,
                        maxWidth: 300,
                    }}
                >
                    <Button onClick={() => goToAnchor(5)} size='large' variant='contained' color='primary' style={{ margin: 5, border: '2px solid white' }}>SI</Button>
                    <Button onClick={() => goToAnchor(1)} size='large' variant='contained' color='primary' style={{ margin: 5, border: '2px solid white' }}>NO</Button>
                </Box>
            </Box>

        </Box>
    )
}

const ComoNavegarInteractivo = props => {
    const classes = useStyles()
    const [query, setQuery] = useState(false)

    const handleChangeUrl = query => {
        setQuery(`${query}`)
    }

    return (
        <>
            <BloqueNarrativa
                background={{
                    records: [
                        {
                            idmongo: id_background
                        }
                    ]
                }}
            >
                <Box
                    style={{
                        minHeight: '100vh',
                        position: 'relative',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white'
                    }}
                >
                    <PiezaImageCSS key={"coverage_image"} piece={{
                        records: [
                            {
                                idmongo: id_background
                            }
                        ]
                    }} portada={true} />

                    <Typography
                        variant="h1"
                        className={classes.colTitle}
                    >
                        Descubre el Archivo del Esclarecimiento
                    </Typography>

                </Box>

                <IntroInteractiva />

                <Box
                    style={{
                        minHeight: '100vh',
                        position: 'relative',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        alignContent: 'center',
                        width: 'calc(100% - 70px)',
                        // background: '#19447c',
                        color: 'white',
                        flexWrap: 'wrap'
                    }}
                    className={classes.root}
                >
                    <Box
                        style={{
                            display: 'flex',
                        }}
                    >
                        <img src={logo} style={{ marginRight: 20 }} />
                        <Box><p>En el marco del Acuerdo Final para la terminación del conflicto y la construcción de una paz estable y duradera, suscrito entre el Gobierno de Colombia y las Fuerzas Armadas Revolucionarias de Colombia - Ejército del Pueblo FARC -EP, mediante el Acto Legislativo 01 de 2017 y el Decreto 588 de 2017, se creó la <span className='bold'>Comisión para el Esclarecimiento de la Verdad</span>, la Convivencia y la No Repetición, como un mecanismo de carácter temporal y extrajudicial<span className='index'>1</span> del <span className='bold'>Sistema Integral de Verdad, Justicia, Reparación y No Repetición - SIVJRNR</span>. </p><p className="indexText"><span className='index'>1</span>Que no tiene como objetivo penas, juicios, cárcel u otras consecuencias penales para quienes aportan</p></Box>
                    </Box>
                    <div style={{ width: '100%' }}></div>

                </Box>

                <Box
                    style={{
                        minHeight: '100vh',
                        position: 'relative',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 'calc(100% - 70px)',
                        background: 'white',
                        color: '#333'
                    }}
                    className={classes.root}
                >
                    <Box
                        style={{
                            maxWidth: 700
                        }}
                    >
                        <Typography
                            variant="h2"
                            style={{ marginBottom: 50 }}
                        >
                            La Comisión tuvo 4 objetivos misionales:
                        </Typography>

                        <ExpandInfo
                            info={objetivosMisionales}
                        />
                    </Box>

                </Box>

                <Box
                    style={{
                        minHeight: '100vh',
                        position: 'relative',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 'calc(100% - 70px)',
                        color: 'white'
                    }}
                    className={`${classes.root} dark`}
                >
                    <Box>
                        <p>La <span className='bold'>Comisión de la Verdad</span> estuvo trabajando durante 4 años en su objetivo de conocer la verdad sobre lo ocurrido en el marco del conflicto armado y contribuir al esclarecimiento de las violaciones e infracciones cometidas durante el mismo y ofrecer una explicación amplia de su complejidad a toda la sociedad.</p>
                        <Box
                            style={{ display: 'flex', marginTop: 20, marginBottom: 20, alignItems: 'center' }}
                        >
                            <img src={transmedia} style={{ marginRight: 20 }} />
                            <p>Finalizó su mandato a finales de agosto del año 2022, dejando un <a href="https://www.comisiondelaverdad.co/hay-futuro-si-hay-verdad" >Informe Final</a> y una <a href="https://www.comisiondelaverdad.co/" >plataforma digital</a> que incluye el <span className='bold'>Archivo del Esclarecimiento</span>, para que todos y todas conozcamos lo que sucedió en Colombia durante 60 años de guerra.</p>
                        </Box>
                        <p>Los contenidos tanto del informe como de la plataforma digital se pueden usar para profundizar el conocimiento sobre la historia de Colombia, conversar o debatir sobre lo que pasó en el conflicto armado colombiano, ser usado en trabajos sobre convivencia en las regiones y recoger la experiencia de quienes vivieron y fueron afectados por el conflicto con mayor cercanía.</p>
                    </Box>

                </Box>

                <Box
                    style={{
                        minHeight: '100vh',
                        position: 'relative',
                        display: 'flex',
                        alignItems: 'center',
                        alignContent: 'center',
                        justifyContent: 'center',
                        width: 'calc(100% - 70px)',
                        color: 'white',
                        flexWrap: 'wrap'
                    }}
                    className={`${classes.root} dark`}
                >
                    <Typography
                        variant="h2"
                        style={{ marginBottom: 50, width: '100%' }}
                    >
                        Informe Final
                    </Typography>
                    <Box
                        style={{ display: 'flex', marginTop: 20, marginBottom: 20, alignItems: 'center' }}
                    >
                        <img src={libros} style={{ marginRight: 20 }} />
                        <p>“<span className='bold'>Hay futuro si hay verdad</span>” es el Informe Final de la Comisión de la Verdad, son 11 capítulos que muestran el resultado del proceso de investigación, análisis y contrastación adelantado por la Comisión de la Verdad durante su mandato. Dan cuenta de las conclusiones, recomendaciones y principales resultados del trabajo de la Comisión en temas como las violencias y cómo vivieron la guerra las personas. ¿Quieres conocerlos? Ingresa <a href="https://www.comisiondelaverdad.co/hay-futuro-si-hay-verdad">acá</a></p>
                    </Box>
                </Box>

                <Box
                    style={{
                        minHeight: '100vh',
                        position: 'relative',
                        display: 'flex',
                        alignItems: 'center',
                        alignContent: 'center',
                        justifyContent: 'center',
                        width: 'calc(100% - 70px)',
                        color: 'white',
                        flexWrap: 'wrap'
                    }}
                    className={classes.root}
                    id="ancla_1"
                >
                    <Typography
                        variant="h2"
                        style={{ marginBottom: 50, width: '100%' }}
                    >
                        ¿Qué es el Archivo del Esclarecimiento?
                    </Typography>
                    <Box
                        style={{ display: 'flex', marginTop: 20, marginBottom: 20, alignItems: 'center' }}
                    >
                        <img src={archivo} style={{ marginRight: 20 }} />
                        <p>Es el archivo público de la <span className='bold'>Comisión de la Verdad</span> para que se conozcan los orígenes de la información y ampliar el relato total. Por medio de este Archivo se podrá explorar e interactuar con recursos de información que fundamentan el proceso de esclarecimiento y del diálogo social.</p>
                    </Box>
                </Box>

                <Box
                    style={{
                        minHeight: '100vh',
                        position: 'relative',
                        display: 'flex',
                        alignItems: 'center',
                        alignContent: 'center',
                        justifyContent: 'center',
                        width: 'calc(100% - 70px)',
                        color: 'white',
                        paddingBottom: 300,
                        flexWrap: 'wrap'
                    }}
                    className={classes.root}
                >
                    <Typography
                        variant="h2"
                        style={{ marginBottom: 50, width: '100%' }}
                    >
                        ¿Para qué crees que puedes utilizar el Archivo del Esclarecimiento?
                    </Typography>

                    <Questions
                        data={opcionesArchivo}
                    />

                </Box>



                <Box
                    style={{
                        minHeight: '100vh',
                        position: 'relative',
                        paddingBottom: 300,
                        display: 'flex',
                        alignItems: 'center',
                        alignContent: 'center',
                        justifyContent: 'center',
                        width: 'calc(100% - 70px)',
                        background: 'white',
                        color: '#333',
                        flexWrap: 'wrap'
                    }}
                    className={classes.root}
                >
                    <Typography
                        variant="h2"
                        style={{ marginBottom: 50, width: '100%' }}
                    >
                        ¿Qué tipo de información puedes encontrar en el Archivo del Esclarecimiento?
                    </Typography>
                    <Box
                        style={{
                            maxWidth: 700
                        }}
                    >
                        <ExpandInfo
                            info={infoArchivo}
                        />
                    </Box>

                </Box>

                <Box
                    style={{
                        minHeight: '100vh',
                        paddingBottom: 300,
                        paddingTop: '20vh',
                        position: 'relative',
                        display: 'flex',
                        alignItems: 'center',
                        alignContent: 'center',
                        justifyContent: 'center',
                        width: 'calc(100% - 70px)',
                        color: 'white',
                        flexWrap: 'wrap'
                    }}
                    className={classes.root}
                >
                    <Typography
                        variant="h2"
                        style={{ marginBottom: 50, width: '100%' }}
                    >
                        Test rápido
                    </Typography>


                    <MultipleQuestions
                        data={opcionesTest}
                    />
                </Box>

                <Box
                    style={{
                        minHeight: '100vh',
                        paddingBottom: '5vh',
                        paddingTop: '5vh',
                        position: 'relative',
                        display: 'flex',
                        alignItems: 'center',
                        alignContent: 'center',
                        justifyContent: 'center',
                        width: 'calc(100% - 70px)',
                        background: 'white',
                        color: "333",
                        paddingBottom: 300,
                        flexWrap: 'wrap'
                    }}
                    className={classes.root}
                >
                    <Typography
                        variant="h2"
                        style={{ margin: '0 auto', marginBottom: 50, width: '100%', maxWidth: 1100 }}
                    >
                        ¿Estás listo o lista para hacer tu propia investigación sobre el conflicto armado en Colombia utilizando el Archivo del Esclarecimiento?
                    </Typography>
                    <div style={{ width: '100%' }}></div>
                    <p style={{ marginTop: 30, marginBottom: 40 }}>Escoge un tema que quisieras investigar:</p>
                    <div style={{ width: '100%' }}></div>

                    <Box
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            maxWidth: 900
                        }}
                    >
                        {[
                            {
                                text: "¿Qué fue el Acuerdo de paz en Colombia?",
                                query: "acuerdo paz"
                            },
                            {
                                text: "¿Cómo impactó el conflicto armado a los niños, niñas, adolescentes y jóvenes?",
                                query: "conflicto armado niños"
                            },
                            {
                                text: "¿Qué es el reclutamiento y utilización de niños, niñas y adolescentes?",
                                query: "reclutamiento menores"
                            }
                        ].map(d => {
                            return (<>
                                <Box
                                    onClick={() => handleChangeUrl(d.query)}
                                    className={`${classes.botonUrl} ${query === d.query ? 'active' : ''}`}
                                >
                                    {d.text}
                                </Box>
                            </>)
                        })}
                    </Box>

                    {query &&
                        <>
                            <Typography
                                variant="h2"
                                style={{ margin: '0 auto', marginTop: 100, marginBottom: 50, width: '100%', maxWidth: 1100 }}
                            >
                                ¡Vamos a probar!
                            </Typography>

                            <div style={{ width: '100%' }}></div>

                            <p>Navega al buscador desde <a href={`https://archivo.comisiondelaverdad.co/explora/buscador?query=${query}`}>acá</a> y verás como se te auto-completan algunos campos para que empieces a explorar.</p>
                        </>
                    }

                </Box>


            </BloqueNarrativa>
        </>
    )
}

export default ComoNavegarInteractivo