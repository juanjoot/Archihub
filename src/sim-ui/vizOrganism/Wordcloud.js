import { Component } from 'react';
import Wordcloud from '../viz/Wordcloud'
import { connect } from "react-redux";
import * as app from "../../store/ducks/app.duck";
import * as VizService from "../../../services/VizService";
import PropTypes from 'prop-types';
import * as d3 from 'd3'
import Lottie from 'react-lottie';
import animationData from '../../assets/loading_cev_explora.json'
import BarraKeywords from '../organisms/BarraKeywords'
import { Container } from "@material-ui/core";
import withWidth, { isWidthDown } from '@material-ui/core/withWidth';
import Chip from '@material-ui/core/Chip'
import Box from '@material-ui/core/Box'
import { makeStyles } from "@material-ui/core";


/**
 * Bloque que muestra dos nubes de palabras. Una apunta a **api/search/labelledcloud** y la otra a **api/search/tagcloud** con el parámetro _tipoTagCloud_ =_conflictActors_.
 * @version 0.1
 */
class WordCloudBar extends Component {
    static propTypes = {
        /** URL string location */
        location: PropTypes.object,
        /** Total de hits para la búsqueda realizada */
        total: PropTypes.number,
        /** Bookmarks */
        bookmarks: PropTypes.array
    }

    constructor(props) {
        super(props)
        this.state = {
            tagcloud1: [],
            tagcloud: [],
            total: 0,
            grupoSelected: null,
            selected: [''],
            loading: true
        };

        this.grupos = []
        this.changeSelected = this.changeSelected.bind(this)
    }

    componentDidMount() {
        this.color = d3.scaleOrdinal(d3.schemeTableau10)
        if (this.props.location) {
            let query = new URLSearchParams(this.props.location.search);

            if (query.toString() !== '') {
                this.updateSearchTagClouds(this.props.searchFilters);
            }
        } else if (this.props.bookmarks) {
            this.updateBookmarksTagClouds()
        } else {
            this.updateDataFiltered()
        }

    }

    updateDataFiltered() {
        let params = {
            origin: "ModuloCaptura"
        }

        if (this.props.filtros !== undefined) {
            if (this.props.filtros[0].filtros.length > 0) params.ngramFilter = this.props.filtros[0].filtros
            if (this.props.filtros[1].filtros.length > 0) params.etiquetasFilter = this.props.filtros[1].filtros
            if (this.props.filtros[2].filtros.length > 0) params.entidadesFilter = this.props.filtros[2].filtros
        }

        this.updateSearchTagClouds(params)
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.location) {
            let oldQuery = new URLSearchParams(prevProps.location.search).toString();
            let query = new URLSearchParams(this.props.location.search);

            if (query.toString() !== '') {
                if (query.toString() !== oldQuery.toString()) {
                    this.updateSearchTagClouds(this.props.searchFilters);
                }
            }
        } else if (this.props.bookmarks && !this.state.tagcloud) {
            this.updateBookmarksTagClouds()
        }

