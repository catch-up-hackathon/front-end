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
                <img src='/image/tutorial_1.svg' id='slide_img' alt='img1'></img>
                </div>
                <div>
                <img src='/image/tutorial_2.svg' id='slide_img' alt='img2'></img>
                </div>
                <div>
                <img src='/image/tutorial_3.svg' id='slide_img' alt='img3'></img>
                </div>
                <div>
                <img src='/image/tutorial_4.svg' id='slide_img' alt='img3'></img>
                </div>
            </Slider>
            </div>
        );
        }
    }