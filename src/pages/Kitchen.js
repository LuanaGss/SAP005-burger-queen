import '../style/Kitchen.css';
import React from "react";
import {useHistory} from 'react-router-dom'
import logo from '../images/logo.png';
import menuburguer from '../images/menuburguer.png';
import add from '../images/add.png';
import {useState} from 'react';
import {ConvertDate, ConvertTime} from './utils.js';



function Kitchen() {
  const [orders, setOrders] = useState([]);
  const token = localStorage.getItem("token");
  const productId = sessionStorage.getItem("product.id");
  console.log(productId); 


  const history = useHistory()
  const logout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    history.push('/');
  }

  const fetchData = () => {
   fetch('https://lab-api-bq.herokuapp.com/orders', {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "accept": "application/json",
        'Authorization': `${token}`
      }                  
          })
            .then((response) => response.json())
            .then((json) => {
              setOrders(json);
            })
        }  

    const putOrder = (e, id, index)=>{
          fetch(`https://lab-api-bq.herokuapp.com/orders/${id}`, {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
                "accept": "application/json",
                'Authorization': `${token}`
              }  
            , body: JSON.stringify({"status": "Pronto" })              
      
          })
                  .then((response) => response.json())
                  .then((json) => {
                    const newOrders= [...orders]
                    newOrders.splice(index, 1)
                    setOrders(newOrders)})
  }
  
   
  return (
    <div className="AppKitchen">
      <div className="nav1">
        <input type="checkbox" id="check"></input>
        <label id="icone" for="check"><img className="btn-burguer" src={menuburguer} alt="" /></label>

        <div class="menuLateral">
          <nav>
            <a href={logout}><div onClick={logout} className="link">Sair</div></a>
          </nav>
        </div>
      </div>

      <header className="App-Kitchen">
        <img src= {logo} alt="" className="logoKitchen"/>
        <button className="btnAdd" onClick={fetchData}><img src= {add} alt="" className='imgMenu' /></button>          
      </header>
     <section className="section">

      { orders.map((order, index) => {
        return (
          <div className="Cl" key={order.id}>
            <p  className="date">Data: {ConvertDate(order.createdAt)} {ConvertTime(order.createdAt)}</p>
            <p>

            <button className="food"   onClick={(e)=>{
                      putOrder(e, order.id, index)
                    }}>Pedido Pronto</button> 
              </p>     
            <p  className="tble">Mesa: {order.table}</p> 
            <p  className="status">Status: {order.status}</p>
            <p className="pedido">Pedido:</p> 
            <div>
            
              {
                order.Products.map((product)=> {
                  return(
                    <div key={product.id}> 
                    <p className="prod">{product.name}</p>
                    

                    </div>
                  )
                })
              }
            </div>
            
          </div>
        )
      })}
      </section>
    </div>
  );
}

export default Kitchen;