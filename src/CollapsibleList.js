import { cardActionAreaClasses } from "@mui/material";
import React, { useState } from "react";
import { CardText, Collapse } from "reactstrap";

const CollapsibleList = ({ items }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    function formatPHPCurrency(amount, locale = 'en-PH') {
        const options = {
          style: 'currency',
          currency: 'PHP', 
          currencyDisplay: 'symbol',
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        };
    
        return new Intl.NumberFormat(locale, options).format(amount);
    }

    return (
        <>
            <p>Orders {items.length}</p>
            <ol className="list-group">
                {
                    items.length > 0 ? (
                        items.map((item, index) => {
                            return <li className="list-group-item" key={index}>
                                <div className="row">
                                    <div className="col-md-4">
                                        <div className="fw-bold">Transaction code : {'TRD-' + item.room}</div>
                                        <div className="fw-bold">Emaill Address : {item.email}</div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="fw-bold">Total items ordered : {item.cart?.length}</div>
                                        <div className="fw-bold">Total Price : {formatPHPCurrency(item.total)}</div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="fw-bold">Date & Time : {item.timeStamp}</div>
                                    </div>
                                </div>
                                <div className="grid items-row">
                                    {
                                        item.cart.length > 0 ? (
                                            item.cart.map((cartItem, cartKey) => {
                                                return <div className="items-container"key={cartKey}>
                                                        <div className="fw-bold">{cartItem.title}</div>
                                                        <div className="fw-bold">{formatPHPCurrency(cartItem.price)}</div>
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