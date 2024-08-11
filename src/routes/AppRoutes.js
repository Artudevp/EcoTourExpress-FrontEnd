import { BrowserRouter, Routes, Route } from "react-router-dom";

//* Import Pages
import Home from "../pages/Home/Home";
import Usuarios from "../pages/Usuarios/Usuarios";
import Productos from "../pages/Productos/Productos";
import Clientes from "../pages/Clientes/Clientes";
import Actividades from "../pages/Actividades/Actividades";
import Rutas from "../pages/Rutas/Rutas";
import Hospedaje from "../pages/Hospedaje/Hospedaje";

//* Import Component
import Header from "../components/Header/Header";

import "primereact/resources/themes/soho-dark/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

function AppRoutes() {
	return (
		<>

			<BrowserRouter>
				<Header />
				<Routes>
					<Route index element={<Home />}></Route>
					<Route path="usuarios" element={<Usuarios />}></Route>
					<Route path="productos" element={<Productos />}></Route>
					<Route path="clientes" element={<Clientes />}></Route>
					<Route path="actividades" element={<Actividades />}></Route>
					<Route path="rutas" element={<Rutas />}></Route>
					<Route path="hospedaje" element={<Hospedaje />}></Route>
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default AppRoutes;
