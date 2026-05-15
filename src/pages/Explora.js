import { Component, useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import * as museo from "../store/ducks/museo.duck";
import * as SearchService from "../services/SearchService";

import MainLayout from "../sim-ui/layout/MainLayout";
import BarraChips from "../sim-ui/organisms/BarraChips";
import TabsContainer from "../sim-ui/organisms/TabsContainer";
import ResultadosBusqueda from "../sim-ui/organisms/ResultadosBusqueda";
import LineaTiempo from "../sim-ui/organisms/LineaTiempo";
import MapaFilter from "../sim-ui/organisms/MapaFilter";
import Tesauro from "../sim-ui/organisms/Tesauro";
import ExploraCounter from "../sim-ui/organisms/ExploraCounter";
import GeneralGallery from "../sim-ui/organisms/GeneralGallery";

import WordCloud from "../sim-ui/vizOrganism/Wordcloud";
import Etiquetas from "../sim-ui/vizOrganism/Etiquetas";
import DualNGram from "../../components/organisms/VizOrganisms/DualNGram";

import Container from "@material-ui/core/Container";

class Explora extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tabSelected: 0,
      total: 0,
      mapaZoom: "dep",
    };

    this.updateTabSelected = this.updateTabSelected.bind(this);
  }

  componentDidMount() {
    this.setState({
      tabSelected: this.props.tabSelected,
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.searchkeyword !== this.props.searchkeyword) {
      // SearchService.serviceKeywordMuseo(this.props.searchkeyword, 0, {})
      //     .then(
      //         (data) => {
      //             this.setState({
      //                 total: data.total.value
      //             })
      //         },
      //         (error) => {
      //             console.log(error)
      //         }
      //     )
    }

    if (prevProps.tabSelected !== this.props.tabSelected) {
      this.setState({
        tabSelected: this.props.tabSelected,
      });
    }
  }

  updateTabSelected(index) {
    this.props.setTabSelected(index);
  }

  render() {
    return (
      <>
        <MainLayout>
          <Container>
            <TabsContainer
              list={[
                "Documentos",
                // "Filtros avanzados",
                "Mapa",
                "Línea del tiempo",
                // "Nube de entidades",
                // "Frecuencia de etiquetas",
                // "Gramas",
                // "Galería"
              ]}
              current={this.props.tabSelected}
              callback={this.updateTabSelected}
            />
            <BarraChips />
          </Container>

          {(this.props.searchkeyword !== "" ||
            this.props.temporalRangeExplora !== "") &&
            this.state.tabSelected === 0 && (
              <Container>
                <ResultadosBusqueda />
              </Container>
            )}

          {this.props.searchkeyword === "" && this.state.tabSelected === 0 && (
            <Container>
              <ExploraCounter />
            </Container>
          )}

          {this.state.tabSelected === 1 && (
            <Container maxWidth="xl">
              <MapaFilter />
            </Container>
          )}

          {this.state.tabSelected === 2 && (
            <Container maxWidth="xl">
              <LineaTiempo />
            </Container>
          )}

          {this.state.tabSelected === 3 && (
            <Container maxWidth="xl">
              <WordCloud />
            </Container>
          )}

          {this.state.tabSelected === 4 && (
            <Container>
              <Etiquetas />
            </Container>
          )}
          {/* <DualNGram /> */}

          {/* {this.state.tabSelected === 5 &&
                        <Container >
                            <GeneralGallery />
                        </Container>
                    } */}
        </MainLayout>
      </>
    );
  }
}

const mapStateToProps = (store) => ({
  searchkeyword: store.museo.keyword,

  tabSelected: store.museo.tabSelected,
  totalExplora: store.museo.totalExplora,
  pageExplora: store.museo.pageExplora,
  dptoExplora: store.museo.dptoExplora,
  mpioExplora: store.museo.mpioExplora,
  temporalRangeExplora: store.museo.temporalRangeExplora,
});

export default connect(mapStateToProps, museo.actions)(Explora);
