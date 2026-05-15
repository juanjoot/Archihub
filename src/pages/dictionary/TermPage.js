import { Fragment, Component } from "react";
import { connect } from "react-redux";
import UserAccessValidator from "../../components/atoms/UserAccessValidator";
import AdminDictionaryMenu from "../../components/organisms/AdminDictionaryMenu";
import * as app from "../../store/ducks/app.duck";
import * as TermService from "../../services/TermService";
import { SimpleDataTable } from "../../components/molecules/SimpleDataTable";

//import moment from "moment";

const resourceHeader = [
  {
    title: "Término",
    data: "name",
  },
  {
    title: "Activo",
    data: "active",
  },
  {
    title: "Editar",
    data: "_id",
    type: "action",
    width: "8%",
  },
];
class TermPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      terms: [],
    };
    this.actionEvent = this.actionEvent.bind(this);
  }

  componentDidMount() {
    TermService.list("", this.state.page).then((data) => {
      const dataUser = data.map((s) => {
        return {
          ...{
            name: s.name,
            active: s.active ? "Activo" : "Inactivo",
            _id: s._id,
            accessLevel: s.accessLevel,
          },
        };
      });
      this.setState({ terms: dataUser });
    });
  }

  actionEvent({ action, row }) {
    switch (action.action) {
      case "edit":
        this.props.history("/dictionary/termedit/" + row._id);
        break;

      default:
        break;
    }
  }

  onCrear() {
    this.props.history("/dictionary/termadd");
  }

  render() {
    let { terms } = this.state;

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
                          Gestión de términos
                        </div>
                        <div className="kt-portlet__head-label">
                          <button
                            onClick={() => {
                              this.onCrear();
                            }}
                            type="button"
                            className="btn btn-outline-primary"
                          >
                            Crear término
                          </button>{" "}
                        </div>
                      </div>
                      <div className="kt-portlet__body table-responsive">
                        <SimpleDataTable
                          id="simple-table"
                          columns={resourceHeader}
                          data={terms}
                          ordering={false}
                          actions={[
                            {
                              action: "edit",
                              title: "Editar",
                              classLaIcon: "la la-edit",
                            },
                          ]}
                          outputEvent={this.actionEvent}
                        ></SimpleDataTable>
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

export default connect(mapStateToProps, app.actions)(TermPage);
