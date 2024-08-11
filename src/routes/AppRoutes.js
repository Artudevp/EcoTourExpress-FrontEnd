import { BrowserRouter, Routes, Route } from "react-router-dom";

//* Import Pages
import Home from "../components/Home";
import Usuarios from "../components/Usuarios";
import Productos from "../components/Productos";
import Clientes from "../components/Clientes";
import Actividades from "../components/Actividades";
import Rutas from "../components/Rutas";
import Hospedaje from "../components/Hospedaje";

//* Import Component
import Header from "../components/Header";

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
