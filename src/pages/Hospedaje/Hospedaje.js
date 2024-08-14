// src/components/Hospedaje.js
import React, { Component } from "react";
import "../../App.css";
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/soho-dark/theme.css';
import HospedajeService from "../../services/HospedajeService";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Panel } from 'primereact/panel';
import { Menubar } from 'primereact/menubar';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { FloatLabel } from 'primereact/floatlabel';
import { Button } from 'primereact/button';
import { Toast } from "primereact/toast";

export default class Hospedaje extends Component {
    constructor() {
        super();
        this.state = {
            visible: false,
            hospedaje: {
                id_habitacion: null,
                tipo_hab: "",
                capacidad: "",
                disponibilidad: "",
                precio_hab: ""
            },
            selectedHospedaje: {},
            hospedajes: []
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
        this.fetchHospedajes();
    }

    fetchHospedajes() {
        HospedajeService.getAllHospedajes().then(res => {
            this.setState({ hospedajes: res });
        }).catch(error => {
            this.Toast.current.show({ severity: "error", summary: "Error", detail: "No se pudo cargar los hospedajes" });
        });
    }

    save() {
        const { id_habitacion } = this.state.hospedaje;
        if (id_habitacion) {
            HospedajeService.updateHospedaje(id_habitacion, this.state.hospedaje).then(() => {
                this.resetState();
                this.Toast.current.show({ severity: "success", summary: "Éxito", detail: "Se actualizó correctamente el registro" });
            }).catch(error => {
                this.Toast.current.show({ severity: "error", summary: "Error", detail: "No se pudo actualizar el hospedaje" });
            });
        } else {
            HospedajeService.createHospedaje(this.state.hospedaje).then(() => {
                this.resetState();
                this.Toast.current.show({ severity: "success", summary: "Éxito", detail: "Se guardó correctamente el registro" });
            }).catch(error => {
                this.Toast.current.show({ severity: "error", summary: "Error", detail: "No se pudo guardar el hospedaje" });
            });
        }
    }

    delete() {
        const { id_habitacion } = this.state.selectedHospedaje;
        if (id_habitacion && window.confirm("¿Desea eliminar el registro seleccionado?")) {
            HospedajeService.deleteHospedaje(id_habitacion).then(() => {
                this.resetState();
                this.Toast.current.show({ severity: "success", summary: "Éxito", detail: "Se eliminó correctamente el registro" });
            }).catch(error => {
                this.Toast.current.show({ severity: "error", summary: "Error", detail: "No se pudo eliminar el hospedaje" });
            });
        }
    }

    showSaveDialog() {
        this.setState({
            visible: true,
            hospedaje: {
                id_habitacion: null,
                tipo_hab: "",
                capacidad: "",
                disponibilidad: "",
                precio_hab: ""
            }
        });
    }

    showEditDialog() {
        this.setState({
            visible: true,
            hospedaje: { ...this.state.selectedHospedaje }
        });
    }

    handleChange(e) {
        const { id, value } = e.target;
        this.setState(prevState => ({
            hospedaje: {
                ...prevState.hospedaje,
                [id]: value
            }
        }));
    }

    resetState() {
        this.setState({
            visible: false,
            hospedaje: {
                id_habitacion: null,
                tipo_hab: "",
                capacidad: "",
                disponibilidad: "",
                precio_hab: ""
            }
        });
        this.fetchHospedajes();
    }

    render() {
        return (
            <div style={{ width: '80%', margin: '20px auto 0px' }}>
                <Menubar model={this.items} />
                <br />
                <Panel header="Gestión de Hospedajes">
                    <DataTable value={this.state.hospedajes} selectionMode="single" selection={this.state.selectedHospedaje}
                        onSelectionChange={(e) => this.setState({ selectedHospedaje: e.value })} paginator rows={10} rowsPerPageOptions={[5, 10, 25, 50]}>
                        <Column field="id_habitacion" header="ID"></Column>
                        <Column field="tipo_hab" header="Tipo"></Column>
                        <Column field="capacidad" header="Capacidad (Personas)"></Column>
                        <Column field="disponibilidad" header="Disponibilidad"></Column>
                        <Column field="precio_hab" header="Precio"></Column>
                    </DataTable>
                </Panel>

                <Dialog header="Hospedaje" visible={this.state.visible} style={{ width: '400px' }} footer={this.footer} modal={true} onHide={() => this.setState({ visible: false })}>
                    <br />
                    <FloatLabel>
                        <InputText style={{ width: '100%' }} value={this.state.hospedaje.tipo_hab} id="tipo_hab" onChange={this.handleChange} />
                        <label htmlFor="tipo_hab">Tipo</label>
                    </FloatLabel>
                    <br />
                    <FloatLabel>
                        <InputText style={{ width: '100%' }} value={this.state.hospedaje.capacidad} id="capacidad" onChange={this.handleChange} />
                        <label htmlFor="capacidad">Capacidad (Personas)</label>
                    </FloatLabel>
                    <br />
                    <FloatLabel>
                        <InputText style={{ width: '100%' }} value={this.state.hospedaje.disponibilidad} id="disponibilidad" onChange={this.handleChange} />
                        <label htmlFor="disponibilidad">Disponibilidad</label>
                    </FloatLabel>
                    <br />
                    <FloatLabel>
                        <InputText style={{ width: '100%' }} value={this.state.hospedaje.precio_hab} id="precio_hab" onChange={this.handleChange} />
                        <label htmlFor="precio_hab">Precio</label>
                    </FloatLabel>
                    <br />
                </Dialog>

                <Toast ref={this.Toast} />
            </div>
        );
    }
}
