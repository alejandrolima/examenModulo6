<template>
    <div class="row">
        <div class="container">
            <h3>Agregar nueva categoria</h3>

            <div class="row mt-3">
                <label>Categoria</label>
                <input 
                type="text"
                class="form-control"
                v-model="Categoria.descripcion"
                >
            </div>

            <div class="row mt-2">
                <button 
                class="success"
                v-on:click="accion()">
                    Guardar
                </button>
            </div>
        </div>
        
        <div class="container mt-3">
            <h3>Lista de Categorias</h3>
            <table class="table">
                <thead>
                    <th>Nro.</th>
                    <th>Descripción</th>
                    <th>Opciones</th>
                </thead>
                <tbody>
                    <tr v-for="(categoria, index) of Categorias" :key="categoria">
                        <td>{{  index + 1 }}</td>
                        <td>{{ categoria.descripcion }}</td>
                        <td>
                            <button v-on:click="selectCategoria(categoria)">Editar</button>
                            <button v-on:click="deleteCategoria(categoria)">Eliminar</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
    import axios from "axios";

    export default {
        name: 'categoriaView',
        data() {      
            return{
                Categoria: {"id": "", "descripcion": ""},
                Categorias: Object,
                valor: 0
            }
        },
        created() {
            console.log('creado');
            this.getCategorias();   
        },
        methods: {
            async getCategorias() {
                try {
                    const res = await axios.get(`http://localhost:3000/Categorias`);
                    this.Categorias = res.data;
                } catch (error) {
                    console.log(error);
                }
            },
            async addCategoria() {
                try {
                    await axios.post(`http://localhost:3000/Categorias`, this.Categoria);
                    this.getCategorias();
                    this.Categoria = {};
                } catch (error) {
                    console.log(error);
                }
            },
            async updateCategoria(categoria) {
                try {
                    await axios.patch(`http://localhost:3000/Categorias/${categoria.id}`, categoria);
                    this.getCategorias();
                    this.valor = 0;
                    this.Categoria = {};
                } catch (error) {
                    console.log(error);
                }
            },
            async deleteCategoria(categoria){
                axios.delete(`http://localhost:3000/Categorias/${categoria.id}`);
                this.getCategorias();
            },
            accion() {
                if(this.valor == 0) {
                    this.addCategoria();
                } else {
                    this.updateCategoria(this.Categoria);
                }
            },
            selectCategoria(Categoria) {
                this.Categoria = Categoria;
                this.valor = 1;
            }    
        }
    }
</script>

<style>
.presentacion {
    background: orangered; 
    color: white; 
    font-weight: bold; 
    display: flex; justify-content: left;
}
.color-box {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin: 7px;
    display: inline-block;
}       

.quantity button{
    border-radius: 50%;
    display: inline-block;
    width: 30px;
}
.quantity div{
    text-align: center;
    min-width: 30px;
    display: inline-block;
    font-weight: bold;
}
.buy-box{
    margin: 20px;
}
.container{
    margin-top: 50px;
}
.success {
    background-color: cadetblue;
}
            
</style>
