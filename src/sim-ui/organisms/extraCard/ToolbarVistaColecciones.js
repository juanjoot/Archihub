import React, {useEffect,useState} from "react";
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles } from "@material-ui/core/styles";
import Tooltip from '@material-ui/core/Tooltip';
import { Link } from "react-router-dom";
import withWidth, { isWidthDown } from "@material-ui/core/withWidth";
import IconButton from '@material-ui/core/IconButton'
import FileCopyTwoToneIcon from '@mui/icons-material/FileCopyTwoTone';
import LinkTwoToneIcon from '@material-ui/icons/LinkTwoTone';


const useStyles = makeStyles(theme => ({
	buttonFloatRight: {
		float: "right",
        paddingLeft:"7px",
        paddingRight:"7px"
	},
    button: {
        paddingLeft:"7px",
        paddingRight:"7px"
	}
}))


const OptionsVistaColecciones = props => {
  
    const classes = useStyles();
    const [link, setLink] = useState("")
    useEffect(() => {
        if(props.piece)
          defineLink()
    }, [props.piece]);

    const defineLink = ()=>{
        if(props.piece.resource)   
            if("slug" in  props.piece.resource.document.metadata)
                setLink(props.piece.resource.document.metadata.slug)
            else if ("ident" in props.piece.resource.document)
                setLink(props.piece.resource.document.ident)
      }

    return(
        <>
        {props.copyLink && props.idSection?
            <Tooltip title="Copiar enlace sección" aria-label="seccion">
                <IconButton
                    color="primary"
                    aria-label="copiar seccion"
                    edge="start"
                    size="small"                
                    onClick={() => props.copyLink(props.idSection)}
                    className={props.withouToolBar?classes.buttonFloatRight:classes.button}
                    >
                    <FileCopyTwoToneIcon  />
                </IconButton>  
            </Tooltip> 
        :null}
        {link!="" ?
            <Link to={`/explora/detalle/${link}`}>
                <Tooltip title="Ver detalle" aria-label="detalle">
                    <IconButton 
                    color="primary"
                    aria-label="link detalle"
                    edge="start"
                    size="small"     
                    className={props.withouToolBar?classes.buttonFloatRight:classes.button}
                    >
                        <LinkTwoToneIcon  />
                    </IconButton>
                </Tooltip>
                </Link>
         :null}

        </>
    )
}

const ToolbarVistaColecciones = props => {  

    return(
        <>
        {props.withouToolBar? 
            <OptionsVistaColecciones {...props}/>
            :
            <Toolbar >  
                <OptionsVistaColecciones {...props}/>
            </Toolbar>
            }
            </>
    )
}

export default ToolbarVistaColecciones