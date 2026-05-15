import { Fragment, Component } from "react";
import { connect } from "react-redux";
import UserAccessValidator from "../../components/atoms/UserAccessValidator";
//import { toAbsoluteUrl } from "../../../_metronic";
import AdminDictionaryMenu from "../../components/organisms/AdminDictionaryMenu";
import * as app from "../../store/ducks/app.duck";
import * as TermService from "../../services/TermService";
import * as SemanticService from "../../services/SemanticService";
import * as ArcgisService from "../../services/arcgisService";
//import moment from "moment";
import Select from "react-select";
import AsyncSelect from "react-select/async";

import Form from "react-jsonschema-form-bs4";

import JoditEditor from "jodit-react";
import FormLocationMultiple from "../../components/organisms/FormLocationMultiple";

const uiSchema = {
  definition: {
    "ui:widget": "textarea",
  },
  fragment: {
    "ui:widget": "textarea",
  },
  others: {
    "ui:widget": "textarea",
  },
  "ui:widget": "checkboxes",
  "ui:options": {
    inline: true,
  },
};

class TermAddPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: [],
      semanctics2: [],
      semanctics: [],
      departamens: [],
      countries: [],
      locationInterview: null,
      municipios: [],
      schema: {},
      formsubmit: true,
      placeholderterms: "Seleccionar Términos",
      placeholdersemantic: "Seleccionar Campo Semántico",
      placeholderdepartamento: "Seleccionar Departamento",
      placeholderPais: "Seleccionar País",

      placeholdermunicipio: "Seleccionar Municipio",
      formsemactic: null,
      terms: [],
      formterms: [],
      source_context: "",
      context: "",
      source_definition: "",
      definition: "",
      others: "",
      fragment: "",
      config: { readonly: false },
    };
  }
  outputLocation = (event) => {
    if (event.locationInterview) {
      this.state.locationInterview = event.locationInterview[0];
    }
  };

  componentDidUpdate(prevProps, prevState) {
    console.log(prevProps);
    console.log(prevState);
  }
  async componentDidMount() {
    //load all countries
    let schema = {
      type: "object",
      required: ["name"],
      properties: {
        name: { type: "string", title: "Nombre del término" },
        equivalent: { type: "string", title: "Término equivalente" },
        //definition: { type: "string", title: "Definición" },
        //source_definition: { type: "string", title: "Fuente de la definición" },
        //context: { type: "string", title: "Contexto" },
        //source_context: { type: "string", title: "Fuente del contexto" },
        interview: { type: "string", title: "Entrevista N°" },
        interview_date: {
          type: "string",
          title: "Fecha de la entrevista",
          format: "date",
        },
        //interview_dep: { type: "string", title: "Lugar de la entrevista - Departamento" , enum: ["Amazonas","Antioquia","Arauca","Atlántico","Bolívar","Boyacá","Caldas","Caquetá","Casanare","Cauca","Cesar","Chocó","Córdoba","Cundinamarca","Guainía","Guaviare","Huila","La Guajira","Magdalena","Meta","Nariño","Norte de Santander","Putumayo","Quindío","Risaralda","San Andrés y Providencia","Santander","Sucre","Tolima","Valle del Cauca","Vaupés","Vichada","Exterior"]},
        //interview_mun: { type: "string", title: "Lugar de la entrevista - Municipio" },
        //year_facts: { type: "integer", title: "Año de ocurridos los hechos" },
        etnia: {
          type: "string",
          title: "Pertenencia étnica",
          enum: [
            "Mestizo/a",
            "Afrocolombiano/a",
            "Negro/a",
            "Raizal",
            "Palenquera/o",
            "Rrom",
            "Indígena",
          ],
        },
        sexo: {
          type: "string",
          title: " Sexo (asignado al nacer) de la persona entrevistada",
          enum: ["Femenino", "Masculino", "Intersexual"],
        },
        sexual_orientation: {
          type: "string",
          title:
            "Orientación sexual de la persona entrevistada (se siente atraído por):",
          enum: [
            "Asexual",
            "Bisexual",
            "Heterosexual",
            "Homosexual",
            "Pansexual",
          ],
        },
        //others: { type: "string", title: "Otros" },
        age: { type: "integer", title: "Edad" },
        //fragment: { type: "string", title: "Fragmento de la entrevista" },
        active: { type: "boolean", title: "Activo?", default: true },
        img: {
          type: "string",
          format: "data-url",
          title: "Imagen",
        },
      },
    };

    const response = await ArcgisService.worldCountries();
    if (response) this.setState({ countries: response });

    //Cargo los departamentos
    // ArcgisService.colAdministrativeDivision().then((dep => {
    //   dep.forEach((d) => {
    //     this.state.departamens.push(d);
    //   });
    // }));

    // let schema = {
    //   type: "object",
    //   required: ["name"],
    //   properties: {
    //     name: { type: "string", title: "Nombre del término" },
    //     equivalent: { type: "string", title: "Término equivalente" },
    //     //definition: { type: "string", title: "Definición" },
    //     source_definition: { type: "string", title: "Fuente de la definición" },
    //     //context: { type: "string", title: "Contexto" },
    //     source_context: { type: "string", title: "Fuente del contexto" },
    //     interview: { type: "string", title: "Entrevista N°" },
    //     interview_date: {
    //       type: "string",
    //       title: "Fecha de la entrevista",
    //       format: "date",
    //     },
    //     //interview_dep: { type: "string", title: "Lugar de la entrevista - Departamento" , enum: ["Amazonas","Antioquia","Arauca","Atlántico","Bolívar","Boyacá","Caldas","Caquetá","Casanare","Cauca","Cesar","Chocó","Córdoba","Cundinamarca","Guainía","Guaviare","Huila","La Guajira","Magdalena","Meta","Nariño","Norte de Santander","Putumayo","Quindío","Risaralda","San Andrés y Providencia","Santander","Sucre","Tolima","Valle del Cauca","Vaupés","Vichada","Exterior"]},
    //     //interview_mun: { type: "string", title: "Lugar de la entrevista - Municipio" },
    //     //year_facts: { type: "integer", title: "Año de ocurridos los hechos" },
    //     etnia: {
    //       type: "string",
    //       title: "Pertenencia étnica",
    //       enum: [
    //         "Mestizo/a",
    //         "Afrocolombiano/a",
    //         "Negro/a",
    //         "Raizal",
    //         "Palenquera/o",
    //         "Rrom",
    //         "Indígena",
    //       ],
    //     },
    //     sexo: {
    //       type: "string",
    //       title: " Sexo (asignado al nacer) de la persona entrevistada",
    //       enum: ["Femenino", "Masculino", "Intersexual"],
    //     },
    //     sexual_orientation: {
    //       type: "string",
    //       title:
    //         "Orientación sexual de la persona entrevistada (se siente atraído por):",
    //       enum: [
    //         "Asexual",
    //         "Bisexual",
    //         "Heterosexual",
    //         "Homosexual",
    //         "Pansexual",
    //       ],
    //     },
    //     //others: { type: "string", title: "Otros" },
    //     age: { type: "integer", title: "Edad" },
    //     //fragment: { type: "string", title: "Fragmento de la entrevista" },
    //     active: { type: "boolean", title: "Activo?", default: true },
    //     img: {
    //       type: "string",
    //       format: "data-url",
    //       title: "Imagen",
    //     },
    //   },
    // };

    this.setState({ schema: schema });

    //Creo el select multiple de Términos
    TermService.terms().then((data1) => {
      data1.forEach((c) => {
        this.state.terms.push({ value: c._id, label: c.name });
      });
    });

    //Cargo todos los campos
    SemanticService.selectsemantic().then((dep) => {
      this.setState({ semanctics2: dep });
    });
  }

  onSubmit(formData, e) {
    var today = new Date();
    var year = today.getFullYear();

    if (formData.year_facts > year) {
      alert(
        "El año de ocurridos los hechos, no puede ser mayor al año actual.",
      );
    } else {
      if (new Date(formData.interview_date) > today) {
        alert(
          "La fecha de la entrevista, no puede ser mayor a la fecha actual.",
        );
      } else {
        if (this.state.formsubmit) {
          this.setState({ formsubmit: false });
          formData.terms = this.state.formterms;
          if (
            this.state.formsemactic !== null &&
            this.state.formsemactic !== ""
          ) {
            formData.thematic_field = this.state.formsemactic;
          }
          if (
            this.state.interview_dep !== null &&
            this.state.interview_dep !== ""
          ) {
            formData.interview_dep = this.state.interview_dep;
          }
          if (
            this.state.interview_mun !== null &&
            this.state.interview_mun !== ""
          ) {
            formData.interview_mun = this.state.interview_mun;
          }

          //Guardo el html
          formData.context = this.state.context;
          formData.definition = this.state.definition;
          formData.others = this.state.others;
          formData.fragment = this.state.fragment;
          formData.interview_location = this.state.locationInterview;

          formData.source_definition = this.state.source_definition;
          formData.source_context = this.state.source_context;
          TermService.create(formData).then((data) => {
            alert("Se creo con éxito el término");
            this.setState({ formsubmit: true });
            this.props.history("/dictionary/termedit/" + data._id);
          });
        }
      }
    }
  }

  onCancel() {
    this.props.history("/dictionary/term");
  }

  termChange(selectedOption) {
    if (selectedOption !== null) {
      selectedOption.forEach((t) => {
        if (this.state.formterms.includes(t.value) == false) {
          this.state.formterms.push(t.value);
        }
      });
    } else {
      this.state.formterms = [];
    }
  }

  semacticChange(selectedOption) {
    console.log(selectedOption);
    if (selectedOption !== null) {
      this.state.formsemactic = selectedOption._id;
    } else {
      this.state.formsemactic = null;
    }
  }

  async departamentChange(selectedOption) {
    console.log(selectedOption);
    if (selectedOption !== null) {
      //Limpio los municipios
      for (let i = this.state.municipios.length; i > 0; i--) {
        this.state.municipios.pop();
      }
      this.state.interview_dep = selectedOption.name;
      //Cargo los municipios
      const municipios = await ArcgisService.colmunicipality(
        selectedOption.value,
      );
      this.setState({ municipios });
      // ArcgisService.colmunicipality(selectedOption.value).then((mun) => {
      //   mun.forEach((m) => {
      //     this.state.municipios.push(m);
      //   });
      // });
    } else {
      this.state.interview_dep = null;
    }
  }

  async countryChange(value) {
    //Cargo los departamentos
    const response = await ArcgisService.worldAdministrativeDivision(
      value.value,
    );
    let departments = response.features.map((dep) => {
      return {
        name: dep.attributes.NAME,
        value: dep.attributes.ISO_SUB,
      };
    });
    this.setState({
      departamens: departments,
    });
  }

  municipioChange(selectedOption) {
    if (selectedOption !== null) {
      //Cargo los municipios
      this.state.interview_mun = selectedOption.name;
    } else {
      this.state.interview_mun = null;
    }
  }

  render() {
    const termPlace = {
      paddingLeft: "0px",
      paddingRight: "0px",
      marginLeft: "-20px",
      marginRight: "0px",
      width: "104%",
      maxWidth: "104%",
      marginBottom: "-10px",
    };
    return (
      <>
        <UserAccessValidator rol="admin_diccionario" />
        <div className="kt-container  kt-container--fluid  kt-grid__item kt-grid__item--fluid">
          <>
            <div className="kt-grid kt-grid--desktop kt-grid--ver kt-grid--ver-desktop kt-app">
              <AdminDictionaryMenu />
              <div className="kt-grid__item kt-grid__item--fluid kt-app__content">
                <Fragment>
                  <div className="col-xl-12">
                    <div className="kt-portlet kt-portlet--height-fluid">
                      <div className="kt-portlet__head">
                        <div className="kt-portlet__head-label">
                          Crear término
                        </div>
                      </div>
                      <div className="kt-portlet__body table-responsive">
                        <Form
                          enctype="multipart/form-data"
                          schema={this.state.schema}
                          uiSchema={uiSchema}
                          onSubmit={({ formData }, e) =>
                            this.onSubmit(formData, e)
                          }
                        >
                          <div class="form-group field field-string">
                            <label for="terms">Definición</label>
                            <JoditEditor
                              value={this.state.definition}
                              config={this.state.config}
                              tabIndex={1} // tabIndex of textarea
                              onChange={(newContent) => {
                                this.state.definition = newContent;
                              }}
                            />
                          </div>
                          <br />
                          <div class="form-group field field-string">
                            <label for="terms">Fuente de la definición</label>
                            <JoditEditor
                              value={this.state.source_definition}
                              config={this.state.config}
                              tabIndex={1} // tabIndex of textarea
                              onChange={(newContent) => {
                                this.state.source_definition = newContent;
                              }}
                            />
                          </div>

                          <br />
                          <div class="form-group field field-string">
                            <label for="terms">Contexto</label>
                            <JoditEditor
                              value={this.state.context}
                              config={this.state.config}
                              tabIndex={1} // tabIndex of textarea
                              onChange={(newContent) => {
                                this.state.context = newContent;
                              }}
                            />
                          </div>

                          <br />
                          <div class="form-group field field-string">
                            <label for="terms">Fuente del contexto</label>
                            <JoditEditor
                              value={this.state.source_context}
                              config={this.state.config}
                              tabIndex={1} // tabIndex of textarea
                              onChange={(newContent) => {
                                this.state.source_context = newContent;
                              }}
                            />
                          </div>

                          <br />
                          <div class="form-group field field-string">
                            <label for="terms">
                              Fragmento de la entrevista
                            </label>
                            <JoditEditor
                              value={this.state.fragment}
                              config={this.state.config}
                              tabIndex={1} // tabIndex of textarea
                              onChange={(newContent) => {
                                this.state.fragment = newContent;
                              }}
                            />
                          </div>
                          <br />
                          <div class="form-group field field-string">
                            <label for="terms">Otros</label>
                            <JoditEditor
                              value={this.state.others}
                              config={this.state.config}
                              tabIndex={1} // tabIndex of textarea
                              onChange={(newContent) => {
                                this.state.others = newContent;
                              }}
                            />
                          </div>
                          <br />
                          <div class="form-group field field-string">
                            <label for="terms">Lugar de la entrevista</label>
                            <div style={termPlace}>
                              <FormLocationMultiple
                                outputEvent={(e) => this.outputLocation(e)}
                                multiple={false}
                                name="locationInterview"
                                formData=""
                              ></FormLocationMultiple>
                            </div>
                          </div>

                          {/* <div class="form-group field field-string">
                          <label for="terms">
                            Lugar de la entrevista - Departamento
                          </label>
                          <Select
                            className="basic-single"
                            classNamePrefix="select"
                            placeholder={this.state.placeholderdepartamento}
                            getOptionLabel={(e) => e.name}
                            getOptionValue={(e) => e.value}
                            options={this.state.departamens}
                            onChange={(value) =>
                              this.departamentChange(value)
                            }
                          />
                        </div>
                        <br />
                        <div class="form-group field field-string">
                          <label for="terms">
                            Lugar de la entrevista - Municipio
                          </label>
                          <Select
                            className="basic-single"
                            classNamePrefix="select"
                            placeholder={this.state.placeholdermunicipio}
                            getOptionLabel={(e) => e.name}
                            getOptionValue={(e) => e.value}
                            options={this.state.municipios}
                            onChange={(value) => this.municipioChange(value)}
                          />
                        </div> */}

                          <div class="form-group field field-string">
                            <label for="terms">Campo semántico principal</label>
                            <Select
                              className="basic-single"
                              classNamePrefix="select"
                              placeholder={this.state.placeholdersemantic}
                              getOptionLabel={(e) => e.name}
                              getOptionValue={(e) => e._id}
                              options={this.state.semanctics2}
                              onChange={(value) => this.semacticChange(value)}
                            />
                          </div>
                          <br />
                          <div class="form-group field field-string">
                            <label for="terms">Términos</label>
                            <Select
                              isMulti
                              name="terms"
                              options={this.state.terms}
                              className="basic-multi-select"
                              classNamePrefix="select"
                              onChange={(selected) => {
                                this.termChange(selected);
                              }}
                              placeholder={this.state.placeholderterms}
                            />
                          </div>
                          <br />
                          <div>
                            <button type="submit" class="btn btn-primary mr-4">
                              Guardar
                            </button>
                            <button
                              type="button"
                              class="btn btn-secondary"
                              onClick={() => {
                                this.onCancel();
                              }}
                            >
                              Cancelar
                            </button>
                          </div>
                        </Form>
                      </div>
                    </div>
                  </div>
                </Fragment>
              </div>
            </div>
          </>
        </div>
      </>
    );
  }
}

const mapStateToProps = (store) => ({
  search: store.app.keyword,
});

export default connect(mapStateToProps, app.actions)(TermAddPage);
