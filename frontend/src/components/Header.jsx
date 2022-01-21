/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import cookie from 'js-cookie';
import { reset } from '../slice/userSlice';

export default () => {
    const user = useSelector((state) => state.user);
    const [width, setWidth] = useState();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const clickButton = () => {
        const button = document.querySelector('.button__menu');
        const headerMobile = document.querySelector('.header__mobile nav');

        if (!button.classList.contains('active')) {
            button.classList.add('active');
            headerMobile.classList.add('block__active');
        } else {
            button.classList.remove('active');
            headerMobile.classList.remove('block__active');
        }
    };

    const NavHeader = () => (
        <nav>
            <ul className="block__nav__menu">
                <li>
                    <Link to="/">Acceuil</Link>
                </li>
                <li>
                    <Link to="/setup">Setup</Link>
                </li>
                {!user?.userId && (
                    <>
                        <li>
                            <Link to="/inscription">Inscription</Link>
                        </li>
                        <li>
                            <Link to="/connexion">Connexion</Link>
                        </li>
                    </>
                )}
                {user?.userId && (
                    <>
                        <li>
                            <Link to="/admin">Admin</Link>
                        </li>
                        <li>
                            <div
                                tabIndex={0}
                                role="button"
                                onClick={() => {
                                    cookie.remove('token');
                                    dispatch(reset());
                                    navigate('/');
                                }}
                                onKeyDown={() => {
                                    cookie.remove('token');
                                    dispatch(reset());
                                    navigate('/');
                                }}
                                className="button__nav"
                            >
                                Deconnexion
                            </div>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    );

    const HeaderDeskop = () => (
        <header className="header header__deskop">
            <NavHeader />
        </header>
    );

    const HeaderMobile = () => (
        <header className="header header__mobile">
            <div
                onClick={clickButton}
                tabIndex={0}
                role="button"
                className="button__menu"
                onKeyDown={clickButton}
            >
                <div className="hamburger" />
            </div>
            <NavHeader />
        </header>
    );

    const reportWidowsWidth = () =>
        document.body.clientWidth <= 1200 ? setWidth(true) : setWidth(false);

    useEffect(() => {
        if (window) window.addEventListener('resize', reportWidowsWidth);
        if (width === undefined) reportWidowsWidth();
    });

    return <>{width === true ? <HeaderMobile /> : <HeaderDeskop />}</>;
};
