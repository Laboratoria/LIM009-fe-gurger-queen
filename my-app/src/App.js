import React, { Component, Fragment } from 'react';
import NavBar from './components/navBar';
import ProductList from './components/productList';

//import './App.css';
const initialProducts = [
  { id: 1, title: "hamburguesa simple de pollo", inventory: 0, price: 10.00 }, 
  { id: 2, title: "hamburguesa simple vegana", inventory: 0, price: 10.00 },
  { id: 3, title: "hamburguesa simple de carne", inventory: 0, price: 10.00 },
  { id: 4, title: "hamburguesa doble de pollo", inventory: 0, price: 15.00 }, 
  { id: 5, title: "hamburguesa doble vegana", inventory: 0, price: 15.00 },
  { id: 6, title: "hamburguesa doble de carne", inventory: 0, price: 15.00 },
  { id: 7, title: "Papas fritas", inventory: 0, price: 5.00 },
  { id: 8, title: "Aros de cebolla", inventory: 0, price: 5.00 },
  { id: 9, title: "Agua 500ml", inventory: 0, price: 5.00 },
  { id: 10, title: "Agua 750ml", inventory: 0, price: 7.00 },
  { id: 11, title: "Bebida/gaseosa 500ml", inventory: 0, price: 7.00 },
  { id: 12, title: "Bebida/gaseosa 750ml", inventory: 0, price: 10.00 },
  { id: 13, title: "Queso Extra", inventory: 0, price: 1.00 },
  { id: 14, title: "Huevo Extra", inventory: 0, price: 1.00 },
  { id: 15, title: "Café con leche", inventory: 0, price: 7.00 },
  { id: 16, title: "Café americano", inventory: 0, price: 5.00 },
  { id: 13, title: "Sandwich de jamón y queso", inventory: 0, price: 10.00 },
  { id: 14, title: "Jugo de frutas natural", inventory: 0, price: 7.00 },
];
const formatNumber = (number) => new Intl.NumberFormat('en-US',{mininumFractionDigits:2,maximunFractionDigits:2}).format(number);
class App extends Component {
 
  state={
    addedIds :[],
    quantityById:{},
    products:initialProducts,
  };
  addToCart = (id) =>{
const {addedIds,quantityById,products} = this.state;
const product = products.find(prod => prod.id === id);
const available = 1;
if (available > 0){
  const newAddedIds = addedIds.find(prodId => prodId === id) ? addedIds : addedIds.concat(product.id);
  const newQuantityById ={
    ...quantityById,
    [id]:(quantityById[id]|| 0) + 1,
  };  this.setState({ addedIds :newAddedIds,quantityById :newQuantityById});
}
  };
  removeFromCart = (id) =>{
const { addedIds,quantityById}=this.state;
if(quantityById[id] ){
  const newQuantityById ={
    ...quantityById,
    [id]:quantityById[id]>1 ? quantityById[id] -1:undefined,

  };
  const newAddedIds = newQuantityById[id]?addedIds :addedIds.filter(prodId =>prodId !== id);
  this.setState({addedIds :newAddedIds,quantityById :newQuantityById});
};
  };
  deleteFromCart = (id)=>{
    const { addedIds,quantityById}=this.state;
    if(quantityById[id] ){
      const newQuantityById ={
        ...quantityById,
        [id]:undefined
      };
      const newAddedIds = addedIds.filter(prodId => prodId !== id); 
      this.setState({addedIds :newAddedIds,quantityById :newQuantityById});
    };

  };
  getAvailable = (products,quantityById) =>{
return products.reduce(
  (res,product)=>({
    ...res,
  [ product.id]:quantityById[product.id]||0,
  }),
  {}
);
  };
  getTotal = (products,addedIds,quantityById) => {
    return addedIds.reduce(
      (res,productId)=>res + products.find(prod =>prod.id === productId ).price*(quantityById[productId]|| 0),
      0
    );

  };

  render()
  {
    const {products,quantityById,addedIds}= this.state
    const available = this.getAvailable(products,quantityById)
  const total = this.getTotal(products,addedIds,quantityById)
  return (<Fragment>
    <NavBar total={formatNumber(total)} />
   <ProductList 
   available = {available}
   products={initialProducts} 
    addToCart={this.addToCart}
    removeFromCart ={this.removeFromCart}
    deleteFromCart = {this.deleteFromCart}
    />
  </Fragment>
  );
}}

export default App;