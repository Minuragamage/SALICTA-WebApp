import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import "./assets/css/bootstrap.min.css";
import "./assets/css/owl.carousel.min.css";
import "./assets/css/slicknav.css";
import "./assets/css/style.css";
import "./assets/css/slick.css";
import "./assets/css/flaticon.css";
import "./assets/css/progressbar_barfiller.css";
import "./assets/css/price_rangs.css";
import "./assets/css/gijgo.css";
import "./assets/css/animated-headline.css";
import "./assets/css/fontawesome-all.min.css";
import "./assets/css/nice-select.css";
import Main from "./common/main";
import Header from "./common/header";
import Footer from "./common/footer";
import ContactUs from "./common/contactUs";
import Cart from "./common/cart";
import Checkout from "./common/checkout";
import Products from "./common/products";
import About from "./common/about";
import { RouteName } from "./RouteName";
import { AuthService } from "./services/AuthService";
import AdminFooter from "./admin/footer";
import AdminHeader from "./admin/header";
import Login from "./common/Login";
import AddProducts from "./admin/products";
import Orders from "./admin/orders";
import ContactData from "./admin/contact";




const App: React.FC = () => {
  const token = AuthService.getToken();
  const handleOnIdle = () => {
    logout();
  };

  const logout = () => {
    localStorage.clear();
    sessionStorage.clear();
    window.location.href = "/signin";
  };

  return (
    <Router>


      {token ?
        <Router>
          <AdminHeader />
          <Switch>
            <Route path={RouteName.ADD_PRODUCTS}>
              <AddProducts />
            </Route>
            <Route path={RouteName.ORDERS}>
              <Orders />
            </Route>
            <Route path={RouteName.CONTACT}>
              <ContactData />
            </Route>
          </Switch>
          <AdminFooter />
        </Router>
        :
        <>
          <Header />
          <Route path={"/"} exact={true}>
            <Main />
          </Route>
          <Route path={RouteName.MAIN} exact={true}>
            <Main />
          </Route>
          <Route path={RouteName.CONTACT}>
            <ContactUs />
          </Route>
          <Route path={RouteName.PRODUCTS}>
            <Products />
          </Route>
          <Route path={RouteName.ABOUT}>
            <About />
          </Route>
          <Route path={RouteName.LOGIN} >
            <Login />
          </Route>
          <Footer />
        </>
      }
    </Router >
  );
};


export default App;
