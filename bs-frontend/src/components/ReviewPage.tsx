import {Component} from 'react';
import * as React from 'react';
import DvaProps from '../types/DvaProps';
import {Row, Col, Icon, Button, Card, Radio, Alert, message, Modal} from 'antd';
import Authorized from "ant-design-pro/lib/Authorized";
import 'ant-design-pro/dist/ant-design-pro.css';
const RadioGroup = Radio.Group;

interface ReviewProps extends DvaProps{
    dispatch: any,
    dataSource: any,
    // dataSourceCet4: any,
    // dataSourceCet6: any,
    // dataSourceToefl: any,
    // dataSourceIelts: any,
    // location: any;
}

const randSequence=[[0,1,2],[0,2,1],[1,2,0],[1,0,2],[2,1,0],[2,0,1]];
const wrong=["抛弃；放弃","炽烧的，闪耀的", "反常的，异常的；变态的", "吸收（液体、知识）", "抽象的", "荒谬的，可笑的", "学术的；学院的；理论的","可接近的，可接触的；可得到的"]
interface ReviewState{
    wordIndex: number,
    meaningVisible: string,
    correct: number,
    choice: number,
    rightNum: number,
    modalVisible: boolean;
}
const radioStyle = {
    display: 'block',
    height: '30px',
    lineHeight: '30px',
};
var correct;
var choice;
var total;
const meaning = ["","",""];
export default class ReviewComponent extends Component<ReviewProps, ReviewState>{
    constructor(props){
        super(props);
        this.state = {
            wordIndex: 0,
            meaningVisible: "hidden",
            correct: 0,
            choice: 0,
            rightNum: 0,
            modalVisible: false
        }
        this.props.dispatch({type: "review/getQuestion", payload: {}})
        console.log(this.props.dataSource)
        var s = randSequence[Math.floor(Math.random()*3)]
        this.setState({correct: s[2]})
        console.log(s)
        meaning[s[0]]=wrong[Math.floor(Math.random()*(wrong.length-1))]
        meaning[s[1]]=wrong[Math.floor(Math.random()*(wrong.length-1))]
        meaning[s[2]]=this.props.dataSource[this.state.wordIndex]["chinese"]
        console.log(meaning)
        correct = s[2]
        console.log(correct)
        total = this.props.dataSource.length
    }
    onChange = (e) => {
        this.setState({choice: e.target.value});
        choice = e.target.value;
    }
    next(){
        //check if reciting is over
        var newIndex = this.state.wordIndex+1;
        if(newIndex== this.props.dataSource.length)
        {
            //reciting finishes
            this.setState({modalVisible: true})
        }else {
            this.setState({wordIndex: newIndex})
            var s = randSequence[Math.floor(Math.random()*3)]
            this.setState({correct: s[2]})
            console.log(s)
            meaning[s[0]]=wrong[Math.floor(Math.random()*(wrong.length-1))]
            meaning[s[1]]=wrong[Math.floor(Math.random()*(wrong.length-1))]
            meaning[s[2]]=this.props.dataSource[this.state.wordIndex]["chinese"]
            console.log(meaning)
            correct = s[2]
            console.log(correct)
        }
    }
    finish(){
        this.setState({modalVisible:false});
        this.props.dispatch({type: "review/finish",payload:{}})
    }
    submit(){
        if(correct==choice){
            message.success("Right");
            var num = this.state.rightNum+1;
            this.setState({rightNum: num})
        }else{
            message.error("Wrong");
        }
        this.next();
    }
    render(){
        meaning[correct] = this.props.dataSource[this.state.wordIndex]["chinese"]
        return(
            <div>
                <div style={{textAlign: "center", background: "#ECECEC",minHeight: "600px", paddingTop: "10%"}}>

                        <div style={{width: "35%", height: "70%", margin: "0 auto"}}>
                            <Card actions={[<Icon type="check" style={{fontSize: 14, marginTop: "5%", marginBottom: "2%"}} onClick={()=>this.submit()}>Submit</Icon>,<Icon type="caret-right" style={{fontSize: 14, marginTop: "5%", marginBottom: "5%"}} onClick={()=>this.next()}>Next</Icon>]}>
                            <Row>
                                <h1>{this.props.dataSource[this.state.wordIndex]["english"]}</h1>
                            </Row>
                            <Row>
                                <RadioGroup onChange={this.onChange}>
                                    <Radio style={radioStyle} value={0}>{meaning[0]}</Radio>
                                    <Radio style={radioStyle} value={1}>{meaning[1]}</Radio>
                                    <Radio style={radioStyle} value={2}>{meaning[2]}</Radio>
                                </RadioGroup>
                            </Row>
                            </Card>
                        </div>
                    <Modal
                        title="Your Final Score"
                        wrapClassName="vertical-center-modal"
                        visible={this.state.modalVisible}
                        onCancel={()=>{this.setState({modalVisible:false})}}
                        onOk={this.finish.bind(this)}>
                        <div style={{margin: "8% auto"}}>
                            <div style={{margin: "0 auto", textAlign:"center"}}>
                            <span style={{fontSize: 60, marginRight: "4%"}}>{Math.floor(this.state.rightNum/(this.props.dataSource.length)*100)}</span><span>分</span>
                        </div>
                        </div>
                    </Modal>
                </div>
            </div>
        )
    }
}
