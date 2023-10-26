import { React } from "react";
import { useCart } from "../context/CartContext";

export default function ShopModal({ item }) {
  const { images, title, price, discountPercentage, description, id } = item;
  const {
    addToCart,
    cart: cartItems,
    updateCart,
    showItemInCartMessage,

    itemAlreadyInCart,
  } = useCart();

  const productId = parseInt(id, 10);
  const newcart = cartItems?.find((item) => item.id === productId);
  const quantityInCart = newcart ? newcart.quantity : 0;

  return (
    <div className="item-box " key={id}>
      <div className="img-box">
        <img src={images[0]} alt="img" />
      </div>

      <div className="detail-box">
        <div className="title">
          <h5>{title}</h5>
        </div>
        <h6>
          Price: <span> {price} </span>
        </h6>
        <h6>
          Discount%: <span> {discountPercentage} </span>
        </h6>
        <div className="description">
          <p>{description}</p>
        </div>
        {showItemInCartMessage && <p className="error"> {itemAlreadyInCart}</p>}
        <p className="quantity-cart"> {quantityInCart}</p>
        <button
          className="add-to-cart"
          onClick={() => {
            // const newcart = cartItems?.find((item) => item.id === productId);

            if (newcart) {
              updateCart(cartItems);
            } else {
              // If the item is not in the cart, add it
              addToCart(item);
            }
          }}
        >
          {newcart ? "Update cart" : "Add to cart"}
        </button>
      </div>
    </div>
  );
}
