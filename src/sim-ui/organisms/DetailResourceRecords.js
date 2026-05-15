import React, { useEffect, useState, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Typography, Chip, CircularProgress, Button } from "@material-ui/core";
import GetAppIcon from "@material-ui/icons/GetApp";
import VisibilityIcon from "@material-ui/icons/Visibility";
import * as ArchihubService from "../../services/ArchihubService";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf";
import { URL_API } from "../../config/const";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

// Configure PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;


const useStyles = makeStyles((theme) => ({
  tabs: {
    color: theme.palette.primary.main,
    height: "0px",
  },
  iconLabelWrapper: {
    flexDirection: "row",
    justifyContent: "left",
    marginBottom: "0px",
    textTransform: "capitalize",
  },
  icon: {
    color: "white",
  },
  labelIcon: {
    width: "auto",
    padding: 0,
  },
  root: {
    marginLeft: "20px",
    marginRight: "20px",
    height: "100%",
  },
  container: {
    height: "100%",
    width: "100%",
    marginTop: "5px",
    position: "relative",
    display: "flex",
    flexDirection: "column"
  },
  document: {},

  containerChip: {
    display: "flex",
    justifyContent: "left",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(0.5),
    },
  },
  chip: {
    backgroundColor: theme.palette.primary.main,
    color: "white",
    "&:hover": {
      backgroundColor: theme.palette.primary.main,
      filter: "alpha(opacity=50)",
      opacity: 0.5,
      cursor: "pointer",
    },
    "&:focus": {
      backgroundColor: theme.palette.primary.main,
      filter: "alpha(opacity=70)",
      opacity: 0.7,
    },
    filter: "alpha(opacity=70)",
    opacity: 0.7,
    margin: theme.spacing(1),
  },
  chipActive: {
    backgroundColor: theme.palette.primary.main,
    color: "white",
    "&:hover": {
      backgroundColor: theme.palette.primary.main,
      filter: "brightness(120%)",
    },
    "&:focus": {
      backgroundColor: theme.palette.primary.main,
    },
    margin: theme.spacing(1),
  },
  screen: {
    // display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white"
  },
  recordBox: {
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: theme.spacing(1),
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  recordName: {
    flex: 1,
    marginRight: theme.spacing(2),
  },
  loadingContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: theme.spacing(4),
  },
  recordsContainer: {
    padding: theme.spacing(2),
  },
  pdfViewerContainer: {
    marginTop: theme.spacing(2),
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: theme.spacing(1),
    padding: theme.spacing(2),
    backgroundColor: "#fff",
    maxHeight: "600px",
    overflowY: "auto",
  },
  pdfCanvas: {
    maxWidth: "100%",
    height: "auto",
    marginBottom: theme.spacing(1),
  },
  buttonGroup: {
    display: "flex",
    gap: theme.spacing(1),
  },


}));

