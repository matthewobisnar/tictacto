import io from "socket.io-client";
import "./App.scss";
import React, { useEffect, useState, useRef } from "react";
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
import nanoleafVideo from './images/nanoleaf-remote.mp4';
import skullcandyVideo from './images/skullcandy.mp4';
import macbookairVideo from './images/macbookair.mp4';
import oculusquestVideo from './images/oculusquest.mp4';
import ipadairVideo from './images/ipadair.mp4';
import dualsenseVideo from './images/dualsensecontroller.mp4';
import samsungodysseyVideo from './images/odyssey.mp4';
import iphone12Video from './images/iphone12.mp4';
import lenovolaptopbagVideo from './images/lenovobag.mp4';
import forniteraveVideo from './images/fornitetheraven.mp4';
import npckkeyboardVideo from './images/npkckeyboard.mp4';
import goveelightpanelsVideo from './images/goveelightpanels.mp4';


import landingpageImage from './images/landingbg.png';
import landingeagleImage from './images/landingeagle.png';
import paragonsLogo from './images/paragons-logo.png';
import personimage from './images/person.png';
import emailimage from './images/email.png';
import passwordimage from './images/password.png';

import { Button } from 'react-bootstrap';
import { FaRegTrashAlt } from "react-icons/fa";
import { FiItalic, FiShoppingCart } from "react-icons/fi";
import { Link } from "@mui/material";

import Modal from 'react-bootstrap/Modal';

const socket = io.connect("http://localhost:3002");

