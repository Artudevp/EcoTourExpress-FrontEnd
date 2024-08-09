import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import { Menubar } from 'primereact/menubar';
import 'primereact/resources/themes/soho-dark/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import './App.css';

import Home from './components/Home';
import Usuarios from './components/Usuarios';
import Productos from './components/Productos';
import Clientes from './components/Clientes';
import Actividades from './components/Actividades';
import Rutas from './components/Rutas';
import Hospedaje from './components/Hospedaje';

function App() {
    const items = [
        { label: 'Inicio', icon: 'pi pi-fw pi-home', command: () => { window.location = "/" }},
        { label: 'Usuarios', icon: 'pi pi-fw pi-user', command: () => { window.location = "/Usuarios" }},
        { label: 'Productos', icon: 'pi pi-fw pi-box', command: () => { window.location = "/Productos" }},
        { label: 'Clientes', icon: 'pi pi-fw pi-users', command: () => {window.location = "/Clientes"}},
        { label: 'Actividades', icon: 'pi pi-fw pi-calendar', command: () => {window.location = "/Actividades"}},
        { label: 'Rutas', icon: 'pi pi-fw pi-map', command: () => {window.location =  "/Rutas"}},        
        { label: 'Hospedaje', icon: 'pi pi-fw pi-map', command: () => {window.location =  "/Hospedaje"}}
    ];

    return (
        <Router>
            <div className="App">
                <Menubar model={items} />
                <div className="container mt-4">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/Usuarios" element={<Usuarios />} />
                        <Route path="/Productos" element={<Productos />} />
                        <Route path="/Clientes" element={<Clientes/>} />
                        <Route path="/Actividades" element={<Actividades/>} />
                        <Route path="/Rutas" element={<Rutas/>} />
                        <Route path="/Hospedaje" element={<Hospedaje/>} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;
