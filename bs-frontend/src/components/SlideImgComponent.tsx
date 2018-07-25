import Slider from "react-slick";
import {Component} from 'react';
import * as React from 'react';
import DvaProps from '../types/DvaProps';
export class SliderProps implements DvaProps {
    public dispatch: any;
}
class SlideImgComponent extends Component<SliderProps>{
    constructor(props){
        super(props);
    }
    render(){
        const settings = {
            dots: true,
            infinite: true,
            slidesToShow: 2,
            slidesToScroll: 1,
            autoplay: true,
            speed: 2500,
            autoplaySpeed: 2500,
            cssEase: "linear",
        };
        return(
            <div style={{marginTop: "40px", marginLeft: "25px", marginRight: "25px"}}>
                <Slider {...settings}>
                    <div>
                        <img src={require("src/img/cet4.png")}/>
                    </div>
                    <div>
                        <img src={require("src/img/cet6.png")}/>
                    </div>
                    <div>
                        <img src={require("src/img/ielts.png")}/>
                    </div>
                    <div>
                        <img src={require("src/img/toefl.png")}/>
                    </div>

                </Slider>
            </div>
        );
    }
}


export {SlideImgComponent};