// src/components/Cliente.js
import "../../App.css";
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/soho-dark/theme.css';
import ClienteService from "../../services/ClienteService";
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

export default class Cliente extends Component {
    constructor() {
        super();
        this.state = {
            visible: false,
            cliente: {
                id_cliente: null,
                edad: "",
                genero: "",
                nombre_cli: "",
                id_habitacion: "",
            },
            selectedCliente: {},
            clientes: [],
            dialogTipo: ''
        };
        this.items = [
            {
                label: "Nuevo",
                icon: "pi pi-fw pi-user-plus",
                command: () => { this.showSaveDialog() }
            },
            {
                label: "Editar",
                icon: "pi pi-fw pi-user-edit",
                command: () => { this.showEditDialog() }
            },
            {
                label: "Eliminar",
                icon: "pi pi-fw pi-user-minus",
                command: () => { this.delete() }
            }
        ];
        this.save = this.save.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.resetState = this.resetState.bind(this);
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

    fetchClienteDetails(id) {
        ClienteService.getClienteById(id).then(res => {
            this.setState({ cliente: res });
        }).catch(error => {
            this.Toast.current.show({ severity: "error", summary: "Error", detail: "No se pudieron cargar los detalles del cliente" });
        });
    }

    save() {
        const { id_cliente } = this.state.cliente;
        if (id_cliente) {
            ClienteService.updateCliente(id_cliente, this.state.cliente).then(() => {
                this.resetState();
                this.Toast.current.show({ severity: "success", summary: "Éxito", detail: "Cliente actualizado correctamente" });
            }).catch(error => {
                this.Toast.current.show({ severity: "error", summary: "Error", detail: "No se pudo actualizar el cliente" });
            });
        } else {
            ClienteService.createCliente(this.state.cliente).then(() => {
                this.resetState();
                this.Toast.current.show({ severity: "success", summary: "Éxito", detail: "Cliente guardado correctamente" });
            }).catch(error => {
                this.Toast.current.show({ severity: "error", summary: "Error", detail: "No se pudo guardar el cliente" });
            });
        }
    }

    delete() {
        const { id_cliente } = this.state.selectedCliente;
        if (id_cliente && window.confirm("¿Desea eliminar el cliente seleccionado?")) {
            ClienteService.deleteCliente(id_cliente).then(() => {
                this.resetState();
                this.Toast.current.show({ severity: "success", summary: "Éxito", detail: "Cliente eliminado correctamente" });
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
                edad: "",
                genero: "",
                nombre_cli: "",
                id_habitacion: "",
            },
            dialogTipo: 'save'
        });
    }

    showEditDialog() {
        const { id_cliente } = this.state.selectedCliente;
        if (id_cliente) {
            this.fetchClienteDetails(id_cliente);
            this.setState({ visible: true, dialogTipo: 'edit' });
        } else {
            this.Toast.current.show({ severity: "warn", summary: "Advertencia", detail: "Seleccione un cliente para editar" });
        }
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
                edad: "",
                genero: "",
                nombre_cli: "",
                id_habitacion: ""
            },
            selectedCliente: {},
            clientes: []
        });
        this.fetchClientes();
    }

    render() {
        const footer = (
            <div>
                <Button label="Guardar" icon="pi pi-check" onClick={this.save} />
                <Button label="Cancelar" icon="pi pi-times" onClick={() => this.setState({ visible: false })} className="p-button-secondary" />
            </div>
        );

        return (
            <div>
                <Toast ref={this.Toast} />
                <Menubar model={this.items} />
                <Panel header="Clientes" style={{ width: '100%' }}>
                    <DataTable value={this.state.clientes} selectionMode="single" onSelectionChange={e => this.setState({ selectedCliente: e.value })}>
                        <Column field="id_cliente" header="ID"></Column>
                        <Column field="nombre_cli" header="Nombre"></Column>
                        <Column field="edad" header="Edad"></Column>
                        <Column field="genero" header="Género"></Column>
                        <Column field="id_habitacion" header="Habitación"></Column>
                    </DataTable>
                </Panel>

                <Dialog header="Cliente" visible={this.state.visible} modal footer={footer} onHide={() => this.setState({ visible: false })}>
                    <div>
                        <FloatLabel label="Nombre" className="p-mb-3">
                            <InputText id="nombre_cli" value={this.state.cliente.nombre_cli} onChange={this.handleChange} />
                        </FloatLabel>
                        <FloatLabel label="Edad" className="p-mb-3">
                            <InputText id="edad" value={this.state.cliente.edad} onChange={this.handleChange} />
                        </FloatLabel>
                        <FloatLabel label="Género" className="p-mb-3">
                            <InputText id="genero" value={this.state.cliente.genero} onChange={this.handleChange} />
                        </FloatLabel>
                        <FloatLabel label="Habitación" className="p-mb-3">
                            <InputText id="id_habitacion" value={this.state.cliente.id_habitacion} onChange={this.handleChange} />
                        </FloatLabel>
                    </div>
                </Dialog>
            </div>
        );
    }
}
