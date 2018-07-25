import * as React from 'react';
import {Component} from 'react';
import {Redirect} from 'react-router';
import {Button, Card, message, Row, Col, Dropdown, Menu} from 'antd';
import DvaProps from '../types/DvaProps';

interface NaviProps extends DvaProps {
    name: string;
    dispatch: any
}

const JumpButton = (props) => {
    return (
        <Button style={{width: "100%", height: "100%", textAlign: "center"}} onClick={props.onClick}>
            <div>
                <img alt={props.btnName} width="60%" src={props.src} style={{margin: "30px auto"}}/>
            </div>
            <div>
                <h3>{props.btnName}</h3>
            </div>
        </Button>
    );
}
export default class NavigationPageComponent extends Component<NaviProps, {}> {
    constructor(props){
        super(props);
        this.state = {

        }
    }
    handleClick = (e) => {
        this.props.dispatch({type:'navigation/jump', payload: {direction: e.direction}});
    };

    button1 = {
        btnName: "扩展包",
        src: require("src/img/Book.png"),
    };

    button2 = {
        btnName: "单词书",
        src: require("src/img/Bookmark.png"),
    };

    button3 = {
        btnName: "错题本",
        src: require("src/img/Calendar.png"),
    };

    button4 = {
        btnName: "复习考核",
        src: require("src/img/Message.png"),
    };

    // button5 = {
    //     btnName: "修改单词",
    //     src: require("src/img/DocumentEdit.png"),
    // };
    //
    // button6 = {
    //     btnName: "考核",
    //     src: require("src/img/ChartBar.png"),
    // };

    render() {
        const Block2 = (props) => {
                const menu = (
                    <Menu>
                        <Menu.Item key="user">
                            <a onClick={this.handleClick.bind(this, {direction: "startRecite"})}>背单词</a>
                        </Menu.Item>
                        <Menu.Item key="2">
                            <a onClick={this.handleClick.bind(this, {direction: "modify"})}>修改单词书</a>
                        </Menu.Item>
                    </Menu>
                );
                return(
                    <Dropdown overlay={menu}>
                        <div>
                            <JumpButton {...this.button2} />
                        </div>
                    </Dropdown>
                );

        };

        return (
            <div>
                <h2 className={"ant-menu-item-group-title"} style={{fontSize: "middle", marginLeft: "35px"}}>Welcome To WordJoy! <span>{this.props.name}</span></h2>
                <div>
                    <Row>
                        <Col span={4} offset={5}>
                            <JumpButton {...this.button1} onClick={this.handleClick.bind(this, {direction: "extension"})} />
                        </Col>
                        <Col span={4} offset={5}>
                            <Block2/>
                        </Col>
                    </Row>
                    <p />
                    <Row>
                        <Col span={4} offset={5}>
                            <JumpButton {...this.button3} onClick={this.handleClick.bind(this, {direction: "notebook"})}/>
                        </Col>
                        <Col span={4} offset={5}>
                            <JumpButton {...this.button4} onClick={this.handleClick.bind(this, {direction: "reviewAndtest"})}/>
                        </Col>

                    </Row>
                </div>
            </div>
        );
    }
}
