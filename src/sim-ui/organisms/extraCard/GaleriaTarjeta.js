import { useState, useEffect, createRef } from 'react';
import ImageGallery from 'react-image-gallery'
import * as RecordsService from "../../../services/RecordsService"
import IconButton from '@material-ui/core/IconButton'
import NavigateNextIcon from '@material-ui/icons/NavigateNext'
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore'
import SaveTwoToneIcon from '@material-ui/icons/SaveTwoTone';
import EditTwoToneIcon from '@material-ui/icons/EditTwoTone';
import FullscreenIcon from '@material-ui/icons/Fullscreen'
import { makeStyles } from "@material-ui/core";
import Checkbox from '@material-ui/core/Checkbox';
import { Button } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        maxHeight: 580,
        backgroundColor: 'white',
        paddingTop: 15,
        paddingBottom: 15,
        position: 'relative',
        border: '1px solid ' + theme.palette.grey[100],

        '&.dark': {
            backgroundColor: 'transparent',
            borderColor: 'transparent',
            height: 'auto',
            padding: 0
        },

        '&.resultados': {
            maxHeight: 700,
            backgroundColor: '#333',
            borderColor: 'transparent',
            height: 'auto',
            padding: 0,
            '& img': {
                height: 680,
                [theme.breakpoints.down("md")]: {
                    height: 350,
                },
            },
            '& .fullscreen img': {
                height: '100vh'
            },
        },

        [theme.breakpoints.down("md")]: {
            height: 380,
        },

        '& .fullscreen img': {
            height: '100vh'
        },

        '& img': {
            height: 550,
            [theme.breakpoints.down("md")]: {
                height: 350,
            },
        },
        '& .image-gallery-bullets': {
            padding: 3,
        },
        '& .image-gallery-bullet': {
            borderColor: 'rgba(255,255,255,.3)',
            boxShadow: 'none'
        },
        '& .image-gallery-bullets .image-gallery-bullet.active': {
            backgroundColor: theme.palette.secondary.main,
            borderColor: 'white'
        },

        '& .image-gallery-bullets .image-gallery-bullet:hover': {
            backgroundColor: theme.palette.secondary.main,
            borderColor: theme.palette.secondary.main
        }
    },
    navigationBtnLeft: {
        position: 'absolute',
        top: '50%',
        left: 10,
        transform: 'translateY(-50%)',
        zIndex: 4,
        backgroundColor: 'white',
        color: theme.palette.secondary.main,

        '&:hover': {
            backgroundColor: theme.palette.secondary.main,
            color: 'white'
        }
    },
    navigationBtnRight: {
        position: 'absolute',
        top: '50%',
        right: 10,
        transform: 'translateY(-50%)',
        zIndex: 4,
        backgroundColor: 'white',
        color: theme.palette.secondary.main,

        '&:hover': {
            backgroundColor: theme.palette.secondary.main,
            color: 'white'
        }
    },
    fullscreenBtn: {
        position: 'absolute',
        bottom: 10,
        right: 10,
        zIndex: 4,
        backgroundColor: 'white',
        color: theme.palette.secondary.main,

        '&:hover': {
            backgroundColor: theme.palette.secondary.main,
            color: 'white'
        }
    },
    goToResource: {
        position: 'absolute',
        top: 20,
        right: 10,
        transform: 'translateY(-50%)',
        zIndex: 4,
        backgroundColor: 'white',
        color: theme.palette.secondary.main,

        '&:hover': {
            backgroundColor: theme.palette.secondary.main,
            color: 'white'
        }
    },
    check: {
        position: 'absolute',
        top: 10,
        right: 10,
        transform: 'translateY(-50%)',
        zIndex: 4,
        backgroundColor: 'white',
        color: theme.palette.secondary.main,

        '&:hover': {
            backgroundColor: theme.palette.secondary.main,
            color: 'white'
        }
    },
    edit: {
        position: 'absolute',
        top: 10,
        left: 10,
        transform: 'translateY(-50%)',
        zIndex: 4,
        backgroundColor: 'white',
        color: theme.palette.secondary.main,
        '&:hover': {
            backgroundColor: theme.palette.secondary.main,
            color: 'white'
        }
    },
    save: {
        position: 'absolute',
        top: 10,
        left: 10,
        transform: 'translateY(-50%)',
        zIndex: 4,
        backgroundColor: 'white',
        color: theme.palette.secondary.main,

        '&:hover': {
            backgroundColor: theme.palette.secondary.main,
            color: 'white'
        }
    }
}))

