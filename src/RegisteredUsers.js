import "./App.scss";
import React, { useEffect, useState } from "react";
import io from "socket.io-client";
const socket = io.connect("http://localhost:3002");

const RegisteredUsers = () => {
    let [users, setUsers] = useState([]);

    useEffect(() => {
        if (socket) {
            socket.on("signedUp", (data) => {
                setUsers(data);
            });
        }
    }, [socket]);

    useEffect(() => {
        if (localStorage.getItem('users')) {
            users = localStorage.getItem('users');
            users = JSON.parse(users);

            setUsers([...users]);
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
                                <h1 className="firstword-title">Registered</h1>
                                <h1 className="secondword-title">Users</h1>
                            </div>
                            <p className="order-counter">Users <span>{users.length}</span></p>
                            <table class="users-table">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Email Address</th>
                                        <th>Password</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        users.length > 0 ? (
                                            users.map((item)=>(
                                                <tr>
                                                    <td>{item.name}</td>
                                                    <td>{item.email}</td>
                                                    <td>{item.password}</td>
                                                </tr>
                                            ))
                                        ) : "No registered Users"
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
