import { useState, useLayoutEffect, useRef } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import * as RecordsService from "../../../services/RecordsService";
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import DownloadForOfflineTwoToneIcon from '@mui/icons-material/DownloadForOfflineTwoTone';
import FullscreenTwoToneIcon from '@material-ui/icons/FullscreenTwoTone';
import { BackgroundSyncPlugin } from 'workbox-background-sync';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const useStyles = makeStyles((theme) => ({
  root: {
    '& canvas': {
      margin: '0 auto',
      width: 'auto !important',
      maxWidth: '100% !important',
      height: 'auto !important',
      maxHeight: '500px !important',
    },
  },
  rootFullScreen: {
    userSelect: "none !important",
    '& canvas': {
      margin: '0 auto',
      width: 'auto !important',
      maxHeight: '90vh !important',
      height: 'auto !important',
      maxWidth: '100% !important'
    }

  },
  toolbar: {
    justifyContent: 'center',
    backgroundColor: "white",
    minHeight: '20px',
    marginBottom: '5px',

    '&.dark': {
      backgroundColor: 'transparent'
    }
  },
  icon: {
    '&.dark path': {
      fill: 'white'
    }
  }

}))


const LectorPDF = props => {
  const classes = useStyles()
  const targetRef = useRef()
  const componentRef = useRef()
  const [numPages, setNumPages] = useState(null)
  const [pageNumber, setPageNumber] = useState(1)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const [fullScreenLocal, setFullScreenLocal] = useState(null)

  useLayoutEffect(() => {
    if (targetRef.current) {
      console.log(window.innerHeight, window.innerWidth)
      setDimensions({
        width: targetRef.current.offsetWidth,
        height: targetRef.current.offsetHeight
      });
    }

    if (document.addEventListener) {
      document.addEventListener('webkitfullscreenchange', exitHandler, false);
      document.addEventListener('mozfullscreenchange', exitHandler, false);
      document.addEventListener('fullscreenchange', exitHandler, false);
      document.addEventListener('MSFullscreenChange', exitHandler, false);
    }

    return (() => {
      document.removeEventListener('webkitfullscreenchange', exitHandler);
      document.removeEventListener('mozfullscreenchange', exitHandler);
      document.removeEventListener('fullscreenchange', exitHandler);
      document.removeEventListener('MSFullscreenChange', exitHandler);
    })
  }, []);

  const exitHandler = () => {
    if (!document.fullscreenElement && !document.webkitIsFullScreen && !document.mozFullScreen && !document.msFullscreenElement) {
      setFullScreenLocal(false)
    }
  }

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  }

  const avanzarPagina = () => {
    if (pageNumber < numPages) setPageNumber(pageNumber + 1)
  }

  const retrocederPagina = () => {
    if (pageNumber > 1) setPageNumber(pageNumber - 1)
  }

  const toggleFullScreen = (el) => {
    if (
      document.fullscreenElement ||
      document.webkitFullscreenElement ||
      document.webkitIsFullscreen ||
      document.msFullscreenElement ||
      document.mozFullScreen
    ) {
      exitFullScreen(document);
      setFullScreenLocal(false)
    } else {
      openFullScreen(el);
      setFullScreenLocal(true)
    }

  }

  const openFullScreen = (el) => {
    if (el.requestFullscreen) {
      el.requestFullscreen();
    } else if (el.msRequestFullscreen) {
      el.msRequestFullscreen();
    } else if (el.mozRequestFullScreen) {
      el.mozRequestFullScreen();
    } else if (el.webkitRequestFullscreen) {
      el.webkitRequestFullscreen();
    }
  }

  const exitFullScreen = (el) => {
    if (el.exitFullscreen) {
      el.exitFullscreen();
    } else if (el.msExitFullscreen) {
      el.msExitFullscreen()
    } else if (el.mozRequestFullScreen) {
      el.mozRequestFullScreen();
    } else if (el.webkitExitFullscreen) {
      el.webkitExitFullscreen();
    }
  }

  const removeTextLayerOffset = () => {
    const textLayers = document.querySelectorAll(".react-pdf__Page__textContent");
    textLayers.forEach(layer => {
      const { style } = layer;
      style.top = "0";
      style.left = "0";
      style.height = "0";
      style.transform = "";
      style.userSelect = "none";
    });
  }

  return (
    <div ref={componentRef} >
      {props.archivo &&
        <>

          <Toolbar
            ref={targetRef}
            className={`${classes.toolbar} ${props.place === 'conoce' ? 'dark' : ''}`}
          >
            <IconButton
              onClick={retrocederPagina}
              className={`${classes.icon} ${props.place === 'conoce' ? 'dark' : ''}`}
            >
              <NavigateBeforeIcon />
            </IconButton>
            <IconButton
              onClick={() => window.open(props.archivo, '_blank', 'noopener,noreferrer')}
              className={`${classes.icon} ${props.place === 'conoce' ? 'dark' : ''}`}
            >
              <DownloadForOfflineTwoToneIcon />
            </IconButton>
            <IconButton
              onClick={() => toggleFullScreen(componentRef.current)}
              className={`${classes.icon} ${props.place === 'conoce' ? 'dark' : ''}`}
            >
              <FullscreenTwoToneIcon />
            </IconButton>
            <IconButton
              onClick={avanzarPagina}
              className={`${classes.icon} ${props.place === 'conoce' ? 'dark' : ''}`}
            >
              <NavigateNextIcon />
            </IconButton>
          </Toolbar>
          <Document
            file={props.archivo}
            onLoadSuccess={onDocumentLoadSuccess}
            className={fullScreenLocal ? classes.rootFullScreen : classes.root}
          >
            <Page height={dimensions.width * 2} pageNumber={pageNumber} onLoadSuccess={removeTextLayerOffset} />
          </Document>

        </>
      }

    </div>
  );
}

export default LectorPDF