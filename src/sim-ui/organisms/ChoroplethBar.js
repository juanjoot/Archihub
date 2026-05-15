import React, { Component } from 'react';
import Lottie from 'react-lottie';
import animationData from '../../../assets/viz-loading.json';
import Choropleth from '../molecules/Choropleth';
import { Form, Col } from 'react-bootstrap';
import * as RecordsService from "../../services/RecordsService";
import PerfectScrollbar from "react-perfect-scrollbar";
import * as difflib from "difflib";

class ChoroplethBar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      total: 0,
      loading: false,
      map_data: [],
      column: -1,
      column_name: '',
      column_values: '',
      frequency: -1,
      columns: [],
      values: [],
      sumary: 'todos'
    };

    this.handleChangeSelect = this.handleChangeSelect.bind(this);
    this.showLoading = this.showLoading.bind(this);
    this.sumary = this.sumary.bind(this);
  }

  componentDidMount() {
    RecordsService.servicePreProcess(this.props.id)
      .then(
        (data) => {
          this.setState({ columns: data.pre_process.columns, values: data.pre_process.values });
        },
        (error) => {
          console.error("An unexpected error occurred while retrieving resource:  %s", error);
        }

      );
  }

  handleChangeSelect(evt) {
    if (evt.target.id === 'cev-micro-localization' && parseInt(evt.target.value, 10) !== -1) {
      let column = parseInt(evt.target.value.split("-")[0], 10);
      let level = parseInt(evt.target.value.split("-")[1], 10);
      let column_name = this.state.columns.filter(x=>x.column_position === column)[0].column_name.toUpperCase();
      this.setState({ map_data: [], column_name: column_name,column: column, level: level, loading: true }, () => { this.organizeData() });
    }
    else{
      if (evt.target.id === 'cev-micro-localization'){
        this.setState({ map_data: [], column: -1, level: 0, column_name: '', column_values: '', freqeuncy: -1, loading: false});
      }
    }
    if (evt.target.id === 'cev-micro-frequency' && parseInt(evt.target.value, 10) !== -1) {
      let values = parseInt(evt.target.value, 10);
      let column_values = this.state.values.filter(x=>x.column_position === values)[0].column_name.toUpperCase();
      this.setState({ map_data: [], column_values: column_values, frequency: evt.target.value, loading: true }, () => { this.organizeData() });
    }
    else{
      if (evt.target.id === 'cev-micro-frequency'){
        this.setState({map_data: [], frequency: -1, column_values: '', loading: true},() => { this.organizeData() });
      }
    }
  }

  organizeData() {
    let data = this.props.data;
    let column = this.state.column;
    let frequency = this.state.frequency;
    let hashdata = [];
    let all = [];
    let total = 0;
    let map_data = [];
    if (column !== -1) {
      data.forEach((line, key) => {
        if (key > 0) {
          if (frequency !== -1) {
            if (hashdata[line[column]]) {
              hashdata[line[column]]["frequency"] += isNaN(Number(line[frequency])) ? 0 : Number(line[frequency]);
              total += isNaN(Number(line[frequency])) ? 0 : Number(line[frequency]);
            }
            else {
              all.push(line[column]);
              hashdata[line[column]] = {};
              hashdata[line[column]] = { name: line[column], frequency: isNaN(Number(line[frequency])) ? 0 : Number(line[frequency]) };
              total += isNaN(Number(line[frequency])) ? 0 : Number(line[frequency]);
            }
          }
          else {
            if (hashdata[line[column]]) {
              hashdata[line[column]]["frequency"] += 1;
              total += 1;
            }
            else {
              all.push(line[column]);
              hashdata[line[column]] = {};
              hashdata[line[column]] = { name: line[column], frequency: 1 };
              total += 1;
            }
          }
        }
      });
    }

    all.forEach((a) => {
      map_data.push(hashdata[a]);
    })

    function compare (a, b){
      return a.frequency > b.frequency ? -1 : 1;
    }

    map_data.sort(compare)

    this.setState({ map_data: map_data, total: total });
  }

  showLoading(loading) {
    this.setState({ loading: loading })
  }

  sumary(sumary) {
    this.setState({ sumary: sumary })
  }

  compute_string_diffence(word1,word2){
    return new difflib.SequenceMatcher(null, word1, word2).ratio();
  }

  render() {
    return (
      <>
        <>
          {this.state.columns && this.state.columns.length > 0 &&
            <div className="">
              <Form>
                <Form.Row>
                  <Form.Group as={Col} controlId="cev-micro-localization">
                    <Form.Label>Ubicación:</Form.Label>
                    <Form.Control as="select" onChange={this.handleChangeSelect}>
                      <option value="-1">Seleccione...</option>
                      {this.state.columns.map((column, key) => (<option key={key} value={column.column_position + "-" + column.admin_level}>{column.column_name.toUpperCase()}</option>))}
                    </Form.Control>
                  </Form.Group>
                  {this.state.values && this.state.values.length > 0 &&
                    <Form.Group as={Col} controlId="cev-micro-frequency">
                      <Form.Label>Agrupar por:</Form.Label>
                      <Form.Control as="select" onChange={this.handleChangeSelect}>
                        <option value="-1">Seleccione...</option>
                        {this.state.values.map((value, key) => (<option key={key} value={value.column_position}>{value.column_name.toUpperCase()}</option>))}
                      </Form.Control>
                    </Form.Group>
                  }
                </Form.Row>
              </Form>
            </div>
          }
        </>
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
        {this.state.map_data && this.state.map_data.length > 0 &&
          <>
            <div className="w-100">
              <Choropleth data={this.state.map_data} total={this.state.total} level={this.state.level} loading={this.showLoading} sumary={this.sumary} />
              <>
                {this.state.sumary &&
                  <div className="kt-portlet kt-portlet--height-fluid w-50 float-right" style={{maxHeight:"380px"}}>
                    <div className="kt-widget14 px-2 py-1">
                      <div className="kt-widget14__header">
                        <h3 className="kt-widget14__title">
                          Resumen Ubicación: {this.state.column_name} {this.state.sumary === "todos" ? "Todo" : this.state.sumary} {this.state.frequency !== -1 ? " - Agrupada por: " + this.state.column_values : ""}
                        </h3>
                        <span className="kt-widget14__desc">
                          Total muestra: {this.state.total}
                        </span>
                      </div>
                        <div className="kt-widget14__content">
                          <PerfectScrollbar
                            className="kt-scroll"
                            options={{
                              wheelSpeed: 1,
                              wheelPropagation: false
                            }}
                            style={{ height: "270px", width: "100%"}}
                            data-scroll="true"
                          >
                            <div className="kt-widget14__legends">
                              <div className="kt-widget14__legend">
                                <span className="kt-widget14__bullet kt-bg-success"></span>
                                <span className="kt-widget14__stats">Ubicación</span>
                                <span className="kt-widget14__stats">Frecuencia</span>
                                <span className="kt-widget14__stats">%</span>
                              </div>
                              {this.state.sumary === "todos" &&
                                <>
                                  {this.state.map_data.map((x,i)=>(
                                    <div className="kt-widget14__legend" key={i}>
                                      <span className="kt-widget14__bullet kt-bg-warning"></span>
                                      <span className="kt-widget14__stats">{x.name === null ? "NoData" : x.name}</span>
                                      <span className="kt-widget14__stats">{x.frequency}</span>
                                      <span className="kt-widget14__stats">{parseFloat(x.frequency/this.state.total*100).toFixed(2)}</span>
                                    </div>
                                  ))}
                                </>
                              }
                              {this.state.sumary !== "todos" &&
                                <>
                                  {this.state.map_data.filter(x => this.compute_string_diffence(x.name,this.state.sumary) >= 0.9).map((x,i)=>(
                                    <div className="kt-widget14__legend" key={i}>
                                      <span className="kt-widget14__bullet kt-bg-warning"></span>
                                      <span className="kt-widget14__stats">{x.name === null ? "NoData" : x.name}</span>
                                      <span className="kt-widget14__stats">{x.frequency}</span>
                                      <span className="kt-widget14__stats">{parseFloat(x.frequency/this.state.total*100).toFixed(2)}</span>
                                    </div>
                                  ))}
                                </>
                              }
                            </div>
                          </PerfectScrollbar>
                        </div>
                    </div>
                  </div>
                }
              </>
            </div>
          </>
        }
      </>
    )
  }
}

export default ChoroplethBar;