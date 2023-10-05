import "./App.scss";
import React, { useEffect, useState } from "react";
import io from "socket.io-client";

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

const socket = io.connect("http://localhost:3002");

const RegisteredUsers = () => {
    let [products, setProducts] = useState([]);

    let productList = {
        "Nanoleaf Remote" : {
            title: "Nanoleaf Remote",
            characterization: "Colour-changing, modular, smart light panels you can control with your voice, touch buttons, or the Nanoleaf App.",
            description: "The Nanoleaf Remote is a product from Nanoleaf, a company known for its innovative smart lighting solutions. The Nanoleaf Remote is a unique and stylish device designed to control Nanoleaf light panels and other smart home devices. The Nanoleaf Remote has a distinctive dodecahedron shape, resembling a twelve-sided polygon. It is made of smooth, white plastic with touch-sensitive sides that allow you to interact with it.",
            priceLabel: "PHP 850",
            price: "850",
            image: nanoleafImage,
            video: nanoleafVideo
        },
        "SkullCandy Earbuds" : {
            title: "SkullCandy Earbuds",
            characterization: "The Indy True Wireless Earbuds by Skullcandy combine premium sound quality and a great design.",
            description: "Skullcandy is a well-known brand that produces a variety of audio products, including earbuds. Skullcandy earbuds are popular for their stylish designs, affordable pricing, and decent audio quality. Skullcandy earbuds come in various designs and colors, catering to different style preferences. They often feature the iconic skull logo on the earpieces.",
            priceLabel: "PHP 3300",
            price: "3300",
            image: skullcandyImage,
            video: skullcandyVideo
        },
        "Macbook Air" : {
            title: "Macbook Air",
            characterization: "13-inch MacBook Air laptop supercharged by the M2 chip. All-day battery life and strikingly thin design.",
            description: "The MacBook Air is a line of lightweight and thin laptop computers developed and manufactured by Apple Inc. Since its initial release, the MacBook Air has become a popular choice for users seeking portability, sleek design, and reliable performance. The MacBook Air is known for its iconic thin and light design. It features an aluminum unibody construction, which not only adds to its durability but also gives it a premium look and feel.",
            priceLabel: "PHP 83,000",
            price: "83000",
            image: macbookairImage,
            video: macbookairVideo
        },
        "Oculus Quest" : {
            title: "Oculus Quest",
            characterization: "The first-generation Oculus Quest is a discontinued virtual reality headset developed by Oculus.",
            description: "The Oculus Quest is a line of virtual reality (VR) headsets developed by Oculus, a subsidiary of Facebook (now Meta Platforms, Inc.). The Quest series is designed to provide a standalone VR experience, meaning it doesn't require a connected PC or external sensors to function. The Oculus Quest offers a wireless VR experience, allowing users to enjoy VR content without the need for a wired connection to a computer. This makes it more accessible and user-friendly.",
            priceLabel: "PHP 45,512",
            price: "45512",
            image: vrcontrollerImage,
            video: oculusquestVideo
        },
        "Ipad Air Wi-Fi" : {
            title: "Ipad Air Wi-Fi",
            characterization: "Apple's 2022 iPad Air is the epitome of a mobile tablet, with a nearly perfect balance of features and performance.",
            description: "The iPad Air is a line of tablet computers developed by Apple Inc. It is known for its balance between performance, features, and portability. It typically features a sleek and thin design with a premium aluminum body. It is powered by Apple's custom-designed processors, which are known for their performance and efficiency. The specific chip may vary by generation, but they tend to offer smooth multitasking and app performance.",
            priceLabel: "PHP 39,000",
            price: "39000",
            image: ipadAirImage,
            video: ipadairVideo
        },
        "PS5 DualSense Controller" : {
            title: "PS5 DualSense Controller",
            characterization: "Meet the DualSense wireless controller featuring haptic feedback, adaptive triggers and an iconic new design.",
            description: "The PlayStation 5 (PS5) DualSense controller is the primary game controller designed for use with Sony's PlayStation 5 gaming console. Released alongside the PS5 in November 2020, the DualSense controller represents a significant upgrade over its predecessor, the DualShock 4, and introduces several innovative features. The DualSense controller features a fresh and modern design compared to previous PlayStation controllers.",
            priceLabel: "PHP 3,450",
            price: "3450",
            image: controllerImage,
            video: dualsenseVideo
        },
        "Samsung Odyssey" : {
            title: "Samsung Odyssey",
            characterization: "Get your head in the game with the 55” curved display, featuring 4K resolution, which matches the curve of the human eye.",
            description: "Samsung has a line of gaming monitors known as the Samsung Odyssey series. These monitors are designed to provide high refresh rates, low response times, and features tailored for gaming. Some of the common features you might find in Samsung Odyssey gaming monitors include curved screens, QLED panels for vibrant colors, and support for high resolutions like QHD (Quad High Definition) or 4K.",
            priceLabel: "PHP 125,000",
            price: "125000",
            image: samsungOdysseyImage,
            video: samsungodysseyVideo
        },
        "Iphone 12" : {
            title: "Iphone 12",
            characterization: "The iPhone 12 sports a gorgeous design, full 5G support, great cameras and strong performance.",
            description: "The iPhone 12 features a flat-edge design reminiscent of the iPhone 4 and 5, with an aluminum frame and a glass front and back. It's available in multiple colors, including black, white, red, green, and blue. It comes with a Super Retina XDR display, which offers excellent color accuracy and high brightness levels. It is available in two sizes: a 6.1-inch display for the standard iPhone 12 and a 5.4-inch display for the iPhone 12 mini.",
            priceLabel: "PHP 44,570",
            price: "44570",
            image: iphone12Image,
            video: iphone12Video
        },
        "Lenovo Laptop Bag" : {
            title: "Lenovo Laptop Bag",
            characterization: "A 17 inches Armored Backpack II that utilizes a water-repellent fabric and a clean, streamlined design to create a case that's suited to modern life and aesthetic approach.",
            description: "Lenovo laptop backpacks are a popular choice for users who need a comfortable and hands-free way to carry their laptops and other essentials. They typically have dedicated padded compartments to securely hold laptops of various sizes. Many Lenovo backpacks also offer additional pockets and compartments for organization and storage of accessories, such as chargers, cables, and notebooks.",
            priceLabel: "PHP 3,472",
            price: "3472",
            image: lenovoLaptopBagImage,
            video: lenovolaptopbagVideo
        },
        "Fortnite The Raven Cosplay Hoodie" : {
            title: "Fortnite The Raven Cosplay Hoodie",
            characterization: "A polyester cotton with thin fleece, soft and comfortable, the power of Raven is unleashed.",
            description: "The Raven Cosplay Hoodie is a piece of clothing inspired by the popular video game Fortnite. Raven is a Legendary Outfit in Battle Royale that can be purchased from the Item Shop. The Iron Cage Back Bling is bundled with this Outfit. It is considered as one of the most popular character skin in the online multiplayer game Fortnite, known for its mysterious and dark appearance.",
            priceLabel: "PHP 1,975",
            price: "1975",
            image: forniteHoodieImage,
            video: forniteraveVideo
        },
        "NPKC Doubleshot Sidelit Keycaps" : {
            title: "NPKC Doubleshot Sidelit Keycaps",   
            characterization: "Standard ANSI Keycaps are truly unique gradual color gradient with charming appearance.",
            description: "NPKC Doubleshot Sidelit Keycaps are specialized keycaps designed for mechanical keyboards. They are known for their unique feature of allowing light from the keyboard's backlighting to shine through the sides of the keycaps, creating a visually striking and vibrant lighting effect. What sets NPKC Doubleshot Sidelit Keycaps apart is their unique design that allows for sidelit illumination.",
            priceLabel: "PHP 1,250",
            price: "1250",
            image: keyboardImage,
            video: npckkeyboardVideo
        },
        "Govee - Hexa Wall Light Panels" : {
            title: "Govee - Hexa Wall Light Panels",
            characterization: "A multi-color hexagon light panels that comes with a selection of multiple colors and color category. It is composed of 7/10 panels that can be assorted into various shapes.",
            description: "Govee Hexa Wall Light Panels are a product offered by Govee, a company specializing in smart home lighting solutions. These Hexa Wall Light Panels are designed to provide customizable and dynamic lighting effects for your home or workspace. Each hexagonal panel contains RGB (Red, Green, Blue) LED lights, which can produce a wide spectrum of colors. You can choose from millions of colors to create different lighting moods and atmospheres.",
            priceLabel: "PHP 6,500",
            price: "6500",
            image: lightpanelsImage,
            video: goveelightpanelsVideo
        },
    };

    useEffect(() => {
        if (socket) {
            socket.on("RefreshView", (data) => {
                let tempArr = [];
            

                data.map((item)=>{
                    tempArr.push(item.title)
                })

                var map = tempArr.reduce(function(p, c) {
                    p[c] = (p[c] || 0) + 1;
                return p;
                }, {});

                var newTypesArray = Object.keys(map).sort(function(a, b) {
                return map[b] - map[a];
                });

                console.log(newTypesArray)

                setProducts([...newTypesArray]);
                });
        }
    }, [socket]);

    useEffect(() => {
        if (localStorage.getItem('productsViewed')) {
            products = localStorage.getItem('productsViewed');
            products = JSON.parse(products);

            let tempArr = [];
            

            products.map((item)=>{
                tempArr.push(item.title)
            })

            var map = tempArr.reduce(function(p, c) {
                p[c] = (p[c] || 0) + 1;
            return p;
            }, {});

            var newTypesArray = Object.keys(map).sort(function(a, b) {
            return map[b] - map[a];
            });

            console.log(newTypesArray)

            setProducts([...newTypesArray]);
        }
    }, []);

    return (
        <>
            <div className="shop order-body">
                {/* <SideNav /> */}
                <div className="container section">
                    <div className="row">
                        <div className="admin-content">
                            <div className="d-flex">
                                <h1 className="firstword-title">Most Viewed</h1>
                                <h1 className="secondword-title">Products</h1>
                            </div>
                            <p className="order-counter">Products <span>{products.length}</span></p>
                            <table class="users-table">
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th>Product Title</th>
                                        <th>Price</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        products.length > 0 ? (
                                            products.map((item)=>(
                                                <tr>
                                                    <td><img src={productList[item].image} width="100" /></td>
                                                    <td>{item}</td>
                                                    <td>{productList[item].price}</td>
                                                </tr>
                                            ))
                                        ) : "No viewed products"
                                    }
                                </tbody>
                            </table>

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default RegisteredUsers;
