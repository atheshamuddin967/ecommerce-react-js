// import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useProductContext } from "../context/ContextApi";
import { useCart } from "../context/CartContext";
import Stars from "./Stars";

export default function SingleProduct({
  setItemAlreadyInCart,
  itemAlreadyInCart,
  setShowItemInCartMessage,
  showItemInCartMessage,
}) {
  const { id } = useParams();
  const { isLoading, products } = useProductContext();
  const {
    cart: cartItems,
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    updateCart,
  } = useCart();

  if (isLoading) {
    return <div>....Loading...</div>;
  }

  // const innerProductsArray = products.products || [];
  const productId = parseInt(id, 10);
  const product = products.find((item) => item.id === productId);
  // console.log(product);

  if (!product) {
    return <div>Product not found</div>;
  }
  const newcart = cartItems.find((item) => item.id === productId);

  return (
    <div className="container">
      <div className="row space2">
        <div className="col-sm-4">
          <div className="img-box">
            <img src={product.images[0]} alt="imge" />
          </div>
        </div>
        <div className="col-sm-8">
          <div className="detail-box">
            <h3>Categeory: {product.category}</h3>
            <h3>{product.title} </h3>
            <h6>
              Price: <span>{product.price}</span>
            </h6>
            <h6>
              Discount %: <span>{product.discountPercentage}</span>
            </h6>
            <p className="yellow">
              <Stars rating={product.rating} />
            </p>
            <h6>
              Brand: <span>{product.brand}</span>
            </h6>
            <h6>
              Avilable Stock: <span>{product.stock}</span>
            </h6>
            <p>{product.description}</p>
            <div className="counter-button">
              <button
                onClick={() => {
                  decreaseQuantity(product);
                }}
              >
                {" "}
                -{" "}
              </button>
              <span>{newcart ? newcart.quantity : 0}</span>
              {/* {console.log(newcart.quantity)} */}
              <button className="" onClick={() => increaseQuantity(product)}>
                +
              </button>
            </div>{" "}
            {showItemInCartMessage && (
              <p className="error"> {itemAlreadyInCart}</p>
            )}
            <button
              className="add-to-cart"
              onClick={() => {
                if (newcart) {
                  // If the item is already in the cart, update it
                  setItemAlreadyInCart(
                    `this item is  enterd ${newcart.quantity}times`
                  );
                  setShowItemInCartMessage(true);
                  // increaseQuantity(product);
                  updateCart(cartItems);
                } else {
                  // If the item is not in the cart, add it
                  addToCart(product);
                }
              }}
            >
              {newcart ? "Update cart" : "Add to cart"}
            </button>
            <button
              className="trash-btn"
              onClick={() => removeFromCart(product)}
            >
              <i class="fas fa-trash"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
