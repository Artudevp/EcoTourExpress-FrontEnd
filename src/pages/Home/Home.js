import React from 'react';
import { Panel } from 'primereact/panel';
import { Button } from 'primereact/button';
import '../../App.css'; 

const Home = () => {
    return (
        <div style={{ width: '80%', margin: '20px auto 0px' }}>
            <Panel header="Bienvenido a la Gestión de Datos de EcoTourExpress (CRUD)" style={{ textAlign: 'center' }}>
                <h2>¡Bienvenido!</h2>
                <p>
                    Esta es tu aplicación para gestionar usuarios, clientes, actividades, productos y rutas.
                </p>
                <div style={{ textAlign: 'center' }}>
                    <Button label="Ir a Usuarios" icon="pi pi-user" className="p-button-success" onClick={() => window.location.href = '/usuarios'} />
                    <Button label="Ir a Clientes" icon="pi pi-users" className="p-button-info" onClick={() => window.location.href = '/clientes'} />
                    <Button label="Ir a Actividades" icon="pi pi-calendar" className="p-button-warning" onClick={() => window.location.href = '/actividades'} />
                    <Button label="Ir a Productos" icon="pi pi-box" className="p-button-primary" onClick={() => window.location.href = '/productos'} />
                    <Button label="Ir a Rutas" icon="pi pi-map" className="p-button-secondary" onClick={() => window.location.href = '/rutas'} />
                    <Button label="Ir a Hospedaje" icon="pi pi-home" className="p-button-secondary" onClick={() => window.location.href = '/hospedaje'} />
                </div>
            </Panel>
        </div>
    );
}

export default Home;
