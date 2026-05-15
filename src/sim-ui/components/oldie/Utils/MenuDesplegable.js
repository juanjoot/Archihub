import { Component } from 'react';

export default class MenuDesplegable extends Component {
    constructor(props){
        super(props)
        this.clicked = this.clicked.bind(this)
        this.menu = null
    }

    componentDidMount(){   
    }

    clicked(e){
        let elements = document.querySelectorAll('.menu_desplegable')
        
        if (e.target.classList.contains('menu_desplegable') || e.target.classList.contains('select') || e.target.classList.contains('menu__icon')) {
            for(var i of elements){
                if(this.menu !== i) i.classList.remove('active')
            }
            this.menu.classList.toggle('active');
        }
      
        if (e.target.classList.contains('child')) {
            this.menu.classList.remove('active');
            this.props.onClick(e)
        }
    }
    render(){
        return(
            <>
            <div ref={div=>this.menu = div} onClick={this.clicked} className="menu_desplegable">
                <div className="select">{this.props.item}</div>
                <div className="menu__icon"></div>
                <div className="menu_parent">
                    {
                        this.props.list.map(l => {
                            return (
                                <>
                                    <div className="child" value={l}>{l}</div>
                                </>
                            )
                        })
                    }
                </div>
            </div>
            </>
        )
    }
}