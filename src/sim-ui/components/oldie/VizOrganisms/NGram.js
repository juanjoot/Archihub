import { Component } from 'react';
import {connect} from "react-redux"
import BiGram from "../../molecules/BiGram"
import ThreeGram from "../../molecules/ThreeGram"
import FourGram from "../../molecules/FourGram"
import MenuDesplegable from "../../ui/Utils/MenuDesplegable"
import * as VizService from "../../../services/VizService"
import * as app from "../../../store/ducks/app.duck"

class NGram extends Component {
    constructor(props){
        super(props)
        this.state = {
            vista: 'bigram',
            loading: true,
            buckets: []
        }

        this.getBuckets = this.getBuckets.bind(this)
        this.cambiarVista = this.cambiarVista.bind(this)
    }

    componentDidMount(){
        let query = new URLSearchParams(this.props.location.search);
        if (query.toString() !== '') {
            this.getBuckets(this.props.searchFilters)
        } else {
            this.getBuckets(null)
        }
        console.log(this.props)
    }

    cambiarVista(e){
        let name = e.target.getAttribute('value')
        this.setState({
            vista: name
        })
    }

    componentDidUpdate(prevProps, prevState){
        if(prevState.vista !== this.state.vista){
            this.getBuckets(null)
        }
    }

    getBuckets(params_){
        let self = this
        let params = {
            ngram: self.state.vista,
            origin: "ModuloCaptura"
        }

        if(params_ != null) {
            params = params_
        }

        this.setState({
            loading:true
        })

        VizService.getNgram(params)
        .then(
            (data) => {
                this.setState({
                    buckets: data.aggregations.tipo.ngram.total.buckets,
                    loading:false
                })
                console.log(this.state)
            },
            (error) => {
                console.log(error)
            }
        )
    }

    render(){
        return(
            <>
            <div>
                <MenuDesplegable
                    item={this.state.vista}
                    list={[
                        "bigram",
                        "3gram",
                        "4gram"
                    ]}
                    onClick={this.cambiarVista}
                />
                <div className="containerVizScroll">
                    <div className="inside">
                        {!this.state.loading && this.state.vista === 'bigram' &&
                            <BiGram buckets={this.state.buckets}/>
                        }
                        {!this.state.loading && this.state.vista === '3gram' &&
                            <ThreeGram buckets={this.state.buckets}/>
                        }
                        {!this.state.loading && this.state.vista === '4gram' &&
                            <FourGram buckets={this.state.buckets}/>
                        }
                    </div>
                    
                    <nav className="scroll">

                    </nav>
                </div>
            </div>
            </>
        )
    }
}

const mapStateToProps = store => ({
    search: store.app.keyword,
    user: store.auth.user
});

export default connect(
    mapStateToProps,
    app.actions
)(NGram);