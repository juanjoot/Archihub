import { createRef, Component } from 'react';
import PropTypes from 'prop-types';


/**
 * Bloque que muestra una nube de palabras y calcula el porcentaje de documentos tageados recibiendo el total de la búsqueda.
 * @version 0.1
 */
class Wordcloud extends Component {

    static propTypes = {
        /** Ancho del canvas */
        width: PropTypes.number.isRequired,
        /** Alto del canvas */
        height: PropTypes.number.isRequired,
        /** Descripción para el más info de arriba */
        descripcion: PropTypes.string,
        /** Color de las palabras de la nube de palabras */
        color: PropTypes.func,
        /** Total de resultados en la búsqueda */
        total: PropTypes.number,
        /** {total,buckets} */
        list: PropTypes.object.isRequired,
        /** Callback on Click */
        callBack: PropTypes.func
    }

    constructor(props) {
        super(props)

        this.state = {
            canvas: null,
            ctx: null,
            moreInfo: false,
            percent: 0,
            loading: true
        }

        this.canvas = createRef();

        this.checkIsAvailable = this.checkIsAvailable.bind(this)
        this.updateCanvas = this.updateCanvas.bind(this)
        this.moreInfo = this.moreInfo.bind(this)

    }

    componentDidMount() {
        var canvas = this.canvas.current
        var ctx = canvas.getContext('2d', { willReadFrequently: true })
        var por = (this.props.list.total / this.props.total) * 100
        por = por.toFixed(2)

        canvas.addEventListener('click', (e) => {
            var r = canvas.getBoundingClientRect()
            var mpos = {
                x: e.clientX - r.left,
                y: e.clientY - r.top
            }

            let item = this.ocupied.find(d => d[0] - d[2] / 2 < mpos.x && mpos.x < d[0] + d[2] / 2 && mpos.y > d[1] - d[3] / 2 && mpos.y < d[1] + d[3] / 2)

            console.log(item)

            if (this.props.callBack && item !== undefined) this.props.callBack(item[5], 'entidad')

            // const queryString = window.location.search;
            // const urlParams = new URLSearchParams(queryString);

            // if(urlParams.get('q') !== null)
            //     var url = window.location.origin + '/search?q=' + urlParams.get('q') + '&from=1&record.calculated_etiquetas.label.keyword:'+item[4].toLowerCase()
            // else
            //     var url = window.location.origin + '/search?from=1&record.calculated_etiquetas.label.keyword:'+item[4].toLowerCase()


            // window.location.href = url
        })

        this.setState({
            canvas: canvas,
            ctx: ctx,
            percent: por
        })



    }

    componentDidUpdate() {



        this.updateCanvas()


    }

    /**
     * Calcula el mapeo de un número dándole un rango de entrada y de salida.
     *
     * @param {int} i input.
     * @param {int} r1 rango mínimo del input.
     * @param {int} r2 rango máximo del input.
     * @param {int} m1 rango mínimo del output.
     * @param {int} m2 rango máximo del output.
     * @returns {float} el mapeo del input entre los rangos especificados del output.
     */
    scaleLinear(i, r1, r2, m1, m2) {
        var resp = (i - r1) * (m2 - m1) / (r2 - r1) + m1
        return resp
    }

    updateCanvas() {
        this.ocupied = []
        var aroundSpace = 50
        var maxSize = 45
        var minSize = 12
        var max = this.props.list.buckets[0].doc_count
        var min = this.props.list.buckets[this.props.list.buckets.length - 1].doc_count
        let ctx = this.state.ctx;

        ctx.clearRect(0, 0, this.props.width, this.props.height);

        for (var i = 0; i < this.props.list.buckets.length; i++) {
            var label = this.props.list.buckets[i].key
            var splited = label.split('|')
            var name, group = ''
            if (splited.length > 1) {
                name = splited[1].toUpperCase()
                group = splited[0]
            } else {
                name = splited[0].toUpperCase()
                group = splited[0]
            }

            if (this.ocupied.length > 0) {
                var boundary = this.getTextCanvas(name, this.scaleLinear(this.props.list.buckets[i].doc_count, min, max, minSize, maxSize))
                var cw = this.props.width
                var ch = this.props.height

                var bcw = 0
                var bch = 0

                var random_x = 0
                var random_y = 0

                var tries = 0
                var max_tries = 20
                while (tries < max_tries) {
                    // random_x = boundary[0]/2 + Math.random() * (cw - boundary[0])
                    // random_y = boundary[1]/2 + Math.random() * (ch - boundary[1])
                    bcw = cw / 2 - aroundSpace / 2
                    if (aroundSpace > ch - 100) {
                        bch = ch / 2 - 100
                    } else {
                        bch = ch / 2 - aroundSpace / 2
                    }

                    random_x = bcw + Math.random() * aroundSpace
                    random_y = bch + Math.random() * aroundSpace

                    if (this.checkIsAvailable(name, this.ocupied, random_x, random_y, boundary[0] + 5, boundary[1] + 5)) {
                        ctx.fillStyle = this.props.color(group)
                        // this.state.ctx.globalAlpha = (0.8/i) + 0.2
                        ctx.font = this.scaleLinear(this.props.list.buckets[i].doc_count, min, max, minSize, maxSize) + "px Montserrat"
                        ctx.textAlign = "center";
                        ctx.textBaseline = "middle";
                        ctx.fillText(name, random_x, random_y)

                        //this.setState({ctx:ctx})

                        this.ocupied.push([random_x, random_y, boundary[0] + 5, boundary[1] + 5, name, label])

                        break
                    } else if (tries === max_tries - 1 && aroundSpace < cw) {
                        aroundSpace += 50
                        tries = 0
                    }
                    tries++
                }

            }
            else {
                var boundary_ = this.getTextCanvas(name, this.scaleLinear(this.props.list.buckets[i].doc_count, min, max, minSize, maxSize))
                var mx = this.props.width / 2
                var mh = this.props.height / 2

                ctx.fillStyle = this.props.color(group)
                ctx.globalAlpha = 1
                ctx.font = this.scaleLinear(this.props.list.buckets[i].doc_count, min, max, minSize, maxSize) + "px Montserrat"
                ctx.textAlign = "center";
                ctx.textBaseline = "middle";
                ctx.fillText(name, mx, mh)

                // this.state.ctx.beginPath();
                // this.state.ctx.rect(mx-boundary_[0]/2,mh-boundary_[1]/2,boundary_[0], boundary_[1]);
                // this.state.ctx.stroke();

                this.ocupied.push([mx, mh, boundary_[0] + 5, boundary_[1] + 5, name, label])
            }
        }


    }

