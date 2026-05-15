import React, { useState, useEffect } from "react";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ItemAudio from "./ItemAudio";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
}));

const ListadoAudios = (props) => {
  const classes = useStyles();

  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (props.pieza)
      for (var i = 0; i < props.audios.length; i++) {
        if (props.audios[i].filename === props.pieza.path) {
          setPlaying(i);
          break;
        }
      }
  }, [props.pieza]);

  useEffect(() => {
    if(props.openFirst){
      setPlaying(0)
    }
}, [props.openFirst])

  return (
    <>
      <Divider />
      <List className={classes.root} disablePadding component="nav">
        {props.place === "conoce" && typeof props.pieza.path !== "undefined" ? (
          <>
            {props.audios
              .filter((record) => record.filename === props.pieza.path)
              .map((r, i) => {
                return (
                  <ItemAudio
                    playing={i}
                    record={r}
                    index={i}
                    key={i}
                    lectura={true}
                    place={props.place}
                    pieza={props.pieza}
                    name={`${props.name}`}
                    lengthRecords={props.audios.length}
                  />
                );
              })}
          </>
        ) : (
          <>
            {props.audios.map((r, i) => {
              return (
                <>
                  <ItemAudio
                    modificacionPieza={props.modificacionPieza}
                    playing={playing}
                    record={r}
                    index={i}
                    setPlaying={setPlaying}
                    key={i}
                    lectura={props.lectura}
                    place={props.place}
                    pieza={props.pieza}
                    name={`${props.name ? props.name : r.title ? r.title : 'Sin nombre'}`}
                    lengthRecords={props.audios.length}
                    fullscreen={props.fullscreen}
                  />
                </>
              );
            })}
          </>
        )}
      </List>
    </>
  );
};

export default ListadoAudios;
