import "../App.css";
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/soho-dark/theme.css';
import { ProductoService } from "../services/ProductoService";
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

export default class Productos extends Component {
    constructor() {
        super();
        this.state = {
            visible: false,
            producto: {
                id_producto: null,
                categoria: '',
                nombre_p: '',
                precio_p: '',
                cantidad_disponible: ''
            },
            selectedProducto: {},
            productos: []
        };
        this.items = [
            {
                label: "Nuevo",
                icon: "pi pi-fw pi-plus-circle",
                command: () => { this.showSaveDialog() }
            },
            {
                label: "Editar",
                icon: "pi pi-fw pi-pencil",
                command: () => { this.showEditDialog() }
            },
            {
                label: "Eliminar",
                icon: "pi pi-fw pi-eraser",
                command: () => { this.delete() }
            }
        ];
        this.productoService = new ProductoService();
        this.save = this.save.bind(this);
        this.footer = (
            <div>
                <Button label="Guardar" icon="pi pi-check" onClick={this.save} />
            </div>
        );
        this.Toast = React.createRef();
    }

    componentDidMount() {
        this.productoService.getAll().then(data => this.setState({ productos: data }));
    }

    save() {
        if (this.state.producto.id_producto) {
            this.productoService.update(this.state.producto.id_producto, this.state.producto).then(data => {
                this.setState({
                    visible: false,
                    producto: {
                        id_producto: null,
                        categoria: '',
                        nombre_p: '',
                        precio_p: '',
                        cantidad_disponible: ''
                    }
                });
                this.Toast.current.show({ severity: "success", summary: "Atención!", detail: "Se actualizó correctamente el registro" });
                this.productoService.getAll().then(data => this.setState({ productos: data }));
            });
        } else {
            this.productoService.save(this.state.producto).then(data => {
                this.setState({
                    visible: false,
                    producto: {
                        id_producto: null,
                        categoria: '',
                        nombre_p: '',
                        precio_p: '',
                        cantidad_disponible: ''
                    }
                });
                this.Toast.current.show({ severity: "success", summary: "Atención!", detail: "Se guardó correctamente el registro" });
                this.productoService.getAll().then(data => this.setState({ productos: data }));
            });
        }
    }

    delete() {
        if (window.confirm("¿Desea eliminar el registro seleccionado?")) {
            this.productoService.delete(this.state.selectedProducto.id_producto).then(data => {
                this.Toast.current.show({ severity: "success", summary: "Atención!", detail: "Se eliminó correctamente el registro" });
                this.productoService.getAll().then(data => this.setState({ productos: data }));
            });
        }
    }

    showSaveDialog() {
        this.setState({
            visible: true,
            producto: {
                id_producto: null,
                categoria: '',
                nombre_p: '',
                precio_p: '',
                cantidad_disponible: ''
            }
        });
    }

    showEditDialog() {
        this.setState({
            visible: true,
            producto: {
                id_producto: this.state.selectedProducto.id_producto,
                categoria: this.state.selectedProducto.categoria,
                nombre_p: this.state.selectedProducto.nombre_p,
                precio_p: this.state.selectedProducto.precio_p,
                cantidad_disponible: this.state.selectedProducto.cantidad_disponible
            }
        });
    }

    render() {
        return (
            <div style={{ width: '80%', margin: '20px auto 0px' }}>
                <Menubar model={this.items} />
                <br />
                <Panel header="Gestión de Productos">
                    <DataTable value={this.state.productos} selectionMode="single" selection={this.state.selectedProducto}
                        onSelectionChange={(e) => this.setState({ selectedProducto: e.value })} paginator rows={10} rowsPerPageOptions={[5, 10, 25, 50]}>
                        <Column field="id_producto" header="ID"></Column>
                        <Column field="categoria" header="Categoria"></Column>
                        <Column field="nombre_p" header="Nombre Producto"></Column>
                        <Column field="precio_p" header="Precio"></Column>
                        <Column field="cantidad_disponible" header="Cantidad"></Column>
                    </DataTable>
                </Panel>

                <Dialog header="Productos" visible={this.state.visible} style={{ width: '400px' }} footer={this.footer} modal={true} onHide={() => this.setState({ visible: false })}>
                    <br />
                    <FloatLabel>
                        <InputText style={{ width: '100%' }} value={this.state.producto.categoria} id="categoria" onChange={(e) => {
                            let val = e.target.value;
                            this.setState(prevState => {
                                let producto = { ...prevState.producto };
                                producto.categoria = val;
                                return { producto };
                            })
                        }} />
                        <label htmlFor="categoria">Categoria</label>
                    </FloatLabel>
                    <br />
                    <FloatLabel>
                        <InputText style={{ width: '100%' }} value={this.state.producto.nombre_p} id="nombre_p" onChange={(e) => {
                            let val = e.target.value;
                            this.setState(prevState => {
                                let producto = { ...prevState.producto };
                                producto.nombre_p = val;
                                return { producto };
                            })
                        }} />
                        <label htmlFor="nombre_p">Nombre Producto</label>
                    </FloatLabel>
                    <br />
                    <FloatLabel>
                        <InputText style={{ width: '100%' }} value={this.state.producto.precio_p} id="precio_p" onChange={(e) => {
                            let val = e.target.value;
                            this.setState(prevState => {
                                let producto = { ...prevState.producto };
                                producto.precio_p = val;
                                return { producto };
                            })
                        }} />
                        <label htmlFor="precio_p">Precio</label>
                    </FloatLabel>
                    <br />
                    <FloatLabel>
                        <InputText style={{ width: '100%' }} value={this.state.producto.cantidad_disponible} id="cantidad_disponible" onChange={(e) => {
                            let val = e.target.value;
                            this.setState(prevState => {
                                let producto = { ...prevState.producto };
                                producto.cantidad_disponible = val;
                                return { producto };
                            })
                        }} />
                        <label htmlFor="cantidad_disponible">Cantidad en Stock</label>
                    </FloatLabel>
                    <br/>
                </Dialog>

                <Toast ref={this.Toast} />
            </div>
        );
    }
}
