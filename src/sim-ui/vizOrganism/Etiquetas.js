import { useRef, useState, useEffect } from 'react';
import * as app from "../../store/ducks/app.duck";
import * as VizService from "../../../services/VizService";
import * as d3 from 'd3'
import Lottie from 'react-lottie';
import animationData from '../../assets/loading_cev_explora.json'
import ListaBarras from "../viz/ListaBarras"
import * as PIXI from 'pixi.js'
import Box from '@material-ui/core/Box'
import { makeStyles } from "@material-ui/core";
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';

const useStyles = makeStyles((theme) => ({
    loading: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: 'white',
        zIndex: 10,
        margin: 0
    },
    root: {
        position: 'relative'
    },
    formControl: {
        margin: 0,
        minWidth: 250
    },
    formContainer: {
        textAlign: 'right'
    }
}));

const Etiquetas = props => {
    const _zoom = useRef(null)
    const classes = useStyles();

    const [vista, cambiarVista] = useState('vista lista')
    const [marginTop, cambiarMargen] = useState(0)
    const [root, setRoot] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setWebGL()
    }, [_zoom])

    useEffect(() => {
        let filters = {
            origin: "ModuloCaptura"
        }

        VizService.getEtiquetas(filters).then(
            data => {

                let buckets = data.aggregations.tipo.etiquetas.buckets

                if (data.hits.hits.length > 0) {
                    let arreglo = []

                    buckets.map(b => {
                        let splited = b.key.split(' - ')

                        let obj = {}
                        let objTemp = {}
                        splited.map((s, i) => {
                            let obj_ = {
                                "name": s
                            }
                            if (i === 0) {
                                obj = obj_
                                obj["children"] = []
                                objTemp = obj
                            }
                            else if (i < splited.length) {
                                obj_["children"] = []
                                objTemp["children"].push(obj_)
                                objTemp = obj_
                            }

                            if (i === splited.length - 1) {
                                obj_["value"] = b.value.value
                                // let normalizado = b.doc_count/max
                                // obj_["value"] = normalizado
                                // obj_["value"] = Math.log(max / b.doc_count) * normalizado
                                // obj_["value"] = Math.log(total / b.doc_count)
                            }
                            return ''
                        })

                        arreglo.push(obj)
                        return ''
                    })

                    let final = []

                    arreglo.map(a => {
                        pushToChildren(final, a)
                        return ''
                    })

                    function pushToChildren(parent, child) {
                        let t = parent.find(x => x.name === child.name)
                        if (t === undefined) parent.push(child)
                        else {
                            if (child.children.length > 0) pushToChildren(t.children, child.children[0])
                            else if (t.value) t.value += child.value
                            else if (t.value === undefined) t.value = child.value
                        }
                    }

                    let root = d3.hierarchy({ name: "root", children: final })
                        .sum(d => d.value)
                        .sort((a, b) => b.value - a.value)
                        .eachAfter(d => d.index = d.parent ? d.parent.index = d.parent.index + 1 || 0 : 0)

                    setLoading(false)
                    setRoot(root)
                }
            },
            error => { console.log(error) }
        )
    }, [])

    function setWebGL() {
        let width = 100
        let height = (document.body.clientHeight / 100) * 80

        const renderer = new PIXI.Application({
            width: width,
            height: height,
            antialias: true,
            transparent: true,
            resolution: (window.devicePixelRatio > 1) ? 2 : 1,
            autoDensity: true,
            powerPreference: "high-performance",
            // backgroundColor: 0x999999
        })

        _zoom.current.appendChild(renderer.view)

        const stage = new PIXI.Container()

        const context = new PIXI.Graphics();

        context.lineStyle(1, '0x999999')
        context.beginFill('0x999999')
        context.drawRect(width - 20, 0, 20, 50)
        context.endFill()

        context.interactive = true
        context.buttonMode = true
        context.on('pointerdown', onDragStart)
            .on('pointerup', onDragEnd)
            .on('pointerupoutside', onDragEnd)
            .on('pointermove', onDragMove)

        stage.addChild(context)

        function onDragStart(event) {
            this.inicio = event.data.global.y - this.y
            this.data = event.data;
            this.dragging = true;
        }

        function onDragEnd() {
            this.alpha = 1;
            this.dragging = false;
            // this.data = null;
        }

        function onDragMove() {
            if (this.dragging) {
                this.alpha = .5
                const newPosition = this.data.getLocalPosition(this.parent);
                let posY = newPosition.y - this.inicio
                // posY >= 0 && posY <=20 ? posY = 0 : null
                if (posY < 0) posY = 0
                if (posY > height - 50) posY = height - 50
                if (posY >= 0 && posY <= height - 50) this.y = posY

                cambiarMargen((posY / height) * 40000)
            }
        }

        renderer.stage.addChild(stage)
    }

    return (
        <>
            <Box mt={4} className={classes.formContainer}>
                <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="age-native-helper">Tipo de visualización</InputLabel>
                    <NativeSelect
                        value={'vista lista'}
                        // onChange={handleChange}
                        color="secondary"
                    >
                        <option value={'vista lista'}>Vista en lista</option>
                        <option value={'vista árbol'}>Vista en árbol</option>
                    </NativeSelect>
                    <FormHelperText>Selecciona una de las vistas disponibles</FormHelperText>
                </FormControl>
            </Box>
            <>
                <Box className={`containerVizScroll ${classes.root}`} mt={4}>
                    {loading &&
                        <div className={`loading_viz ${classes.loading}`}>
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
                    <>
                        <div className="inside">
                            {vista === 'vista arbol' &&
                                // <Arbol changeFilter={props.changeFilter} margin={marginTop} root={props.root} />
                                <></>
                            }
                            {vista === 'vista lista' && root !== null &&
                                <ListaBarras changeFilter={() => { }} margin={marginTop} root={root} />
                            }
                        </div>

                        <nav className="scroll" ref={_zoom}>
                        </nav>
                    </>

                </Box>
            </>


        </>
    )
}

export default Etiquetas