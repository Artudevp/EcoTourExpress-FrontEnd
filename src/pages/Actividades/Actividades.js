import "../../App.css";
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/soho-dark/theme.css';
import ActividadService from "../../services/ActividadService";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import React, { Component } from "react";
import { Panel } from 'primereact/panel';
import { Menubar } from 'primereact/menubar';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { FloatLabel } from 'primereact/floatlabel';
import { Button } from 'primereact/button';
import { Toast } from "primereact/toast";

export default class Actividades extends Component {
    constructor() {
        super();
        this.state = {
            visible: false,
            actividad: {
                id_actividad: null,
                nombre_act: "",
                duración_act: "",
                precio_act: ""
            },
            selectedActividad: {},
            actividades: []
        };
        this.items = [
            {
                label: "Nuevo",
                icon: "pi pi-fw pi-calendar-plus",
                command: () => { this.showSaveDialog() }
            },
            {
                label: "Editar",
                icon: "pi pi-fw pi-calendar-clock",
                command: () => { this.showEditDialog() }
            },
            {
                label: "Eliminar",
                icon: "pi pi-fw pi-calendar-minus",
                command: () => { this.delete() }
            }
        ];
        this.save = this.save.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.footer = (
            <div>
                <Button label="Guardar" icon="pi pi-check" onClick={this.save} />
            </div>
        );
        this.Toast = React.createRef();
    }

    componentDidMount() {
        this.fetchActividades();
    }

    fetchActividades() {
        ActividadService.getAllActividades().then(res => {
            this.setState({ actividades: res });
        }).catch(error => {
            this.Toast.current.show({ severity: "error", summary: "Error", detail: "No se pudo cargar las actividades" });
        });
    }

    save() {
        const { id } = this.state.actividad;
        if (id) {
            ActividadService.updateActividad(id, this.state.actividad).then(() => {
                this.resetState();
                this.Toast.current.show({ severity: "success", summary: "Éxito", detail: "Se actualizó correctamente el registro" });
            }).catch(error => {
                this.Toast.current.show({ severity: "error", summary: "Error", detail: "No se pudo actualizar la actividad" });
            });
        } else {
            ActividadService.createActividad(this.state.actividad).then(() => {
                this.resetState();
                this.Toast.current.show({ severity: "success", summary: "Éxito", detail: "Se guardó correctamente el registro" });
            }).catch(error => {
                this.Toast.current.show({ severity: "error", summary: "Error", detail: "No se pudo guardar la actividad" });
            });
        }
    }

    delete() {
        const { id } = this.state.selectedActividad;
        if (id && window.confirm("¿Desea eliminar el registro seleccionado?")) {
            ActividadService.deleteActividad(id).then(() => {
                this.resetState();
                this.Toast.current.show({ severity: "success", summary: "Éxito", detail: "Se eliminó correctamente el registro" });
            }).catch(error => {
                this.Toast.current.show({ severity: "error", summary: "Error", detail: "No se pudo eliminar la actividad" });
            });
        }
    }

    showSaveDialog() {
        this.setState({
            visible: true,
            actividad: {
                id_actividad: null,
                nombre_act: "",
                duración_act: "",
                precio_act: ""
            }
        });
    }

    showEditDialog() {
        this.setState({
            visible: true,
            actividad: { ...this.state.selectedActividad }
        });
    }

    handleChange(e) {
        const { id, value } = e.target;
        this.setState(prevState => ({
            actividad: {
                ...prevState.actividad,
                [id]: value
            }
        }));
    }

    resetState() {
        this.setState({
            visible: false,
            actividad: {
                id_actividad: null,
                nombre_act: "",
                duración_act: "",
                precio_act: ""
            }
        });
        this.fetchActividades();
    }

    render() {
        return (
            <div style={{ width: '80%', margin: '20px auto 0px' }}>
                <Menubar model={this.items} />
                <br />
                <Panel header="Gestión de Actividades">
                    <DataTable value={this.state.actividades} selectionMode="single" selection={this.state.selectedActividad}
                        onSelectionChange={(e) => this.setState({ selectedActividad: e.value })} paginator rows={10} rowsPerPageOptions={[5, 10, 25, 50]}>
                        <Column field="id_actividad" header="ID"></Column>
                        <Column field="nombre_act" header="Nombre"></Column>
                        <Column field="duración_act" header="Duración (Horas)"></Column>
                        <Column field="precio_act" header="Precio"></Column>
                    </DataTable>
                </Panel>

                <Dialog header="Actividad" visible={this.state.visible} style={{ width: '400px' }} footer={this.footer} modal={true} onHide={() => this.setState({ visible: false })}>
                    <br />
                    <FloatLabel>
                        <InputText style={{ width: '100%' }} value={this.state.actividad.nombre_act} id="nombre_act" onChange={this.handleChange} />
                        <label htmlFor="nombre_act">Nombre</label>
                    </FloatLabel>
                    <br />
                    <FloatLabel>
                        <InputText style={{ width: '100%' }} value={this.state.actividad.duración_act} id="duración_act" onChange={this.handleChange} />
                        <label htmlFor="duración_act">Duración (Horas)</label>
                    </FloatLabel>
                    <br />
                    <FloatLabel>
                        <InputText style={{ width: '100%' }} value={this.state.actividad.precio_act} id="precio_act" onChange={this.handleChange} />
                        <label htmlFor="precio_act">Precio</label>
                    </FloatLabel>
                    <br />
                </Dialog>

                <Toast ref={this.Toast} />
            </div>
        );
    }
}