    /**
     * Dado un arreglo y la información de posición y tamaño, verifica que el espacio está libre.
     * 
     * @param {*} name Nombre del contenido
     * @param {float[]} ocupied Arreglo con los bloques que ya están dispuestos en el canvas
     * @param {*} x Posición x de entrada
     * @param {*} y Posición y de entrada
     * @param {*} w Ancho entrada
     * @param {*} h Alto entrada
     * @returns {boolean} false si está ocupado, true si no
     */
    checkIsAvailable(name, ocupied, x, y, w, h) {
        var resp = true
        // console.log(x,y,w,h)
        for (var i = 0; i < ocupied.length; i++) {
            var test = false
            var l1 = {
                x: x - w / 2,
                y: y - h / 2
            }

            var r1 = {
                x: x + w / 2,
                y: y + h / 2
            }

            var l2 = {
                x: ocupied[i][0] - ocupied[i][2] / 2,
                y: ocupied[i][1] - ocupied[i][3] / 2
            }

            var r2 = {
                x: ocupied[i][0] + ocupied[i][2] / 2,
                y: ocupied[i][1] + ocupied[i][3] / 2
            }

            // console.log(l1,r1,l2,r2)

            // this.state.ctx.beginPath();
            // this.state.ctx.rect(l1.x,l1.y,w,h);
            // this.state.ctx.stroke();

            if (l1.x > r2.x || l2.x > r1.x) {
                test = true
            }
            if (l1.y > r2.y || l2.y > r1.y) {
                test = true
            }
            if (l1.x <= 0) test = false
            if (l1.y <= 0) test = false
            if (r1.x >= this.props.width) test = false
            if (r1.y >= this.props.height) test = false

            if (!test) {
                resp = false
                break
            }
        }
        return resp
    }

    /**
     * Calcula en ancho y alto del bloque dándole un texto de entrada y un tamaño de fuente.
     * 
     * @param {string} string Cadena de caracteres
     * @param {int} size Tamaño del texto
     * @returns {float[]} Devuelve un arreglo [ancho, alto]
     */

    getTextCanvas(string, size) {
        var canvas = document.createElement('canvas');
        if (!canvas || !canvas.getContext) {
            return false;
        }

        var ctx = canvas.getContext('2d');

        ctx.fillStyle = '#000';
        ctx.font = size + "px Montserrat";

        var w = ctx.measureText(string).width
        var h = ctx.measureText(string).actualBoundingBoxAscent

        canvas.setAttribute('width', w)
        canvas.setAttribute('height', h)

        ctx.fillStyle = '#000';
        ctx.font = size + "px Montserrat";
        ctx.fillText(string, 0, h);

        // document.body.appendChild(canvas);

        return [w, h]
    }

    moreInfo() {
        if (this.state.moreInfo) {
            this.setState({
                moreInfo: false
            })
        } else {
            this.setState({
                moreInfo: true
            })
        }
    }

    render() {
        return (
            <>
                <div className="cloudContainer" style={{ textAlign: 'center' }}>
                    <div className="info">
                        {/* <b>{this.state.percent}%</b> {this.props.info}: */}

                        {/* <a title="Más información" onClick={this.moreInfo} className="more-info"></a> */}
                    </div>
                    <canvas style={{ maxWidth: '100%' }} ref={this.canvas} width={this.props.width} height={this.props.height} />

                    {this.state.moreInfo &&
                        <div className={this.state.moreInfo ? 'moreInfo-box active' : 'moreInfo-box'}>{this.props.descripcion}</div>
                    }
                </div>
            </>
        )
    }
}

export default Wordcloud