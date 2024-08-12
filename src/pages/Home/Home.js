import React from 'react';
import { Panel } from 'primereact/panel';
import { Link } from 'react-router-dom';
import { Button } from 'primereact/button';
import '../../App.css';

const Home = () => {
    const buttons = [
        {
            label: "Ir a Usuarios",
            icon: "pi pi-user",
            link: "/usuarios",
            className: "p-button-success"
        },
        {
            label: "Ir a Clientes",
            icon: "pi pi-users",
            link: "/clientes",
            className: "p-button-info"
        },
        {
            label: "Ir a Actividades",
            icon: "pi pi-calendar",
            link: "/actividades",
            className: "p-button-warning"
        },
        {
            label: "Ir a Productos",
            icon: "pi pi-box",
            link: "/productos",
            className: "p-button-primary"
        },
        {
            label: "Ir a Rutas",
            icon: "pi pi-map",
            link: "/rutas",
            className: "p-button-secondary"
        },
        {
            label: "Ir a Hospedaje",
            icon: "pi pi-home",
            link: "/hospedaje",
            className: "p-button-secondary"
        },
    ]
    return (
        <div style={{ width: '80%', margin: '20px auto 0px' }}>
            <Panel header="Bienvenido a la Gestión de Datos de EcoTourExpress (CRUD)" style={{ textAlign: 'center' }}>
                <h2>¡Bienvenido!</h2>
                <p>
                    Esta es tu aplicación para gestionar usuarios, clientes, actividades, productos y rutas.
                </p>
                <div style={{ textAlign: 'center' }}>
                    {
                        buttons.map((button, index) => (
                            <Link to={button.link} key={index}>
                                <Button label={button.label} icon={button.icon} className={button.className} />
                            </Link>
                        ))
                    }
                </div>
            </Panel>
        </div>
    );
}

export default Home;
