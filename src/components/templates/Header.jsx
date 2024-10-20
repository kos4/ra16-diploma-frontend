import logoHeader from "../../assets/img/header-logo.png";
import MenuHeader from "../MenuHeader";
import React from "react";
import {NavLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {showSearch} from "../../features/header/headerSlice";
import {setQuerySearch} from "../../features/catalog/catalogSlice";
import { useNavigate } from 'react-router-dom'

export default function Header() {
  const {search, cart} = useSelector(state => state.header);
  const {params} = useSelector(state => state.catalog);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const showCart = !!cart;

  const handlerClick = event => {
    if (params.q) {
      dispatch(showSearch());
      navigate("/catalog.html");
    } else {
      dispatch(showSearch());
    }
  };

  const handlerSubmit = event => {
    event.preventDefault();

    dispatch(showSearch());
    navigate("/catalog.html");
  };

  const handlerChange = event => {
    const val = event.target.value;
    dispatch(setQuerySearch(val));
  };

  return (
    <header className="container">
      <div className="row">
        <div className="col">
          <nav className="navbar navbar-expand-sm navbar-light bg-light">
            <NavLink className="navbar-brand" to="/">
              <img src={logoHeader} alt="Bosa Noga" />
            </NavLink>
            <div className="collapse navbar-collapse" id="navbarMain">
              <MenuHeader/>
              <div>
                <div className="header-controls-pics">
                  <div data-id="search-expander" className="header-controls-pic header-controls-search" onClick={handlerClick}></div>
                  <div className="header-controls-pic header-controls-cart" onClick={() => {navigate('/cart.html')}}>
                    {showCart && <div className="header-controls-cart-full">{cart}</div>}
                    <div className="header-controls-cart-menu"></div>
                  </div>
                </div>
                {search && (
                  <form data-id="search-form" className="header-controls-search-form form-inline" onSubmit={handlerSubmit}>
                    <input className="form-control" placeholder="Поиск" onChange={handlerChange}/>
                  </form>
                )}
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}