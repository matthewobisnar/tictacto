import io from "socket.io-client";
import "./App.scss";
import React, { useEffect, useState } from "react";

import CollapsibleList from "./CollapsibleList";
const socket = io.connect("http://localhost:3002");

const Order = () => {

    let [orderList, setOrderList] = useState([]);

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

    return (
        <>
            <div className="shop order-body">
                <div className="container section">
                    <div className="row">
                        <div className="col-md-12">
                            <h3>Order List</h3>
                            <CollapsibleList items={orderList} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Order;
