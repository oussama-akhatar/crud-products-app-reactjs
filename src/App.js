import './App.css';
import {BrowserRouter, Link, Route, Routes} from "react-router-dom";
import Home from "./components/Home";
import Products from "./components/Products";
import NewProduct from "./components/NewProduct";
import "bootstrap/dist/css/bootstrap.min.css";
import {useEffect, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHome, faProcedures} from "@fortawesome/free-solid-svg-icons";
import EditProduct from "./components/EditProduct";
import {AppContext, useAppState} from "./app/app";
import {State} from "./components/State";

function App() {
    const [currentRoute, setCurrentRoute] = useState();

    useEffect(() => {
        const path = window.location.pathname.toLocaleLowerCase();
        setCurrentRoute(path.slice(1, path.length));
        console.log("Message")
    }, []);

    return (
        <AppContext.Provider value={useAppState()}>
            <BrowserRouter>
                <nav className={"p-3 navbar"}>
                    <ul className="nav nav-pills">
                        <li>
                            <Link onClick={() => setCurrentRoute("home")}
                                  className={currentRoute === "home" ? "btn btn-primary me-1" : "btn btn-outline-primary me-1"}
                                  to={"/home"}><FontAwesomeIcon icon={faHome} className={"me-2"}></FontAwesomeIcon>Home</Link>
                        </li>
                        <li>
                            <Link onClick={() => setCurrentRoute("products")}
                                  className={currentRoute === "products" ? "btn btn-primary me-1" : "btn btn-outline-primary me-1"}
                                  to={"/products"}><FontAwesomeIcon icon={faProcedures}
                                                                    className={"me-2"}></FontAwesomeIcon>Products</Link>
                        </li>
                        <li>
                            <Link onClick={() => setCurrentRoute("newProduct")}
                                  className={currentRoute === "newProduct" ? "btn btn-primary me-1" : "btn btn-outline-primary me-1"}
                                  to={"/newProduct"}><FontAwesomeIcon icon={faProcedures}
                                                                      className={"me-2"}></FontAwesomeIcon>New
                                Product</Link>
                        </li>
                    </ul>
                    <ul className={"nav navbar-nav"}>
                        <li>
                            <State></State>
                        </li>
                    </ul>
                </nav>
                <Routes>
                    <Route path="/home" element={<Home/>}></Route>
                    <Route path="/products" element={<Products/>}></Route>
                    <Route path="/newProduct" element={<NewProduct/>}></Route>
                    <Route path="/editProduct/:id" element={<EditProduct/>}></Route>
                </Routes>
            </BrowserRouter>
        </AppContext.Provider>
    );
}

export default App;
