import {Component} from 'react';
import * as React from 'react';
import DvaProps from '../types/DvaProps';
import {Row, Col, Icon, Button, Card, Calendar} from 'antd';

interface WordProps extends DvaProps{
    dispatch: any,
    dataSourceCet4: any,
    dataSourceCet6: any,
    dataSourceToefl: any,
    dataSourceIelts: any,
    location: any;
}

interface WordState{
    wordIndex: number,
    meaningVisible: string,
}

export default class WordReciteComponent extends Component<WordProps, WordState>{
    constructor(props){
        super(props);
        this.state = {
            wordIndex: 0,
            meaningVisible: "hidden"
        }
        this.unknown = this.unknown.bind(this);
        this.know = this.know.bind(this);
        //fetch the word list
        //TODO

    }

    know(){
        this.setState({meaningVisible: "visible"})
        //mark the word as known
        var english = this.dataSource[this.state.wordIndex]["english"];
        this.props.dispatch({type: "recite/know", payload:{english: english}})
    }
    unknown(){
        this.setState({meaningVisible: "visible"})
        //mark the word as unknown
        var english = this.dataSource[this.state.wordIndex]["english"];
        this.props.dispatch({type: "recite/unknow", payload:{english: english}})
    }

    next(){
        //check if reciting is over
        var newIndex = this.state.wordIndex+1;
        // this.setState({meaningVisible: "hidden"})
        if(newIndex== this.dataSource.length)
        {
            //reciting finishes
            this.props.dispatch({type: "review/finish", payload: {}})
        }else {
            this.setState({wordIndex: newIndex})
        }
    }
    dataSource: any
    render(){
        console.log("query:" + this.props.location.query);
        switch(this.props.location.query){
            case "cet4": this.dataSource = this.props.dataSourceCet4;break;
            case "cet6": this.dataSource = this.props.dataSourceCet6;break;
            case "toefl": this.dataSource = this.props.dataSourceToefl;break;
            case "toefl": this.dataSource = this.props.dataSourceToefl;break;
        }
        console.log("index:" + this.state.wordIndex);
        console.log(this.dataSource)
        return(
            <div>
                <div style={{textAlign: "center", background: "#ECECEC",minHeight: "600px", paddingTop: "5%"}}>
                    <div style={{background: "white", width: "60%",height: "460px", margin: "0 auto", paddingTop: "18px"}}>
                        <div style={{width: "80%", height: "40%", margin: "0 auto"}}>
                            <Row>
                                <span style={{fontSize: 30}}>{this.dataSource[this.state.wordIndex]["english"]}</span>
                            </Row>
                            <Row style={{width: "50%", margin: "0 auto", height: "70px"}} align="middle" type="flex" justify="space-around">
                                <Col span={12}>
                                    <Icon type="sound">UK</Icon>
                                </Col>
                                <Col span={12}>
                                    <Icon type="sound">US</Icon>
                                </Col>
                            </Row>
                            <Row>
                                <Button style={{width: "90px", margin: "6px"}} onClick={this.know}>Know</Button>
                                <Button style={{width: "90px", margin: "6px"}} onClick={this.unknown}>Unknown</Button>
                            </Row>
                        </div>
                        <div style={{visibility: this.state.meaningVisible}}>
                            <Card title={this.dataSource[this.state.wordIndex]["english"]} style={{width: "80%", margin: "0 auto"}} actions={[<Icon type="double-right" onClick={()=>{this.next();this.setState({meaningVisible: "hidden"})}}>Next</Icon>]}>
                                <Row>
                                    <Col span={6}>
                                        <span style={{fontSize: 15, margin: "5px"}}>Chinese</span>
                                    </Col>
                                    <Col span={18}>
                                        <span>{this.dataSource[this.state.wordIndex]["chinese"]}</span>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={6}>
                                        <span style={{fontSize: 15, margin: "5px"}}>Example</span>
                                    </Col>
                                    <Col span={18}>
                                        <span>{this.dataSource[this.state.wordIndex]["example"]}</span>
                                    </Col>
                                </Row>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
