import React, {useContext, useEffect, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faCheck, faEdit, faSearch, faTrash, faXmark
} from "@fortawesome/free-solid-svg-icons";
import {AppContext, checkProduct, deleteProduct, getProducts} from "../app/app";
import {useNavigate} from "react-router-dom";

export default function Products() {
    const [query, setQuery] = useState("");
    const navigate = useNavigate();
    const [state, setState] = useContext(AppContext);
    useEffect(() => {
        handleGetProducts(state.keyword, state.currentPage, state.pageSize);
    }, []);

    const handleGetProducts = (keyword, page, size) => {
        getProducts(keyword, page, size).then(resp => {
            const totalElements = resp.headers['x-total-count'];
            let totalPages = Math.floor(totalElements / size);
            if (totalElements % size !== 0) totalPages++;
            setState({
                ...state,
                products: resp.data,
                keyword: keyword,
                currentPage: page,
                pageSize: size,
                totalPages: totalPages
            });
        }).catch(err => {
            console.log(err)
        })
    };

    const handleDeleteProduct = (product) => {
        deleteProduct(product).then(resp => {
            const newProducts = state.products.filter((p) => p.id !== product.id);
            setState({...state, products: newProducts});
        });
    };

    const handleCheckProduct = (product) => {
        checkProduct(product).then(resp => {
            const newProducts = state.products.map(p => {
                if (p.id === product.id) {
                    p.checked = !p.checked;
                }
                return p;
            });
            setState({...state, products: newProducts});
        });
    };

    const handleGoToPage = (page) => {
        handleGetProducts(state.keyword, page, state.pageSize);
    }

    const handleSearch = (event) => {
        event.preventDefault();
        handleGetProducts(query,1,state.pageSize);
    }

    return (<div className={"px-3"}>
        <div className={"card"}>
            <div className={"card-header"}>
                <h3>Products Component</h3>
            </div>
            <div className={"card-body"}>
                <div className={"card-body"}>
                    <form onSubmit={handleSearch}>
                        <div className={"row g-2"}>
                            <div className={"col-auto"}>
                                <input value={query} onChange={(e)=>setQuery(e.target.value)} type={"text"} className={"form-control"} placeholder={"Search ..."}/>
                            </div>
                            <div className={"col-auto"}>
                                <button className={"btn btn-success"}><FontAwesomeIcon icon={faSearch}/></button>
                            </div>
                        </div>
                    </form>
                </div>
                <table className={"table"}>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Checked</th>
                    </tr>
                    </thead>
                    <tbody>
                    {state.products.map((product) => (<tr key={product.id}>
                        <td>{product.id}</td>
                        <td>{product.name}</td>
                        <td>{product.price}</td>
                        <td>
                            <button onClick={() => handleCheckProduct(product)}
                                    className={product.checked ? "btn btn-outline-success" : "btn btn-outline-danger"}>
                                <FontAwesomeIcon icon={product.checked ? faCheck : faXmark}></FontAwesomeIcon>
                            </button>
                        </td>
                        <td>
                            <button onClick={() => handleDeleteProduct(product)}
                                    className={"btn btn-outline-danger"}>
                                <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>
                            </button>
                        </td>
                        <td>
                            <button onClick={() => navigate('/editProduct/'+product.id)} className={"btn btn-outline-success"}>
                                <FontAwesomeIcon icon={faEdit}></FontAwesomeIcon>
                            </button>
                        </td>
                    </tr>))}
                    </tbody>
                </table>
                <ul className={"nav nav-pills"}>
                    {
                        (new Array(state.totalPages).fill(0)).map((v, index) => (
                            <li key={index}>
                                <button onClick={() => handleGoToPage(index + 1)}
                                        className={(index+1)===state.currentPage?"btn btn-info me-1":"btn btn-outline-info me-1"}>{index + 1}</button>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </div>
    </div>);
}