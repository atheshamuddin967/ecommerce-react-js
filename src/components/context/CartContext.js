import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useState,
} from "react";
import { auth, db } from "../firebase/Firebase";
import { useAuth } from "./AuthContext";
import { getDoc, setDoc, doc } from "firebase/firestore";

const initialState = {
  cart: [],
  user: null,
};

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState();
  const [itemAlreadyInCart, setItemAlreadyInCart] = useState("");
  const [showItemInCartMessage, setShowItemInCartMessage] = useState(false);
  const { user } = useAuth();
  const [state, dispatch] = useReducer(cartReducer, initialState);

  function cartReducer(state, action) {
    switch (action.type) {
      case "ADD_TO_CART":
        const existingItemIndex = state.cart.findIndex(
          (item) => item.id === action.payload.id
        );

        if (existingItemIndex !== -1) {
          // If it's in the cart, update the quantity
          const updatedCart = [...state.cart];
          updatedCart[existingItemIndex].quantity += 1;
          return { ...state, cart: updatedCart };
        } else {
          // If it's not in the cart, add it with a quantity of 1
          return {
            ...state,
            cart: [...state.cart, { ...action.payload, quantity: +1 }],
          };
        }
      case "UPDATE_CART":
        return {
          ...state,
          cart: action.payload,
        };
      case "REMOVE_FROM_CART":
        // Find the index of the item with the specified ID
        const itemIndexToRemove = state.cart.findIndex(
          (item) => item.id === action.payload.id
        );

        if (itemIndexToRemove !== -1) {
          // Create a new cart array without the removed item
          const updatedCart = [
            ...state.cart.slice(0, itemIndexToRemove),
            ...state.cart.slice(itemIndexToRemove + 1),
          ];

          return { ...state, cart: updatedCart };
        } else {
          return state;
        }
      case "INCREASE_QUANTITY":
        const increasedCart = state.cart.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
        updateCart(increasedCart);
        return { ...state, cart: increasedCart };

      case "DECREASE_QUANTITY":
        const decreasedCart = state.cart.map((item) =>
          item.id === action.payload.id
            ? {
                ...item,
                quantity: item.quantity > 1 ? item.quantity - 1 : 1,
              }
            : item
        );
        updateCart(decreasedCart);
        return { ...state, cart: decreasedCart };
      case "LOGIN":
        return { ...state, user: action.payload };

      case "LOGOUT":
        return { ...state, user: null };
      default:
        return state;
    }
  }

  function addToCart(item) {
    console.log(item);
    if (user) {
      // User is logged in
      const userId = user.uid;
      const userCartRef = doc(db, "usersCollection", userId);

      // Fetch the user's data from Firestore
      getDoc(userCartRef)
        .then((docSnapshot) => {
          if (docSnapshot.exists()) {
            // User document exists, update the cart array
            const userData = docSnapshot.data();
            const userCart = userData.cart || []; // Use the existing cart or initialize an empty array

            // Check if the item is already in the cart
            const existingItemIndex = userCart.findIndex(
              (cartItem) => cartItem.id === item.id
            );

            if (existingItemIndex !== -1) {
              // If the item is already in the cart, update the quantity
              userCart[existingItemIndex].quantity += 1;
            } else {
              // If it's not in the cart, add it with a quantity of 1
              userCart.push({ ...item, quantity: 1 });
            }

            // Update the cart array in the user's document
            setDoc(userCartRef, { cart: userCart })
              .then(() => {
                console.log("Item added to cart and saved to Firestore.");
                dispatch({ type: "UPDATE_CART", payload: userCart });
              })
              .catch((error) => {
                console.error("Error adding item to cart:", error);
              });
          } else {
            // User document doesn't exist, create it with a new cart
            const newCart = [{ ...item, quantity: 1 }];

            // Create the user's document with the cart array
            setDoc(userCartRef, { cart: newCart })
              .then(() => {
                console.log("Item added to cart and saved to Firestore.");
                dispatch({ type: "UPDATE_CART", payload: newCart });
              })
              .catch((error) => {
                console.error("Error adding item to cart:", error);
              });
          }
        })
        .catch((error) => {
          console.error("Error getting user data:", error);
        });
    } else {
      // User is not logged in
      // You can handle this case or display a message to log in
    }
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const userId = user.uid;
        const userCartRef = doc(db, "usersCollection", userId);

        try {
          const docSnapshot = await getDoc(userCartRef);
          if (docSnapshot.exists()) {
            const userData = docSnapshot.data();
            const userCart = userData.cart || [];
            dispatch({ type: "LOGIN", payload: user });
            dispatch({ type: "UPDATE_CART", payload: userCart });
          } else {
            // User document doesn't exist, create it with an empty cart
            setDoc(userCartRef, { cart: [] }).catch((error) => {
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
  }, [user]);

  function removeFromCart(item) {
    if (user) {
      const userId = user.uid;
      const userCartRef = doc(db, "usersCollection", userId);

      // Fetch the user's data from Firestore
      getDoc(userCartRef)
        .then((docSnapshot) => {
          if (docSnapshot.exists()) {
            // User document exists, update the cart array

            const userData = docSnapshot.data();
            const userCart = userData.cart || []; // Use the existing cart or initialize an empty array

            // Find the index of the item to remove
            const itemIndexToRemove = userCart.findIndex(
              (cartItem) => cartItem.id === item.id
            );

            if (itemIndexToRemove !== -1) {
              // If the item is in the cart, remove it
              userCart.splice(itemIndexToRemove, 1);

              // Update the cart array in the user's document
              setDoc(userCartRef, { cart: userCart })
                .then(() => {
                  console.log(
                    "Item removed from cart and updated in Firestore."
                  );
                  dispatch({ type: "UPDATE_CART", payload: userCart });
                })
                .catch((error) => {
                  console.error("Error removing item from cart:", error);
                });
            }
          }
        })
        .catch((error) => {
          console.error("Error getting user data:", error);
        });
    }

    // Remove the item from the local cart state
    dispatch({ type: "REMOVE_FROM_CART", payload: item });

    dispatch({ type: "REMOVE_FROM_CART", payload: item });
  }
  function updateCart(userCart) {
    if (user) {
      const userId = user.uid;
      const userCartRef = doc(db, "usersCollection", userId);

      // Update the cart array in the user's document
      setDoc(userCartRef, { cart: userCart })
        .then(() => {
          console.log("Cart updated and saved to Firestore.");
        })
        .catch((error) => {
          console.error("Error updating cart:", error);
        });
    }
  }
  function increaseQuantity(item) {
    dispatch({ type: "INCREASE_QUANTITY", payload: item });
  }

  function decreaseQuantity(item) {
    dispatch({ type: "DECREASE_QUANTITY", payload: item });
  }

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        const userId = user.uid;
        const userCartRef = doc(db, "usersCollection", userId);

        try {
          const docSnapshot = await getDoc(userCartRef);
          if (docSnapshot.exists()) {
            const userData = docSnapshot.data();
            const userCart = userData.cart || [];
            setCartItems(userCart);
          } else {
            await setDoc(userCartRef, { cart: [] });
          }
        } catch (error) {
          console.error("Error getting user data: ", error);
        }
      } else {
      }
    };

    fetchData();
  }, [user, cartItems]);
  useEffect(() => {
    // Show the message for 2 seconds when an item is already in the cart
    if (showItemInCartMessage) {
      const timer = setTimeout(() => {
        setShowItemInCartMessage(false);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [showItemInCartMessage]);

  return (
    <CartContext.Provider
      value={{
        cart: state.cart,
        cartItems,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        updateCart,
        showItemInCartMessage,
        setShowItemInCartMessage,
        itemAlreadyInCart,
        setItemAlreadyInCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
