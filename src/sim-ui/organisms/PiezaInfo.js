import { useEffect, useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Checkbox from '@material-ui/core/Checkbox';
import { Link } from "react-router-dom"


const useStyles = makeStyles((theme) => ({
  card: {
    borderWidth: "0px"
  }
}));


const PiezaInfo = (props) => {
  const [checked, setChecked] = useState(false);
  const classes = useStyles();
  const { piece, position, handleChangeStatePiece } = props;
  const stateWithoutDescription = "without_description"

    useEffect(()=>{
      let checkLocal = true
      if(piece && piece.value){
        if(piece.value===stateWithoutDescription)
          checkLocal = false
      }      
      setChecked(checkLocal);
  }, [piece])

  const handleChange = (event) => {
    if (handleChangeStatePiece) {
      if (event.target.checked)
        handleChangeStatePiece("", position)
      else
        handleChangeStatePiece(stateWithoutDescription, position)
    }
    setChecked(event.target.checked);
  };

  const resourceTitle = (piece) => {
    let title = ""
    try {
      title = piece.resource.document.metadata.firstLevel.title
    } catch (e) {

    }
    return (
      <> {title !== "" ?
        <Typography variant="subtitle1" color="textPrimary">
          {title}
        </Typography>
        : null}
      </>
    );
  };

  const resourceDescription = (piece) => {
    let description  = ""
    try{
      if(piece){
      description = piece.resource.document.metadata.firstLevel.description
      }
    }catch(e){
      console.log(e)
    }
    return (
      <> {description !== "" ?
        <Typography variant="body2" color="textSecondary">
          {description}
        </Typography>
        : null}
      </>
    );
  };


   const resourceMacrorprocess = (piece) => {
    let macroprocess  = ""
    try{
      if(piece){
        macroprocess = piece.resource.document.metadata.firstLevel.macroprocess
      }
    }catch(e){
      console.log(e)
    }
    return (
      <> {macroprocess !== "" ?
        <Typography variant="subtitle1" color="textSecondary">
          {macroprocess}
        </Typography>
        : null}
      </>
    );
  };

  let slug = ""
  try {
    slug = piece.resource.document.metadata.slug
  } catch (e) {
    console.log(e)
  }
  return (

    <Card variant="outlined" className={classes.card} >
      <div >
        <CardContent className={classes.content}>
          {slug !== "" ?
            <Link to={"/explora/detalle/" + slug} target="_blank" rel="noopener noreferrer"  >
              {resourceMacrorprocess(piece)}
              {resourceTitle(piece)}
            </Link> :
            null}
          {

            <>
              {handleChangeStatePiece ?
                <Checkbox
                  key={"check_img_" + position}
                  checked={checked}
                  onChange={handleChange}
                  color="primary"
                  inputProps={{ 'aria-label': 'secondary checkbox' }}
                />
                : null
              }
              {checked ?
                <>
                  {resourceDescription(piece)}
                </>
                : null}
            </>
          }
        </CardContent>
      </div>
    </Card>

  );
}
export default PiezaInfo;
