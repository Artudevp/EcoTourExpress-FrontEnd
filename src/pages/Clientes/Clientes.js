// src/components/Clientes.js
import React, { Component } from "react";
import "../../App.css";
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/soho-dark/theme.css';
import ClienteService from "../../services/ClienteService";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Panel } from 'primereact/panel';
import { Menubar } from 'primereact/menubar';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { FloatLabel } from 'primereact/floatlabel';
import { Button } from 'primereact/button';
import { Toast } from "primereact/toast";

export default class Clientes extends Component {
    constructor() {
        super();
        this.state = {
            visible: false,
            cliente: {
                id_cliente: null,
                nombre_cli: "",
                cedula: "",
                genero: "",
                edad: ""
            },
            selectedCliente: {},
            clientes: []
        };
        this.items = [
            {
                label: "Nuevo",
                icon: "pi pi-fw pi-plus",
                command: () => { this.showSaveDialog() }
            },
            {
                label: "Editar",
                icon: "pi pi-fw pi-pencil",
                command: () => { this.showEditDialog() }
            },
            {
                label: "Eliminar",
                icon: "pi pi-fw pi-trash",
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
        this.fetchClientes();
    }

    fetchClientes() {
        ClienteService.getAllClientes().then(res => {
            this.setState({ clientes: res });
        }).catch(error => {
            this.Toast.current.show({ severity: "error", summary: "Error", detail: "No se pudo cargar los clientes" });
        });
    }

    save() {
        const { id_cliente } = this.state.cliente;
        if (id_cliente) {
            ClienteService.updateCliente(id_cliente, this.state.cliente).then(() => {
                this.resetState();
                this.Toast.current.show({ severity: "success", summary: "Éxito", detail: "Se actualizó correctamente el registro" });
            }).catch(error => {
                this.Toast.current.show({ severity: "error", summary: "Error", detail: "No se pudo actualizar el cliente" });
            });
        } else {
            ClienteService.createCliente(this.state.cliente).then(() => {
                this.resetState();
                this.Toast.current.show({ severity: "success", summary: "Éxito", detail: "Se guardó correctamente el registro" });
            }).catch(error => {
                this.Toast.current.show({ severity: "error", summary: "Error", detail: "No se pudo guardar el cliente" });
            });
        }
    }

    delete() {
        const { id_cliente } = this.state.selectedCliente;
        if (id_cliente && window.confirm("¿Desea eliminar el registro seleccionado?")) {
            ClienteService.deleteCliente(id_cliente).then(() => {
                this.resetState();
                this.Toast.current.show({ severity: "success", summary: "Éxito", detail: "Se eliminó correctamente el registro" });
            }).catch(error => {
                this.Toast.current.show({ severity: "error", summary: "Error", detail: "No se pudo eliminar el cliente" });
            });
        }
    }

    showSaveDialog() {
        this.setState({
            visible: true,
            cliente: {
                id_cliente: null,
                nombre_cli: "",
                cedula: "",
                genero: "",
                edad: ""
            }
        });
    }

    showEditDialog() {
        this.setState({
            visible: true,
            cliente: { ...this.state.selectedCliente }
        });
    }

    handleChange(e) {
        const { id, value } = e.target;
        this.setState(prevState => ({
            cliente: {
                ...prevState.cliente,
                [id]: value
            }
        }));
    }

    resetState() {
        this.setState({
            visible: false,
            cliente: {
                id_cliente: null,
                nombre_cli: "",
                cedula: "",
                genero: "",
                edad: ""
            }
        });
        this.fetchClientes();
    }

    render() {
        return (
            <div style={{ width: '80%', margin: '20px auto 0px' }}>
                <Menubar model={this.items} />
                <br />
                <Panel header="Gestión de Clientes">
                    <DataTable value={this.state.clientes} selectionMode="single" selection={this.state.selectedCliente}
                        onSelectionChange={(e) => this.setState({ selectedCliente: e.value })} paginator rows={10} rowsPerPageOptions={[5, 10, 25, 50]}>
                        <Column field="id_cliente" header="ID"></Column>
                        <Column field="nombre_cli" header="Nombre"></Column>
                        <Column field="cedula" header="Cédula"></Column>
                        <Column field="genero" header="Género"></Column>
                        <Column field="edad" header="Edad"></Column>
                    </DataTable>
                </Panel>

                <Dialog header="Cliente" visible={this.state.visible} style={{ width: '400px' }} footer={this.footer} modal={true} onHide={() => this.setState({ visible: false })}>
                    <br />
                    <FloatLabel>
                        <InputText style={{ width: '100%' }} value={this.state.cliente.nombre_cli} id="nombre_cli" onChange={this.handleChange} />
                        <label htmlFor="nombre_cli">Nombre</label>
                    </FloatLabel>
                    <br />
                    <FloatLabel>
                        <InputText style={{ width: '100%' }} value={this.state.cliente.cedula} id="cedula" onChange={this.handleChange} />
                        <label htmlFor="cedula">Cédula</label>
                    </FloatLabel>
                    <br />
                    <FloatLabel>
                        <InputText style={{ width: '100%' }} value={this.state.cliente.genero} id="genero" onChange={this.handleChange} />
                        <label htmlFor="genero">Género</label>
                    </FloatLabel>
                    <br />
                    <FloatLabel>
                        <InputText style={{ width: '100%' }} value={this.state.cliente.edad} id="edad" onChange={this.handleChange} />
                        <label htmlFor="edad">Edad</label>
                    </FloatLabel>
                    <br />
                </Dialog>

                <Toast ref={this.Toast} />
            </div>
        );
    }
}
