import io from "socket.io-client";
import "./App.scss";
import React, { useEffect, useState } from "react";
import nbaImage from './images/nba.jpeg';
import acvalhallaImage from './images/acvalhalla.jpeg';
import gta5Image from './images/gta5.jpg';
import hgImage from './images/hg.jpeg';
import spideyImage from './images/spidey.jpeg';

import { Button } from 'react-bootstrap';
import { FaRegTrashAlt} from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";

const socket = io.connect("http://localhost:3002");

const Dashboard = () => {

    let keyCounts = {};

    let productList = [
        {
            title: "NBA 2k23",
            description: "NBA 2K23 is a basketball video game with updated rosters, improved graphics, and new features. Players can compete in game modes like MyCareer and MyTeam, controlling their favorite NBA teams and players. It offers a deep and engaging simulation experience for fans of the sport.",
            priceLabel: "PHP 3,000.00",
            price: "3000",
            image: nbaImage,
        },
        {
            title: "Assasins Creed Valhalla",
            description: "Assassin's Creed Valhalla is an action-adventure game where players control Eivor, a Viking warrior, as they lead their clan to England. The game includes open-world exploration, combat, and stealth mechanics, as well as modern-day storyline elements.",
            priceLabel: "PHP 1,500.00",
            price: "1500",
            image: acvalhallaImage,
        },
        {
            title: "Grand Theft Auto V",
            description: "Grand Theft Auto V (GTA V) is an action-adventure game set in a fictional open-world city of Los Santos, based on Los Angeles. Players control three criminals who commit heists and engage in criminal activities in both single-player and multiplayer modes.",
            priceLabel: "PHP 1,299.00",
            price: "1299",
            image: gta5Image,
        },
        {
            title: "Hogwarts Legacy",
            description: "Hogwarts Legacy is an upcoming action role-playing game set in the Harry Potter universe, allowing players to create their own character and attend Hogwarts School of Witchcraft and Wizardry in the 1800s. Players can explore the magical world, attend classes, learn spells, and engage in combat.",
            priceLabel: "PHP 3,200.00",
            price: "3200",
            image: hgImage,
        },
        {
            title: "Spiderman",
            description: "Spider-Man is a 2018 action-adventure game where players control Peter Parker as he fights crime and protects New York City. The game features an open-world setting, combat, and stealth mechanics. It was developed by Insomniac Games and published by Sony Interactive Entertainment.",
            priceLabel: "PHP 1,200.00",
            price: "1200",
            image: spideyImage,
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
                <h1 class="mt-0">PLAYSTATION GAMES</h1>
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
                
                            <div className="grid">
                                {
                                    productList.map((item, key) => {
                                        return <div key={key} className="grid-item">
                                            <div className="card">
                                                <img className="card-img-top" src={item.image} alt="NBA 2k23" />
                                                <div className="card-body">
                                                    <h5 className="card-title">{item.title}</h5>
                                                    <p className="card-text">{item.description}</p>
                                                    <div className="d-flex justify-content-between align-items-center">                                                        
                                                        <Button onClick={() => addToCart(item.title, item.price, item.image)} variant="primary">Add to Cart</Button>
                                                        <large className="text-muted">{item.priceLabel}</large>
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
                   
                                                <div className="col-5">
                                                    <b>Total:</b>
                                                </div>
                                                <div className="col-7">
                                                    <b>PHP {total}</b>
                                                </div>
                                                {/* <div className="col-3">
                                                </div> */}
                                            </div>
                                        </div>
                                        <div className="container">
                                            <div>
                                                <div className="form-group">
                                                    <input onChange={(event) => inputChangedHandler(event.target.value, "email")} type="email" className="form-control" id="email" placeholder="Enter your email" />
                                                </div>
                                                <button onClick={() => checkOut()} type="button" class=" btn btn-checkout btn-block btn-primary">Checkout</button>
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
