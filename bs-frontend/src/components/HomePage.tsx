import {Component} from 'react';
import * as React from 'react';
import {WrappedLoginForm} from './LoginForm';
import DvaProps from '../types/DvaProps';
import {Row, Col} from "antd"
import {Slider} from "react-slick";
import {SlideImgComponent} from "./SlideImgComponent";
import {WrappedRegisterForm} from "./Register";
import Modal from "antd/es/modal/Modal";

interface HomePageProps extends DvaProps {
    dispatch: any;
}

interface HomePageState{
    modalVisible: boolean;

}

export default class HomePageComponent extends Component<HomePageProps, HomePageState> {
    constructor(props){
        super(props);
        this.state = {
            modalVisible: false
        }
    }
    handleOk = (e) =>{
        this.FormRef.handleSubmit(e);
        this.setState({modalVisible:false});
    }
    FormRef: any
    registerAccount =()=>{
        this.setState({modalVisible: true});
    }
    render() {
        return (
            <div style={{textAlign: "center"}}>
                <Row type="flex" justify="center" align="top" style={{height: "600px"}}>
                    <Col span={15}>
                    <div>
                        <div style={{ borderBottom: "2px #F5F5F5 solid", width: "65%", margin: "0 auto"}}>
                        <img style={{marginTop: "65px", paddingBottom: "20px", width: "300px"}} src={require("src/img/title.png")}/>
                        </div>
                        <SlideImgComponent dispatch={this.props.dispatch}/>
                    </div>
                    </Col>
                    <Col span={9} style={{borderLeft: "2px #F5F5F5 solid",height: "600px"}}>
                        <div>
                            <WrappedLoginForm dispatch={this.props.dispatch}/>
                            <span>没有账号？点击<a onClick={()=>this.registerAccount()}>注册</a></span>
                        </div>
                    </Col>
                    <Modal
                        title="新用户注册"
                        wrapClassName="vertical-center-modal"
                        visible={this.state.modalVisible}
                        onCancel={()=>{this.setState({modalVisible:false})}}
                        onOk={this.handleOk}>
                        <WrappedRegisterForm wrappedComponentRef={(inst) => this.FormRef = inst} dispatch={this.props.dispatch}/>
                    </Modal>
                </Row>
            </div>
        );
    }
}
