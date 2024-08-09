import axios from "axios";


export class UsuarioService{
    baseurl = "http://localhost:8080/usuarios"

    getAll(){
        return axios.get(this.baseurl + "/todos").then(res => res.data)
    }

    save(usuario){
        return axios.post(this.baseurl + "/nuevo", usuario).then (res => res.data)
    }

    update(id_usuario, usuario) {
        return axios.put(this.baseurl + "/editar/" + id_usuario, usuario).then(res => res.data);
    }

    delete(id_usuario){
        return axios.post(this.baseurl + "/delete/" + id_usuario).then (res => res.data)
    }
}