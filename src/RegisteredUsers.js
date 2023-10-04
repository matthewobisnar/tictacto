import "./App.scss";
import SideNav from "./SideNav";

const RegisteredUsers = () => {
    return (
        <>
            <div className="shop order-body">
                <SideNav />
                <div className="container section">
                    <div className="row">
                        <div className="admin-content">
                            <div className="d-flex">
                                <h1 className="firstword-title">Registered</h1>
                                <h1 className="secondword-title">Users</h1>
                            </div>
                            <p className="order-counter">Users <span>4</span></p>
                            <table class="users-table">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Email Address</th>
                                        <th>Password</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>John Doe</td>
                                        <td>test@email.com</td>
                                        <td>wobbleflop</td>
                                    </tr>
                                    <tr>
                                        <td>Alice Smith</td>
                                        <td>alice@email.com</td>
                                        <td>secretpass</td>
                                    </tr>
                                    <tr>
                                        <td>Bob Johnson</td>
                                        <td>bob@email.com</td>
                                        <td>pass1234</td>
                                    </tr>
                                    <tr>
                                        <td>Eve Brown</td>
                                        <td>eve@email.com</td>
                                        <td>securepwd</td>
                                    </tr>
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
