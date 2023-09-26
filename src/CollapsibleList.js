import { cardActionAreaClasses } from "@mui/material";
import React, { useState } from "react";
import { CardText, Collapse } from "reactstrap";

const CollapsibleList = ({ items }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    return (
        <>
            <p className="order-counter">Orders <span>{items.length}</span></p>
            <ol className="order-list list-group">
                {
                    items.length > 0 ? (
                        items.map((item, index) => {
                            return <li className="list-group-item" key={index}>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="fw-bold">Transaction code : {'TRD-' + item.room}</div>
                                        <div className="fw-bold">Emaill Address : {item.email}</div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="fw-bold">Total items ordered : {item.cart?.length}</div>
                                        <div className="fw-bold">Total Price : {'PHP ' + item.total}</div>
                                        <div className="fw-bold">Time : {item.timeStamp}</div>
                                    </div>
                                </div>
                                <div className="row">
                                    {
                                        item.cart.length > 0 ? (
                                            item.cart.map((cartItem, cartKey) => {
                                                return <div key={cartKey}>
                                                    <div className="col-md-6">
                                                        <div className="fw-bold">{cartItem.title}</div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="fw-bold">PHP {cartItem.price}</div>
                                                    </div>
                                                </div>
                                            })
                                        ) : null
                                    }
                                </div>
                            </li>
                        })
                    ) : "No Available Transactions"
                }
            </ol>
        </>
    );
};

export default CollapsibleList;