import { NavLink } from "react-router-dom";

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
		<header style={{ backgroundColor: "#333544", border: "1px solid #3e4053", borderRadius: "6px", margin: "10px" }}>
			<nav>
				<ul style={{ display: "flex", flexDirection: "row", gap: "40px", margin: "0px", padding: "20px 30px" }}>
					{
						items.map(link => (
							<li key={link.id} style={{ listStyle: "none" }}>
								<NavLink
									to={link.url}
									style={{ color: "#ffffffde", textDecoration: "none", display: "flex", gap: "8px" }}
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
