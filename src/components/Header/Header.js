import { NavLink } from "react-router-dom";
import Style from "./Header.module.css";

function Header() {
	const items = [
		{ label: "Inicio", icon: "pi pi-fw pi-home", url: "/", id: 1 },
		{ label: "Usuarios", icon: "pi pi-fw pi-user", url: "/usuarios", id: 2 },
		{ label: "Productos", icon: "pi pi-fw pi-box", url: "/productos", id: 3 },
		{ label: "Clientes", icon: "pi pi-fw pi-users", url: "/clientes", id: 4 },
		{ label: "Actividades", icon: "pi pi-fw pi-calendar", url: "/actividades", id: 5 },
		{ label: "Rutas", icon: "pi pi-fw pi-map", url: "/rutas", id: 6 },
		{ label: "Hospedaje", icon: "pi pi-fw pi-map", url: "/hospedaje", id: 7 },
	];
	return (
		<header className={Style.header}>
			<nav>
				<ul className={Style.ul}>
					{
						items.map(link => (
							<li key={link.id} className={Style.li}>
								<NavLink
									to={link.url}
									className={({ isActive }) => (isActive ? Style.navLinkActive : Style.navLink)}
								>
									<i className={link.icon}></i>
									{link.label}
								</NavLink>
							</li>
						))
					}
				</ul>
			</nav>
		</header>
	);
}

export default Header;
