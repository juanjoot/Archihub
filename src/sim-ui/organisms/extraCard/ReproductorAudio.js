import { useState, useEffect } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import { useTranslation } from "react-i18next";
import AudioReproductorColeccion from '../media/AudioReproductorColeccion';
import VideoReproductorColeccion from '../media/VideoReproductorColeccion';
import MediaEdicionColeccion from '../media/MediaEdicionColeccion';
import * as RecordsService from "../../../services/RecordsService";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";



const useStyles = makeStyles(theme => ({
    card: {
        position: 'relative',
        //backgroundColor: '#999999',//theme.palette.primary.main,
        width: "100%",
        minWidth: "350px",
        transition: "0.3s",
        boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
        "&:hover": {
            boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)"
        }
    },
    cardFullScreen: {
        position: 'relative',
        width: "100%",
        transition: "0.3s",
        boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
        "&:hover": {
            boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)"
        },
        top: "50px"

        //marginLeft: "-50%"  

    },
    cardFullScreenAudio: {
        position: 'relative',
        width: "50%",
        transition: "0.3s",
        boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
        "&:hover": {
            boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)"
        },
        marginLeft: "25%"

    },
    titulo: {
        color: theme.palette.primary.light,
    },
    subtitulo: {
        fontSize: "14px",
        color: theme.palette.primary.light,
    },

}));


const getVideoType = (type) => {
    let formats = {
        ogg: 'video/ogg',
        mp4: 'video/mp4',
        webm: 'video/webm'
    }

    return formats[type]
}

const supportsVideoType = (type) => {
    let video;

    let formats = {
        ogg: 'video/ogg; codecs="theora"',
        mp4: 'video/mp4; codecs="avc1.42E01E"',
        webm: 'video/webm; codecs="vp8, vorbis"'
    };

    if (!video) {
        video = document.createElement('video')
    }

    return video.canPlayType(formats[type] || type);
}

const supportsAudioType = (type) => {
    let audio;

    let formats = {
        ogg: 'audio/ogg; codecs="vorbis"',
        mp3: 'audio/mpeg; codecs="mp3"'
    };

    if (!audio) {
        audio = document.createElement('audio')
    }

    return audio.canPlayType(formats[type] || type);
}

const ReproductorAudio = props => {

    const { titulo, subtitulo, autoplaying, record, modificacionPieza, ident, lectura, pieza } = props;

    const [archivo, setArchivo] = useState(false);
    const [tipo, setTipo] = useState(false);
    const [editando, setEditando] = useState(false);
    const classes = useStyles();
    const [t, i18n] = useTranslation("common");

    useEffect(() => {
        async function loadAudio() {
            const archivo = RecordsService.serviceStream(record.idmongo, tipo, record.support)
            console.log(archivo)
            setArchivo(archivo)
        }
        if (tipo) {
            try {
                loadAudio()
                cambioArchivoAudio()
            }
            catch (err) {
                console.log(err)
            }

        }
    }, [tipo])

    useEffect(() => {
        setArchivo(false);
        if (record.support === 'Audio') {
            if (supportsAudioType('mp3')) setTipo('mp3')
            else if (supportsAudioType('ogg')) setTipo('ogg')
        }
        else if (record.support === 'Video') {
            if (supportsVideoType('mp4')) setTipo('mp4')
            else if (supportsVideoType('ogg')) setTipo('ogv')
            else if (supportsVideoType('webm')) setTipo('webm')
        }
    }, [record])

    const cambioArchivoAudio = () => {
        if (typeof pieza !== "undefined" && !lectura)
            if (pieza.path !== record.filename)
                if (modificacionPieza)
                    modificacionPieza({ "records": [record], "path": record.filename }, ["min", "max"]);
    }


    const handlerGuardarFragmento = (inicio, fin) => {
        setEditando(false);
        if (modificacionPieza)
            modificacionPieza(definirCambiosPieza(inicio, fin));
    }

    const handlerEdicion = () => {
        setEditando(true);
    }


    const definirCambiosPieza = (inicio, fin) => {
        let retornoCambios = {}
        retornoCambios = { "records": [record], "path": record.filename }
        retornoCambios["min"] = String(inicio);
        retornoCambios["max"] = String(fin);
        return retornoCambios
    }

    let inicioFragmento = 0;
    let finFragmento = 0;
    if (typeof pieza !== "undefined")
        if ("min" in pieza && "max" in pieza) {
            inicioFragmento = parseFloat(pieza.min)
            finFragmento = parseFloat(pieza.max)
        }


    return (
        <>
            {archivo ?
                <>
                    {
                        <>
                            <Card className={(props.fullScreen) ? (record.support === "Video") ? classes.cardFullScreen : classes.cardFullScreenAudio : classes.card}>
                                <Grid container direction="column">
                                    <Grid item container >
                                        {titulo ?
                                            <Typography
                                                align="left"
                                                className={classes.titulo}
                                            >
                                                {titulo}
                                            </Typography>

                                            : null}
                                    </Grid>
                                    <Grid item container >
                                        {subtitulo ?
                                            <Typography
                                                align="left"
                                                className={classes.subtitulo}
                                            >
                                                {subtitulo}
                                            </Typography>
                                            : null}
                                    </Grid>
                                    <Grid item container >
                                        {record.support === "Video" ?
                                            <>
                                                {editando && !lectura ?
                                                    <MediaEdicionColeccion
                                                        handlerSaveSegment={handlerGuardarFragmento}
                                                        src={archivo}
                                                        segmentStart={inicioFragmento}
                                                        segmentEnd={finFragmento}
                                                        isVideo={true}
                                                    />
                                                    :
                                                    <VideoReproductorColeccion
                                                        color="white"
                                                        autoPlay={autoplaying}
                                                        handlerEdit={handlerEdicion}
                                                        src={archivo}
                                                        type={getVideoType(tipo)}
                                                        segmentStart={inicioFragmento}
                                                        segmentEnd={finFragmento}
                                                        edit={!lectura}
                                                        messageProcessError={t("media.processMessageError")}

                                                    />
                                                }
                                            </>
                                            :
                                            <>
                                                {editando && !lectura ?
                                                    <MediaEdicionColeccion
                                                        handlerSaveSegment={handlerGuardarFragmento}
                                                        src={archivo}
                                                        segmentStart={inicioFragmento}
                                                        segmentEnd={finFragmento} />
                                                    :
                                                    <AudioReproductorColeccion
                                                        color="white"
                                                        autoPlay={autoplaying}
                                                        handlerEdit={handlerEdicion}
                                                        src={archivo}
                                                        segmentStart={inicioFragmento}
                                                        segmentEnd={finFragmento}
                                                        edit={!lectura}
                                                        messageProcessError={t("media.processMessageError")}
                                                    />
                                                }
                                            </>
                                        }
                                    </Grid>
                                </Grid>
                            </Card>
                        </>
                    }
                </> :
                <>
                    Cargando
                </>}
        </>
    )
}
export default ReproductorAudio