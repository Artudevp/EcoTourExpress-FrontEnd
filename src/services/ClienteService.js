import axios from 'axios';

const API_URL = 'http://localhost:8080/clientes';

class ClienteService {
    getAllClientes() {
        return axios.get(API_URL).then(res => res.data);
    }

    getClienteById(id) {
        return axios.get(`${API_URL}/${id}`).then(res => res.data);
    }

    createCliente(cliente) {
        return axios.post(API_URL, cliente);
    }

    updateCliente(id, cliente) {
        return axios.put(`${API_URL}/${id}`, cliente);
    }

    deleteCliente(id) {
        return axios.delete(`${API_URL}/${id}`);
    }

    //hay metodos que hay que agregar en el service y el controller de la entidad java OJO
    
    getActividadesCliente(id) {
        return axios.get(`${API_URL}/${id}/actividades`).then(res => res.data);
    }

    getRutasCliente(id) {
        return axios.get(`${API_URL}/${id}/rutas`).then(res => res.data);
    }

    getHospedajeCliente(id) {
        return axios.get(`${API_URL}/${id}/hospedaje`).then(res => res.data);
    }

    addActividadCliente(id, actividad) {
        return axios.post(`${API_URL}/${id}/actividades`, actividad);
    }

    removeActividadCliente(id, actividadId) {
        return axios.delete(`${API_URL}/${id}/actividades/${actividadId}`);
    }

    addRutaCliente(id, ruta) {
        return axios.post(`${API_URL}/${id}/rutas`, ruta);
    }

    removeRutaCliente(id, rutaId) {
        return axios.delete(`${API_URL}/${id}/rutas/${rutaId}`);
    }

    addHospedajeCliente(id, hospedaje) {
        return axios.post(`${API_URL}/${id}/hospedaje`, hospedaje);
    }

    removeHospedajeCliente(id, hospedajeId) {
        return axios.delete(`${API_URL}/${id}/hospedaje/${hospedajeId}`);
    }

    /* 
    removeErrores(error){
        return axios.eliminarError(`${API_URL}/${error}/errores`);
        //ojalá algo asi sirviera :(
    }*/
}

const clienteService = new ClienteService();

export default clienteService;
