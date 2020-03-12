import React from 'react';
import style from './Header.module.css';
import {Col, Container, Row} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBars, faSearch} from "@fortawesome/free-solid-svg-icons";
import FollowHover from "./FollowHover";
import UserInfo from "./UserInfo";
import Navbar from "./Navbar/Navbar";
import {CSSTransitionGroup} from "react-transition-group";
import {NavLink} from "react-router-dom";

const Header = ({isShowNavbar, toggleIsShowNavbar, isAuth, openLoginForm, logout, userName}) => {
    const onOpenNavbar = () => {
        toggleIsShowNavbar(true);
    };

    const onOpenLoginForm = () => {
        openLoginForm(true);
    };

    return (
        <header className={style.header}>
            <CSSTransitionGroup transitionName="navbar" transitionEnterTimeout={300} transitionLeaveTimeout={300}>
                {isShowNavbar && <Navbar toggleIsShowNavbar={toggleIsShowNavbar}/>}
            </CSSTransitionGroup>
            <Container>
                <Row>
                    <Col sm={6}>
                        <div className={`d-flex align-items-center ${style.logo}`}>
                            <div className={style.btnBurger} onClick={onOpenNavbar}>
                                <FontAwesomeIcon icon={faBars}/>
                            </div>
                            <div className={style.search}>
                                <FontAwesomeIcon icon={faSearch}/>
                            </div>
                            <h1><NavLink to='/'>Good News</NavLink></h1>
                            <FollowHover/>
                        </div>
                    </Col>
                    <Col sm={6}>
                        <div className={`d-flex justify-content-end align-items-center h-100 ${style.login}`}>
                            {isAuth ? <UserInfo userName={userName} logout={logout}/>
                            : <button onClick={onOpenLoginForm}>Login</button>}
                        </div>
                    </Col>
                </Row>
            </Container>
        </header>
    )
};

export default Header;