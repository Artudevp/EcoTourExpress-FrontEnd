import axios from "axios";

class ActividadService {
    baseurl = "http://localhost:8080/actividades";

    async getAllActividades() {
        const res = await axios.get(this.baseurl);
        return res.data;
    }

    async getActividadById(id_actividad) {
        const res = await axios.get(this.baseurl + id_actividad);
        return res.data;
    }

    async createActividad(actividad) {
        const res = await axios.post(this.baseurl, actividad);
        return res.data;
    }

    async updateActividad(id_actividad, actividad) {
        const res = await axios.put(this.baseurl + id_actividad, actividad);
        return res.data;
    }

    async deleteActividad(id_actividad) {
        const res = await axios.delete(this.baseurl + id_actividad);
        return res.data;
    }
}

const actividadServiceInstance = new ActividadService();

export default actividadServiceInstance;
