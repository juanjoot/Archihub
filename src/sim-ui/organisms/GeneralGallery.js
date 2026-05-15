import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import * as SearchService from "../../services/SearchService";
import { connect } from "react-redux";
import * as museo from "../../store/ducks/museo.duck";
import Box from "@material-ui/core/Box";
import ImageGallery from "./ImageGallery";
import Lottie from "react-lottie";
import animationData from "../../assets/loading_cev_explora.json";
import Grid from "@material-ui/core/Grid";
import Pagination from '@material-ui/lab/Pagination'
import Search from "@material-ui/icons/Search"
import InputBase from "@material-ui/core/InputBase";
import { useTranslation } from "react-i18next";
import noresultados from "../assets/imgs/noresultados.jpg"
//"../../../assets/imgs/noresultados.jpg";
import Typography from "@material-ui/core/Typography";
///import { compose } from 'recompose'

const useStyles = makeStyles((theme) => ({
  paginationRoot: {
    '& > *': {
      marginRight: "10px",
      display: 'flex',
      justifyContent: 'flex-end',
      [theme.breakpoints.down("sm")]: {
        justifyContent: 'center',
        marginRight: "0px",
      }
    },
    '& button': {
      boxShadow: '0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)'
    }
  },
  root: {
    flexGrow: 2,
    backgroundColor: "white",
  },
  image_suggest: {
    borderRadius: "30%",
  },
  child: {
    paddingLeft: "20px",
    paddingRight: "20px",
  },
  searchContainer: {
		backgroundColor: theme.palette.primary.main,// ,
		paddingLeft: theme.spacing(2),
		paddingRight: theme.spacing(2),
		display: "flex",
		alignItems: "center",
		minWidth: 400,
    maxWidth: 500,
		borderRadius: 50,
		[theme.breakpoints.down("sm")]: {
			width: "100%",
      minWidth: "100%",
		}
	},
	searchInput: {
		width: "100%",
		maxWidth: 500,
		color: "white"
	},
	SearchIcon: {
		marginRight: "2%",
		color: "#ffffff6b"
	},
  contenedorVacio: {
		display: "flex",
		justifyContent: "center",
		flexWrap: "wrap"
	},
  text: {
		color: theme.palette.primary.main,
		textAlign: "center",
		fontSize: "17px",
		width: "100%",
		fontWeight: 700,
		marginTop: theme.spacing(1),
		marginBottom: theme.spacing(1)
	}
 


}));

