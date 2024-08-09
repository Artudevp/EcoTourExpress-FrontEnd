import axios from "axios";

class ActividadService {
    baseurl = "http://localhost:8080/actividades/";

    getAllActividades() {
        return axios.get(this.baseurl + "todas").then(res => res.data);
    }

    getActividadById(id_actividad) {
        return axios.get(this.baseurl + id_actividad).then(res => res.data);
    }

    createActividad(actividad) {
        return axios.post(this.baseurl + "nueva", actividad).then(res => res.data);
    }

    updateActividad(id_actividad, actividad) {
        return axios.put(this.baseurl + "editar/" + id_actividad, actividad).then(res => res.data);
    }

    deleteActividad(id_actividad) {
        return axios.delete(this.baseurl + "delete/" + id_actividad).then(res => res.data);
    }
}

const actividadServiceInstance = new ActividadService();

export default actividadServiceInstance;
