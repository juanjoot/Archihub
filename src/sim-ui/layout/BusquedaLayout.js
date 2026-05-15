import { useState, useEffect } from 'react';
import { connect } from "react-redux";
import * as app from "../../../app/store/ducks/app.duck";

const BusquedaLayout = props => {
    const [tabSelected, setTabSelected] = useState(true)
    const [total, setTotal] = useState(true)
    const [mapaZoom, setMapaZoom] = useState('dep')

    useEffect(()=>{
        if(props.place === 'explora') {
            setTabSelected(props.tabSelected)
        }
    }, [props.tabSelected])

    return(
        <MainLayout>
            <Container>
                <TabsContainer
                    list={
                        [
                            "Documentos",
                            // "Filtros avanzados",
                            "Mapa",
                            "Línea del tiempo",
                            "Nube de entidades",
                            "Frecuencia de etiquetas",
                            // "Gramas",
                            // "Galería"
                        ]
                    }
                    current={tabSelected}
                    // callback={this.updateTabSelected}
                />
                <BarraChips />
            </Container>

            {(searchkeyword !== '' || temporalRangeExplora !== '') && tabSelected === 0 &&
                <Container>
                    <ResultadosBusqueda />
                </Container>
            }

            {searchkeyword === '' && tabSelected === 0 &&
                <Container>
                    <ExploraCounter />
                </Container>
            }

            {tabSelected === 1 &&
                <Container maxWidth='xl'>
                    <MapaFilter />
                </Container>
            }

            {tabSelected === 2 &&
                <Container maxWidth='xl'>
                    <LineaTiempo />
                </Container>
            }

            {tabSelected === 3 &&
                <Container maxWidth='xl'>
                    <WordCloud />
                </Container>
            }

            {tabSelected === 4 &&
                <Container>
                    <Etiquetas />
                </Container>
            }
                    {/* <DualNGram /> */}

            {/* {this.state.tabSelected === 5 &&
                <Container >
                    <GeneralGallery />
                </Container>
            } */}


        </MainLayout>
    )
}

const mapStateToProps = (store) => ({
    searchkeyword: store.museo.keyword,
    
    tabSelected: store.museo.tabSelected,
    totalExplora: store.museo.totalExplora,
    pageExplora: store.museo.pageExplora,
    dptoExplora: store.museo.dptoExplora,
    mpioExplora: store.museo.mpioExplora,
    temporalRangeExplora: store.museo.temporalRangeExplora
});

export default connect(mapStateToProps, museo.actions)(BusquedaLayout)
