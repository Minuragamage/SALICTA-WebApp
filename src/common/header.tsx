import React, { useEffect, useState } from "react";
import logo from "../assets/img/logo/logo.png";
import logo2 from "../assets/img/logo/logo2.png";
import img1 from "../assets/img/icon/card.svg";
import { RouteName } from "../RouteName";
import { NavLink } from "react-router-dom";
const Header: React.FC = () => {


    return (
        <React.Fragment>
            <div className="content-wrapper ">
                <header>

                    <div className="header-area">
                        <div className="main-header header-sticky">
                            <div className="container-fluid">
                                <div className="row menu-wrapper align-items-center justify-content-between">
                                    <div className="header-left d-flex align-items-center">

                                        <div className="logo">
                                            <a href="index-2.html"><img src={logo} alt="" /></a>
                                        </div>

                                        <div className="logo2">
                                            <a href="index-2.html"><img src={logo2} alt="" /></a>
                                        </div>

                                        <div className="main-menu  d-none d-lg-block">
                                            <nav>
                                                <ul id="navigation">
                                                    <li><NavLink to={RouteName.MAIN}>Home</NavLink></li>
                                                    <li><NavLink to={RouteName.PRODUCTS} >Products</NavLink></li>
                                                    <li><NavLink to={RouteName.ABOUT} >About</NavLink></li>
                                                    <li><NavLink to={RouteName.CONTACT}>Contact</NavLink></li>
                                                </ul>
                                            </nav>
                                        </div>
                                    </div>
                            

                                    <div className="col-12">
                                        <div className="mobile_menu d-block d-lg-none"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </header>
            </div>
        </React.Fragment>
    );
};
export default Header;
