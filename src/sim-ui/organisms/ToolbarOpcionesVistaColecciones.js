import ToolbarVistaColecciones from "./extraCard/ToolbarVistaColecciones"
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    root: {
        //width:"50%",
        float: "right", 
        maxheight:"50px",
        backgroundColor:"#f5f5f5", 
        borderColor: "#e1e0e0",
        borderTopLeftRadius: "5px",
        borderTopRightRadius: "5px",
        borderWidth: "1px 1px 1px 1px",    
        borderStyle: "solid", 
        padding: "1px"
    }
    
}));

const ToolbarOpcionesVistaColecciones = props => {   
    const classes = useStyles();
    return(
        <div  className={classes.root}>
            <ToolbarVistaColecciones withouToolBar={true}   {...props}/>  
        </div>
    )
}

export default ToolbarOpcionesVistaColecciones