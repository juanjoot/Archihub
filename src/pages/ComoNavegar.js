import React, { useState } from 'react'
import MainLayout from '../sim-ui/layout/MainLayout'
import { Box, Typography } from '@material-ui/core'
import { makeStyles } from "@material-ui/core/styles";
import PiezaImageCSS from '../sim-ui/organisms/PiezaImageCSS'
import home from '../sim-ui/assets/home_01-min.png'
import ArbolFondos from '../sim-ui/organisms/comoNavegar/ArbolFondos';
import fondosLogo from "../sim-ui/assets/fondos.png";
import hand from "../sim-ui/assets/basedatos.png";

import * as CollectionService from "../../src/services/CollectionService";

import RecursoIndividual from '../sim-ui/organisms/RecursoIndividual';
import ColeccionIndividual from '../sim-ui/organisms/ColeccionIndividual';
import BloqueNarrativa from '../sim-ui/organisms/bloqueNarrativas/BloqueNarrativa'

const id_background = '409ec0a7-4251-487c-9a45-f48d8cebbbce'

const useStyles = makeStyles((theme) => ({
    root: {
        minHeight: '100vh',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        flexWrap: 'wrap',
        paddingTop: '10vh',
        paddingBottom: 300,
        width: 'calc(100% - 70px)',

        '& p': {
            fontSize: 20,
            maxWidth: 650,
            margin: '0 auto',
            marginBottom: 20,

            '&.indexText': {
                textAlign: 'left',
                marginTop: 40,
                paddingTop: 10,
                borderTop: '1px solid rgba(255,255,255,0.3)',
                fontSize: 15
            }
        },
        '& p a': {
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

const ComoNavegar = props => {
    const classes = useStyles()
    const [slug, setSlug] = useState({ slug: 'internas', text: 'Recursos internos de la Comisión', })

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
                    className={classes.root}
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
                        ¿Cómo navegar el Archivo del Esclarecimiento?
                    </Typography>

                </Box>

                <Box
                    style={{
                        background: 'white',
                        color: '#333',
                        flexWrap: 'wrap'
                    }}
                    className={classes.root}
                >
                    <Box style={{ width: '100%' }}>
                        <Typography
                            variant="h2"
                            style={{ marginBottom: 50 }}
                        >
                            Los recursos
                        </Typography>

                        <p style={{ marginBottom: 50 }}>En el Archivo del Esclarecimiento los recursos se usan para representar los documentos que hacen parte del archivo público. Estos son agrupaciones de distintos documentos como pueden ser videos, archivos pdf, audios o imágenes, que se reunen bajo una misma temática. Por ejemplo, este recurso contiene un video que describe el objeto de memoria registrado y un documento con los permisos para esa obra en particular.</p>

                        <RecursoIndividual
                            ident="000-OBJ-6262e52c7faae1363c29c98c"
                        />

                        <p style={{ marginBottom: 50, marginTop: 50 }}>Este otro recurso contiene varias fotografías que fueron tomadas durante un mismo evento.</p>

                        <RecursoIndividual
                            ident="1000026-OIMB-620eb22144faa5731ce4b066"
                        />
                    </Box>
                </Box>

                <Box
                    style={{
                        background: 'white',
                        color: '#333',
                        flexWrap: 'wrap'
                    }}
                    className={classes.root}
                >
                    <Box style={{ width: '100%' }}>
                        <Typography
                            variant="h2"
                            style={{ marginBottom: 50 }}
                        >
                            Los fondos documentales
                        </Typography>

                        <p>Los fondos documentales se estructuraron para la investigación de la Comisión de la Verdad. Estos se comportan como carpetas en donde se agrupan y se ordenan los recursos documentales de acuerdo a su origen y/o tipo. Por ejemplo: las entrevistas, las bases de datos, los documentos producidos por los equipos de la Comisión de la Verdad, los archivos públicos de otras organizaciones e instituciones y los casos e informes entregados para construir el Informe Final y el diálogo social.</p>

                        <p>Puedes usar la siguiente herramienta para explorar qué fondos están dispobibles, descargar los inventarios y ver los recursos asociados en el buscador del Archivo.</p>

                    </Box>

                    <ArbolFondos
                        slug={slug}
                        setSlug={setSlug}
                    />
                </Box>

                <Box
                    style={{
                        background: 'white',
                        color: '#333',
                        flexWrap: 'wrap'
                    }}
                    className={classes.root}
                >
                    <Box style={{ width: '100%' }}>
                        <Typography
                            variant="h2"
                            style={{ marginBottom: 50 }}
                        >
                            Las Colecciones
                        </Typography>

                        <p>Las Colecciones agrupan uno o varios recursos uniéndolos gracias a una línea narrativa que conecta cada uno de los recursos entre si. Por ejemplo, la siguiente colección agrupa varios recursos que hablan de los impactos de la guerra en la naturaleza y nos describe el trabajo del equipo del Volumen Testimonial.</p>

                        <ColeccionIndividual
                            slug="naturaleza"
                        />

                        <p style={{ marginTop: 50 }}>Esta otra colección describe el trabajo realizado con las comunidades afrocolombianas, negras, raizales y palenqueras. Además de describir el trabajo de la Comisión, pone a disposición documentos con sugerencias de uso pedagógico.</p>

                        <ColeccionIndividual
                            slug="la-verdad-del-pueblo-negro"
                        />

                    </Box>
                </Box>

            </BloqueNarrativa>
        </>
    )
}

export default ComoNavegar