const GaleriaTarjeta = props => {
    const galleryRef = createRef();
    const classes = useStyles();
    const { modificacionPieza, imagenes, imagenesSeleccionadas, lectura } = props;
    const [records, setRecords] = useState([]);
    const [imagenesGaleria, setImagenesGaleria] = useState([]);
    const [imagenesSeleccionGaleria, setImagenesSeleccionGaleria] = useState([]);
    const [select, setSelect] = useState(false);
    const [modoSeleccion, setModoSeleccion] = useState(false);
    const [indexSelected, setIndexSelected] = useState([]);

    let lecturaGaleria = lectura;
    if (typeof lectura === "undefined")
        lecturaGaleria = true

    useEffect(() => {

        async function loadImagenes() {
            const arrayTemp = await Promise.all(imagenes.map(async i => {
                try {
                    let res = await RecordsService.serviceImageResize(i.idmongo, 'medium');
                    if (res.status !== 500) {
                        let obj = {
                            "original": res
                        }
                        return obj
                    } else {
                        throw new Error('error al cargar la imagen')
                    }
                } catch (error) {
                    console.log('error al cargar la imagen')
                }

                return { "original": "/media/cev/pic/logos/LogoCevSpinner.svg" }

            }));

            setImagenesGaleria(arrayTemp);
            setRecords(imagenes);
            inicioIndicesSeleccionados(arrayTemp);
        }
        loadImagenes()
    }, [imagenes]);

    const inicioIndicesSeleccionados = (arrayTemp) => {
        let copyIndexSelected = []
        let arraySeleccionadas = []

        imagenes.forEach((el, index) => {
            if (imagenesSeleccionadas) {
                const encontrado = imagenesSeleccionadas.some(e => e.filename === el.filename);
                if (encontrado) {
                    copyIndexSelected.push(index);
                    arraySeleccionadas.push(arrayTemp[index]);
                }
            } else {
                copyIndexSelected.push(index);
                arraySeleccionadas.push(arrayTemp[index]);
            }
        });

        setIndexSelected(copyIndexSelected);
        setImagenesSeleccionGaleria(arraySeleccionadas);
        setSelect(copyIndexSelected.includes(0));
    }

    const cargarImagenesSeleccionadas = () => {
        let arraySeleccionadas = []
        imagenesGaleria.forEach((el, index) => {
            if (indexSelected.includes(index))
                arraySeleccionadas.push(el);
        });
        setImagenesSeleccionGaleria(arraySeleccionadas);
    }


    const guardarCambiosSeleccion = (event) => {
        setModoSeleccion(false);
        cargarImagenesSeleccionadas();
        if (modificacionPieza)
            modificacionPieza(definirCambiosPieza());
    }

    const definirCambiosPieza = () => {
        let recordsSeleccionados = []
        records.forEach((el, index) => {
            if (indexSelected.includes(index))
                recordsSeleccionados.push(el);
        });
        return { "records": recordsSeleccionados }
    }

    const cambioModoSeleccion = (event) => {
        setSelect(indexSelected.includes(0));
        setModoSeleccion(true);
        setImagenesSeleccionGaleria(imagenesGaleria);

    }
    const handleChangeSelectImage = (event) => {
        let copyIndexSelected = [...indexSelected]
        if (event.target.checked) {
            if (!copyIndexSelected.includes(galleryRef.current.getCurrentIndex())) {
                copyIndexSelected.push(galleryRef.current.getCurrentIndex())
            }
        } else {
            if (copyIndexSelected.includes(galleryRef.current.getCurrentIndex())) {
                const index = copyIndexSelected.indexOf(galleryRef.current.getCurrentIndex());
                if (index > -1) {
                    copyIndexSelected.splice(index, 1);
                }
            }
        }
        setSelect(event.target.checked);
        setIndexSelected(copyIndexSelected);
    };

    const hadleChangeSlide = (slide) => {
        setSelect(indexSelected.includes(slide));
    };

    return (
        <>
            <ImageGallery
                ref={galleryRef}
                startIndex={0}
                items={imagenesSeleccionGaleria}
                showThumbnails={false}
                lazyLoad={true}
                showPlayButton={false}
                showBullets={true}
                disableKeyDown={true}
                additionalClass={`${classes.root} ${props.place === 'conoce' ? 'dark' : ''}`}
                onSlide={hadleChangeSlide}
                renderLeftNav={(onClick, disabled) => {
                    return (
                        <IconButton
                            className={classes.navigationBtnLeft}
                            onClick={onClick}
                            disabled={disabled}
                            size="medium"
                            color="white"
                        >
                            <NavigateBeforeIcon />
                        </IconButton>
                    )
                }}
                renderRightNav={(onClick, disabled) => {
                    return (
                        <IconButton
                            className={classes.navigationBtnRight}
                            onClick={onClick}
                            disabled={disabled}
                            size="medium"
                            color="white"
                        >
                            <NavigateNextIcon />
                        </IconButton>
                    )
                }}
                renderFullscreenButton={(onClick, isFullscreen) => {
                    return (
                        <IconButton
                            className={classes.fullscreenBtn}
                            onClick={onClick}
                            size="small"
                            color="white"
                        >
                            <FullscreenIcon />
                        </IconButton>
                    )
                }}
                renderCustomControls={() => {
                    return (
                        <>
                            {lecturaGaleria ? null :
                                <>
                                    {modoSeleccion ?
                                        <>
                                            <Checkbox
                                                checked={select}
                                                className={classes.check}
                                                onChange={handleChangeSelectImage}
                                                color="secondary"
                                                inputProps={{ 'aria-label': 'primary checkbox' }}
                                            />
                                            <IconButton
                                                className={classes.save}
                                                onClick={guardarCambiosSeleccion}
                                                size="small"
                                                color="white"
                                            >
                                                <SaveTwoToneIcon />
                                            </IconButton>
                                        </>
                                        : <IconButton
                                            className={classes.edit}
                                            onClick={cambioModoSeleccion}
                                            size="small"
                                            color="white"
                                        >
                                            <EditTwoToneIcon />
                                        </IconButton>}
                                </>
                            }
                        </>
                    )
                }}
            />
        </>
    )
}

