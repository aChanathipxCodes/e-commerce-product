import "./style.css";
import logo from "./logo.svg";
import cart from "./icon-cart.svg";
import profile from "./profile.png";
import product1 from "./product-1.jpg";
import product2 from "./product-2.jpg";
import product3 from "./product-3.jpg";
import product4 from "./product-4.jpg";
import product5 from "./product-5.jpg";
import cartDelete from "./icon-delete.svg";
import open from "./icon-menu.svg";
import close from "./icon-close.svg";
import { Fragment, useState } from "react";

const nav = [
  { id: 0, new: "New" },
  { id: 1, men: "Men" },
  { id: 2, women: "Women" },
  { id: 3, kids: "Kids" },
  { id: 4, about: "About" }
];

const info = [
  {
    id: 0,
    company: "Company for Project",
    model: " Air Jordan 1 Low OG “Obsidian”",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    price: 175,
    discount: 140,
    discountPercentage: 25
  }
];

const productImage = [
  { id: 0, src: product2, alt: "product2" },
  { id: 1, src: product3, alt: "product3" },
  { id: 2, src: product4, alt: "product4" },
  { id: 3, src: product5, alt: "product5" }
];

const cartData = [
  {
    id: 0,
    model: "Air Jordan 1 Low OG “Obsidian”",
    src: product2,
    alt: "product2",
    discount: 1,
  }
];



export default function App() {
  const [orderNumber, setOrderNumber] = useState('');
  const [count, setCount] = useState('');
  const [addToCart, setAddToCart] = useState(cartData);
  const [showCart, setShowCart] = useState('true');

function handleOrderNumber (e) {
setOrderNumber(e)
}

function handleCountUp () {
setOrderNumber((prev)=> (+prev + 1))
}

function handleCountDown () {
  setOrderNumber((prev)=> (+prev - 1) > 0 ? (+prev - 1) : 0)
  }

function handleAddToCart (cart) {
setAddToCart(() => [cart])
}

function handleDeleteCart () {
  setOrderNumber('')
}

function handleShowCart () {
setShowCart((prev)=> !prev)
console.log('cart')
}

function handleCart () {

const id = crypto.randomUUID()
  const newCart = {
    id,
    model: "Air Jordan 1 Low OG “Obsidian”",
    src: product2,
    alt: "product2",
    discount: 140,
  }
  handleAddToCart(newCart)
  console.log(newCart)
    }

  return (
    <div className="App">
      <Cart onShowCart={handleShowCart} showCart={showCart} onDeleteCart={handleDeleteCart} cardData={cartData} addToCart={addToCart} onAddToCart={handleAddToCart} onHandleCart={handleCart} orderNumber={orderNumber}/>
      <Nav showCart={showCart} onShowCart={handleShowCart} orderNumber={orderNumber}/>
      <Hero orderNumber={orderNumber} onSetOrderNumber={handleOrderNumber} onSetCountUp={handleCountUp} onSetCountDown={handleCountDown} onAddToCart={handleAddToCart} addToCart={addToCart} onHandleCart={handleCart}/>
    </div>
  );
}

export function Hero({orderNumber, onSetOrderNumber, onSetCountUp, onSetCountDown, onAddToCart, onHandleCart}) {
  return (
    <div className="hero">
      <Image />
      <Product orderNumber={orderNumber} onSetOrderNumber={onSetOrderNumber} onSetCountUp={onSetCountUp} onSetCountDown={onSetCountDown} onAddToCart={onAddToCart} onHandleCart={onHandleCart}/>
    </div>
  );
}

// cart
export function Cart({addToCart, orderNumber, onDeleteCart, showCart}) {
  let cartSummary = 140 * orderNumber;
  return (
    <>
    {!showCart && <div className="cart">
      <h2>Cart</h2>
      <hr></hr>
      {orderNumber > 0 ? 
      <>
      <div className='cart-data'>
        {addToCart.map((addToCarts) => 
          (
          <div className="cart-summary" key={addToCarts.id}>
            <div className="thumbnail">
              <img src={addToCarts.src} alt={addToCarts.alt} />
            </div>
            <div className="cart-info">
              <p>{addToCarts.model}</p>
             <p>${addToCarts.discount} {orderNumber <= 0 ? '' : `x ${orderNumber} ${cartSummary}`} </p>
            </div>
          </div>
        ))}
              <div onClick={onDeleteCart}>
              <img src={cartDelete} />
            </div>
      </div>

      <button>Checkout</button>
      </>
      : <h3>Your cart is empty</h3>}
    </div>}
    </>
  );
}

export function Nav({onShowCart, orderNumber}) {
  const [toggleMenu, setToggleMenu] = useState('true');
  function handleToggleMenu () {
setToggleMenu((prev)=> !prev);
  }
  return (
    <div>
      <div className="nav">
        <div className="menu">
          {toggleMenu && <img src={open} alt="logo" className="open" onClick={handleToggleMenu}/>}
          {!toggleMenu && <img src={close} alt="logo" className="close" onClick={handleToggleMenu}/>}
        </div>
        <div className="nav-bar">
          {/* logo */}

          <div>
            <img src={logo} alt="logo" />
          </div>

          {/* nav links */}

  {  !toggleMenu &&      <ul className='mobile'>
            {nav.map((navs) => (
              <li key={navs.id}>
                {navs.new}
                {navs.men}
                {navs.women}
                {navs.kids}
                {navs.about}
              </li>
            ))}
          </ul>}

          <ul className='desktop'>
            {nav.map((navs) => (
              <li key={navs.id}>
                {navs.new}
                {navs.men}
                {navs.women}
                {navs.kids}
                {navs.about}
              </li>
            ))}
          </ul>
        </div>
        {/* cart and profile */}
        <div className="cart-profile">
          <div className={orderNumber <= 0 ? 'cart-indicator-none' : 'cart-indicator'}>{orderNumber}</div>
          <div onClick={onShowCart}>
            <img src={cart} alt="cart" className="cart-logo" />
          </div>
          <img src={profile} alt="profile" className="profile" />
        </div>
      </div>
      <hr></hr>
    </div>
  );
}

export function Product({orderNumber, onSetOrderNumber, onSetCountUp, onSetCountDown, onHandleCart}) {

  return (
    <div className="product">
      <div>
        {info.map((infos) => (
          <div key={infos.id}>
            <h3>{infos.company.toUpperCase()}</h3>
            <h1>{infos.model}</h1>
            <p>{infos.description}</p>

            <div className="price">
              <div className="discount">
                <h2>${infos.discount}</h2>
                <p>{infos.discountPercentage}%</p>
              </div>
              <div>
                <p className="line">${infos.price}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="order">
        <div className="order-number">
          <span className="operator" onClick={onSetCountDown}>-</span>
          <input type="text" placeholder={0} value={orderNumber} onChange={(e)=>onSetOrderNumber(Number(e.target.value))} />
          <span className="operator" onClick={onSetCountUp}>+</span>
        </div>
        <button onClick={onHandleCart}>
          <img src={cart} alt="cart" /> <span>Add to Cart</span>
        </button>
      </div>
    </div>
  );
}

export function Image() {
  return (
    <div>
      <div className="product-body">
        <img src={product1} alt="product-1" className="product-big" />
        <div className="thumbnail">
          {productImage.map((productImage) => (
            <Fragment key={productImage.id}>
              <img src={productImage.src} alt={productImage.alt} />
            </Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}
