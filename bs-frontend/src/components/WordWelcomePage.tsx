import {Component} from 'react';
import * as React from 'react';
import DvaProps from '../types/DvaProps';
import { Router,Route,hashHistory} from 'react-router';
import {Card, Row, Col, Icon} from "antd";

interface WordWelcomeProps extends DvaProps{
    location: any,
    Done: string,
}

interface WordWelcomeState{
    taskNum: number,

}

export default class WordWelcomeComponent extends Component<WordWelcomeProps, WordWelcomeState>{
    constructor(props){
        super(props);
        this.state = {
            taskNum: 50,

        }
    }
    reciteStart(){
        var type = this.props.location.query.direction;
        this.props.dispatch({type: "welcome/start", payload: {type: type}});
    }
    render(){
        console.log(this.props.location.query.done)
        return(
            <div style={{textAlign: "center", background: "#ECECEC",minHeight: "600px", paddingTop: "12%"}}>
                <div style={{fontSize: 40}}>
                    <Card title={<span style={{fontSize: 30}}>Welcome</span>} bordered={true} style={{ width: 300 , margin: "0 auto"}} actions={[<Icon type="caret-right" style={{fontSize: 14}} onClick={()=>this.reciteStart()}>Start</Icon>]} >
                    <Row>
                        <Col span={12}>
                            <div>
                                <span style={{fontSize: 25}}>10</span>
                            </div>
                            <span style={{fontSize: 18}}>TASK</span>
                        </Col>
                        <Col span={12}>
                            <div>
                                <span style={{fontSize: 25}}>{this.props.location.query.done}</span>
                            </div>
                            <span style={{fontSize: 18}}>DONE</span>
                        </Col>
                    </Row>
                    </Card>
                </div>
            </div>
        )
    }
}