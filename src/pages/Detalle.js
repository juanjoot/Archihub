import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import * as ArchihubService from "../services/ArchihubService";
import MainLayout from "../sim-ui/layout/MainLayout";
import { connect } from "react-redux";
import * as museo from "../store/ducks/museo.duck";
// import { useHistory } from "react-router-dom";
import TopFilters from "../sim-ui/organisms/bloqueBusqueda/TopFilters";
import DetailResource from "../sim-ui/organisms/DetailResource";
import BreadCrumb from "../sim-ui/organisms/BreadCrumb";
import { useParams } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  wrapper: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    height: "100%",
    maxHeight: "100%",
    width: "100%",
    overflow: "hidden",
  },
}));

const Detalle = (props) => {
  const [data, setData] = React.useState(null);
  // const history = useHistory();
  const [previusUrl, setPreviusUrl] = React.useState(null);
  const [previusUrlLabel, setPreviusUrlLabel] = React.useState(null);
  const [searchSimple, setSearchSimple] = React.useState(false);
  const [searchIdent, setSearchIdent] = React.useState(false);

  const classes = useStyles();
  const { id } = useParams();


  useEffect(() => {
    loadById();
  }, [id]);

  const loadById = async () => {
    try {
      const response = await ArchihubService.getById(id);
      setData(response);
    } catch (error) {
      console.error("Error fetching resource by ID:", error);
    }
  }

  return (
    <MainLayout newLayout={true}>
      {/* <TopFilters
        place={"Conoce"}
        keyword={null}
        temporalRange=""
        setTemporalRange=""
        dpto=""
        setDpto=""
        setKeyword=""
        filtros={false}
        total=""
      /> */}
      <div className={classes.wrapper}>
        {/* <TopFilters
        place={props.place}
        keyword={props.searchToBack}
        filtros={false}
        chips="hide"
        setKeyword={(keyword) => goToSearch(keyword)}
      /> */}
        {/* <Container>{data && <DetalleRecurso resource={data} />}</Container> */}
        {/* {data &&
          data.metadata &&
          data.metadata.firstLevel &&
          data.metadata.firstLevel.title && (
            <BreadCrumb
              previusUrl={previusUrl}
              previusUrlLabel={previusUrlLabel}
              title={data.metadata.firstLevel.title}
            />
          )} */}
        {data ? (
          <DetailResource
            resource={data}
          />
        ) : (
          ""
        )}
      </div>
    </MainLayout>
  );
};

const mapStateToProps = (store) => ({
  place: store.museo.currentSection,
  searchToBack: store.museo.searchToBack,
});

export default connect(mapStateToProps, museo.actions)(Detalle);