const Dashboard = () => {

    let keyCounts = {};

    let productList = [
        {
            title: "Nanoleaf Remote",
            characterization: "Colour-changing, modular, smart light panels you can control with your voice, touch buttons, or the Nanoleaf App.",
            description: "The Nanoleaf Remote is a product from Nanoleaf, a company known for its innovative smart lighting solutions. The Nanoleaf Remote is a unique and stylish device designed to control Nanoleaf light panels and other smart home devices. The Nanoleaf Remote has a distinctive dodecahedron shape, resembling a twelve-sided polygon. It is made of smooth, white plastic with touch-sensitive sides that allow you to interact with it.",
            priceLabel: "PHP 850",
            price: "850",
            image: nanoleafImage,
            video: nanoleafVideo
        },
        {
            title: "SkullCandy Earbuds",
            characterization: "The Indy True Wireless Earbuds by Skullcandy combine premium sound quality and a great design.",
            description: "Skullcandy is a well-known brand that produces a variety of audio products, including earbuds. Skullcandy earbuds are popular for their stylish designs, affordable pricing, and decent audio quality. Skullcandy earbuds come in various designs and colors, catering to different style preferences. They often feature the iconic skull logo on the earpieces.",
            priceLabel: "PHP 3300",
            price: "3300",
            image: skullcandyImage,
            video: skullcandyVideo
        },
        {
            title: "Macbook Air",
            characterization: "13-inch MacBook Air laptop supercharged by the M2 chip. All-day battery life and strikingly thin design.",
            description: "The MacBook Air is a line of lightweight and thin laptop computers developed and manufactured by Apple Inc. Since its initial release, the MacBook Air has become a popular choice for users seeking portability, sleek design, and reliable performance. The MacBook Air is known for its iconic thin and light design. It features an aluminum unibody construction, which not only adds to its durability but also gives it a premium look and feel.",
            priceLabel: "PHP 83,000",
            price: "83000",
            image: macbookairImage,
            video: macbookairVideo
        },
        {
            title: "Oculus Quest",
            characterization: "The first-generation Oculus Quest is a discontinued virtual reality headset developed by Oculus.",
            description: "The Oculus Quest is a line of virtual reality (VR) headsets developed by Oculus, a subsidiary of Facebook (now Meta Platforms, Inc.). The Quest series is designed to provide a standalone VR experience, meaning it doesn't require a connected PC or external sensors to function. The Oculus Quest offers a wireless VR experience, allowing users to enjoy VR content without the need for a wired connection to a computer. This makes it more accessible and user-friendly.",
            priceLabel: "PHP 45,512",
            price: "45512",
            image: vrcontrollerImage,
            video: oculusquestVideo
        },
        {
            title: "Ipad Air Wi-Fi",
            characterization: "Apple's 2022 iPad Air is the epitome of a mobile tablet, with a nearly perfect balance of features and performance.",
            description: "The iPad Air is a line of tablet computers developed by Apple Inc. It is known for its balance between performance, features, and portability. It typically features a sleek and thin design with a premium aluminum body. It is powered by Apple's custom-designed processors, which are known for their performance and efficiency. The specific chip may vary by generation, but they tend to offer smooth multitasking and app performance.",
            priceLabel: "PHP 39,000",
            price: "39000",
            image: ipadAirImage,
            video: ipadairVideo
        },
        {
            title: "PS5 DualSense Controller",
            characterization: "Meet the DualSense wireless controller featuring haptic feedback, adaptive triggers and an iconic new design.",
            description: "The PlayStation 5 (PS5) DualSense controller is the primary game controller designed for use with Sony's PlayStation 5 gaming console. Released alongside the PS5 in November 2020, the DualSense controller represents a significant upgrade over its predecessor, the DualShock 4, and introduces several innovative features. The DualSense controller features a fresh and modern design compared to previous PlayStation controllers.",
            priceLabel: "PHP 3,450",
            price: "3450",
            image: controllerImage,
            video: dualsenseVideo
        },
        {
            title: "Samsung Odyssey",
            characterization: "Get your head in the game with the 55” curved display, featuring 4K resolution, which matches the curve of the human eye.",
            description: "Samsung has a line of gaming monitors known as the Samsung Odyssey series. These monitors are designed to provide high refresh rates, low response times, and features tailored for gaming. Some of the common features you might find in Samsung Odyssey gaming monitors include curved screens, QLED panels for vibrant colors, and support for high resolutions like QHD (Quad High Definition) or 4K.",
            priceLabel: "PHP 125,000",
            price: "125000",
            image: samsungOdysseyImage,
            video: samsungodysseyVideo
        },
        {
            title: "Iphone 12",
            characterization: "The iPhone 12 sports a gorgeous design, full 5G support, great cameras and strong performance.",
            description: "The iPhone 12 features a flat-edge design reminiscent of the iPhone 4 and 5, with an aluminum frame and a glass front and back. It's available in multiple colors, including black, white, red, green, and blue. It comes with a Super Retina XDR display, which offers excellent color accuracy and high brightness levels. It is available in two sizes: a 6.1-inch display for the standard iPhone 12 and a 5.4-inch display for the iPhone 12 mini.",
            priceLabel: "PHP 44,570",
            price: "44570",
            image: iphone12Image,
            video: iphone12Video
        },
        {
            title: "Lenovo Laptop Bag",
            characterization: "A 17 inches Armored Backpack II that utilizes a water-repellent fabric and a clean, streamlined design to create a case that's suited to modern life and aesthetic approach.",
            description: "Lenovo laptop backpacks are a popular choice for users who need a comfortable and hands-free way to carry their laptops and other essentials. They typically have dedicated padded compartments to securely hold laptops of various sizes. Many Lenovo backpacks also offer additional pockets and compartments for organization and storage of accessories, such as chargers, cables, and notebooks.",
            priceLabel: "PHP 3,472",
            price: "3472",
            image: lenovoLaptopBagImage,
            video: lenovolaptopbagVideo
        },
        {
            title: "Fortnite The Raven Cosplay Hoodie",
            characterization: "A polyester cotton with thin fleece, soft and comfortable, the power of Raven is unleashed.",
            description: "The Raven Cosplay Hoodie is a piece of clothing inspired by the popular video game Fortnite. Raven is a Legendary Outfit in Battle Royale that can be purchased from the Item Shop. The Iron Cage Back Bling is bundled with this Outfit. It is considered as one of the most popular character skin in the online multiplayer game Fortnite, known for its mysterious and dark appearance.",
            priceLabel: "PHP 1,975",
            price: "1975",
            image: forniteHoodieImage,
            video: forniteraveVideo
        },
        {
            title: "NPKC Doubleshot Sidelit Keycaps",   
            characterization: "Standard ANSI Keycaps are truly unique gradual color gradient with charming appearance.",
            description: "NPKC Doubleshot Sidelit Keycaps are specialized keycaps designed for mechanical keyboards. They are known for their unique feature of allowing light from the keyboard's backlighting to shine through the sides of the keycaps, creating a visually striking and vibrant lighting effect. What sets NPKC Doubleshot Sidelit Keycaps apart is their unique design that allows for sidelit illumination.",
            priceLabel: "PHP 1,250",
            price: "1250",
            image: keyboardImage,
            video: npckkeyboardVideo
        },
        {
            title: "Govee - Hexa Wall Light Panels",
            characterization: "A multi-color hexagon light panels that comes with a selection of multiple colors and color category. It is composed of 7/10 panels that can be assorted into various shapes.",
            description: "Govee Hexa Wall Light Panels are a product offered by Govee, a company specializing in smart home lighting solutions. These Hexa Wall Light Panels are designed to provide customizable and dynamic lighting effects for your home or workspace. Each hexagonal panel contains RGB (Red, Green, Blue) LED lights, which can produce a wide spectrum of colors. You can choose from millions of colors to create different lighting moods and atmospheres.",
            priceLabel: "PHP 6,500",
            price: "6500",
            image: lightpanelsImage,
            video: goveelightpanelsVideo
        },
    ];
    let [roomKey, setRoomKey] = useState(null);
    let [cartList, setCartList] = useState([]);
    let [total, setTotal] = useState(parseInt(0));
    let [email, setEmail] = useState("");

    //signup values//
    let [emailSignup, setEmailSignup] = useState("");
    let [nameSignup, setNameSignup] = useState("");
    let [passwordSignup, setPasswordSignup] = useState("");
    let signedUsers = localStorage.getItem('users');



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
            "image": image,
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
        }else{
            switch(input){
                case "nameSignup":
                    setNameSignup(value);
                break ;
                    
                case "emailSignup":
                    setEmailSignup(value);
                break;
                case "passwordSignup":
                    setPasswordSignup(value);
                break;
            }
        }
    };

    const resetValues = () => {
        setNameSignup("");
        setEmailSignup("");
        setPasswordSignup("");
    }

    const signUp = async () => {

        let data = {
            name:nameSignup,
            email:emailSignup,
            password:passwordSignup,
        }

        let userList;
        let invalid = false;

        if(signedUsers){
            userList = JSON.parse(signedUsers);

            userList.map((item)=>{
                if(item.email == emailSignup){
                    invalid = true;
                }
            });
        }else{
            userList = [];
        }

        if(invalid){
            alert('Email already existing!');
        }else{
            userList.push(data);
            localStorage.setItem('users', JSON.stringify(userList));
            resetValues();
            setShowSignUpModal(false);
            setShowLoginModal(false);

            await socket.emit("addUser", userList);

            alert('Nkapag sign up na!');
        }
        
    }

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

    const buttonRef = useRef(null);
    const targetRef = useRef(null);
    
    const scrollToTarget = () => {
            if (targetRef.current) {
                targetRef.current.scrollIntoView({ behavior: 'smooth' });
            }
        };


    // Toggle Cart
    const [isTrue, setIsTrue] = useState(false);

    const toggleValue = () => {
        console.log('Button clicked');
        console.log('Before toggling: isTrue is', isTrue);
        setIsTrue((prevIsTrue) => {
          console.log('Inside toggling: isTrue is', prevIsTrue);
          return !prevIsTrue;

        });
    };
      
      //Toggle Homebtn
    const [isClassRemoved, setIsClassRemoved] = useState(false);

    const handleButtonClick = () => {
          setIsClassRemoved(true);
          scrollToTarget();
    };


    //Search
    document.addEventListener("DOMContentLoaded", function () {
        const showSearchButton = document.getElementById("showSearchButton");
        const searchContainer = document.getElementById("searchContainer");
        const searchInput = document.getElementById("searchInput");
        const searchButton = document.getElementById("searchButton");
        let clickCount = 0;
        let searchMethod = null;
      
        showSearchButton.addEventListener("click", function () {
          searchContainer.style.display = "flex";
          searchInput.style.display = "flex";
          searchButton.style.display = "flex";
          showSearchButton.style.display = "none";
        });
      
        searchInput.addEventListener("keypress", function (event) {
          if (event.key === "Enter") {
            performSearch("enter");
          }
        });
      
        searchButton.addEventListener("click", function () {
          performSearch("button");
        });
      
        function performSearch(method) {
          const searchText = searchInput.value.trim().toLowerCase();
          const productList = document.querySelectorAll(".grid-item");
      
          if (searchText === "") {
            showSearchButton.style.display = "block";
            searchInput.style.display = "none";
            searchButton.style.display = "none";
          } else {
            let found = false;
      
            productList.forEach((productItem) => {
              const productTitle = productItem.querySelector(".card-title");
              const productDescription = productItem.querySelector(".card-text");
      
              if (
                productTitle &&
                productTitle.textContent.toLowerCase().includes(searchText)
              ) {
                productTitle.innerHTML = productTitle.textContent.replace(
                  new RegExp(searchText, "gi"),
                  (match) => `<span class="highlighted-text">${match}</span>`
                );
      
                productItem.scrollIntoView({
                  behavior: "smooth",
                  block: "center",
                });
      
                found = true;
              }
      
              if (
                productDescription &&
                productDescription.textContent.toLowerCase().includes(searchText)
              ) {
                productDescription.innerHTML = productDescription.textContent.replace(
                  new RegExp(searchText, "gi"),
                  (match) => `<span class="highlighted-text">${match}</span>`
                );
      
                if (!found) {
                  productItem.scrollIntoView({
                    behavior: "smooth",
                    block: "center",
                  });
      
                  found = true;
                }
              }
            });
          }
      
          searchMethod = method;
          clickCount = 0;
        }
      
        document.addEventListener("click", function (event) {
          if (searchMethod === "button") {
            clickCount++;
            if (clickCount === 2) {
              removeHighlightedText();
            }
          } else if (searchMethod === "enter") {
            removeHighlightedText();
          }
        });
      
        function removeHighlightedText() {
          const highlightedElements = document.querySelectorAll(".highlighted-text");
          if (highlightedElements.length > 0) {
            highlightedElements.forEach((element) => {
              element.classList.remove("highlighted-text");
            });
          }
        }
      });

      //add burger
        const [isOpen, setIsOpen] = useState(false);
      
        const toggleMenu = () => {
          setIsOpen(!isOpen);
        };

        
        const [show, setShow] = useState(false);

        let [productModal, setproductModal] = useState([]);

        const productHandleShow = async (title, image, description, price, video) => {

            let product = {
                "title": title,
                "image": image,
                "description": description,
                "price": price,
                "video": video
            }
            
            setShow(true);
            productModal.push(product);
            setproductModal([...productModal]);
        }

        const productHandleClose = async (key, title) => {
            let stoploop = false;
    
            productModal.forEach((item, cartKey) => {
    
                if (!stoploop) {
                    if (item.title == title) {
                        productModal.splice(cartKey, 1);
                        stoploop = true;
                    }
                }
    
            });
    
            setproductModal([...productModal]);

            setShow(false);
        }

        
          
      // Add Login Modal
      const [showLoginModal, setShowLoginModal] = useState(false);

      const openLoginModal = () => {
        console.log('Opening modal'); 
        setShowLoginModal(true);
      };
    
      const closeLoginModal = () => {
        console.log('Closing modal'); 
        setShowLoginModal(false);
      };
    //    Add SignUp Modal
    const [showSignUpModal, setShowSignUpModal] = useState(false);

      const openSignUpModal = () => {
        setShowSignUpModal(true);
      };
    
      const closeSignUpModal = () => {
        setShowSignUpModal(false);
      };
      
      // Reset Total
      const resetTotal = () => {
        if(total > 0){
        setTotal(0);
        }
      };
      


    return (
        <div className="shop-body">

            <div className="landingpage">
                <div>
                    <div id="landingId">
                        {/*landing page */}
                        <div className="landingwrapper">
                            <div className="landing-navbar">
                                <div className="display-flex">
                                    {/* <h1 className="landing-header">Paragon
                                        <span className="purple">Hub</span>
                                    </h1> */}
                                    
                                    <img className="paragons-logo-main" src={paragonsLogo} alt="Eagle"/>
                                </div>
                                <div className="display-flex desktopnavbar">
                                    <button type="button" className={isClassRemoved ? '' : ''}>Home</button>
                                    <button type="button" onClick={handleButtonClick}>Products</button>
                                    <button type="button">About</button>
                                    <div id="searchContainer" className="display-flex justify" style={{ display: 'none' }}>
                                    <input type="text" id="searchInput" className="searchbar" placeholder="Search..." style={{ display: 'none' }} />
                                    <button id="searchButton" className="searchbutton" style={{ display: 'none' }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 1024 1024">
                                            <path d="M448 768A320 320 0 1 0 448 128a320 320 0 0 0 0 640z m297.344-76.992l214.592 214.592-54.336 54.336-214.592-214.592a384 384 0 1 1 54.336-54.336z" fill="#FFFFFF" />
                                        </svg>
                                    </button>
                                    </div>
                                    <button className="svg-button" id="showSearchButton">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 1024 1024">
                                            <path d="M448 768A320 320 0 1 0 448 128a320 320 0 0 0 0 640z m297.344-76.992l214.592 214.592-54.336 54.336-214.592-214.592a384 384 0 1 1 54.336-54.336z" fill="#FFFFFF" />
                                        </svg></button>
                                    <button className="svg-button" onClick={() => { toggleValue(); resetTotal(); }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                                            <path id="Vector" d="M3 3H3.26835C3.74213 3 3.97943 3 4.17267 3.08548C4.34304 3.16084 4.48871 3.28218 4.59375 3.43604C4.71269 3.61026 4.75564 3.8429 4.84137 4.30727L7.00004 16L17.4218 16C17.875 16 18.1023 16 18.29 15.9199C18.4559 15.8492 18.5989 15.7346 18.7051 15.5889C18.8252 15.4242 18.8761 15.2037 18.9777 14.7631L18.9785 14.76L20.5477 7.95996L20.5481 7.95854C20.7023 7.29016 20.7796 6.95515 20.6947 6.69238C20.6202 6.46182 20.4635 6.26634 20.2556 6.14192C20.0184 6 19.6758 6 18.9887 6H5.5M18 21C17.4477 21 17 20.5523 17 20C17 19.4477 17.4477 19 18 19C18.5523 19 19 19.4477 19 20C19 20.5523 18.5523 21 18 21ZM8 21C7.44772 21 7 20.5523 7 20C7 19.4477 7.44772 19 8 19C8.55228 19 9 19.4477 9 20C9 20.5523 8.55228 21 8 21Z" stroke="#FFFFFF" fill="transparent" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </button>
                                    <button className="svg-button" onClick={openLoginModal}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="18" viewBox="0 0 1024 1024">
                                        <path d="M532.528 661.408c-12.512 12.496-12.513 32.752-.001 45.248 6.256 6.256 14.432 9.376 22.624 9.376s16.368-3.12 22.624-9.376l189.008-194L577.775 318.64c-12.496-12.496-32.752-12.496-45.248 0-12.512 12.496-12.512 32.752 0 45.248l115.744 115.76H31.839c-17.68 0-32 14.336-32 32s14.32 32 32 32h618.448zM960.159 0h-576c-35.36 0-64.017 28.656-64.017 64v288h64.432V103.024c0-21.376 17.344-38.72 38.72-38.72h496.704c21.408 0 38.72 17.344 38.72 38.72l1.007 818.288c0 21.376-17.311 38.72-38.72 38.72H423.31c-21.376 0-38.72-17.344-38.72-38.72V670.944l-64.432.08V960c0 35.344 28.656 64 64.017 64h576c35.344 0 64-28.656 64-64V64c-.016-35.344-28.672-64-64.016-64z"  fill="#FFFFFF" strokeWidth="2" />
                                        </svg></button>

                                </div>
                                <div className={`hamburger-menu ${isOpen ? 'open' : ''}`}>
                                    <div className="hamburger-icon" onClick={toggleMenu}>
                                        <div className="bar"></div>
                                        <div className="bar"></div>
                                        <div className="bar"></div>
                                    </div>
                                
                                    <div className="menu">
                                    <button type="button" className={isClassRemoved ? '' : ''}>Home</button>
                                    <button type="button" onClick={handleButtonClick}>Products</button>
                                    <button type="button">About</button>
                                        <div id="searchContainer" className="display-flex justify" style={{ display: 'none' }}>
                                    <input type="text" id="searchInput" placeholder="Search..." style={{ display: 'none' }} />
                                    <button id="searchButton" style={{ display: 'none' }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 1024 1024">
                                            <path d="M448 768A320 320 0 1 0 448 128a320 320 0 0 0 0 640z m297.344-76.992l214.592 214.592-54.336 54.336-214.592-214.592a384 384 0 1 1 54.336-54.336z" fill="#FFFFFF" />
                                        </svg>
                                    </button>
                                    </div>
                                    <button className="svg-button" id="showSearchButton">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 1024 1024">
                                            <path d="M448 768A320 320 0 1 0 448 128a320 320 0 0 0 0 640z m297.344-76.992l214.592 214.592-54.336 54.336-214.592-214.592a384 384 0 1 1 54.336-54.336z" fill="#FFFFFF" />
                                        </svg></button>
                                    <button className="svg-button" onClick={() => { toggleValue(); resetTotal(); }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                                            <path id="Vector" d="M3 3H3.26835C3.74213 3 3.97943 3 4.17267 3.08548C4.34304 3.16084 4.48871 3.28218 4.59375 3.43604C4.71269 3.61026 4.75564 3.8429 4.84137 4.30727L7.00004 16L17.4218 16C17.875 16 18.1023 16 18.29 15.9199C18.4559 15.8492 18.5989 15.7346 18.7051 15.5889C18.8252 15.4242 18.8761 15.2037 18.9777 14.7631L18.9785 14.76L20.5477 7.95996L20.5481 7.95854C20.7023 7.29016 20.7796 6.95515 20.6947 6.69238C20.6202 6.46182 20.4635 6.26634 20.2556 6.14192C20.0184 6 19.6758 6 18.9887 6H5.5M18 21C17.4477 21 17 20.5523 17 20C17 19.4477 17.4477 19 18 19C18.5523 19 19 19.4477 19 20C19 20.5523 18.5523 21 18 21ZM8 21C7.44772 21 7 20.5523 7 20C7 19.4477 7.44772 19 8 19C8.55228 19 9 19.4477 9 20C9 20.5523 8.55228 21 8 21Z" stroke="#FFFFFF" fill="transparent" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg></button>
                                    <button className="svg-button">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 1024 1024">
                                        <path d="M532.528 661.408c-12.512 12.496-12.513 32.752-.001 45.248 6.256 6.256 14.432 9.376 22.624 9.376s16.368-3.12 22.624-9.376l189.008-194L577.775 318.64c-12.496-12.496-32.752-12.496-45.248 0-12.512 12.496-12.512 32.752 0 45.248l115.744 115.76H31.839c-17.68 0-32 14.336-32 32s14.32 32 32 32h618.448zM960.159 0h-576c-35.36 0-64.017 28.656-64.017 64v288h64.432V103.024c0-21.376 17.344-38.72 38.72-38.72h496.704c21.408 0 38.72 17.344 38.72 38.72l1.007 818.288c0 21.376-17.311 38.72-38.72 38.72H423.31c-21.376 0-38.72-17.344-38.72-38.72V670.944l-64.432.08V960c0 35.344 28.656 64 64.017 64h576c35.344 0 64-28.656 64-64V64c-.016-35.344-28.672-64-64.016-64z"  fill="#FFFFFF"/>
                                        </svg></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/*landing page body*/}
                        <div className="outer-container">
                            <div className="left-col">
                                <h5 className="landing-bodyheader">Empowering the world with latest <span className="landing-bodyheader purple">Top Of The Line</span><span className="landing-bodyheader"> Tech</span> </h5>
                                <p className="landing-bodyheader">Selling High-Quality, State-Of-The-Art Technologies and Equipment Guaranteed To Make Living Your Everyday Life <span className="orange"> 120% </span> Better</p>
                                <button className="shopnow" onClick={scrollToTarget}>Shop Now</button>
                            </div>
                            <div className="right-col">
                                <img className="right-img" src={landingeagleImage} alt="Eagle"/>
                            </div>
                        </div>
                        <div className="modal-login">
                        {showLoginModal && (
                            <div className={`modal ${showLoginModal ? 'active ease-in-modal' : ''}`}>
                                    {/*<button className="modal-button" onClick={openSignUpModal}>Sign Up</button>*/}
                                <div className="modal-card">
                                <button className="exit-button" onClick={closeLoginModal}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="gray" className="bi bi-x"viewBox="0 0 16 16">
                                <path d="M10.293 8l3.147-3.147a.5.5 0 0 0-.708-.708L8 7.293 4.853 4.146a.5.5 0 0 0-.708.708L7.293 8l-3.147 3.147a.5.5 0 0 0 .708.708L8 8.707l3.147 3.147a.5.5 0 0 0 .708-.708L8.707 8l3.147-3.147a.5.5 0 0 0-.708-.708L8 8.293 4.853 5.146a.5.5 0 0 0-.708.708L7.293 8l-3.147 3.147a.5.5 0 0 0 .708.708L8 8.707l3.147 3.147a.5.5 0 0 0 .708-.708L8.707 8z" />
                            </svg>
                            </button>
                                <div className="header">
                                <div className="text">Login</div>
                                <p>Join us and stay up-to-date with the latest in-stock tech innovations!</p>
                                <div className="underline"></div>
                                </div>
                                <div className="inputs">
                                    <div className="input">
                                        <img src={emailimage} alt=""/>
                                        <input type="email" placeholder="Email Id"/>
                                    </div>
                                    <div className="input">
                                        <img src={passwordimage} alt=""/>
                                        <input type="password" placeholder="Password"/>
                                    </div>
                                    <div className="border-bottom-grey">
                                    <button className="modal-button shopnow">Login</button>
                                    </div></div>
                                    <p>Haven't joined yet?</p>
                                    <span className="create" onClick={openSignUpModal} style={{ cursor: 'pointer' }}>Create an account</span>
                                </div>
                            </div>
                        )}

                        {showSignUpModal && (
                            <div className={`modal ${showSignUpModal ? 'active' : ''}`}>
                                <div className="modal-card">
                                <button className="exit-button" onClick={closeSignUpModal}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="gray" className="bi bi-x"viewBox="0 0 16 16">
                                <path d="M10.293 8l3.147-3.147a.5.5 0 0 0-.708-.708L8 7.293 4.853 4.146a.5.5 0 0 0-.708.708L7.293 8l-3.147 3.147a.5.5 0 0 0 .708.708L8 8.707l3.147 3.147a.5.5 0 0 0 .708-.708L8.707 8l3.147-3.147a.5.5 0 0 0-.708-.708L8 8.293 4.853 5.146a.5.5 0 0 0-.708.708L7.293 8l-3.147 3.147a.5.5 0 0 0 .708.708L8 8.707l3.147 3.147a.5.5 0 0 0 .708-.708L8.707 8z" />
                                </svg></button>
                                <div className="header">
                                <div className="text">Sign Up</div>
                                <div className="underline"></div>
                                </div>
                                <div className="inputs">
                                    <div className="input">
                                        <img src={personimage} alt=""/>
                                        <input onChange={(event) => inputChangedHandler(event.target.value, "nameSignup")} type="text" placeholder="Name" />
                                    </div>
                                    <div className="input">
                                        <img src={emailimage} alt=""/>
                                        <input onChange={(event) => inputChangedHandler(event.target.value, "emailSignup")} type="email" placeholder="Email Id"/>
                                    </div>
                                    <div className="input">
                                        <img src={passwordimage} alt=""/>
                                        <input onChange={(event) => inputChangedHandler(event.target.value, "passwordSignup")} type="password" placeholder="Password"/>
                                    </div>
                                    <button className="modal-button" onClick={() => signUp()}>Sign Up</button>
                                </div>
                                </div>
                            </div>
                         )}       

                        </div>

                    </div>
                </div>
            </div>
                            

            <div className="container section">
                <div className="row">
                    <div className="col-md-12">
                        <div className="container-wrapper">
                            <div className="d-flex" ref={targetRef}>
                                <h1 className="firstword-title">Featured</h1>
                                <h1 className="secondword-title">Products</h1>
                            </div>
                            <div className="grid">
                                {
                                    productList.map((item, key) => {
                                        return <div key={key} className="grid-item">
                                            <div className="card">
                                                <img className="card-img-top" src={item.image} alt="NBA 2k23" onClick={() => productHandleShow(item.title, item.image, item.description, item.price, item.video)}/>
                                                
                                                <div className="productmodal">
                                                    {
                                                        productModal.map((item) => {
                                                            keyCounts[item.title] = {
                                                                title: item.title,
                                                                image: item.image,
                                                                description: item.description,
                                                                price: item.price,
                                                                video: item.video
                                                            }; 
                                                        })
                                                    }
                                                    {
                                                        Object.values(keyCounts).map((item, key) => {
                                                            return <div className="product-item-modal"> <Modal show={show} onHide={() => productHandleClose(key, item.title)}>
                                                                    <Modal.Header closeButton>
                                                                    <Modal.Title>{item.title}</Modal.Title>
                                                                    </Modal.Header>
                                                                    <Modal.Body>
                                                                        <div className="video-player">
                                                                            <video width="100%" height="250" controls loop autoPlay muted>
                                                                                <source src={item.video} type="video/mp4" />
                                                                                Your browser does not support the video tag.
                                                                            </video>
                                                                        </div>
                                                                        <div className="productstar">
                                                                            <div className="rate">
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
                                                                        </div>
                                                                        <hr></hr>
                                                                            <div className="modal-description">
                                                                                {item.description}
                                                                            </div>
                                                                        <hr></hr>
                                                                        <div className="modal-pricing">
                                                                            <div className="left-part">
                                                                                <p>Price: <b className="text-price">{formatPHPCurrency(item.price)}</b> </p>
                                                                            </div>
                                                                            <div className="right-part">
                                                                                <Button onClick={() => addToCart(item.title, item.price, item.image)} variant="primary">Add to cart</Button>
                                                                            </div>
                                                                        </div>
                                                                    </Modal.Body>
                                                                </Modal>
                                                            </div>
                                                        })
                                                    }
                                                </div>

                                                <div className="card-body">
                                                    <h5 className="card-title">{item.title}</h5>
                                                    <div className="inner-card-text">
                                                        <p className="card-text">{item.characterization}</p>
                                                        <div className="rate">
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
                                                        <b className="text-price">{formatPHPCurrency(item.price)}</b>
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
                </div>
            </div>
            
            <div className="cart">
            {
                cartList.length > 0 || isTrue? (
                    <div className="card cart-wrapper box-shadow">
                        <button className="exit-button" onClick={toggleValue}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="gray" className="bi bi-x"viewBox="0 0 16 16">
                                <path d="M10.293 8l3.147-3.147a.5.5 0 0 0-.708-.708L8 7.293 4.853 4.146a.5.5 0 0 0-.708.708L7.293 8l-3.147 3.147a.5.5 0 0 0 .708.708L8 8.707l3.147 3.147a.5.5 0 0 0 .708-.708L8.707 8l3.147-3.147a.5.5 0 0 0-.708-.708L8 8.293 4.853 5.146a.5.5 0 0 0-.708.708L7.293 8l-3.147 3.147a.5.5 0 0 0 .708.708L8 8.707l3.147 3.147a.5.5 0 0 0 .708-.708L8.707 8z" />
                            </svg>
                            </button>
                            <div><h4>Your Cart</h4></div>
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
                                                image: item.image,


                                            };
                                        } else {
                                            keyCounts[item.title] = {
                                                title: item.title,
                                                quantity: parseInt(keyCounts[item.title].quantity) + 1,
                                                price: parseInt(item.price) * (parseInt(keyCounts[item.title].quantity) + 1),
                                                image: item.image,

                                            };
                                        }
                                    })
                                }

                                {
                                    Object.values(keyCounts).map((item, key) => {
                                        return <div className="cart-items">

                                            <div className="cart-img-container"><img src={item.image} /></div>
                                            <div className="">
                                                {item.title} {item.quantity > 1 ? "x" + item.quantity : ""}
                                            </div>
                                            <div className="">
                                                {formatPHPCurrency(item.price)}
                                            </div>
                                            <div className="delete-icon">
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
                                        <b>{formatPHPCurrency(total)}</b>
                                    </div>

                                </div>
                            </div>
                            
                            <div>
                                <div className="form-group">
                                    <input onChange={(event) => inputChangedHandler(event.target.value, "email")} type="email" className="form-control" id="email" placeholder="Enter your email" />
                                </div>
                                <button onClick={() => checkOut()} type="button">Checkout</button>
                            </div>
                        </div>
                ) : null
            }
            </div>
            
           
        </div>
    );
};

export default Dashboard;


