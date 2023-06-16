import axios from "axios";
import {createContext, useState} from "react";

export const AppContext = createContext();

export const productsApi = axios.create({
    baseURL: "http://localhost:9000"
});

export const getProducts = (keyword = "", page = 1, size = 4) => {
    return productsApi.get("/products?name_like=" + keyword + "&_page=" + page + "&_limit=" + size);
}

export const deleteProduct = (product) => {
    return productsApi.delete("/products/" + product.id);
}

export const getProduct = (id) => {
    return productsApi.get("/products/" + id);
}

export const saveProduct = (product) => {
    return productsApi.post("/products", product);
}

export const checkProduct = (product) => {
    return productsApi.patch("/products/" + product.id, {checked: !product.checked});
}

export const updateProduct = (product) => {
    return productsApi.put("/products/" + product.id, product);
}

export const useAppState = () => {
    const initialState = {
        products: [],
        currentPage: 1,
        pageSize: 4,
        keyword: "",
        totalPages: 0
    };
    return useState(initialState);
}