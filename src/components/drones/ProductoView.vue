<template>
  <div class="row">
    <h3>Agregar nuevo producto</h3>
    <div class="container">
      <div class="col-md-12">
        <label>Nombre producto:</label>
        <input 
        type="text"
        class="form-control"
        v-model="Producto.nombre"
        >
      </div>
      <div class="col-md-12">
        <label>Precio producto:</label>
        <input 
        type="number"
        class="form-control"
        v-model="Producto.precio"
        >
      </div>
      <div class="col-md-12">
        <label>Categoria</label>
        <select 
        class="form-control"
        v-model="Producto.Categoria">
          <option value="">Seleccione . . .</option>
          <option v-for="categoria in Categorias" :value="categoria" :key="categoria.id">{{ categoria.descripcion }}</option>
        </select>
      </div>
      <div class="col-md-12 text-center mt-3">
        <button 
        v-on:click="accion()">
          Guardar
        </button>
      </div>
    </div>

    <div class="container">
      <h3>Lista de Productos</h3>
      <div class="row col-md-2">
        <input 
        type="text" 
        class="form-control"
        v-model="buscar"
        >
        <select
        class="form-control"
        v-model="precio"
        >
        <option value="">Seleccione precio a filtrar</option>
          <option value="100">100</option>
        </select>
        <button 
        v-on:click="buscarProducto()">
          Buscar
        </button>
      </div>
      <table class="table">
        <thead>
          <th>Nro.</th>
          <th>Producto</th>
          <th>Precio</th>
          <th>Categoria</th>
          <th>Opciones</th>
        </thead>
        <tbody>
          <tr v-for="(producto, index) of Productos" :key="producto">
            <td>{{  index + 1 }}</td>
            <td>{{ producto.nombre }}</td>
            <td>{{ producto.precio }}</td>
            <td>{{ producto.Categoria.descripcion }}</td>
            <td>
              <button v-on:click="selectProducto(producto)">Editar</button>
              <button v-on:click="deleteProducto(producto)">Eliminar</button>
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
  name: 'productoView',
  data() {      
    return{
      Producto: {"id": "", "nombre": "", "precio": 0, "Categoria": { "id": "", "descripcion": ""}},
      Categorias: Object,
      Productos: Object,
      valor: 0,
      buscar: '',
      precio: ''
    }
  },
  async created() {
    this.getCategorias();
    this.getProductos();
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
    async getProductos() {
      try {
          const res = await axios.get(`http://localhost:3000/Productos`);
          this.Productos = res.data;
      } catch (error) {
          console.log(error);
      }
    },
    async addProducto() {
      try {
        await axios.post(`http://localhost:3000/Productos`, this.Producto);
        this.getProductos();
        this.Producto = {};
      } catch (error) {
        console.log(error);
      }
    },
    async updateProducto(producto) {
      try {
        await axios.patch(`http://localhost:3000/Productos/${producto.id}`, producto);
        this.getProductos();
        this.valor = 0;
        this.Producto = {};
      } catch (error) {
        console.log(error);
      }
    },
    async deleteProducto(producto){
      axios.delete(`http://localhost:3000/Productos/${producto.id}`);
      this.getProductos();
    },
    accion() {
      if(this.valor == 0) {
        this.addProducto();
      } else {
        this.updateProducto(this.Producto);
      }
    },
    selectProducto(Producto) {
      this.Producto = Producto;
      this.valor = 1;
    },
    buscarProducto() {

      if(this.precio != '' && this.buscar != '') {
        this.Productos = this.Productos.filter(producto => producto.nombre == this.buscar && Number(producto.precio) > Number(this.precio));
      }

      if(this.buscar != '' && this.precio == '') {
        this.Productos = this.Productos.filter(producto => producto.nombre == this.buscar);
      }

      if(this.buscar == '' && this.precio != '') {
        this.Productos = this.Productos.filter(producto => Number(producto.precio) > Number(this.precio));
      }

      if(this.buscar == '' && this.precio == '') {
        this.getProductos();
      }
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
</style>
