import { useState, useCallback, forwardRef, useRef, useImperativeHandle } from 'react';
import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TarjetaColeccion from './TarjetaColeccion';
import update from 'immutability-helper';
import { DndProvider } from 'react-dnd';
import {HTML5Backend } from 'react-dnd-html5-backend';
import TituloSeccion from "./TituloSeccion";
import AddToPhotosTwoToneIcon from '@material-ui/icons/AddToPhotosTwoTone';
import Multimedia from '../assets/gestorNarrativas/Multimedia.png';
import Box from '@material-ui/core/Box';

const style = {
  width: "100%",
}

const useStyles = makeStyles((theme) => ({ 
  contenedorTitulo: {  
      marginLeft: "8px",
      marginTop: "40px", 
      marginBottom: "20px", 
      }, 
    contenedorVacio:{
      position: "absolute",
      top: "50%",
      left: "50%",
      "-moz-transform": "translateX(-50%) translateY(-50%)",
      "-webkit-transform": "translateX(-50%) translateY(-50%)",
      "transform": "translateX(-50%) translateY(-50%)",
      },
      text: {
          color:  theme.palette.primary.main,
          //textAlign:"center",
          marginLeft: "25px",
          marginBottom: "50px",
          fontSize:"17px",
          width:"100%",
          fontWeight: 700
          },
      imageBox: {      
          marginBottom: "5px",
      
          }
}));


const ContenedorColecciones = props => {
  const classes = useStyles();
  const [cards, setCards] = useState(props.cards);
  const {handleChangeCard} = props
   
  const getCards = () => {
    return cards
  };

  const updateCards = (cards) => {
    setCards(cards);
  };

  useImperativeHandle(props.innerRef, () => {
     return {
      updateCards:updateCards,
      getCards:getCards
     }
  });

  const moveCard = useCallback(
    (dragIndex, hoverIndex) => {
      const dragCard = cards[dragIndex]
      setCards(
        update(cards, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, dragCard],
          ],
        }),
      )
    },
    [cards],
  )

  const renderCard = (card, index) => {
    return (
        <TarjetaColeccion         
          index={index}
          card={card}
          moveCard={moveCard}
          handleChangeCard={handleChangeCard}
          key={index+"_tr"}
        />
    )
  }

  return ( 
    <>
   <div  className={classes.contenedorTitulo}  >
      <TituloSeccion texto="Agregar recursos"  iconoTema={AddToPhotosTwoToneIcon} />
      </div>
    {cards.length > 0 ?
      <DndProvider backend={HTML5Backend }>     
      <div  style={style}>{cards.map((card, i) => renderCard(card, i))}</div>       
      </DndProvider>
    :
      <>
      <div className={classes.contenedorVacio} >
         <div>
          <Box
            className={classes.imageBox} 
            component="img"    
            sx={{
              width:"70vw",
              height:"auto",
              maxWidth:"600px"
            }}   
            alt="Agrega recursos"
            src={Multimedia}
          />
             <Typography className={classes.text}>
             {"Aquí puedes agregar recursos y textos a tu colección"}
            </Typography>               
          </div>  
        </div>    
      </>
    }
 
    </>
   
    )

}

/**  sx={{
          height: 233,
          width: 350,
          maxHeight: { xs: 233, md: 167 },
          maxWidth: { xs: 350, md: 250 },
        }} */

export default React.forwardRef((props, ref) => <ContenedorColecciones 
  innerRef={ref} {...props}
/>);
