import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'left',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(0.5),
    },
  },
}));
const ChipsEliminables = props => {
  const {value,onDelete} =  props
  const classes = useStyles();

  const handleDelete = (i) => {
    const valueCopia = [...value]   
    if  (valueCopia.length >= i+1){
        if (i > -1){
            valueCopia.splice(i, 1);
        }
    }
    onDelete(valueCopia);
  };
  const renderChips = (val, i) => {
    return (
        <Chip
        color="primary"   
        label={val}
        onDelete={()=>handleDelete(i)}
        variant="outlined"
      />
    );
  };
  return (
    <div className={classes.root}>
        {(typeof value !== 'undefined') ?
        value.map((val, i) => renderChips(val, i))
        :null}
    </div>
  );
}
export default ChipsEliminables;