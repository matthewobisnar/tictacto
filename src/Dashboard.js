import io from "socket.io-client";
import "./App.scss";
import React, { useEffect, useState} from "react";
import skullcandyImage from './images/skullcandy.png';
import nanoleafImage from './images/nanoleaf.jpg';
import macbookairImage from './images/macbookair.jpg';
import vrcontrollerImage from './images/vrcontroller.jpg';
import ipadAirImage from './images/ipadAir.jpg';
import controllerImage from './images/controller.jpg';
import samsungOdysseyImage from './images/odyssey.jpg';
import iphone12Image from './images/iphone12.jpg';
import lenovoLaptopBagImage from './images/lenovoLaptopBag.jpg';
import forniteHoodieImage from './images/forniteHoodie.jpg';
import keyboardImage from './images/keyboard.jpg';
import lightpanelsImage from './images/lightpanel.jpg';
import landingpageImage from './images/landingbg.png';
import landingeagleImage from './images/landingeagle.png';
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
            priceLabel: "PHP 850",
            price: "850",
            image: nanoleafImage,
        },
        {
            title: "SkullCandy Earbuds",
            description: "The Indy True Wireless Earbuds by Skullcandy combine premium sound quality and a great design.",
            priceLabel: "PHP 3300",
            price: "3300",
            image: skullcandyImage,
        },
        {
            title: "Macbook Air",
            description: "13-inch MacBook Air laptop supercharged by the M2 chip. All-day battery life and strikingly thin design.",
            priceLabel: "PHP 83,000",
            price: "83000",
            image: macbookairImage,
        },
        {
            title: "Oculus Quest",
            description: "The first-generation Oculus Quest is a discontinued virtual reality headset developed by Oculus.",
            priceLabel: "PHP 45,512",
            price: "45512",
            image: vrcontrollerImage,
        },
        {
            title: "Ipad Air Wi-Fi",
            description: "Apple's 2022 iPad Air is the epitome of a mobile tablet, with a nearly perfect balance of features and performance.",
            priceLabel: "PHP 39,000",
            price: "39000",
            image: ipadAirImage,
        },
        {
            title: "PS5 DualSense Controller",
            description: "Meet the DualSense wireless controller featuring haptic feedback, adaptive triggers and an iconic new design.",
            priceLabel: "PHP 3,450",
            price: "3450",
            image: controllerImage,
        },
        {
            title: "Samsung Odyssey",
            description: "Enter a new frontier of immersion with a 55” curved screen featuring 4K resolution.",
            priceLabel: "PHP 125,000",
            price: "125000",
            image: samsungOdysseyImage,
        },
        {
            title: "Iphone 12",
            description: "The iPhone 12 sports a gorgeous design, full 5G support, great cameras and strong performance.",
            priceLabel: "PHP 44,570",
            price: "44570",
            image: iphone12Image,
        },
        {
            title: "Lenovo Laptop Bag",
            description: "A built for gamers, this 17 inches Armored Backpack II seamlessly combines durability, convenience, and style.",
            priceLabel: "PHP 3,472",
            price: "3472",
            image: lenovoLaptopBagImage,
        },
        {
            title: "Fortnite The Raven Cosplay Hoodie",
            description: "A polyester cotton with thin fleece, soft and comfortable, the power of Raven is unleashed.",
            priceLabel: "PHP 1,975",
            price: "1975",
            image: forniteHoodieImage,
        },
        {
            title: "NPKC Doubleshot Sidelit Keycaps",
            description: "Standard ANSI Keycaps are truly unique gradual color gradient with charming appearance.",
            priceLabel: "PHP 1,250",
            price: "1250",
            image: keyboardImage,
        },
        {
            title: "Govee - Hexa Wall Light Panels",
            description: "A multi-color hexagon light panels that comes with a selection of multiple colors and color category.",
            priceLabel: "PHP 6,500",
            price: "6500",
            image: lightpanelsImage,
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

    // document.addEventListener('DOMContentLoaded', function() {
    //     const landing = document.getElementById('landingId');
    //     if (landing) {
    //       landing.style.backgroundImage = `url(${landingpageImage})`;
    //       landing.style.padding = '25px 120px';
    //       landing.style.height = '100vh';
    //       landing.style.marginBottom = '60px';
    //       landing.style.backgroundRepeat = 'no-repeat';
    //       landing.style.backgroundSize = 'cover';
    //       landing.style.backgroundAttachment = 'fixed';
    //     }
    // })

    document.addEventListener('DOMContentLoaded', function() {
        const image = document.createElement('img');
        image.src = landingeagleImage;
        image.alt = 'eagle'
        image.style.marginTop = '55px';
        const rightCol = document.querySelector('.right-col');
        rightCol.appendChild(image);
      });
  
      document.addEventListener('click', function(event) {
        const target = event.target;
        if (target.classList.contains('shopnow')) {
          const dFlexElement = target.closest('.d-flex');
          if (dFlexElement) {
            dFlexElement.scrollIntoView({ behavior: 'smooth' });
          }
        }
      }); 


    return (     
        <div className="shop-body">

            <div className="landingpage">
                <div>
                    <div id="landingId">
                            {/*landing page */}
                            <div id="landingwrapper">
                            <div class="landing-navbar">
                            <div class="display-flex">
                            <h1 class="landing-header">Paragon
                            <span class="purple">Hub</span></h1>
                            </div>
                            <div>
                            <button type="button">Home</button>
                            <button type="button">Products</button>
                            <button type="button">About</button>
                            <button class="svg-button">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 1024 1024">
                            <path d="M448 768A320 320 0 1 0 448 128a320 320 0 0 0 0 640z m297.344-76.992l214.592 214.592-54.336 54.336-214.592-214.592a384 384 0 1 1 54.336-54.336z" fill="#FFFFFF"/>
                            </svg></button>
                            <button class="svg-button">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                            <path id="Vector" d="M3 3H3.26835C3.74213 3 3.97943 3 4.17267 3.08548C4.34304 3.16084 4.48871 3.28218 4.59375 3.43604C4.71269 3.61026 4.75564 3.8429 4.84137 4.30727L7.00004 16L17.4218 16C17.875 16 18.1023 16 18.29 15.9199C18.4559 15.8492 18.5989 15.7346 18.7051 15.5889C18.8252 15.4242 18.8761 15.2037 18.9777 14.7631L18.9785 14.76L20.5477 7.95996L20.5481 7.95854C20.7023 7.29016 20.7796 6.95515 20.6947 6.69238C20.6202 6.46182 20.4635 6.26634 20.2556 6.14192C20.0184 6 19.6758 6 18.9887 6H5.5M18 21C17.4477 21 17 20.5523 17 20C17 19.4477 17.4477 19 18 19C18.5523 19 19 19.4477 19 20C19 20.5523 18.5523 21 18 21ZM8 21C7.44772 21 7 20.5523 7 20C7 19.4477 7.44772 19 8 19C8.55228 19 9 19.4477 9 20C9 20.5523 8.55228 21 8 21Z" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg></button>
                            </div></div>
                        </div>
                            {/*landing page body*/}
                        <div class="outer-container">
                            <div class="left-col">
                                <h5 class="landing-bodyheader">Empowering the world with latest <span class="landing-bodyheader purple">Top Of The Line</span><span class="landing-bodyheader"> Tech</span> </h5>
                                <p class="landing-bodyheader">Selling High-Quality, State-Of-The-Art Technologies and Equipment Guaranteed To Make Living Your Everyday Life <span class="orange"> 120% </span> Better</p>
                                <button className="shopnow">Shop Now</button>
                            </div>
                            <div class="right-col">
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <div className="container section">
                <div className="row">
                    <div className="col-md-12">
                        <div className="container-wrapper">
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
                                                            {formatPHPCurrency(item.price)}
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
                                                    <b>{formatPHPCurrency(total)}</b>
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
