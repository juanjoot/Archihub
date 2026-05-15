import { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import KeyboardReturn from '@material-ui/icons/KeyboardReturn';
import * as museo from "../../../store/ducks/museo.duck";
import { connect } from "react-redux";
import * as BookmarkCollectionService from "../../../services/BookmarkCollectionService";
import RecursosSeleccionados from "../../organisms/RecursosSeleccionados"
import Busqueda from './Busqueda'

const useStyles = makeStyles((theme) => ({
    appBar: {
        position: 'relative',
        color: 'white'
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
}));


const Biblioteca = (props) => {
    const [idents, setIdents] = useState([]);
    const [peticionBiblioteca, setPeticionBiblioteca] = useState(false);
    const { handleCerrar, handleAgregarALienzo, user, tipoRecurso } = props;
    const classes = useStyles();
    const seleccionable = (typeof handleCerrar !== 'undefined')

    let tipo = null
    if (tipoRecurso) {
        if (tipoRecurso.toLowerCase() != "recurso" ) {
            if (tipoRecurso.toLowerCase() === "galeria") {
                tipo = "Galería fotográfica"
            }
            else if (tipoRecurso.toLowerCase() === "audio") {
                tipo = "Audio"
            }
            else if (tipoRecurso.toLowerCase() === "video") {
                tipo = "Video"
            }
            else if (tipoRecurso.toLowerCase() === "documento") {
                tipo = "Documento"
            }
        } 
    }


    useEffect(() => {
        actualizarIdentsBiblioteca()
        props.setSelectedBilioteca([])

        if (typeof handleAgregarALienzo !== "undefined")
            props.setAgregarRecursosBiblioteca(true);
        else
            props.setAgregarRecursosBiblioteca(false);

    }, [])

    const actualizarIdentsBiblioteca = () => {
        BookmarkCollectionService.getIdentCollection().then(
            (data) => {
                setIdents(data);
                setPeticionBiblioteca(true);
            },
            (error) => {
                console.log(error)
            }
        )
    }

    const actualizarBusqueda = () => {
        actualizarIdentsBiblioteca()
    }
    const handleAgregarRecursos = () => {
        handleCerrar();
        handleAgregarALienzo(props.selectedBilioteca);
    }

    const handleCancelarRecursos = () => {
        props.setSelectedBilioteca([])
    }



    return (
        <div>

            {seleccionable ?
                <AppBar elevation={0} className={classes.appBar} color="primary">
                    <Toolbar>

                        <Button autoFocus color="inherit" onClick={handleCerrar}  >
                            Regresar
                            <KeyboardReturn />
                        </Button>
                    </Toolbar>
                </AppBar>
                :
                null
            }
            {props.selectedBilioteca ?
                <RecursosSeleccionados handleCancel={handleCancelarRecursos} handleAggregate={handleAgregarRecursos} selected={props.selectedBilioteca.length} />
                : null}

            {peticionBiblioteca ?
                <Busqueda
                    place="biblioteca"
                    idents={idents}
                    actualizarBusqueda={actualizarBusqueda}
                    tipo={tipo}
                />
                : null}

        </div>
    );
}

const mapStateToProps = store => ({
    selectedBilioteca: store.museo.selectedBilioteca,
    agregarRecursosBiblioteca: store.museo.agregarRecursosBiblioteca
});

export default connect(mapStateToProps, museo.actions)(Biblioteca);


