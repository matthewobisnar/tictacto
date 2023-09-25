import io from "socket.io-client";
import "./App.scss";
import React, { useEffect, useState } from "react";
import nbaImage from './images/nba.jpeg';
import acvalhallaImage from './images/acvalhalla.jpeg';
import gta5Image from './images/gta5.jpg';
import hgImage from './images/hg.jpeg';
import spideyImage from './images/spidey.jpeg';
import witcherImage from './images/thewitcher.jpg';
import descendersImage from './images/descenders.jpg';
import tyrannyImage from './images/tyranny.jpg';

import { Button } from 'react-bootstrap';
import { FaRegTrashAlt} from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";

const socket = io.connect("http://localhost:3002");

const Dashboard = () => {

    let keyCounts = {};

    let productList = [
        {
            title: "NBA 2k23",
            description: "A basketball video game with updated rosters, improved graphics, and new features.",
            priceLabel: "₱ 3000",
            price: "3000",
            image: nbaImage,
        },
        {
            title: "Assasins Creed Valhalla",
            description: "An action-adventure game where players control Eivor, a Viking warrior, as they lead their clan to England.",
            priceLabel: "₱ 3000",
            price: "3000",
            image: acvalhallaImage,
        },
        {
            title: "Grand Theft Auto V",
            description: "An action-adventure game set in a fictional open-world city of Los Santos, based on Los Angeles.",
            priceLabel: "₱ 2000",
            price: "2000",
            image: gta5Image,
        },
        {
            title: "Hogwarts Legacy",
            description: "An upcoming action role-playing game set in the Harry Potter universe set in the 1800s.",
            priceLabel: "₱ 3000",
            price: "3000",
            image: hgImage,
        },
        {
            title: "Spiderman",
            description: "A 2018 action-adventure game where players control Peter Parker as he fights crime and protects New York City.",
            priceLabel: "₱ 2800",
            price: "2800",
            image: spideyImage,
        },
        {
            title: "The Witcher 3: Wild Hunt",
            description: "A 2015 action role-playing game developed and published by CD Projekt.",
            priceLabel: "₱ 2000",
            price: "2000",
            image: witcherImage,
        },
        {
            title: "Descenders",
            description: "A cycling video game developed by Dutch studio RageSquid and published by No More Robots.",
            priceLabel: "₱ 1250",
            price: "1250",
            image: descendersImage,
        },
        {
            title: "Tyranny",
            description: "A role-playing video game developed by Obsidian Entertainment and published by Paradox Interactive.",
            priceLabel: "₱ 1000",
            price: "1000",
            image: tyrannyImage,
        },
    ];
    let [roomKey, setRoomKey] = useState(null);
    let [cartList, setCartList] = useState([]);
    let [total, setTotal] = useState(parseInt(0));
    let [email, setEmail] = useState("");


    const generateRandomString = (length) => {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return result;
    }

    const addToCart = async (title, price, image) => {

        let data = {
            "title": title,
            "price": price,
            "image":image,
            "room": roomKey
        }

        socket.emit("join_room", data);
        cartList.push(data);
        setCartList([...cartList]);

        if (cartList.length > 0) {
            total = parseInt(0);
            cartList.forEach((item) => {

                let price = parseInt(item.price);

                total = total + price;

                setTotal(total);

            });
        }

        // socket.emit('get_rooms', null);


        // if (roomList.anchor) {
        //     roomList.anchor = null;
        //     roomList.show = false;
        // } else {
        //     roomList.show = true;
        //     roomList.anchor = event.target;
        // }
        // setRoomList({ ...roomList });
    };

    const removeToCart = async (key, title) => {

        let stoploop = false;

        cartList.forEach((item, cartKey) => {

            if (!stoploop) {
                if (item.title == title) {
                    cartList.splice(cartKey, 1);
                    stoploop = true;
                }
            }

        });

        setCartList([...cartList]);

        if (cartList.length > 0) {
            total = parseInt(0);
            cartList.forEach((item) => {

                let price = parseInt(item.price);

                total = total + price;

                setTotal(total);

            });
        }
    }

    const inputChangedHandler = (value, input) => {
        if (input === "email") {
            setEmail(value);
        }
    };

    const checkOut = async () => {
        let data;

        if (email && email !== "") {
            data = {
                cart: cartList,
                total: total,
                email: email,
                room: roomKey,
                timeStamp: `${new Date(Date.now()).toDateString()} ${new Date(Date.now()).toLocaleTimeString("en-US")}`,
            }

            await socket.emit("addOrder", data);

            alert("Your order has successfully submitted!");

            window.location.reload()



        } else {
            alert("Please input email before checkout!");
        }
    }

    useEffect(() => {
        socket.off("rooms");
        socket.on("rooms", (data) => {

            console.log(data);

            // roomList.data = [...data];
            // setRoomList(roomList);
        });

    }, [socket]);

    useEffect(() => {
        setRoomKey(generateRandomString(5));
    }, [])

    let itemTitles = [];

    return (
        <div className="shop-body">
            <div className="container section">
                <div className="row">
                    <div className="col-md-12">
                        <div className="container-wrapper">
                            <div className="landingpage">
    <div>
        <div>
            <div>
                <h1 class="landing-header">Paragon Games</h1>
                <h5 class="landing-bodyheader">Playstation Games</h5> 
                <p>The best place to buy videogames!</p>
                <div>
                    <a href="#">Call to Action</a>
                    <div>
                        <input type="checkbox" id="toggle-switch"></input>
                        <label for="toggle-switch"><span>Toggle Me <span>Mode</span></span></label>
                    </div>
                </div>
            </div>
            <div>
                <div>
                    <img src="dist/images/illustration-light.svg" alt="Illustration" class="asset-light"></img>
                    <img src="dist/images/illustration-dark.svg" alt="Illustration" class="asset-dark"></img>
                </div>
                <div>
                    <img src="dist/images/media-illustration-light.svg" alt="Media Illustration" class="asset-light"></img>
                    <img src="dist/images/media-illustration-dark.svg" alt="Media Illustration" class="asset-dark"></img>
                </div>
                <div>
                    <img src="dist/images/media-light.svg" alt="Media" class="asset-light"></img>
                    <img src="dist/images/media-dark.svg" alt="Media" class="asset-dark"></img>
                </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="d-flex">
                                <h1 className="firstword-title">Featured</h1>
                                <h1 className="secondword-title">Games</h1>
                            </div>
                            <div className="grid">
                                {
                                    productList.map((item, key) => {
                                        return <div key={key} className="grid-item">
                                            <div className="card">
                                                <img className="card-img-top" src={item.image} alt="NBA 2k23" />
                                                <div className="card-body">
                                                    <h5 className="card-title">{item.title}</h5>
                                                    <div class="inner-card-text">
                                                        <p className="card-text">{item.description}</p>
                                                            <div class="rate">
                                                                <input type="radio" id="star5" name="rate" value="5" />
                                                                <label for="star5" title="text">5 stars</label>
                                                                <input type="radio" id="star4" name="rate" value="4" />
                                                                <label for="star4" title="text">4 stars</label>
                                                                <input type="radio" id="star3" name="rate" value="3" />
                                                                <label for="star3" title="text">3 stars</label>
                                                                <input type="radio" id="star2" name="rate" value="2" />
                                                                <label for="star2" title="text">2 stars</label>
                                                                <input type="radio" id="star1" name="rate" value="1" />
                                                                <label for="star1" title="text">1 star</label>
                                                            </div>
                                                        <large className="text-price">{item.priceLabel}</large>
                                                        <div className="add-to-cart">                                                        
                                                            <Button onClick={() => addToCart(item.title, item.price)} variant="primary">Add to cart</Button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    })
                                }
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 cart-container">
                        {
                            cartList.length > 0 ? (
                                <div>
                                    <div className="card cart-wrapper box-shadow">
                                        <h4>Your Cart</h4>
                                        <div className="shopcart-icon">
                                            <FiShoppingCart size={28} color="#ffff" />
                                        </div>
                                        <div>
                                            {
                                                cartList.map((item, key) => {

                                                    if (!itemTitles.includes(item.title)) {
                                                        itemTitles.push(item.title)

                                                        keyCounts[item.title] = {
                                                            title: item.title,
                                                            quantity: 1,
                                                            price: item.price * 1,
                                                            image:item.image,
                                                            
                                                    
                                                        };
                                                    } else {
                                                        keyCounts[item.title] = {
                                                            title: item.title,
                                                            quantity: parseInt(keyCounts[item.title].quantity) + 1,
                                                            price: parseInt(item.price) * (parseInt(keyCounts[item.title].quantity) + 1),
                                                            image:item.image,
                                                            
                                                        };
                                                    }
                                                })
                                            }

                                            {
                                                Object.values(keyCounts).map((item, key) => {
                                                    return <div className="row">

                                                        <div className="col-3"><img src={item.image} />
                                                        </div>
                                                        <div className="col-5">
                                                             {item.title} {item.quantity > 1 ? "x" + item.quantity : ""}
                                                        </div>
                                                        <div className="col-3">
                                                            PHP {item.price}
                                                        </div>
                                                        <div className="col-1">
                                                            <FaRegTrashAlt color="#8a2be2" onClick={() => removeToCart(key, item.title)} size={20} />
                                                        </div>
                                                    </div>
                                                    
                                                })
                                            }

                                            <div className="shopcart-border" />
                                            <div className="row">
                   
                                                <div className="col-6">
                                                    <b>Total:</b>
                                                </div>
                                                <div className="col-3">
                                                    <b>PHP {total}</b>
                                                </div>
                                                <div className="col-3">
                                                </div>
                                            </div>
                                        </div>
                                        <div className="container">
                                            <div>
                                                <div className="form-group">
                                                    <input onChange={(event) => inputChangedHandler(event.target.value, "email")} type="email" className="form-control" id="email" placeholder="Enter your email" />
                                                </div>
                                                <button onClick={() => checkOut()} type="button" class="btn btn-block btn-primary">Checkout</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : null
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
