import axios from "axios";

class RutaService {
    baseurl = "http://localhost:8080/rutas/";

    getAllRutas() {
        return axios.get(this.baseurl + "todas").then(res => res.data);
    }

    getRutaById(id_ruta) {
        return axios.get(this.baseurl + id_ruta).then(res => res.data);
    }

    createRuta(ruta) {
        return axios.post(this.baseurl + "nueva", ruta).then(res => res.data);
    }

    updateRuta(id_ruta, ruta) {
        return axios.put(this.baseurl + "editar/" + id_ruta, ruta).then(res => res.data);
    }

    deleteRuta(id_ruta) {
        return axios.delete(this.baseurl + "delete/" + id_ruta)
            .then(res => res.data)
            .catch(error => {
                console.error("Error eliminando la ruta:", error);
                throw error;
            });
    }
    
}

const rutaServiceInstance = new RutaService();

export default rutaServiceInstance;
