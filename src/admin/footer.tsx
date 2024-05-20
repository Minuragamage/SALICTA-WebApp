import React, { useEffect, useState } from "react";
import logo from "../assets/img/logo/logo2_footer.png";

const AdminFooter: React.FC = () => {


    return (
        <React.Fragment>
            <div className="content-wrapper ">
                <footer>
                    <div className="footer-wrapper">

                        <div className="footer-area footer-padding">
                            <div className="container ">
                                <div className="row justify-content-between">
                                    <div className="col-xl-4 col-lg-3 col-md-8 col-sm-8">
                                        <div className="single-footer-caption mb-50">
                                            <div className="single-footer-caption mb-30">

                                                <div className="footer-logo mb-35">
                                                    <a href="index-2.html"><img src={logo} alt="" /></a>
                                                </div>
                                                <div className="footer-tittle">
                                                    <div className="footer-pera">
                                                    
                                                    </div>
                                                </div>

                                                <div className="footer-social">
                                                    <a href="#"><i className="fab fa-twitter"></i></a>
                                                    <a href="https://bit.ly/sai4ull"><i className="fab fa-facebook-f"></i></a>
                                                    <a href="#"><i className="fab fa-pinterest-p"></i></a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xl-2 col-lg-2 col-md-4 col-sm-4">
                                        <div className="single-footer-caption mb-50">
                                            <div className="footer-tittle">
                                                <h4></h4>
                                                <ul>
                                                    <li><a href="#"></a></li>
                                                    <li><a href="#"></a></li>
                                                    <li><a href="#"></a></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xl-2 col-lg-2 col-md-4 col-sm-4">
                                        <div className="single-footer-caption mb-50">
                                            <div className="footer-tittle">
                                                <h4></h4>
                                                <ul>
                                                    <li><a href="#"></a></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xl-2 col-lg-2 col-md-4 col-sm-4">
                                        <div className="single-footer-caption mb-50">
                                            <div className="footer-tittle">
                                                <h4>Category</h4>
                                                <ul>
                                                    <li><a href="#">Beds</a></li>
                                                    <li><a href="#">Sofas</a></li>
                                                    <li><a href="#">Chairs</a></li>
                                                    <li><a href="#">Tables</a></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="footer-bottom-area">
                            <div className="container">
                                <div className="footer-border">
                                    <div className="row d-flex align-items-center">
                                        <div className="col-xl-12 ">
                                            <div className="footer-copy-right text-center">
                                                <p>
                                                    Copyright &copy;  All rights reserved
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </footer>
                <div id="back-top">
                    <a title="Go to Top" href="#"> <i className="fas fa-level-up-alt"></i></a>
                </div>

            </div>

        </React.Fragment>
    );
};
export default AdminFooter;
