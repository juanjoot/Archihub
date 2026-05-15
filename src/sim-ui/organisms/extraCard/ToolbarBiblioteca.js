import { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles'
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder'
import BookmarkIcon from '@material-ui/icons/Bookmark'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Checkbox from '@material-ui/core/Checkbox'
import ContenidoRecurso from './ContenidoRecurso'

const useStyles = makeStyles((theme) => ({
    check: {
        marginLeft: 'auto'
    }
}));

const ToolbarBiblioteca = props => {
    const {handleCheckRecurso, agregar} = props;
    const [check, setCheck] =  useState(props.check);
    const classes = useStyles();
    
    useEffect(() => {
        setCheck(props.check)
      
    }, [props.check])

    const handleChange = (event) => {
        setCheck(event.target.checked)
        if(props.handleCheckRecurso)
            props.handleCheckRecurso(event.target.checked)
       
    };
    return(
        <Toolbar >
          
            <ContenidoRecurso  contarEnColeccion={true}   recurso={props.recurso}/>
          
            <IconButton
                aria-label="guardar en mi biblioteca"
                className={props.favoriteClass}
                onClick={props.handleFav}
                edge="start"
                size="small"
            >

                {!props.selected &&
                    <BookmarkBorderIcon />
                }

                {props.selected &&
                    <BookmarkIcon
                        color="secondary"
                    />
                }
            </IconButton>
            {(typeof handleCheckRecurso !== 'undefined') && agregar?
                <Checkbox
                    checked={check}
                    className={classes.check}
                    onChange={handleChange}
                    color="secondary"
                    inputProps={{ 'aria-label': 'primary checkbox' }}
                />
            :null}
        </Toolbar>
    )
}

export default ToolbarBiblioteca