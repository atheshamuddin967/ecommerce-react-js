import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useState,
  useCallback,
} from "react";
import { auth, db } from "../firebase/Firebase";
import { useAuth } from "./AuthContext";
import { getDoc, setDoc, doc } from "firebase/firestore";
import { useCart } from "./CartContext";
import { v4 as uuidv4 } from "uuid";
const initialState = {
  orders: [],
  user: null,
};

const OrderContext = createContext();
export function OrderProvider({ children }) {
  const { cart, updateCart, cartItems } = useCart();
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [price, setPrice] = useState(0);
  const [DiscPrice, setDisPrice] = useState(0);
  const [ADiscount, setADiscount] = useState(0);
  const [voucherDiscount, setVoucherDiscount] = useState(0);
  const [payAmount, setPayAmount] = useState(0);
  const [quantityOfCart, setQuantityOfCart] = useState();

  const handleAmounts = useCallback(() => {
    let payAmounts = 0;
    let AfterDiscount = 0;
    let DPrice = 0;
    let tempdisc = 0;
    let totalPrice = 0;

    cartItems?.forEach((item) => {
      let tempPrice = item.quantity * item.price;
      tempdisc = (tempPrice * item.discountPercentage) / 100;
      DPrice += tempdisc;

      totalPrice += item.quantity * item.price;
    });

    AfterDiscount = totalPrice - DPrice;

    let tempPayAmounts = (AfterDiscount * voucherDiscount) / 100;
    payAmounts = AfterDiscount - tempPayAmounts;

    setDisPrice(DPrice.toFixed(2));
    setPrice(totalPrice.toFixed(2));
    setADiscount(AfterDiscount.toFixed(2));
    setPayAmount(payAmounts.toFixed(2));
  }, [cartItems, voucherDiscount]);

  useEffect(() => {
    handleAmounts();
    if (cartItems && cartItems.length > 0) {
      const totalQuantity = cartItems.reduce(
        (total, item) => total + item.quantity,
        0
      );

      setQuantityOfCart(totalQuantity);
    } else {
      setQuantityOfCart(0);
    }
  }, [cartItems, voucherDiscount, handleAmounts]);
  const [state, dispatch] = useReducer(OrderReducer, initialState);
  function OrderReducer(state, action) {
    switch (action.type) {
      case "PLACE_ORDER":
        return {
          ...state,
          orders: [...state.orders, { ...action.payload }],
        };
      default:
        return state;
    }
  }

  function placeOrder() {
    if (user && cart && cart.length > 0 && payAmount) {
      const userId = user.uid;
      const userOrderRef = doc(db, "OrderHistory", userId);
      const userCartRef = doc(db, "usersCollection", userId);

      const payAmountAsString = payAmount.toString();
      const orderId = uuidv4();

      getDoc(userOrderRef)
        .then((docSnapshot) => {
          if (docSnapshot.exists()) {
            const userData = docSnapshot.data();
            const existingOrders = userData.orders || [];

            existingOrders.push({
              id: orderId,
              cart,
              payAmount: payAmountAsString,
            });

            return setDoc(userOrderRef, { orders: existingOrders });
          } else {
            const newOrders = [
              { id: orderId, cart, payAmount: payAmountAsString },
            ];

            return setDoc(userOrderRef, { orders: newOrders });
          }
        })
        .then(() => {
          console.log("Order placed and saved to Firestore.");

          // Remove the cart data from Firebase
          setDoc(userCartRef, { cart: [] }).then(() => {
            console.log("Cart data removed from Firestore.");

            // Dispatch the action to update the cart in your context
            dispatch({ type: "UPDATE_CART", payload: [] });
            dispatch({ type: "PLACE_ORDER", payload: payAmount });
          });
        })
        .catch((error) => {
          console.error("Error placing order:", error);
        });
      setOrders((prevOrders) => [
        ...prevOrders,
        { id: orderId, cart, payAmount: payAmountAsString },
      ]);
    } else {
      console.error("Invalid cart or userOrder data.");
    }
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const userId = user.uid;
        const userOrderRef = doc(db, "OrderHistory", userId);

        try {
          const docSnapshot = await getDoc(userOrderRef);
          if (docSnapshot.exists()) {
            const userData = docSnapshot.data();
            const userOrder = userData.orders || [];
            setOrders(userOrder);
            dispatch({ type: "UPDATE_CART", payload: [] });
            dispatch({ type: "LOGIN", payload: user });
            dispatch({ type: "PLACE_ORDER", payload: userOrder });
            updateCart();
          } else {
            setDoc(userOrderRef, { Orders: [] }).catch((error) => {
              console.error("Error creating user document: ", error);
            });
          }
        } catch (error) {
          console.error("Error getting user data: ", error);
        }
      } else {
        dispatch({ type: "LOGOUT" });
      }
    });

    return unsubscribe;
  }, [user, updateCart]);
  // console.log(cartItems);
  return (
    <OrderContext.Provider
      value={{
        order: state.orders,
        placeOrder,
        price,
        ADiscount,
        setVoucherDiscount,
        voucherDiscount,
        DiscPrice,
        payAmount,
        setOrders,
        orders,
        quantityOfCart,
      }}
    >
      {" "}
      {children}
    </OrderContext.Provider>
  );
}
export function useOrder() {
  return useContext(OrderContext);
}
