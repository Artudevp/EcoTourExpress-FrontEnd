import axios from 'axios';

const API_URL = 'http://localhost:8080/clientes';

class ClienteService {
    getAllClientes() {
        return axios.get(`${API_URL}/todos`).then(res => res.data);
    }

    getClienteById(id) {
        return axios.get(`${API_URL}/${id}`).then(res => res.data);
    }

    createCliente(cliente) {
        return axios.post(`${API_URL}/nuevo`, cliente);
    }

    updateCliente(id, cliente) {
        return axios.put(`${API_URL}/editar/${id}`, cliente);
    }

    deleteCliente(id) {
        return axios.delete(`${API_URL}/${id}`);
    }

    getActividadesCliente(id) {
        return axios.get(`${API_URL}/${id}/actividades`).then(res => res.data);
    }

    addActividadesCliente(id, actividades) {
        return axios.put(`${API_URL}/${id}/actividades`, actividades);
    }

    removeActividadCliente(id, actividadId) {
        return axios.delete(`${API_URL}/${id}/actividades/${actividadId}`);
    }

    getRutasCliente(id) {
        return axios.get(`${API_URL}/${id}/rutas`).then(res => res.data);
    }

    addRutasCliente(id, rutas) {
        return axios.put(`${API_URL}/${id}/rutas`, rutas);
    }

    removeRutaCliente(id, rutaId) {
        return axios.delete(`${API_URL}/${id}/rutas/${rutaId}`);
    }

    // removeErrores(error){
    //     return axios.eliminarError(`${API_URL}/${error}/errores`);
    //     //ojalá algo asi sirviera :(
    // }
}

const clienteService = new ClienteService();

export default clienteService;
