import React, { useEffect, useState } from "react";
import img1 from "../assets/img/icon/services1.svg";
import img2 from "../assets/img/icon/services2.svg";
import img3 from "../assets/img/icon/services3.svg";
import img4 from "../assets/img/icon/services4.svg";
import img5 from "../assets/img/gallery/popular1.png";
import img6 from "../assets/img/gallery/popular2.png";
import img7 from "../assets/img/gallery/popular3.png";
import img8 from "../assets/img/gallery/popular4.png";
import { Card, CardBody, Col, Form, Input, Label, Container, Nav, NavItem, NavLink, Row, TabContent, Modal, TabPane } from "reactstrap";
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore';
import Swal from "sweetalert2";
import { Product } from "../models/Products";
const classNames = require("classnames");
// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyB34ETDWoWzo5ZynOQND2f_6OCsCdChEkk",
    authDomain: "salicta-c56ad.firebaseapp.com",
    projectId: "salicta-c56ad",
    storageBucket: "salicta-c56ad.appspot.com",
    messagingSenderId: "341279407350",
    appId: "1:341279407350:web:a011b845e766c3d9af00d7"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const Products: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [verticalActiveTabWithIcon, setverticalActiveTabWithIcon] = useState("1");
    useEffect(() => {
        fetchProducts();
    }, [verticalActiveTabWithIcon]);

    const toggleVerticalIcon = (tab: any) => {
        if (verticalActiveTabWithIcon != tab) {
            setverticalActiveTabWithIcon(tab);
        }
    };

    const fetchProducts = async () => {
        try {
            let category;
            if (verticalActiveTabWithIcon == "1") {
                category = 'sofa'
            }
            if (verticalActiveTabWithIcon == "2") {
                category = 'table'
            }
            if (verticalActiveTabWithIcon == "3") {
                category = 'chair'
            }
            if (verticalActiveTabWithIcon == "4") {
                category = 'bed'
            }
            if (verticalActiveTabWithIcon == "5") {
                category = 'lightning'
            }
            if (verticalActiveTabWithIcon == "6") {
                category = 'decore'
            }
            console.log("category", category)
            const sofaProductsQuery = query(collection(db, 'Products'), where('category', '==', category));
            const fetchedProducts: Product[] = [];
            // Fetching the filtered products
            const sofaProductsSnapshot = await getDocs(sofaProductsQuery);

            for (const doc of sofaProductsSnapshot.docs) {
                const productData = doc.data();
                const images: string[] = [];
                for (const imageUrl of productData.images) {
                    const downloadUrl = await getDownloadURL(ref(storage, imageUrl));
                    images.push(downloadUrl);
                }
                fetchedProducts.push({ id: doc.id, ...productData, images });
            }
            setLoading(false);
            setProducts(fetchedProducts);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    }

    return (
        <React.Fragment>
            <div className="content-wrapper ">
                <main>
                    <div className="slider-area ">
                        <div className="slider-active">
                            <div className="single-slider hero-overly2  slider-height2 d-flex align-items-center slider-bg2">
                                <div className="container">
                                    <div className="row">
                                        <div className="col-xl-6 col-lg-8 col-md-8">
                                            <div className="hero__caption hero__caption2">
                                                <h1 data-animation="fadeInUp" data-delay=".4s">Products</h1>
                                                <nav aria-label="breadcrumb">
                                                    <ol className="breadcrumb">
                                                        <li className="breadcrumb-item"><a href="index-2.html">Home</a></li>
                                                        <li className="breadcrumb-item"><a href="#">Products</a></li>
                                                    </ol>
                                                </nav>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                    <section className="properties new-arrival fix">
                        <div className="container">

                            <div className="row justify-content-center">
                                <div className="col-xl-7 col-lg-8 col-md-10">
                                    <div className="section-tittle mb-60 text-center wow fadeInUp" data-wow-duration="1s" data-wow-delay=".2s">
                                        <h2>Popular products</h2>
                                        <p></p>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-xl-12">
                                    <div className="properties__button text-center">

                                        <nav>
                                            <div className="nav nav-tabs" id="nav-tab" role="tablist">
                                                <a
                                                    className={classNames({
                                                        "nav-item nav-link ": true,
                                                        active: verticalActiveTabWithIcon === "1",
                                                    })}
                                                    onClick={() => {
                                                        toggleVerticalIcon("1");
                                                    }}>Sofa</a>
                                                <a className={classNames({
                                                    "nav-item nav-link ": true,
                                                    active: verticalActiveTabWithIcon === "2",
                                                })} onClick={() => {
                                                    toggleVerticalIcon("2");
                                                }}>Table</a>
                                                <a className={classNames({
                                                    "nav-item nav-link ": true,
                                                    active: verticalActiveTabWithIcon === "3",
                                                })} onClick={() => {
                                                    toggleVerticalIcon("3");
                                                }}>Chair</a>
                                                <a className={classNames({
                                                    "nav-item nav-link ": true,
                                                    active: verticalActiveTabWithIcon === "4",
                                                })} onClick={() => {
                                                    toggleVerticalIcon("4");
                                                }}>Bed</a>
                                                <a className={classNames({
                                                    "nav-item nav-link ": true,
                                                    active: verticalActiveTabWithIcon === "5",
                                                })} onClick={() => {
                                                    toggleVerticalIcon("5");
                                                }}>Lightning</a>
                                                <a className={classNames({
                                                    "nav-item nav-link ": true,
                                                    active: verticalActiveTabWithIcon === "6",
                                                })} onClick={() => {
                                                    toggleVerticalIcon("6");
                                                }}>Decore</a>
                                            </div>
                                        </nav>

                                    </div>
                                </div>
                            </div>
                            <div className="row">

                                <TabContent activeTab={verticalActiveTabWithIcon} className="text-muted mt-4 mt-xl-0 w-100">
                                    <TabPane tabId="1">
                                        <div className="row">
                                            {products !== undefined && products.length > 0 ? (
                                                <>
                                                    {products.map(product => (
                                                        <div className="col-lg-4 col-md-6 col-sm-6" key={product.id}>
                                                            <div className="single-new-arrival mb-50 text-center">
                                                                <div className="popular-img imageFit profileThemeImage" style={{
                                                                    backgroundImage: product.images[0] == null || product.images[0] == undefined ? `url(${product.images[0]})` : `url(${product.images[0]})`,
                                                                }}>
                                                                </div>
                                                                <div className="popular-caption">
                                                                    <h3><a href="product_details.html">{product?.title}</a></h3>
                                                                    <span>Rs. {product?.price}</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </>
                                            ) : (
                                                loading ? (
                                                    <div className="loading-text">Loading...</div>
                                                ) : (
                                                    <div>No Products Available</div>
                                                )
                                            )}
                                        </div>
                                    </TabPane>
                                </TabContent>

                                <TabContent activeTab={verticalActiveTabWithIcon} className="text-muted mt-4 mt-xl-0 w-100">
                                    <TabPane tabId="2">
                                        <div className="row">
                                            {products !== undefined && products.length > 0 ? (
                                                <>
                                                    {products.map(product => (
                                                        <div className="col-lg-4 col-md-6 col-sm-6" key={product.id}>
                                                            <div className="single-new-arrival mb-50 text-center">
                                                                <div className="popular-img imageFit profileThemeImage" style={{
                                                                    backgroundImage: product.images[0] == null || product.images[0] == undefined ? `url(${product.images[0]})` : `url(${product.images[0]})`,
                                                                }}>
                                                                </div>
                                                                <div className="popular-caption">
                                                                    <h3><a href="product_details.html">{product?.title}</a></h3>
                                                                    <span>Rs. {product?.price}</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </>
                                            ) : (
                                                loading ? (
                                                    <div className="loading-text">Loading...</div>
                                                ) : (
                                                    <div>No Products Available</div>
                                                )
                                            )}
                                        </div>
                                    </TabPane>
                                </TabContent>

                                <TabContent activeTab={verticalActiveTabWithIcon} className="text-muted mt-4 mt-xl-0 w-100">
                                    <TabPane tabId="3">
                                        <div className="row">
                                            {products !== undefined && products.length > 0 ? (
                                                <>
                                                    {products.map(product => (
                                                        <div className="col-lg-4 col-md-6 col-sm-6" key={product.id}>
                                                            <div className="single-new-arrival mb-50 text-center">
                                                                <div className="popular-img imageFit profileThemeImage" style={{
                                                                    backgroundImage: product.images[0] == null || product.images[0] == undefined ? `url(${product.images[0]})` : `url(${product.images[0]})`,
                                                                }}>
                                                                </div>
                                                                <div className="popular-caption">
                                                                    <h3><a href="product_details.html">{product?.title}</a></h3>
                                                                    <span>Rs. {product?.price}</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </>
                                            ) : (
                                                loading ? (
                                                    <div className="loading-text">Loading...</div>
                                                ) : (
                                                    <div>No Products Available</div>
                                                )
                                            )}
                                        </div>
                                    </TabPane>
                                </TabContent>

                                <TabContent activeTab={verticalActiveTabWithIcon} className="text-muted mt-4 mt-xl-0 w-100">
                                    <TabPane tabId="4">
                                        <div className="row">
                                            {products !== undefined && products.length > 0 ? (
                                                <>
                                                    {products.map(product => (
                                                        <div className="col-lg-4 col-md-6 col-sm-6" key={product.id}>
                                                            <div className="single-new-arrival mb-50 text-center">
                                                                <div className="popular-img imageFit profileThemeImage" style={{
                                                                    backgroundImage: product.images[0] == null || product.images[0] == undefined ? `url(${product.images[0]})` : `url(${product.images[0]})`,
                                                                }}>
                                                                </div>
                                                                <div className="popular-caption">
                                                                    <h3><a href="product_details.html">{product?.title}</a></h3>
                                                                    <span>Rs. {product?.price}</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </>
                                            ) : (
                                                loading ? (
                                                    <div className="loading-text">Loading...</div>
                                                ) : (
                                                    <div>No Products Available</div>
                                                )
                                            )}
                                        </div>
                                    </TabPane>
                                </TabContent>

                                <TabContent activeTab={verticalActiveTabWithIcon} className="text-muted mt-4 mt-xl-0 w-100">
                                    <TabPane tabId="5">
                                        <div className="row">
                                            {products !== undefined && products.length > 0 ? (
                                                <>
                                                    {products.map(product => (
                                                        <div className="col-lg-4 col-md-6 col-sm-6" key={product.id}>
                                                            <div className="single-new-arrival mb-50 text-center">
                                                                <div className="popular-img imageFit profileThemeImage" style={{
                                                                    backgroundImage: product.images[0] == null || product.images[0] == undefined ? `url(${product.images[0]})` : `url(${product.images[0]})`,
                                                                }}>
                                                                </div>
                                                                <div className="popular-caption">
                                                                    <h3><a href="product_details.html">{product?.title}</a></h3>
                                                                    <span>Rs. {product?.price}</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </>
                                            ) : (
                                                loading ? (
                                                    <div className="loading-text">Loading...</div>
                                                ) : (
                                                    <div>No Products Available</div>
                                                )
                                            )}
                                        </div>
                                    </TabPane>
                                </TabContent>

                                <TabContent activeTab={verticalActiveTabWithIcon} className="text-muted mt-4 mt-xl-0 w-100">
                                    <TabPane tabId="6">
                                        <div className="row">
                                            {products !== undefined && products.length > 0 ? (
                                                <>
                                                    {products.map(product => (
                                                        <div className="col-lg-4 col-md-6 col-sm-6" key={product.id}>
                                                            <div className="single-new-arrival mb-50 text-center">
                                                                <div className="popular-img imageFit profileThemeImage" style={{
                                                                    backgroundImage: product.images[0] == null || product.images[0] == undefined ? `url(${product.images[0]})` : `url(${product.images[0]})`,
                                                                }}>
                                                                </div>
                                                                <div className="popular-caption">
                                                                    <h3><a href="product_details.html">{product?.title}</a></h3>
                                                                    <span>Rs. {product?.price}</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </>
                                            ) : (
                                                loading ? (
                                                    <div className="loading-text">Loading...</div>
                                                ) : (
                                                    <div>No Products Available</div>
                                                )
                                            )}
                                        </div>
                                    </TabPane>
                                </TabContent>
                            </div>

                            <div className="row justify-content-center">
                                <div className="room-btn">
                                    <a href="product.html" className="border-btn">Discover More</a>
                                </div>
                            </div>
                        </div>
                    </section>



                    <div className="categories-area section-padding40 gray-bg">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-3 col-md-6 col-sm-6">
                                    <div className="single-cat mb-50 wow fadeInUp" data-wow-duration="1s" data-wow-delay=".2s">
                                        <div className="cat-icon">
                                            <img src={img1} alt="" />
                                        </div>
                                        <div className="cat-cap">
                                            <h5>Fast & Free Delivery</h5>
                                            <p>Free delivery on all orders</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-3 col-md-6 col-sm-6">
                                    <div className="single-cat mb-50 wow fadeInUp" data-wow-duration="1s" data-wow-delay=".2s">
                                        <div className="cat-icon">
                                            <img src={img2} alt="" />
                                        </div>
                                        <div className="cat-cap">
                                            <h5>Secure Payment</h5>
                                            <p>Free delivery on all orders</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-3 col-md-6 col-sm-6">
                                    <div className="single-cat mb-50 wow fadeInUp" data-wow-duration="1s" data-wow-delay=".4s">
                                        <div className="cat-icon">
                                            <img src={img3} alt="" />
                                        </div>
                                        <div className="cat-cap">
                                            <h5>Money Back Guarantee</h5>
                                            <p>Free delivery on all orders</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-3 col-md-6 col-sm-6">
                                    <div className="single-cat mb-50 wow fadeInUp" data-wow-duration="1s" data-wow-delay=".5s">
                                        <div className="cat-icon">
                                            <img src={img4} alt="" />
                                        </div>
                                        <div className="cat-cap">
                                            <h5>Online Support</h5>
                                            <p>Free delivery on all orders</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                </main>
            </div>

        </React.Fragment>
    );
};
export default Products;
