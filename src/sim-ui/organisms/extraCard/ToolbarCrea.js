import Toolbar from '@material-ui/core/Toolbar'
import ContenidoRecurso from './ContenidoRecurso'

const ToolbarCrea = props => {
    return(
        <Toolbar >         
            <ContenidoRecurso contarEnColeccion={false} recurso={props.recurso}/>          
        </Toolbar>
    )
}

export default ToolbarCrea