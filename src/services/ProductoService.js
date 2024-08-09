import axios from "axios";


export class ProductoService{
    baseurl = "http://localhost:8080/productos"

    getAll(){
        return axios.get(this.baseurl + "/todos").then(res => res.data)
    }

    save(producto){
        return axios.post(this.baseurl + "/nuevo", producto).then (res => res.data)
    }

    update(id_producto, producto) {
        return axios.put(this.baseurl + "/editar/" + id_producto, producto).then(res => res.data);
    }

    delete(id_producto){
        return axios.post(this.baseurl + "/delete/" + id_producto).then (res => res.data)
    }
}