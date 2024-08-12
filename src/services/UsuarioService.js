import axios from "axios";


export class UsuarioService{
    baseurl = "http://localhost:8080/usuarios"

    async getAll(){
        const res = await axios.get(this.baseurl);
        return res.data;
    }

    async save(usuario){
        const res = await axios.post(this.baseurl, usuario);
        return res.data;
    }

    async update(id_usuario, usuario) {
        const res = await axios.put(`${this.baseurl}/${id_usuario}`, usuario);
        return res.data;
    }

    async delete(id_usuario){
        const res = await axios.post(`${this.baseurl}/${id_usuario}`);
        return res.data;
    }
}