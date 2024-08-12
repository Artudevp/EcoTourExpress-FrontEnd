import axios from "axios";


export class ProductoService{
    baseurl = "http://localhost:8080/productos"

    async getAll(){
        const res = await axios.get(this.baseurl);
        return res.data;
    }

    async save(producto){
        const res = await axios.post(this.baseurl, producto);
        return res.data;
    }

    async update(id_producto, producto) {
        const res = await axios.put(`${this.baseurl}/${id_producto}`, producto);
        return res.data;
    }

    async delete(id_producto){
        const res = await axios.post(`${this.baseurl}/${id_producto}`);
        return res.data;
    }
}