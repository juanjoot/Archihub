import { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import KeyboardReturn from '@material-ui/icons/KeyboardReturn';
import TabsContainer from "../sim-ui/organisms/TabsContainer"
import Container from '@material-ui/core/Container'
import Divider from '@material-ui/core/Divider'
import Pagination from '@material-ui/lab/Pagination'
import Lottie from 'react-lottie';
import * as BookmarkCollectionService from "../../../services/BookmarkCollectionService";
import { connect } from "react-redux"
import * as app from "../../store/ducks/app.duck"
import animationData from '../../assets/loading_cev_crea.json'
import TarjetaBiblioteca from './TarjetaBiblioteca'
import RecursosSeleccionados from "./RecursosSeleccionados"
import ResultadoBiblioteca from "./ResultadoBiblioteca"

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
    const [tabBiblioteca, setTabBiblioteca] = useState(0);
    const { handleCerrar, handleAgregarALienzo, user, tipoRecurso } = props;
    const [recursosSeleccionado, setRecursosSeleccionado] = useState([]);
    const classes = useStyles();
    const seleccionable = (typeof handleCerrar !== 'undefined')
    

    const handleAgregarRecursos = () => {
        handleCerrar();
        handleAgregarALienzo(recursosSeleccionado);
    }

    const handleCancelarRecursos = () => {       
        setRecursosSeleccionado([]);
    }

    const handlerCambioSeleccion = (resultado) =>{        
       setRecursosSeleccionado(resultado)
    }

    return (
        <div>
          
            {seleccionable ?
                    <AppBar elevation={0} className={classes.appBar} color="secondary">
                    <Toolbar>
                        <Typography variant="h6" className={classes.title}>
                            Biblioteca
                        </Typography>
                        
                        <Button autoFocus color="inherit" onClick={handleCerrar}  >
                            Regresar
                            <KeyboardReturn />
                        </Button>
                    </Toolbar>
                </AppBar>          
            :      
                <Typography variant="h6" gutterBottom>
                Biblioteca
                </Typography>
            }
            <Container>
                <RecursosSeleccionados handleCancel={handleCancelarRecursos} handleAggregate={handleAgregarRecursos} selected={recursosSeleccionado.length} />
                <TabsContainer
                    list={
                        [
                          "Recursos"
                        ]
                    }
                    current={tabBiblioteca}
                    callback={setTabBiblioteca}
                />

                {tabBiblioteca === 0 &&
                    <Container>
                       <ResultadoBiblioteca  handlerCambioSeleccion={handlerCambioSeleccion} seleccionable={seleccionable} seleccion={recursosSeleccionado} tipoRecurso={tipoRecurso}/>                        
                    </Container>
                }
                {tabBiblioteca === 1 &&
                    <Container>
                        <>Colecciones</>
                    </Container>
                }
            </Container>
        </div>
    );
}


//export default Biblioteca;//connect(mapStateToProps,app.actions)(BibliotecaPersonal);



const mapStateToProps = store => ({
    
});

export default connect(mapStateToProps, app.actions)(Biblioteca);
