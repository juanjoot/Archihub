import { useEffect } from "react";
import * as React from "react";
import { connect } from "react-redux";
import * as museo from "../store/ducks/museo.duck";
import VistaColeccionClikclok from "../sim-ui/organisms/VistaColeccionClikclok";
import * as CollectionService from "../../src/services/CollectionService";
import MainLayout from "../sim-ui/layout/MainLayout";
import Cargador from "../Cargador";
import {
  useParams
} from "react-router-dom";
import * as Scroll from 'react-scroll';
import Ligera from "../sim-ui/organisms/vistasColecciones/Ligera";

const scroll = Scroll.animateScroll;

const Coleccion = (props) => {
  const [coleccion, setColeccion] = React.useState(null);
  const [loader, setLoader] = React.useState(false);
  const { id } = useParams()

  useEffect(() => {
    setLoader(false);

    // const fetchData = async () => {

    //   await import('../data/' + id).then(r => {
    //     setColeccion(r.default[0]["_source"])
    //     setLoader(true);
    //     scroll.scrollToTop();
    //   })

    // }
    // fetchData()
    CollectionService.getCollectionBySlugDB(id).then(
      (d) => {
        setColeccion(d);
        setLoader(true);
      },
      (error) => {
        console.log(error);
      }
    );


  }, [id]);

  return (
    <MainLayout>

      {!loader && (
        <>
          <Cargador />
        </>
      )}
      {loader && coleccion !== null && coleccion.template === undefined && (
        <VistaColeccionClikclok coleccion={coleccion} />
      )}

      {loader && coleccion !== null && coleccion.template === 'light' && (
        <Ligera coleccion={coleccion} />
      )}
    </MainLayout>
  );
};

const mapStateToProps = (store) => ({});

export default connect(mapStateToProps, museo.actions)(Coleccion);