export const GaleriaResultados = props => {
    const galleryRef = createRef();
    const classes = useStyles();
    const { modificacionPieza, imagenes, imagenesSeleccionadas, lectura } = props;
    const [records, setRecords] = useState([]);
    const [imagenesGaleria, setImagenesGaleria] = useState([]);
    const [imagenesSeleccionGaleria, setImagenesSeleccionGaleria] = useState([]);
    const [select, setSelect] = useState(false);
    const [modoSeleccion, setModoSeleccion] = useState(false);
    const [indexSelected, setIndexSelected] = useState([]);
    const [imgSelected, setImgSelected] = useState(0);

    let lecturaGaleria = lectura;
    if (typeof lectura === "undefined")
        lecturaGaleria = true

    useEffect(() => {

        async function loadImagenes() {
            const arrayTemp = await Promise.all(imagenes.map(async i => {
                try {
                    let res = await RecordsService.serviceImageResize(i.idmongo, 'large');
                    if (res.status !== 500) {
                        let obj = {
                            "original": res
                        }
                        return obj
                    } else {
                        throw new Error('error al cargar la imagen')
                    }
                } catch (error) {
                    console.log('error al cargar la imagen')
                }

                return { "original": "/media/cev/pic/logos/LogoCevSpinner.svg" }

            }));

            setImagenesGaleria(arrayTemp);
            setRecords(imagenes);
            inicioIndicesSeleccionados(arrayTemp);
        }
        loadImagenes()

        console.log(imagenes)

    }, [imagenes]);

    const inicioIndicesSeleccionados = (arrayTemp) => {
        let copyIndexSelected = []
        let arraySeleccionadas = []

        imagenes.forEach((el, index) => {
            if (imagenesSeleccionadas) {
                const encontrado = imagenesSeleccionadas.some(e => e.filename === el.filename);
                if (encontrado) {
                    copyIndexSelected.push(index);
                    arraySeleccionadas.push(arrayTemp[index]);
                }
            } else {
                copyIndexSelected.push(index);
                arraySeleccionadas.push(arrayTemp[index]);
            }
        });

        setIndexSelected(copyIndexSelected);
        setImagenesSeleccionGaleria(arraySeleccionadas);
        setSelect(copyIndexSelected.includes(0));
    }

    const cargarImagenesSeleccionadas = () => {
        let arraySeleccionadas = []
        imagenesGaleria.forEach((el, index) => {
            if (indexSelected.includes(index))
                arraySeleccionadas.push(el);
        });
        setImagenesSeleccionGaleria(arraySeleccionadas);
    }


    const guardarCambiosSeleccion = (event) => {
        setModoSeleccion(false);
        cargarImagenesSeleccionadas();
        if (modificacionPieza)
            modificacionPieza(definirCambiosPieza());
    }

    const definirCambiosPieza = () => {
        let recordsSeleccionados = []
        records.forEach((el, index) => {
            if (indexSelected.includes(index))
                recordsSeleccionados.push(el);
        });
        return { "records": recordsSeleccionados }
    }

    const cambioModoSeleccion = (event) => {
        setSelect(indexSelected.includes(0));
        setModoSeleccion(true);
        setImagenesSeleccionGaleria(imagenesGaleria);

    }
    const handleChangeSelectImage = (event) => {
        let copyIndexSelected = [...indexSelected]
        if (event.target.checked) {
            if (!copyIndexSelected.includes(galleryRef.current.getCurrentIndex())) {
                copyIndexSelected.push(galleryRef.current.getCurrentIndex())
            }
        } else {
            if (copyIndexSelected.includes(galleryRef.current.getCurrentIndex())) {
                const index = copyIndexSelected.indexOf(galleryRef.current.getCurrentIndex());
                if (index > -1) {
                    copyIndexSelected.splice(index, 1);
                }
            }
        }
        setSelect(event.target.checked);
        setIndexSelected(copyIndexSelected);
    };

    const hadleChangeSlide = (slide) => {
        setSelect(indexSelected.includes(slide));
        setImgSelected(slide)
    };


    return (
        <>
            <ImageGallery
                ref={galleryRef}
                startIndex={0}
                items={imagenesSeleccionGaleria}
                showThumbnails={false}
                lazyLoad={true}
                showPlayButton={false}
                showBullets={true}
                disableKeyDown={true}
                additionalClass={`${classes.root} resultados`}
                onSlide={hadleChangeSlide}
                renderLeftNav={(onClick, disabled) => {
                    return (
                        <IconButton
                            className={classes.navigationBtnLeft}
                            onClick={onClick}
                            disabled={disabled}
                            size="medium"
                            color="white"
                        >
                            <NavigateBeforeIcon />
                        </IconButton>
                    )
                }}
                renderRightNav={(onClick, disabled) => {
                    return (
                        <IconButton
                            className={classes.navigationBtnRight}
                            onClick={onClick}
                            disabled={disabled}
                            size="medium"
                            color="white"
                        >
                            <NavigateNextIcon />
                        </IconButton>
                    )
                }}
                renderFullscreenButton={(onClick, isFullscreen) => {
                    return (
                        <IconButton
                            className={classes.fullscreenBtn}
                            onClick={onClick}
                            size="small"
                            color="white"
                        >
                            <FullscreenIcon />
                        </IconButton>
                    )
                }}
                renderCustomControls={(event, event_) => {
                    return (
                        <>
                            <Button
                                className={classes.goToResource}
                                size="small"
                                color="white"
                                onClick={() => {window.open(`detalle/${imagenes[imgSelected]['resource_id']}`,'_blank')}}
                            >
                                Ver el recurso
                            </Button>
                        </>
                    )
                }}
            />
        </>
    )
}

export default GaleriaTarjeta