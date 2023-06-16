import React, {useEffect, useState} from "react";
import {getProduct, updateProduct} from "../app/app";
import {useParams} from "react-router-dom";

export default function EditProduct() {
    const {id} = useParams();
    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [checked, setChecked] = useState(false);

    const handleGetProductById = (id) => {
        getProduct(id).then(resp => {
            setName(resp.data.name);
            setPrice(resp.data.price);
            setChecked(resp.data.checked);
        });
    }

    useEffect(() => {
        handleGetProductById(id);
    }, []);

    const handleUpdateProduct = (event) => {
        event.preventDefault();
        let product = {id, name, price, checked};
        updateProduct(product).then((resp) => {
            alert(JSON.stringify(resp.data));
        }).catch((err) => {
            console.log(err)
        })
    }

    return (
        <div className={"row p-1"}>
            <div className={"col-md-6"}>
                <div className={"card"}>
                    <div className={"card-body"}>
                        <form onSubmit={handleUpdateProduct}>
                            <div className={"mb-3"}>
                                <label className={"form-label"}>Name: </label>
                                <input onChange={(e) => setName(e.target.value)} value={name}
                                       className={"form-control"}/>
                            </div>
                            <div className={"mb-3"}>
                                <label className={"form-label"}>Price: </label>
                                <input onChange={(e) => setPrice(e.target.value)} value={price}
                                       className={"form-control"}/>
                            </div>
                            <div className={"form-check mb-3"}>
                                <label className={"form-check-label"}>Checked </label>
                                <input onChange={(e) => setChecked(e.target.value)} checked={checked} type={"checkbox"}
                                       className={"form-check-input"}/>
                            </div>
                            <button className={"btn btn-success"}>Update</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}