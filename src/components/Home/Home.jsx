import React from 'react';
import style from './Home.module.css';
import {Col, Container, Row} from "react-bootstrap";
import Slider from "./Carousel/Carousel";
import Subscribe from "./Subscribe/Subscribe";
import Category from "./Category/Category";

const Home = ({carouselData, categories}) => {
    return (
        <div className={style.home}>
            <section>
                <Row>
                    <Col sm={8}>
                        <Slider carouselData={carouselData}/>
                        {categories.map(c => {
                            return <Category key={c.category} category={c}/>
                        })}
                    </Col>
                    <Col sm={4}>
                        <Subscribe/>
                    </Col>
                </Row>
            </section>
        </div>
    )
};

export default Home;