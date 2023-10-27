import Vouchers from "./Vouchers";
import { useCart } from "../context/CartContext";

import { useOrder } from "../context/OrderContext";
export default function Cart({ setCartOpen, cartOpen }) {
  const { cartItems, removeFromCart, increaseQuantity, decreaseQuantity } =
    useCart();
  const {
    placeOrder,
    price,
    ADiscount,
    setVoucherDiscount,
    voucherDiscount,
    DiscPrice,
    payAmount,
  } = useOrder();

  return (
    <div>
      {cartOpen && (
        <div className="cart-box clear" id="cartsection">
          <div className="cart-section">
            <button className="close-cart" onClick={() => setCartOpen(false)}>
              <i className="fa fa-times" aria-hidden="true"></i>
            </button>

            <div className="container">
              <div className="row">
                <div className="col-sm-12">
                  <div className="cart-inner-section">
                    <h5>Your Cart </h5>
                  </div>
                </div>
              </div>
            </div>

            {cartItems?.map((item) => (
              <div className="cart-item" key={item.id}>
                <div className="container">
                  <div className="row">
                    <div className="col-sm-4">
                      <div className="img-box2">
                        <img src={item.images[0]} alt="images" />
                      </div>
                    </div>
                    <div className="col-sm-4">
                      {" "}
                      <div className="price-box">
                        <h5>{item.title}</h5>
                        <h6>
                          price <span>{item.price} </span>
                        </h6>
                        <h5>
                          Discount %: <span>{item.discountPercentage}</span>
                        </h5>
                      </div>
                    </div>
                    <div className="col-sm-4">
                      <div className="counter-button">
                        <button
                          onClick={() => {
                            increaseQuantity(item);
                          }}
                        >
                          {" "}
                          +{" "}
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          className=""
                          onClick={() => {
                            decreaseQuantity(item);
                          }}
                        >
                          -
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <button className="trash" onClick={() => removeFromCart(item)}>
                  <i class="fas fa-trash"></i>
                </button>
                <hr />
              </div>
            ))}

            <div className="total-amount">
              <div className="container">
                <div className="row y-amount">
                  <div className="col-sm-6 ">
                    <h5>Your amount:</h5>
                  </div>
                  <div className="col-sm-6">
                    <h5>{price}</h5>
                  </div>
                </div>
                <div className="row d-amount">
                  <div className="col-sm-6">
                    <h5>Your Discount:</h5>
                  </div>
                  <div className="col-sm-6">
                    <h5>{DiscPrice}</h5>
                  </div>
                </div>
                <div className="row a-d-amount">
                  <div className="col-sm-6">
                    <h5>After Discount:</h5>
                  </div>
                  <div className="col-sm-6">
                    <h5>{ADiscount}</h5>
                  </div>
                </div>
                <div className="row v-amount">
                  <div className="col-sm-6">
                    <h5>Voucher Discount:</h5>
                  </div>
                  <div className="col-sm-6">
                    <h5>{voucherDiscount} %</h5>
                  </div>
                </div>
                <div className="row p-amount">
                  <div className="col-sm-6">
                    <h5>Payment total:</h5>
                  </div>
                  <div className="col-sm-6">
                    <h5>{payAmount}</h5>
                  </div>
                </div>
              </div>
            </div>

            <Vouchers
              ADiscount={ADiscount}
              setVoucherDiscount={setVoucherDiscount}
            />
            <div className="orders">
              <div className="container text-center">
                <div className="row">
                  <div className="col-sm-12">
                    <button
                      className="add-to-cart"
                      onClick={() => {
                        placeOrder();
                        setCartOpen(false);
                      }}
                    >
                      Place order
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