const DetailResourceRecords = (props) => {
  const classes = useStyles();
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [downloading, setDownloading] = useState({});
  const [viewingPdf, setViewingPdf] = useState({});
  const [pdfPages, setPdfPages] = useState({});
  const [viewingImages, setViewingImages] = useState(false);
  const [galleryImages, setGalleryImages] = useState([]);
  const [viewingVideo, setViewingVideo] = useState({});
  const [viewingAudio, setViewingAudio] = useState({});
  const [autoOpenTriggered, setAutoOpenTriggered] = useState(false);
  const canvasRefs = useRef({});

  useEffect(() => {
    const fetchRecords = async () => {
      if (props.records && props.records.length > 0) {
        setLoading(true);
        try {
          const recordPromises = props.records.map(record =>
            ArchihubService.getRecordById(record.id)
          );
          const fetchedRecords = await Promise.all(recordPromises);
          setRecords(fetchedRecords);
        } catch (error) {
          console.error("Error fetching records:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchRecords();
  }, [props.records]);

  // Auto-open first visualizable record when openRecord is true
  useEffect(() => {
    if (props.openRecord && records.length > 0 && !loading && !autoOpenTriggered) {
      const imageRecords = records.filter(isImage);
      if (imageRecords.length > 0) {
        handleVisualizeImages();
        setAutoOpenTriggered(true);
        return;
      }
      
      const firstVisualizable = records.find(record => 
        isPdf(record) || isVideo(record) || isAudio(record)
      );
      if (firstVisualizable) {
        const recordId = firstVisualizable._id.$oid;
        if (isPdf(firstVisualizable)) {
          handleVisualizePdf(recordId);
        } else if (isVideo(firstVisualizable)) {
          handleVisualizeVideo(recordId);
        } else if (isAudio(firstVisualizable)) {
          handleVisualizeAudio(recordId);
        }
        setAutoOpenTriggered(true);
      }
    }
  }, [props.openRecord, records, loading, autoOpenTriggered]);

  const handleDownload = (recordId) => {
    setDownloading(prev => ({ ...prev, [recordId]: true }));
    ArchihubService.downloadRecord(recordId, (progress) => { })
      .finally(() => {
        setDownloading(prev => ({ ...prev, [recordId]: false }));
      });
  };

  const isPdf = (record) => {
    const name = record.name || record.title || '';
    return name.toLowerCase().endsWith('.pdf');
  };

  const isImage = (record) => {
    const name = record.name || record.title || '';
    const lowerName = name.toLowerCase();
    return lowerName.endsWith('.jpg') || lowerName.endsWith('.jpeg') || lowerName.endsWith('.png');
  };

  const isVideo = (record) => {
    const name = record.name || record.title || '';
    const lowerName = name.toLowerCase();
    return lowerName.endsWith('.mp4') || lowerName.endsWith('.webm') || 
           lowerName.endsWith('.ogg') || lowerName.endsWith('.mov') ||
           lowerName.endsWith('.avi') || lowerName.endsWith('.mkv');
  };

  const isAudio = (record) => {
    const name = record.name || record.title || '';
    const lowerName = name.toLowerCase();
    return lowerName.endsWith('.mp3') || lowerName.endsWith('.wav') || 
           lowerName.endsWith('.ogg') || lowerName.endsWith('.m4a') ||
           lowerName.endsWith('.aac') || lowerName.endsWith('.flac');
  };

  const handleVisualizeImages = async () => {
    setViewingImages(true);
    const imageRecords = records.filter(isImage);
    
    const imagePromises = imageRecords.map(async (record) => {
      return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', URL_API + "/records/public/download", true);
        xhr.responseType = 'blob';
        xhr.setRequestHeader('Content-Type', 'application/json');

        xhr.addEventListener('load', async () => {
          if (xhr.status === 200) {
            const blob = xhr.response;
            const url = window.URL.createObjectURL(blob);
            resolve({
              original: url,
              thumbnail: url,
              description: record.name || record.title || 'Imagen'
            });
          } else {
            reject(new Error('Failed to load image'));
          }
        });

        xhr.addEventListener('error', () => {
          reject(new Error('Failed to load image'));
        });

        xhr.send(JSON.stringify({
          id: record._id.$oid,
          type: 'original'
        }));
      });
    });

    try {
      const images = await Promise.all(imagePromises);
      setGalleryImages(images);
    } catch (error) {
      console.error("Error loading images:", error);
      setGalleryImages([]);
    }
  };

  const handleCloseImages = () => {
    // Clean up blob URLs
    galleryImages.forEach(img => {
      if (img.original) {
        window.URL.revokeObjectURL(img.original);
      }
    });
    setViewingImages(false);
    setGalleryImages([]);
  };

  const handleVisualizeVideo = async (recordId) => {
    setViewingVideo(prev => ({ ...prev, [recordId]: 'loading' }));

    try {
      const xhr = new XMLHttpRequest();
      xhr.open('POST', URL_API + "/records/public/download", true);
      xhr.responseType = 'blob';
      xhr.setRequestHeader('Content-Type', 'application/json');

      xhr.addEventListener('load', async () => {
        if (xhr.status === 200) {
          const blob = xhr.response;
          const url = window.URL.createObjectURL(blob);
          setViewingVideo(prev => ({ ...prev, [recordId]: url }));
        } else {
          setViewingVideo(prev => ({ ...prev, [recordId]: 'error' }));
        }
      });

      xhr.addEventListener('error', () => {
        setViewingVideo(prev => ({ ...prev, [recordId]: 'error' }));
      });

      xhr.send(JSON.stringify({
        id: recordId,
        type: 'original'
      }));
    } catch (error) {
      console.error("Error visualizing video:", error);
      setViewingVideo(prev => ({ ...prev, [recordId]: 'error' }));
    }
  };

  const handleCloseVideo = (recordId) => {
    const url = viewingVideo[recordId];
    if (url && url !== 'loading' && url !== 'error') {
      window.URL.revokeObjectURL(url);
    }
    setViewingVideo(prev => {
      const newVideos = { ...prev };
      delete newVideos[recordId];
      return newVideos;
    });
  };

  const handleVisualizeAudio = async (recordId) => {
    setViewingAudio(prev => ({ ...prev, [recordId]: 'loading' }));

    try {
      const xhr = new XMLHttpRequest();
      xhr.open('POST', URL_API + "/records/public/download", true);
      xhr.responseType = 'blob';
      xhr.setRequestHeader('Content-Type', 'application/json');

      xhr.addEventListener('load', async () => {
        if (xhr.status === 200) {
          const blob = xhr.response;
          const url = window.URL.createObjectURL(blob);
          setViewingAudio(prev => ({ ...prev, [recordId]: url }));
        } else {
          setViewingAudio(prev => ({ ...prev, [recordId]: 'error' }));
        }
      });

      xhr.addEventListener('error', () => {
        setViewingAudio(prev => ({ ...prev, [recordId]: 'error' }));
      });

      xhr.send(JSON.stringify({
        id: recordId,
        type: 'original'
      }));
    } catch (error) {
      console.error("Error visualizing audio:", error);
      setViewingAudio(prev => ({ ...prev, [recordId]: 'error' }));
    }
  };

  const handleCloseAudio = (recordId) => {
    const url = viewingAudio[recordId];
    if (url && url !== 'loading' && url !== 'error') {
      window.URL.revokeObjectURL(url);
    }
    setViewingAudio(prev => {
      const newAudios = { ...prev };
      delete newAudios[recordId];
      return newAudios;
    });
  };

  const handleVisualizePdf = async (recordId) => {
    setViewingPdf(prev => ({ ...prev, [recordId]: 'loading' }));
    
    try {
      // Download PDF as blob
      const xhr = new XMLHttpRequest();
      xhr.open('POST', URL_API + "/records/public/download", true);
      xhr.responseType = 'blob';
      xhr.setRequestHeader('Content-Type', 'application/json');

      xhr.addEventListener('load', async () => {
        if (xhr.status === 200) {
          const blob = xhr.response;
          const url = window.URL.createObjectURL(blob);
          
          try {
            // Load PDF
            const loadingTask = pdfjsLib.getDocument(url);
            const pdf = await loadingTask.promise;
            
            // Store all pages
            const pages = [];
            for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
              pages.push(pageNum);
            }
            
            setPdfPages(prev => ({ ...prev, [recordId]: { pdf, totalPages: pdf.numPages } }));
            setViewingPdf(prev => ({ ...prev, [recordId]: 'loaded' }));
            
            // Render first page
            setTimeout(() => renderPage(recordId, 1), 100);
          } catch (error) {
            console.error("Error loading PDF:", error);
            setViewingPdf(prev => ({ ...prev, [recordId]: 'error' }));
          }
        } else {
          setViewingPdf(prev => ({ ...prev, [recordId]: 'error' }));
        }
      });

      xhr.addEventListener('error', () => {
        setViewingPdf(prev => ({ ...prev, [recordId]: 'error' }));
      });

      xhr.send(JSON.stringify({
        id: recordId,
        type: 'original'
      }));
    } catch (error) {
      console.error("Error visualizing PDF:", error);
      setViewingPdf(prev => ({ ...prev, [recordId]: 'error' }));
    }
  };

  const renderPage = async (recordId, pageNum) => {
    const pdfData = pdfPages[recordId];
    if (!pdfData || !pdfData.pdf) return;

    try {
      const page = await pdfData.pdf.getPage(pageNum);
      const canvas = canvasRefs.current[`${recordId}-${pageNum}`];
      
      if (!canvas) return;

      const viewport = page.getViewport({ scale: 1.5 });
      const context = canvas.getContext('2d');
      canvas.height = viewport.height;
      canvas.width = viewport.width;

      const renderContext = {
        canvasContext: context,
        viewport: viewport
      };

      await page.render(renderContext).promise;
    } catch (error) {
      console.error("Error rendering page:", error);
    }
  };

  // Render all pages when pdfPages changes
  useEffect(() => {
    Object.keys(pdfPages).forEach(recordId => {
      const pdfData = pdfPages[recordId];
      if (pdfData && pdfData.totalPages) {
        for (let i = 1; i <= pdfData.totalPages; i++) {
          renderPage(recordId, i);
        }
      }
    });
  }, [pdfPages]);

  const handleClosePdf = (recordId) => {
    setViewingPdf(prev => ({ ...prev, [recordId]: null }));
    setPdfPages(prev => {
      const newPages = { ...prev };
      delete newPages[recordId];
      return newPages;
    });
  };

  if (loading) {
    return (
      <div className={classes.loadingContainer}>
        <CircularProgress />
      </div>
    );
  }

  if (!records || records.length === 0) {
    return (
      <div className={classes.recordsContainer}>
        <Typography variant="body1" color="textSecondary">
          No hay registros disponibles
        </Typography>
      </div>
    );
  }

  return (
    <div className={classes.recordsContainer}>
      {/* Image Gallery Section - Show all images grouped */}
      {records.filter(isImage).length > 0 && (
        <Box className={classes.recordBox}>
          <Typography variant="p" className={classes.recordName}>
            Imágenes ({records.filter(isImage).length})
          </Typography>
          <div className={classes.buttonGroup}>
            <Chip
              label={viewingImages ? "Cerrar Galería" : "Ver Galería"}
              icon={<VisibilityIcon style={{ color: 'white' }} />}
              onClick={() => {
                if (viewingImages) {
                  handleCloseImages();
                } else {
                  handleVisualizeImages();
                }
              }}
              className={classes.chipActive}
            />
          </div>
        </Box>
      )}

      {viewingImages && galleryImages.length > 0 && (
        <Box className={classes.pdfViewerContainer}>
          <Typography variant="h6" gutterBottom>
            Galería de Imágenes ({galleryImages.length})
          </Typography>
          <ImageGallery 
            items={galleryImages}
            showPlayButton={false}
            showFullscreenButton={true}
            showThumbnails={true}
          />
        </Box>
      )}

      {/* Other records (non-images) */}
      {records.filter(record => !isImage(record)).map((record) => (
        <React.Fragment key={record.id}>
          <Box className={classes.recordBox}>
            <Typography variant="p" className={classes.recordName}>
              {record.name || record.title || `Record ${record.id}`}
            </Typography>
            <div className={classes.buttonGroup}>
              {isPdf(record) && (
                <Chip
                  label={
                    viewingPdf[record._id.$oid] === 'loading' 
                      ? "Cargando..." 
                      : viewingPdf[record._id.$oid] === 'loaded'
                      ? "Cerrar PDF"
                      : "Visualizar"
                  }
                  icon={
                    viewingPdf[record._id.$oid] === 'loading' 
                      ? <CircularProgress size={20} style={{ color: 'white' }} />
                      : <VisibilityIcon style={{ color: 'white' }} />
                  }
                  onClick={() => {
                    if (viewingPdf[record._id.$oid] === 'loaded') {
                      handleClosePdf(record._id.$oid);
                    } else {
                      handleVisualizePdf(record._id.$oid);
                    }
                  }}
                  className={classes.chipActive}
                  disabled={viewingPdf[record._id.$oid] === 'loading'}
                />
              )}
              {isVideo(record) && (
                <Chip
                  label={
                    viewingVideo[record._id.$oid] === 'loading' 
                      ? "Cargando..." 
                      : viewingVideo[record._id.$oid] && viewingVideo[record._id.$oid] !== 'error'
                      ? "Cerrar Video"
                      : "Visualizar"
                  }
                  icon={
                    viewingVideo[record._id.$oid] === 'loading' 
                      ? <CircularProgress size={20} style={{ color: 'white' }} />
                      : <VisibilityIcon style={{ color: 'white' }} />
                  }
                  onClick={() => {
                    if (viewingVideo[record._id.$oid] && viewingVideo[record._id.$oid] !== 'error' && viewingVideo[record._id.$oid] !== 'loading') {
                      handleCloseVideo(record._id.$oid);
                    } else {
                      handleVisualizeVideo(record._id.$oid);
                    }
                  }}
                  className={classes.chipActive}
                  disabled={viewingVideo[record._id.$oid] === 'loading'}
                />
              )}
              {isAudio(record) && (
                <Chip
                  label={
                    viewingAudio[record._id.$oid] === 'loading' 
                      ? "Cargando..." 
                      : viewingAudio[record._id.$oid] && viewingAudio[record._id.$oid] !== 'error'
                      ? "Cerrar Audio"
                      : "Visualizar"
                  }
                  icon={
                    viewingAudio[record._id.$oid] === 'loading' 
                      ? <CircularProgress size={20} style={{ color: 'white' }} />
                      : <VisibilityIcon style={{ color: 'white' }} />
                  }
                  onClick={() => {
                    if (viewingAudio[record._id.$oid] && viewingAudio[record._id.$oid] !== 'error' && viewingAudio[record._id.$oid] !== 'loading') {
                      handleCloseAudio(record._id.$oid);
                    } else {
                      handleVisualizeAudio(record._id.$oid);
                    }
                  }}
                  className={classes.chipActive}
                  disabled={viewingAudio[record._id.$oid] === 'loading'}
                />
              )}
              <Chip
                label={downloading[record.id] ? "Descargando..." : "Descargar"}
                icon={downloading[record.id] ? <CircularProgress size={20} style={{ color: 'white' }} /> : <GetAppIcon style={{ color: 'white' }} />}
                onClick={() => handleDownload(record._id.$oid)}
                className={classes.chipActive}
                disabled={downloading[record.id]}
              />
            </div>
          </Box>
          
          {viewingVideo[record._id.$oid] && viewingVideo[record._id.$oid] !== 'loading' && viewingVideo[record._id.$oid] !== 'error' && (
            <Box className={classes.pdfViewerContainer}>
              <Typography variant="h6" gutterBottom>
                Visualización del Video
              </Typography>
              <video 
                controls 
                style={{ maxWidth: '100%', height: 'auto', display: 'block' }}
                src={viewingVideo[record._id.$oid]}
              >
                Tu navegador no soporta la reproducción de videos.
              </video>
            </Box>
          )}

          {viewingVideo[record._id.$oid] === 'error' && (
            <Box className={classes.pdfViewerContainer}>
              <Typography variant="body1" color="error">
                Error al cargar el video. Por favor, intente de nuevo.
              </Typography>
            </Box>
          )}

          {viewingAudio[record._id.$oid] && viewingAudio[record._id.$oid] !== 'loading' && viewingAudio[record._id.$oid] !== 'error' && (
            <Box className={classes.pdfViewerContainer}>
              <Typography variant="h6" gutterBottom>
                Visualización del Audio
              </Typography>
              <audio 
                controls 
                style={{ width: '100%', display: 'block' }}
                src={viewingAudio[record._id.$oid]}
              >
                Tu navegador no soporta la reproducción de audio.
              </audio>
            </Box>
          )}

          {viewingAudio[record._id.$oid] === 'error' && (
            <Box className={classes.pdfViewerContainer}>
              <Typography variant="body1" color="error">
                Error al cargar el audio. Por favor, intente de nuevo.
              </Typography>
            </Box>
          )}
          
          {viewingPdf[record._id.$oid] === 'loaded' && pdfPages[record._id.$oid] && (
            <Box className={classes.pdfViewerContainer}>
              <Typography variant="h6" gutterBottom>
                Visualización del PDF ({pdfPages[record._id.$oid].totalPages} página{pdfPages[record._id.$oid].totalPages > 1 ? 's' : ''})
              </Typography>
              {Array.from({ length: pdfPages[record._id.$oid].totalPages }, (_, i) => i + 1).map(pageNum => (
                <div key={pageNum} style={{ marginBottom: '16px' }}>
                  <Typography variant="caption" display="block" gutterBottom>
                    Página {pageNum}
                  </Typography>
                  <canvas
                    ref={el => canvasRefs.current[`${record._id.$oid}-${pageNum}`] = el}
                    className={classes.pdfCanvas}
                  />
                </div>
              ))}
            </Box>
          )}
          
          {viewingPdf[record._id.$oid] === 'error' && (
            <Box className={classes.pdfViewerContainer}>
              <Typography variant="body1" color="error">
                Error al cargar el PDF. Por favor, intente de nuevo.
              </Typography>
            </Box>
          )}
        </React.Fragment>
      ))}
    </div>
  )
};

export default DetailResourceRecords;
