import { forwardRef } from 'react';
import { makeStyles } from '@material-ui/core/';

import withWidth from '@material-ui/core/withWidth';

import TarjetaResumenAudio from './TarjetaResumenAudio'

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "100%",
    position: 'relative',
    overflow: 'visible',
    marginBottom: theme.spacing(2),
    borderWidth: 0.1, borderColor: theme.palette.primary.main, borderStyle: 'solid',
    borderRadius: '16px',
    '& a': {
      color: theme.palette.secondary.main
    },
    '& a:hover': {
      color: theme.palette.secondary.dark
    }
  },
  selected: {
    maxWidth: "100%",
    position: 'relative',
    overflow: 'visible',
    marginBottom: theme.spacing(2),
    borderWidth: 0.1, borderColor: theme.palette.primary.main, borderStyle: 'solid',
    '& a': {
      color: theme.palette.secondary.main
    },
    '& a:hover': {
      color: theme.palette.secondary.dark
    }
  },
  ident: {
    position: 'absolute',
    top: '-14px',
    background: 'white',
    padding: '5px',
    fontSize: '11px',
    left: '10px',
    color: theme.palette.primary.main
  },

  delete: {
    position: 'absolute',
    top: '5px',
    background: 'white',
    padding: '3px',
    right: '10px',
    color: theme.palette.primary.main
  },
  up: {
    position: 'absolute',
    top: '5px',
    padding: '3px',
    right: '70px',
    color: theme.palette.primary.main
  },

 down: {
    position: 'absolute',
    top: '5px',
    padding: '3px',
     right: '40px',
    color: theme.palette.primary.main
  },

  deleteMobile: {
    position: 'absolute',
    top: '3px',
    background: 'white',
    padding: '2px',
    right: '4px',
    color: theme.palette.primary.main
  },
  upMobile: {
    position: 'absolute',
    top: '-4px',
    padding: '2px',
    right: '27px',
    color: theme.palette.primary.main
    
  },

 downMobile: {
    position: 'absolute',
    top: '10px',
    padding: '2px',
     right: '27px',
    color: theme.palette.primary.main
  },
  flexCard: {
    border: "none",
    boxShadow: "none",
    display: 'flex'
  }
  ,
  header: {   
    paddingBottom: '5px'
  },
  content: {
    padding: '15px'
  }
}));

const ResultadosAudio = props => {
const classes = useStyles()   
  const infoRecords = {ident:"001-VI-00012_48091", filename:"/rep/CaptureModule/202004/5e907432cbe04.wav" , metadata:{firstLevel:{title:"Líder de la Unión Patriótica, exiliada en Suiza", creationDate:"2019-10-23", authors:[ "Comisión para el Esclarecimiento de la Verdad, la Convivencia y la No Repetición - CEV"]}}  }
  const listResult = [];
  for( var i=0; i<10;i++){
    listResult.push(infoRecords)
  }

  return (
 

      <div  className={classes.content}  >
        {listResult.map((result, i) => {
          
            return (<> 
              <TarjetaResumenAudio data={result}/>
               </>)
        })
        }
      </div>


  );
}


export default withWidth()(forwardRef((props, ref) => <ResultadosAudio

  innerRef={ref} {...props}
/>));

