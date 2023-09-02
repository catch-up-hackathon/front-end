import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import React, { Component } from "react";

export default class SimpleSlider extends Component {
    render() {
        const settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1
        };
        return (
            <div>
            <Slider {...settings}>
                <div>
                <h3>1</h3>
                <img src='https://item.kakaocdn.net/do/1401e813472967e3b572fee1ee192eb89f17e489affba0627eb1eb39695f93dd' alt='img1'></img>
                </div>
                <div>
                <h3>2</h3>
                <img src='https://item.kakaocdn.net/do/1401e813472967e3b572fee1ee192eb89f17e489affba0627eb1eb39695f93dd' alt='img2'></img>
                </div>
                <div>
                <h3>3</h3>
                <img src='https://item.kakaocdn.net/do/1401e813472967e3b572fee1ee192eb89f17e489affba0627eb1eb39695f93dd' alt='img3'></img>
                </div>
            </Slider>
            </div>
        );
        }
    }