        if (prevState.selected[0] !== this.state.selected['0']) this.updateSearchTagClouds(this.props.searchFilters)
    }

    /**
     * Servicio para actualizar el estado cuando es una búsqueda
     * 
     * @param {string} search 
     * @param {string} resourceGroup 
     */
    updateSearchTagClouds(filters) {
        VizService.tagCloud(filters, true, this.state.selected)
            .then(
                (data) => {
                    var resp = false
                    if (data.hits) {
                        resp = {
                            total: data.hits.total.value,
                            buckets: data.aggregations.tipo.cloud.total.buckets
                        }
                    }

                    let newArray = []
                    resp.buckets.map(m => {
                        if (m.key.split('|').length > 1) {
                            const grupo = this.grupos.find(d => d === m.key.split('|')[0])
                            if (!grupo) this.grupos.push(m.key.split('|')[0])

                            if (this.state.selected.length > 0) {
                                const grupo = this.state.selected.find(d => d === m.key.split('|')[0])
                                if (grupo) newArray.push(m)
                                else if (this.state.selected[0] === '') newArray.push(m)
                            } else {
                                newArray.push(m)
                            }
                        }
                        return ''
                    })

                    resp.buckets = newArray

                    this.setState({
                        tagcloud: resp,
                        loading: false
                    })

                },
                (error) => {
                    console.log(error)
                    //this.props.history.push("/logout");
                }
            )



    }

    /**
     * Servicio para actualizar el estado cuando son bookmarks
     */
    updateBookmarksTagClouds() {
        let idArray = []
        this.props.bookmarks.map(p => {
            idArray.push(p.path)
            return ''
        })

        let json = {
            idArray: idArray,
            type: true
        }

        VizService.tagCloud(json)
            .then(
                (data) => {
                    let resp = {}
                    if (data.hits) {
                        resp = {
                            total: data.hits.total.value,
                            buckets: data.aggregations.tipo.cloud.total.buckets
                        }
                    }
                    this.setState({
                        tagcloud: resp,
                        loading: false
                    })
                },
                (error) => {

                }
            )
    }

    changeSelected(elem) {
        if (this.state.selected[0] !== elem) {
            this.setState({
                selected: [elem]
            })
        } else {
            this.setState({
                selected: ['']
            })
        }
    }

    render() {
        let blockWidth = null
        switch (this.props.width) {
            case 'xs':
                blockWidth = 400
                break
            case 'sm':
                blockWidth = 700
                break
            case 'md':
                blockWidth = 1000
                break
            default:
                blockWidth = 1000
        }
        return (
            <>
                {this.state.loading &&
                    <div className="loading_viz">
                        <Lottie height={150} width={150} options={
                            {
                                loop: true,
                                autoplay: true,
                                animationData: animationData,
                                rendererSettings: {
                                    preserveAspectRatio: 'xMidYMid slice'
                                }
                            }
                        } />
                    </div>
                }

                {((this.state.tagcloud1.total > 0 || this.state.tagcloud.total > 0) && this.state.tagcloud.buckets.length > 0) &&
                    <Container>
                        {this.state.tagcloud.total > 0 && !this.state.total && this.state.tagcloud.buckets.length > 0 &&
                            <Wordcloud
                                width={blockWidth}
                                color={this.color}
                                callBack={this.props.changeFilter}
                                height={600}
                                info="de los resultados tienen asignados algunas de las siguientes entidades"
                                descripcion="La identificación de entidades recupera la información que responde a las preguntas ¿quién/es?, ¿dónde? y ¿cuándo? de las entrevistas transcritas. Esta nube de entidades visualiza las más usados en los resultados."
                                list={this.state.tagcloud}
                            />
                        }

                        <Box className="groups" mt={4} mb={8}>
                            {this.grupos.map((n, i) => {
                                let style = {
                                    backgroundColor: this.color(n),
                                    color: 'white',
                                    margin: '0.5em',
                                    marginBottom: 0
                                }

                                return (
                                    <>
                                        <Chip
                                            size="small"
                                            style={style}
                                            className={(this.state.selected[0] !== '' && this.state.selected[0] !== n) ? `inactive item` : `active item`}
                                            onClick={() => this.changeSelected(n)}
                                            label={`${n}`}
                                        />
                                    </>
                                )
                            })}
                        </Box>
                    </Container>
                }

                {!this.state.loading && (this.state.tagcloud.total === 0 || this.state.tagcloud.length === 0 || !this.state.tagcloud.total || this.state.tagcloud.buckets.length === 0) &&
                    <>
                        <span className="badge badge-danger">Los resultados no tienen los datos suficientes para la visualización</span>
                    </>
                }
            </>
        )
    }
}

const mapStateToProps = store => ({
    searchFilters: store.app.filters
});

export default connect(
    mapStateToProps,
    app.actions
)(withWidth()(WordCloudBar));