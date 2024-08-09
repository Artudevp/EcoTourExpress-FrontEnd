import "../App.css";
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/soho-dark/theme.css';
import RutaService from "../services/RutaService";
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

export default class Rutas extends Component {
    constructor() {
        super();
        this.state = {
            visible: false,
            ruta: {
                id_ruta: null,
                nombre_ruta: "",
                duración_ruta: "",
                precio: ""
            },
            selectedRuta: {},
            rutas: []
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
        this.toast = React.createRef();
    }

    componentDidMount() {
        this.fetchRutas();
    }

    fetchRutas() {
        RutaService.getAllRutas().then(res => {
            this.setState({ rutas: res });
        }).catch(error => {
            this.toast.current.show({ severity: "error", summary: "Error", detail: "No se pudo cargar las rutas" });
        });
    }

    save() {
        const { id_ruta } = this.state.ruta;
        if (id_ruta) {
            RutaService.updateRuta(id_ruta, this.state.ruta).then(() => {
                this.resetState();
                this.toast.current.show({ severity: "success", summary: "Éxito", detail: "Se actualizó correctamente el registro" });
            }).catch(error => {
                this.toast.current.show({ severity: "error", summary: "Error", detail: "No se pudo actualizar la ruta" });
            });
        } else {
            RutaService.createRuta(this.state.ruta).then(() => {
                this.resetState();
                this.toast.current.show({ severity: "success", summary: "Éxito", detail: "Se guardó correctamente el registro" });
            }).catch(error => {
                this.toast.current.show({ severity: "error", summary: "Error", detail: "No se pudo guardar la ruta" });
            });
        }
    }

    delete() {
        const { id_ruta } = this.state.selectedRuta;
        if (id_ruta && window.confirm("¿Desea eliminar el registro seleccionado?")) {
            RutaService.deleteRuta(id_ruta).then(() => {
                this.resetState();
                this.setState({ selectedRuta: {} });
                this.toast.current.show({ severity: "success", summary: "Éxito", detail: "Se eliminó correctamente el registro" });
            }).catch(error => {
                this.toast.current.show({ severity: "error", summary: "Error", detail: "No se pudo eliminar la ruta" });
            });
        }
    }    

    showSaveDialog() {
        this.setState({
            visible: true,
            ruta: {
                id_ruta: null,
                nombre_ruta: "",
                duración_ruta: "",
                precio: ""
            }
        });
    }

    showEditDialog() {
        this.setState({
            visible: true,
            ruta: { ...this.state.selectedRuta }
        });
    }

    handleChange(e) {
        const { id, value } = e.target;
        this.setState(prevState => ({
            ruta: {
                ...prevState.ruta,
                [id]: value
            }
        }));
    }

    resetState() {
        this.setState({
            visible: false,
            ruta: {
                id_ruta: null,
                nombre_ruta: "",
                duración_ruta: "",
                precio: ""
            }
        });
        this.fetchRutas();
    }

    render() {
        return (
            <div style={{ width: '80%', margin: '20px auto 0px' }}>
                <Menubar model={this.items} />
                <br />
                <Panel header="Gestión de Rutas">
                    <DataTable value={this.state.rutas} selectionMode="single" selection={this.state.selectedRuta}
                        onSelectionChange={(e) => this.setState({ selectedRuta: e.value })} paginator rows={10} rowsPerPageOptions={[5, 10, 25, 50]}>
                        <Column field="id_ruta" header="ID"></Column>
                        <Column field="nombre_ruta" header="Nombre"></Column>
                        <Column field="duración_ruta" header="Duración"></Column>
                        <Column field="precio" header="Precio"></Column>
                    </DataTable>
                </Panel>

                <Dialog header="Ruta" visible={this.state.visible} style={{ width: '400px' }} footer={this.footer} modal={true} onHide={() => this.setState({ visible: false })}>
                    <br />
                    <FloatLabel>
                        <InputText style={{ width: '100%' }} value={this.state.ruta.nombre_ruta} id="nombre_ruta" onChange={this.handleChange} />
                        <label htmlFor="nombre_ruta">Nombre</label>
                    </FloatLabel>
                    <br />
                    <FloatLabel>
                        <InputText style={{ width: '100%' }} value={this.state.ruta.duración_ruta} id="duración_ruta" onChange={this.handleChange} />
                        <label htmlFor="duración_ruta">Duración</label>
                    </FloatLabel>
                    <br />
                    <FloatLabel>
                        <InputText style={{ width: '100%' }} value={this.state.ruta.precio} id="precio" onChange={this.handleChange} />
                        <label htmlFor="precio">Precio</label>
                    </FloatLabel>
                    <br />
                </Dialog>

                <Toast ref={this.toast} />
            </div>
        );
    }
}
