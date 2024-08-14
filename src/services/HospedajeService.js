import axios from 'axios';

const API_URL = 'http://localhost:8080/hospedajes';

class HospedajeService {
    async getAllHospedajes() {
        const res = await axios.get(API_URL);
        return res.data;
    }

    async createHospedaje(hospedaje) {
        const res = await axios.post(API_URL, hospedaje);
        return res.data
    }

    async updateHospedaje(id, hospedaje) {
        const res = await axios.put(`${API_URL}/${id}`, hospedaje);
        return res.data;
    }

    async deleteHospedaje(id) {
        const res = await axios.get(`${API_URL}/${id}`);
        return res.data;
    }
}

const hospedajeServiceInstance = new HospedajeService();

export default hospedajeServiceInstance;