import React, {useEffect,useState} from "react";
import IconButton from '@material-ui/core/IconButton';
import InfoTwoToneIcon from '@material-ui/icons/InfoTwoTone';
import LinkTwoToneIcon from '@material-ui/icons/LinkTwoTone';
import GaleriaTarjeta from "./extraCard/GaleriaTarjeta";
import ItemDocumento from "./extraCard/ItemDocumento";
import ReproductorAudio from "./extraCard/ReproductorAudio";
import PiezaVideoEmbebido from './PiezaVideoEmbebido'
import VizViewer from "../molecules/VizViewer"



const ElementoDocumento = (props) => {
 
  const [records, setRecords] = useState([])

  useEffect(() => {
     
        if("records" in props.pieza)
            setRecords(props.pieza.records)
        else
            setRecords(props.pieza.resource.document.records)

  }, [props.pieza]);



  return (
    <>
    { records.length>0 ? (
        <>
        {props.type === "Galería fotográfica" ? (
            <>
                <GaleriaTarjeta
                    lectura={true}                
                    imagenes={records.filter(d => d.support === props.type)}
                />
            </>
        ) : (
            <>
                {props.type  === "Audio" || props.type  === "Video"  ? (
                    <>
                    <ReproductorAudio
                            record={records[0]}
                            ident={records[0].ident}
                            lectura={true}
                            pieza={props.pieza}
                            autoplaying={false}
                        />
                    </>
                ) : (
                    <> 
                        {props.type === "Embebido" ? (
                            <>          
                                <PiezaVideoEmbebido
                                    value={props.pieza.resource.document.metadata.firstLevel.url}
                                    path={props.pieza.resource.document.metadata.firstLevel.url}
                                    lectura={true}
                                />
                            </>
                        ) : (
                            <>
                                {props.type === "Visualización" &&
                                    records.length > 0 ? (
                                        <>
                                            <VizViewer
                                                record={records.find(
                                                    d => d.support === props.type
                                                )}
                                                metadata={
                                                    records.find(d => d.support === props.type)
                                                        .metadata.firstLevel
                                                }
                                            />
                                        </>
                                    ) : (
                                    <>
                                    {props.type === "Documento" ? (
                                        <>
                                            <ItemDocumento
                                                lectura={true}
                                                record={records[0]}
                                                pieza={props.pieza}
                                                place={"conoce"}
                                            />
                                        </>
                                        ): (
                                            <>
                                                
                                            </>
                                        )}
                                    </>
                                )}
                            </>
                        )}
                    </>
                )}

     
            </>
        )}
     </>):null}
</>
  );
};

export default  ElementoDocumento;
