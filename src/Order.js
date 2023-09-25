import io from "socket.io-client";
import "./App.scss";
import React, { useEffect, useState } from "react";

import CollapsibleList from "./CollapsibleList";
import { useHistory } from "react-router-dom";
const socket = io.connect("http://localhost:3002");

const Order = () => {

    let [orderList, setOrderList] = useState([]);
    const history = useHistory();

    useEffect(() => {
        if (socket) {
            // socket.off("receiveOrder");
            socket.on("receiveOrder", (data) => {

                let orders;

                if (localStorage.getItem('orders')) {
                    orders = localStorage.getItem('orders');
                    orders = JSON.parse(orders);
                } else {
                    orders = [];
                }

                orders.push(data);

                localStorage.setItem('orders', JSON.stringify(orders));

                setOrderList([...orders]);

                // localStorage.setItem('orders', JSON.stringify(fileUnlockTimestamp));

            });
        }
    }, [socket]);

    useEffect(() => {
        if (localStorage.getItem('orders')) {
            orderList = localStorage.getItem('orders');
            orderList = JSON.parse(orderList);

            setOrderList([...orderList]);
        }
    }, []);

    const handleBackClick = () => {
        history.push("/");
    };

    return (
        <>
            <div className="order-body">
                <div className="container section">
                    <div className="row">
                        <div className="col-md-12">
                            <button onClick={handleBackClick}>Back</button>
                            <CollapsibleList items={orderList} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Order;
