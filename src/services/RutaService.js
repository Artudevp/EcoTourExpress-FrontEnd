import axios from "axios";

class RutaService {
    baseurl = "http://localhost:8080/rutas";

    async getAllRutas() {
        const res = await axios.get(this.baseurl);
        return res.data;
    }

    async getRutaById(id_ruta) {
        const res = await axios.get(this.baseurl + id_ruta);
        return res.data;
    }

    async createRuta(ruta) {
        const res = await axios.post(this.baseurl, ruta);
        return res.data;
    }

    async updateRuta(id_ruta, ruta) {
        const res = await axios.put(`${this.baseurl}/${id_ruta}`, ruta);
        return res.data;
    }

    async deleteRuta(id_ruta) {
        try {
            const res = await axios.delete(`${this.baseurl}/${id_ruta}`);
            return res.data;
        } catch (error) {
            console.error("Error eliminando la ruta:", error);
            throw error;
        }
    }
    
}

const rutaServiceInstance = new RutaService();

export default rutaServiceInstance;
