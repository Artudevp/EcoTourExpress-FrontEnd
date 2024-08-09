import "../App.css";
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/soho-dark/theme.css';
import { UsuarioService } from "../services/UsuarioService";
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

export default class Usuarios extends Component {
    constructor() {
        super();
        this.state = {
            visible: false,
            usuario: {
                id_usuario: null,
                nombre: null,
                correo: null,
                contraseña: null
            },
            selectedUsuario: {},
            usuarios: []
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
        this.usuarioService = new UsuarioService();
        this.save = this.save.bind(this);
        this.footer = (
            <div>
                <Button label="Guardar" icon="pi pi-check" onClick={this.save} />
            </div>
        );
        this.Toast = React.createRef();
    }

    componentDidMount() {
        this.usuarioService.getAll().then(data => this.setState({ usuarios: data }));
    }

    save() {
        if (this.state.usuario.id_usuario) {
            this.usuarioService.update(this.state.usuario.id_usuario, this.state.usuario).then(data => {
                this.setState({
                    visible: false,
                    usuario: {
                        id_usuario: null,
                        nombre: null,
                        correo: null,
                        contraseña: null
                    }
                });
                this.Toast.current.show({ severity: "success", summary: "Atención!", detail: "Se actualizó correctamente el registro" });
                this.usuarioService.getAll().then(data => this.setState({ usuarios: data }));
            });
        } else {
            this.usuarioService.save(this.state.usuario).then(data => {
                this.setState({
                    visible: false,
                    usuario: {
                        id_usuario: null,
                        nombre: null,
                        correo: null,
                        contraseña: null
                    }
                });
                this.Toast.current.show({ severity: "success", summary: "Atención!", detail: "Se guardó correctamente el registro" });
                this.usuarioService.getAll().then(data => this.setState({ usuarios: data }));
            });
        }
    }

    delete() {
        if (window.confirm("¿Desea eliminar el registro seleccionado?")) {
            this.usuarioService.delete(this.state.selectedUsuario.id_usuario).then(data => {
                this.Toast.current.show({ severity: "success", summary: "Atención!", detail: "Se eliminó correctamente el registro" });
                this.usuarioService.getAll().then(data => this.setState({ usuarios: data }));
            });
        }
    }

    showSaveDialog() {
        this.setState({
            visible: true,
            usuario: {
                id_usuario: null,
                nombre: null,
                correo: null,
                contraseña: null
            }
        });
    }

    showEditDialog() {
        this.setState({
            visible: true,
            usuario: {
                id_usuario: this.state.selectedUsuario.id_usuario,
                nombre: this.state.selectedUsuario.nombre,
                correo: this.state.selectedUsuario.correo,
                contraseña: this.state.selectedUsuario.contraseña
            }
        });
    }

    render() {
        return (
            <div style={{ width: '80%', margin: '20px auto 0px' }}>
                <Menubar model={this.items} />
                <br />
                <Panel header="Gestión de Usuarios">
                    <DataTable value={this.state.usuarios} selectionMode="single" selection={this.state.selectedUsuario}
                        onSelectionChange={(e) => this.setState({ selectedUsuario: e.value })} paginator rows={10} rowsPerPageOptions={[5, 10, 25, 50]}>
                        <Column field="id_usuario" header="ID"></Column>
                        <Column field="nombre" header="Nombre"></Column>
                        <Column field="correo" header="Correo"></Column>
                        <Column field="contraseña" header="Contraseña"></Column>
                    </DataTable>
                </Panel>

                <Dialog header="Usuarios" visible={this.state.visible} style={{ width: '400px' }} footer={this.footer} modal={true} onHide={() => this.setState({ visible: false })}>
                    <br />
                    <FloatLabel>
                        <InputText style={{ width: '100%' }} value={this.state.usuario.nombre} id="nombre" onChange={(e) => {
                            let val = e.target.value;
                            this.setState(prevState => {
                                let usuario = Object.assign({}, prevState.usuario);
                                usuario.nombre = val;
                                return { usuario };
                            })
                        }} />
                        <label htmlFor="nombre">Nombre</label>
                    </FloatLabel>
                    <br />
                    <FloatLabel>
                        <InputText style={{ width: '100%' }} value={this.state.usuario.correo} id="correo" onChange={(e) => {
                            let val = e.target.value;
                            this.setState(prevState => {
                                let usuario = Object.assign({}, prevState.usuario);
                                usuario.correo = val;
                                return { usuario };
                            })
                        }} />
                        <label htmlFor="correo">E-mail</label>
                    </FloatLabel>
                    <br />
                    <FloatLabel>
                        <InputText style={{ width: '100%' }} value={this.state.usuario.contraseña} id="contraseña" onChange={(e) => {
                            let val = e.target.value;
                            this.setState(prevState => {
                                let usuario = Object.assign({}, prevState.usuario);
                                usuario.contraseña = val;
                                return { usuario };
                            })
                        }} />
                        <label htmlFor="contraseña">Contraseña</label>
                    </FloatLabel>
                    <br />
                </Dialog>

                <Toast ref={this.Toast} />
            </div>
        );
    }
}
