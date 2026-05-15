import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Lottie from 'react-lottie';
import animationData from './assets/loading_cev.json';


const useStyles = makeStyles((theme) => ({
  loadingViz: {
    width: "100%",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
}));

const Cargador = () => {

  const classes = useStyles();
  return (
    <>
      <div className={classes.loadingViz}>
        <Lottie height={150} width={150} options={
          {
            loop: true,
            autoplay: true,
            title: 'Cargando...',
            animationData: animationData,
            rendererSettings: {
              preserveAspectRatio: 'xMidYMid slice'
            }
          }
        } />
      </div>
    </>
  )
  
}

export default Cargador;