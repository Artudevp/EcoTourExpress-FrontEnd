import axios from 'axios';

const API_URL = 'http://localhost:8080/hospedajes';

class HospedajeService {
    getAllHospedajes() {
        return axios.get(`${API_URL}/todos`).then(res => res.data);
    }

    createHospedaje(hospedaje) {
        return axios.post(`${API_URL}/nuevo`, hospedaje);
    }

    updateHospedaje(id, hospedaje) {
        return axios.put(`${API_URL}/editar/${id}`, hospedaje);
    }

    deleteHospedaje(id) {
        return axios.post(`${API_URL}/delete/${id}`);
    }
}

const hospedajeServiceInstance = new HospedajeService();

export default hospedajeServiceInstance;