const GeneralGallery = (props) => {
  const [t, i18n] = useTranslation("common");
  const classes = useStyles();
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [recordSelected, setRecordSelected] = useState();
  const [total, setTotal] = useState(1);
  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState("")
  const size = 20;
  let count = Math.floor(total / size)
  if ((total % size) > 0)
    count = count + 1


    const onSearchSubmit = e => {
      e.preventDefault();      
      setPage(1);
      loadData();
    }
  
    const onChangeSearch = e => {
      setKeyword(e.target.value)
    }


  useEffect(() => {
      loadData();
  }, [
    props.searchKeyword,
    props.pageExplora,
    props.temporalRangeExplora,
    props.dptoExplora,
    page
  ]);

  useEffect(() => {
    if (recordSelected !== undefined)
      getResourceFromRecordSelected();
  }, [
    recordSelected
  ]);

  const getResourceFromRecordSelected = () => {
    SearchService.serviceKeywordMuseo("", 0, { "idents": [recordSelected.identifier] }, 5)
      .then(
        (resourceHits) => {
          const resource = getResource(resourceHits);
          if (props.updateDataGallery)
            props.updateDataGallery(recordSelected, resource);

        },
        (error) => {
          console.log(error)
        }
      )
  }

  const getResource = (resourceHits) => {
    let resource = null;
    try {
      if (resourceHits.hits.length > 0) {
        resource = resourceHits.hits[0]["_source"];
      }
    } catch (e) {
      console.log(e);
    }
    return resource
  }


  const selectionRecord = (record) => {
    setRecordSelected(record);
  };

  const loadData = async () => {
    let filters = {}
    if(keyword!=""){
    
      filters["keyword"]=keyword
    }

    setLoading(true);
    const from = (page - 1) * size;
    
    let res = await SearchService.serviceKeywordMuseo("gallery", from, filters, size);
    let arr_images = [];
    if (res && res.hits && res.hits.length) {
      if (total !== res.total.value)
        setTotal(res.total.value);

      arr_images = res.hits.map((item) => {
        return item._source;
      });
    }
    setRecords(arr_images);
    setLoading(false);
  };


  const render_records = () => {
    return records.map((record, index) => {
      return (
        <Grid item xs={6} md={3} lg={3} className={classes.child}>
          <ImageGallery recordSelected={recordSelected} selectionRecord={selectionRecord} record={record} />
        </Grid>
      );
    });
  };

  return (
    <>
      <>
        {loading ? (
          <div className="loading_viz">
            <Lottie
              height={150}
              width={150}
              options={{
                loop: true,
                autoplay: true,
                animationData: animationData,
                rendererSettings: {
                  preserveAspectRatio: "xMidYMid slice",
                },
              }}
            />
          </div>
        ):<>
        {(records && records.length) ? 
          <div className={classes.root}>           
              <>
              <Box mt={4} mb={8}>           
                <Grid container  spacing={2}>
                      <Grid item xs={12}   sm={12} md={7}>               
                          <form className={classes.searchContainer} onSubmit={onSearchSubmit} >
                            <Search className={classes.SearchIcon} />
                            <InputBase
                              className={classes.searchInput}
                              placeholder={t("crea.narrativeManager.titlePage.findImage")}
                              onChange={onChangeSearch}
                              inputProps={{ maxLength: 140 }}
                              value={keyword}
                            ></InputBase>
                          </form>                         
                      </Grid>
                      <Grid  xs={12}   sm={12} md={5}>                      
                        <div className={classes.paginationRoot}>
                          <Pagination
                              page={page}
                              count={count}
                              color="primary"
                              onChange={(event, value) => { setPage(value); }}
                            />
                        </div>                     
                      </Grid>                                       
                </Grid>               
              </Box>   
                <Grid
                  container
                  direction="row"
                  justifyContent="center"
                  alignItems="flex-start"
                  justify="center"
                  spacing={0}
                >
                  {render_records()}
                </Grid>
              </>             
          </div>
        : <>
        <Box mt={4} mb={4}>           
          <Grid container  spacing={2}>
                <Grid item xs={12}   sm={12} md={7}>               
                    <form className={classes.searchContainer} onSubmit={onSearchSubmit} >
                      <Search className={classes.SearchIcon} />
                      <InputBase
                        className={classes.searchInput}
                        placeholder={t("crea.narrativeManager.titlePage.findImage")}
                        onChange={onChangeSearch}
                        inputProps={{ maxLength: 140 }}
                      ></InputBase>
                    </form>                         
                </Grid>
                                              
          </Grid>               
        </Box>   
        <Box className={classes.contenedorVacio}>
            <Typography className={classes.text}>
              {t("crea.narrativeManager.titlePage.withoutResult")}
            </Typography>
            <Box
             
              component="img"
              sx={{
                height: "40vh",
                width: "auto",
                maxHeight: "300px"
              }}
              alt="No hay resultados"
              src={noresultados}
            />

					</Box>
        </>}
        </>
        }
      </>
    </>
  );
};

const mapStateToProps = (store) => ({
  searchKeyword: store.museo.keyword,
  totalExplora: store.museo.totalExplora,
  pageExplora: store.museo.pageExplora,
  dptoExplora: store.museo.dptoExplora,
  mpioExplora: store.museo.mpioExplora,
  temporalRangeExplora: store.museo.temporalRangeExplora,
});

export default connect(mapStateToProps, museo.actions)(GeneralGallery);
