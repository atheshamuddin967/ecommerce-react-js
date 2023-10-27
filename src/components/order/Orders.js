import "./Order.css";
import { useOrder } from "../context/OrderContext";

export default function Orders() {
  const { orders } = useOrder();

  const arrayOfObjects = orders
    ? Object.values(orders).map((item) => ({
        id: item.id,
        payAmount: item.payAmount,
        cart: item.cart,
      }))
    : [];

  return (
    <div>
      <div className="order-box">
        <div className="container">
          <div className="box-shadow">
            <div className="row">
              <div className="col-sm-12 text-center">
                <h2>Orders History</h2>
              </div>
            </div>
            {arrayOfObjects?.map((orderItem) => (
              <div className="row " key={orderItem.id}>
                <div className="col-sm-12">
                  <div className="order-details">
                    <h6>
                      Order ID <span>{orderItem.id}</span>
                    </h6>
                    <h6>
                      Products:
                      {orderItem?.cart?.map((item, index) => (
                        <span key={index}>
                          {index < orderItem.cart.length - 1 && " ,"}{" "}
                          {item.title}
                          {/* Add a space if it's not the last item */}
                        </span>
                      ))}
                    </h6>

                    <h6>
                      Total Amount <span>{orderItem.payAmount}</span>
                    </h6>
                  </div>
                </div>
                <hr />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
