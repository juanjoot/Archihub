import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';


const useStyles = makeStyles(theme => ({
    textareaProperties: {
      resize: "both"
    },
    textFieldStyle: {
      width: "100%", 
      "margin-bottom":"15px", 
      "margin-top":"15px",
      borderRadius: '0.5rem', 
      borderWidth: "0.001rem" 
    }

  }));

const TextoColeccion = props => {
    const classes = useStyles();
    return (
     
                <TextField  
                    aria-label="minimum height"  
                    id="outlined-textarea" 
                    multiline
                    //variant="outlined"
                    inputProps={{ className: classes.textareaProperties}}
                    className={classes.textFieldStyle}      
                    {...props}  
                />
               /* <TextareaAutosize                
                 aria-label="minimum height" 
                 minRows={1} 
                 {...props} 
                 id="outlined-textarea"                
                 variant="outlined"
                 className={classes.textFieldStyle}/>*/
       
    )
}

export default TextoColeccion