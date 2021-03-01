import '../style/Waiter.css';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom'
import logo from '../images/logo.png';
import prato from '../images/prato.png';
import xicara from '../images/xicara.png';
import copo from '../images/copo.png';
import b from '../images/b.png';
import menuburguer from '../images/menuburguer.png';

const Waiter = () => {

  const [menu, setMenu] = useState([]);
  const [hamburguer, setHamburguer] = useState([]);
  const [side, setSide] = useState([]);
  const [drinks, setDrinks] = useState([]);
  // const [products, setProducts] = useState([]);
  const [client, setClient] = useState('');
  const [table, setTable] = useState('');
  const [breakfast, setBreakfast] = useState([]);
  const token = localStorage.getItem("token");
  const [quantidade, setQuantidade] = useState([]);


  const history = useHistory()
  const rLogin = () => {
    history.push('/')
  }

  const Historic = () => {
    history.push('/Historic')
  }

  // const order = () => {
  //   if (client !== '' && table !== '') {
  //     Promise.add({
  //       client: client,
  //       mesa: table,
  //       pedido: products,
  //     });
  //     alert(`Olá, o pedido do cliente ${client} da mesa ${table} foi finalizado com sucesso.`)
  //     setProducts([]);
  //     setTable('');
  //     setClient('');
  //   }
  // };


  useEffect(() => {
    fetch('https://lab-api-bq.herokuapp.com/products', {
      method: 'GET',
      headers: {
        "accept": "application/json",
        'Authorization': `${token}`
      },

    })

      .then((response) => response.json())
      .then((json) => {
        const breakfast = json.filter(item => item.type === 'breakfast')
        const hamburguer = json.filter(item => item.sub_type === 'hamburguer')
        const drinks = json.filter(item => item.sub_type === 'drinks')
        const side = json.filter(item => item.sub_type === 'side')
        setMenu(breakfast)
        setHamburguer(hamburguer)
        setDrinks(drinks)
        setSide(side)
        console.log(json)
      })

  }, [token])

  function clickQuantidade(item) {
    item.qtd = 1;
    item.subtotal = item.price;
    setQuantidade([...quantidade, item]);
    console.log(item);
    console.log(quantidade)
  }


  return (

    <div className="App">

      <input type="checkbox" id="check"></input>
      <label id="icone" for="check"><img className="btn-burguer" src={menuburguer} alt="" /></label>

      <div class="menuLateral">
        <nav>
          <a href={Historic}><div onClick={Historic} className="link">Historico</div></a>
          <a href={rLogin}><div onClick={rLogin} className="link">Sair</div></a>
        </nav>
      </div>
      <header className="header">
        <div id="logoWaiter">
          <img src={logo} alt="" className="logoWaiter" />
        </div>
      </header>
      <ol className="App-waiter">
        <section className='Menu'>
          <button className="btnMenu" onClick={((e) => {
            e.preventDefault();
            setBreakfast(menu)
          })}><img src={xicara} alt="" className='imgMenu' /></button>

          <button className="btnMenu" onClick={((e) => {
            e.preventDefault();
            setBreakfast(hamburguer)
          })}><img src={prato} alt="" className='imgMenu' /></button>

          <button className="btnMenu" onClick={((e) => {
            e.preventDefault();
            setBreakfast(side);
          })}><img src={b} alt="" className='imgMenu' /></button>

          <button className="btnMenu" onClick={((e) => {
            e.preventDefault();
            setBreakfast(drinks)
          })}><img src={copo} alt="" className='imgMenu' /></button>

          <div className='menuItens'> {
            breakfast.map((menuItems) => {

              return (
                
                <div className="Produtos">
                  <div key={menuItems.id}>
                    <div className="teste">
                      <div className='nameProducts'>
                        <ul>{menuItems.name}</ul>
                      </div>
                      <div className='sabor'>
                        <ul>{menuItems.flavor}</ul>
                        <div className='complement'>
                          <ul>{menuItems.complement}</ul>
                        </div>
                      </div>
                      <ul >R$:{menuItems.price},00</ul>
                      <button className="btnTeste" onClick={() => clickQuantidade(menuItems)}>+</button>

                    </div>
                  </div>
                </div>
              )
                
            })
          } </div>

        </section>

        <form className='order'>
          <h1>Pedido</h1>
          <input type="text" id="client" placeholder="Digite o nome do cliente" value={client} onChange={(event) =>
            setClient(event.target.value)} />
          <input type="number" id="number" min='0' max='20' placeholder="Mesa" value={table} onChange={(event) =>
            setTable(event.target.value)} />
          {/* <input type="text" id="products" value={quantidade} onClick={(event) =>
            setQuantidade(event.target.value)} /> */}
            {quantidade.map(item => 
              item.name
            )}

          <button className='send' onClick={((e) => {
            e.preventDefault();
            fetch('https://lab-api-bq.herokuapp.com/orders', {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "accept": "application/json",
                'Authorization': `${token}`
              },
              body: `client=${client}&table=${table}&products=${quantidade}`
            })
              .then((response) => response.json())
              .then((json) => {
                console.log(json);
                setClient('');
                setTable('');
                setQuantidade([]);
              })
            console.log('foi')
          })} >ENVIAR</button>

        </form>
      </ol>
    </div>
  )
}



export default Waiter;