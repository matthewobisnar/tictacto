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
            <p className="order-counter">Orders <span>{items.length}</span></p>
            <ol className="order-list list-group">
                {
                    items.length > 0 ? (
                        items.map((item, index) => {
                            return <li className="list-group-item" key={index}>
                                <div className="row">
                                    <div className="col-md-4">
                                        <div className="fw-bold">Transaction code : <span>{'TRD-' + item.room}</span> </div>
                                        <div className="fw-bold">Emaill Address : <span>{item.email}</span> </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="fw-bold">Total item(s) ordered : <span>{item.cart?.length}</span></div>
                                        <div className="fw-bold">Total Price : <span>{formatPHPCurrency(item.total)}</span></div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="fw-bold">Date & Time : <span>{item.timeStamp}</span></div>
                                    </div>
                                </div>
                                <div className="fw-bold">Item(s) Ordered: </div>
                                <div className="grid items-row">
                                    {
                                        item.cart.length > 0 ? (
                                            item.cart.map((cartItem, cartKey) => {
                                                return <div className="items-container"key={cartKey}>
                                                        <div className="fw-bold">{cartItem.title}</div>
                                                        <div className="">{formatPHPCurrency(cartItem.price)}</div>
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