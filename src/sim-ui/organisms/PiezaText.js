import TextoColeccionEditable from './TextoColeccionEditable'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';



const useStyles = makeStyles((theme) => ({

  card: {
    borderWidth: 1,
    borderColor: "lightgrey",
  }

}));
const PiezaText = props => {
  const classes = useStyles();
  return (<>
    {props.lectura ?
      <TextoColeccionEditable 
        {...props}
      />
      :
      <Card className={classes.card} variant="outlined" >
        <TextoColeccionEditable
          {...props}
        />
      </Card>}
  </>
  );
}
export default PiezaText;


