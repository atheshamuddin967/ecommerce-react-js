import { createContext, useContext, useEffect, useReducer } from "react";
import axios from "axios";
import reducer from "./ProductReducer";

const AppContext = createContext();
const API = "https://dummyjson.com/products";
const initialstate = {
  isLoading: false,
  isError: false,
  products: [],
};

const getProducts = async (url, dispatch) => {
  dispatch({ type: "SET_LOADING" });
  try {
    const res = await axios.get(url);
    const oldproducts = await res.data;
    const products = oldproducts.products.map((oldproduct) => ({
      ...oldproduct,
      quantity: 1,
    }));
    dispatch({ type: "SET_API_PRODUCTS", payload: products });
  } catch (error) {
    dispatch({ type: "API_ERROR" });
  }
};

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialstate);

  // Use useEffect to fetch data when the component mounts
  useEffect(() => {
    if (state.products.length === 0) {
      getProducts(API, dispatch);
    }
  }, [state.products]);

  return (
    <AppContext.Provider value={{ ...state }}>{children}</AppContext.Provider>
  );
};
const useProductContext = () => {
  return useContext(AppContext);
};
export { AppProvider, useProductContext };
