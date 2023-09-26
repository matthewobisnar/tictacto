import io from "socket.io-client";
import "./App.scss";
import React, { useEffect, useState } from "react";
import skullcandyImage from './images/skullcandy.png';
import nanoleafImage from './images/nanoleaf.jpg';
import macbookairImage from './images/macbookair.jpg';
import vrcontrollerImage from './images/vrcontroller.jpg';
import ipadAirImage from './images/ipadAir.jpg';
import controllerImage from './images/controller.jpg';
import samsungOdysseyImage from './images/odyssey.jpg';
import iphone12Image from './images/iphone12.jpg';
import landingpageImage from './images/landingbg.png';
import { useHistory } from "react-router-dom";

import { Button } from 'react-bootstrap';
import { FaRegTrashAlt} from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";
import { Link } from "@mui/material";


const socket = io.connect("http://localhost:3002");

const Dashboard = () => {

    let keyCounts = {};
    
    const history = useHistory();

    let productList = [
        {
            title: "Nanoleaf Remote",
            description: "Colour-changing, modular, smart light panels you can control with your voice, touch buttons, or the Nanoleaf App.",
            priceLabel: "₱850",
            price: "850",
            image: nanoleafImage,
        },
        {
            title: "SkullCandy Earbuds",
            description: "The Indy True Wireless Earbuds by Skullcandy combine premium sound quality and a great design.",
            priceLabel: "₱ 3300",
            price: "3300",
            image: skullcandyImage,
        },
        {
            title: "Macbook Air",
            description: "13-inch MacBook Air laptop supercharged by the M2 chip. All-day battery life and strikingly thin design.",
            priceLabel: "₱ 83,000",
            price: "83000",
            image: macbookairImage,
        },
        {
            title: "Oculus Quest",
            description: "The first-generation Oculus Quest is a discontinued virtual reality headset developed by Oculus.",
            priceLabel: "₱ 45,512",
            price: "45512",
            image: vrcontrollerImage,
        },
        {
            title: "Ipad Air Wi-Fi",
            description: "Apple's 2022 iPad Air is the epitome of a mobile tablet, with a nearly perfect balance of features and performance.",
            priceLabel: "₱ 39,000",
            price: "39000",
            image: ipadAirImage,
        },
        {
            title: "PS5 DualSense Controller",
            description: "Meet the DualSense wireless controller featuring haptic feedback, adaptive triggers and an iconic new design.",
            priceLabel: "₱ 3,450",
            price: "3450",
            image: controllerImage,
        },
        {
            title: "Samsung Odyssey",
            description: "Enter a new frontier of immersion with a 55” curved screen featuring 4K resolution.",
            priceLabel: "₱ 125,000",
            price: "125000",
            image: samsungOdysseyImage,
        },
        {
            title: "Iphone 12",
            description: "The iPhone 12 sports a gorgeous design, full 5G support, great cameras and strong performance.",
            priceLabel: "₱ 44,570",
            price: "44570",
            image: iphone12Image,
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

    const handleButtonClick = () => {
        history.push("/order");
    };

    const checkOut = async () => {
        let data;

        if (email && email !== "") {
            data = {
                cart: cartList,
                total: total,
                email: email,
                room: roomKey,
                timeStamp: `${new Date(Date.now()).toDateString()} ${new Date(Date.now()).toLocaleTimeString("en-PH")}`,
            }

            await socket.emit("addOrder", data);

            alert("Your order has successfully submitted!");

            window.location.reload();
            // handleButtonClick();
        } else {
            alert("Please input email before checkout!");
        }
    }

    function formatPHPCurrency(amount, locale = 'en-PH') {
        const options = {
          style: 'currency',
          currency: 'PHP', // ISO currency code for Philippine Peso
          currencyDisplay: 'symbol', // Display currency symbol (₱)
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        };
    
        return new Intl.NumberFormat(locale, options).format(amount);
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



    document.addEventListener('DOMContentLoaded', function() {
        const landing = document.getElementById('landingId');
        if (landing) {
          landing.style.backgroundImage = `url(${landingpageImage})`;
          landing.style.padding = '40px';
        }
    });


    return (
        <div className="shop-body">
            <div className="container section">
                <div className="row">
                    <div className="col-md-12">
                        <div className="container-wrapper">
                            <div className="landingpage">
                                <div>
        <div id="landingId">
            <div id="landingwrapper">
                <div class="landing-navbar">
                <h1 class="landing-header">Paragon</h1>
                <div>
                <button type="button">Home</button>
                <button type="button">Products</button>
                <button type="button">About</button>
                </div></div>
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
                                <h1 className="secondword-title">Products</h1>
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
                                                        <large className="text-price">{formatPHPCurrency(item.price)}</large>
                                                        <div className="add-to-cart">                                                        
                                                            <Button onClick={() => addToCart(item.title, item.price, item.image)} variant="primary">Add to cart</Button>
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
                                                            PHP {formatPHPCurrency(item.price)}
                                                        </div>
                                                        <div className="col-1 delete-icon">
                                                            <FaRegTrashAlt color="#8a2be2" onClick={() => removeToCart(key, item.title)} size={24} />
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
                                                    <b>PHP {formatPHPCurrency(total)}</b>
                                                </div>
                                        
                                            </div>
                                        </div>
                                        <div className="container">
                                            <div>
                                                <div className="form-group">
                                                    <input onChange={(event) => inputChangedHandler(event.target.value, "email")} type="email" className="form-control" id="email" placeholder="Enter your email" />
                                                </div>
                                                <button onClick={() => checkOut()} type="button">Checkout</button>
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
