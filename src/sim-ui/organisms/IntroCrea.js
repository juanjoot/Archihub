import { makeStyles } from "@material-ui/core/styles";
import Typography from '@material-ui/core/Typography';
import ResumeCollection from "../sim-ui/organisms/ResumeCollection";
import ButtonMenuBase from "../sim-ui/organisms/ButtonMenuBase";
import Container from '@material-ui/core/Container'


const useStyles = makeStyles((theme) => ({
    button: {
      margin: theme.spacing(1),
    },  
    gridContainer: {
        paddingLeft: "5px",
        paddingRight: "5px"
      }
  }));



export default function IntroCrea() {
  const classes = useStyles();
  return (    
                <Container>  
                    <Typography variant="h4" gutterBottom>
                    Creador de Narrativas
                    </Typography> 

                    <Typography variant="body2" color="textSecondary" component="p">
                    En este espacio podras proponer un punto de acercamiento a la verdad a partir de la selección de una serie de elementos del acervo a disposición, la inclusión de una narración propia  y la referencia a otros recursos externos que expandan y complementen la argumentación; todo esto materializado por medio de la conformación de Colecciones Abiertas, que con cada aporte enriquecerán el diálogo colectivo promovido en Conoce.
                    </Typography> 
                    <Container>  
                    <Link to="/dashboard">
                        <ButtonMenuBase
                        title="Crear una colección desde el inicio"
                        width='50%'
                        url='https://museumplanner.org/wp-content/uploads/2011/02/TMTE.jpg'
                
                        />
                    </Link>
                        <ButtonMenuBase
                        title="Crear una una narrativa desde una colección existente"
                        width='45%'
                        url='http://www.travelontop.ro/wp-content/uploads/2017/03/Smartify.jpg'
                      
                        />
                      
                    </Container>  
                 
                    <ResumeCollection/> 
                   
            </Container>
           
            );
}
