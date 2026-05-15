import { useEffect, useState } from "react";

import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Chip from "@material-ui/core/Chip";
import Box from "@material-ui/core/Box";
import { useTheme } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/core";

import Subtitle from "../../../atoms/Subtitle";

import * as SearchService from "../../../../services/ArchihubService"


const useStyles = makeStyles((theme) => ({
  btnFiltrosSel: {
    backgroundColor: 'rgba(255,255,255,.7)',
    margin: 2,
    color: "#6E3092",
    '& .num': {
      color: '#fff !important',
    },
    '&:focus': {
      backgroundColor: 'rgba(255,255,255,.7)',
    },
  },
  btnFiltros: {
    margin: 2,
    backgroundColor: 'rgba(255,255,255,.2)',
    color: 'white',
    '& .num': {
      marginLeft: 5,
      fontSize: 11,
      color: '#6883a5',
      padding: '1px 10px',
      borderRadius: '4px',
      position: 'relative',
      top: -2,
      borderBottom: '1px dashed #6883a5',
      fontWeight: 600,
    },
    '& svg': {
      width: 20
    },
    '&:focus': {
      backgroundColor: 'rgba(255,255,255,.2)',
    },
    '&:hover': {
      backgroundColor: 'rgba(255,255,255,.3)',
    },
  },
}));

const TipoRecurso = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const [filtres, setFiltres] = useState([]);
  const [subFiltres, setSubFiltres] = useState([]);

  useEffect(() => {
    busqueda({});
  }, []);

  const busqueda = (f) => {
    let filters = {
      post_type: ['fondo'],
      data_transformation: 'archihub_mined',
      activeColumns: [
        {
          destiny: 'metadata.firstLevel.title'
        }
      ],
      ...f
    }

    SearchService.search(filters).then((data) => {
      setFiltres(data.resources);
    }).catch(e => {
    })
  };

  const busquedaSub = (f) => {
    let filters = {
      post_type: ['serie'],
      data_transformation: 'archihub_mined',
      activeColumns: [
        {
          destiny: 'metadata.firstLevel.title'
        }
      ],
      ...f
    }

    SearchService.search(filters).then((data) => {
      setSubFiltres(data.resources);
    }).catch(e => {
    })
  }

  const handleFiltroClick = (item, isSub = false) => {
    if (props.padre && props.padre.id === item.id) {
      props.setPadre(null);
    } else {
      props.setPadre(item);
    }

    if (!isSub) {
      busquedaSub({
        'parents.id': item.id
      });
    }
  };

  return (
    <Accordion expanded={true}
      style={{ backgroundColor: '#b874e0', boxShadow: 'none', border: 'none', marginBottom: '10px', borderRadius: '8px', color: 'white !important' }}
    >
      <AccordionSummary>
        <Subtitle color="white">Filtrar por fondo</Subtitle>
      </AccordionSummary>
      <AccordionDetails>
        <Box>
          <>
            {filtres.map((item, index) => (
              <Chip
                key={index}
                label={item.metadata?.firstLevel?.title}
                className={props.padre && props.padre.id === item.id ? classes.btnFiltrosSel : classes.btnFiltros}
                onClick={() => handleFiltroClick(item)}
              />
            ))}

            {subFiltres.map((item, index) => (
              <Chip
                key={index}
                label={item.metadata?.firstLevel?.title}
                className={props.padre && props.padre.id === item.id ? classes.btnFiltrosSel : classes.btnFiltros}
                onClick={() => handleFiltroClick(item, true)}
              />
            ))}
          </>
        </Box>
      </AccordionDetails>
    </Accordion>
  );
};

export default TipoRecurso;
