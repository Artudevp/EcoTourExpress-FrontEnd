import axios from 'axios';

const API_URL = 'http://localhost:8080/clientes';

class ClienteService {
    async getAllClientes() {
        const res = await axios.get(API_URL);
        return res.data;
    }

    async getClienteById(id) {
        const res = await axios.get(`${API_URL}/${id}`);
        return res.data;
    }

    async createCliente(cliente) {
        const res = await axios.post(API_URL, cliente);
        return res.data;
    }

    async updateCliente(id, cliente) {
        const res = await axios.put(`${API_URL}/${id}`, cliente);
        return res.data;
    }

    async deleteCliente(id) {
        const res = await axios.delete(`${API_URL}/${id}`);
        return res.data;
    }

    //hay metodos que hay que agregar en el service y el controller de la entidad java OJO
    
    async getActividadesCliente(id) {
        const res = await axios.get(`${API_URL}/${id}/actividades`);
        return res.data;
    }

    async getRutasCliente(id) {
        const res = await axios.get(`${API_URL}/${id}/rutas`);
        return res.data;
    }

    async getHospedajeCliente(id) {
        const res = await axios.get(`${API_URL}/${id}/hospedaje`);
        return res.data;
    }

    async addActividadCliente(id, actividad) {
        const res = await axios.post(`${API_URL}/${id}/actividades`, actividad);
        return res.data;
    }

    async removeActividadCliente(id, actividadId) {
        const res = await axios.delete(`${API_URL}/${id}/actividades/${actividadId}`);
        return res.data;
    }

    async addRutaCliente(id, ruta) {
        const res = await axios.post(`${API_URL}/${id}/rutas`, ruta);
        return res.data;
    }

    async removeRutaCliente(id, rutaId) {
        const res = await axios.delete(`${API_URL}/${id}/rutas/${rutaId}`);
        return res.data;
    }

    async addHospedajeCliente(id, hospedaje) {
        const res = await axios.post(`${API_URL}/${id}/hospedaje`, hospedaje);
        return res.data;
    }

    async removeHospedajeCliente(id, hospedajeId) {
        const res = await axios.delete(`${API_URL}/${id}/hospedaje/${hospedajeId}`);
        return res.data;
    }

    /* 
    removeErrores(error){
        return axios.eliminarError(`${API_URL}/${error}/errores`);
        //ojalá algo asi sirviera :(
    }*/
}

const clienteService = new ClienteService();

export default clienteService;
