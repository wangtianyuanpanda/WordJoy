import * as React from 'react';
import {Component} from 'react';
import {Form, Button, Tooltip, Icon, Row, Col} from 'antd';
import DvaProps from '../types/DvaProps';
import {WrappedInfoEditForm} from './InfoEditForm';
import 'ant-design-pro/dist/ant-design-pro.css';
import {ChartCard, yuan, Field, TimelineChart} from 'ant-design-pro/lib/Charts';
import numeral from 'numeral';

interface ExtendProps extends DvaProps {
}
interface ExtendState {
    modalVisible: boolean;
}
const FormItem = Form.Item;

export default class ExtendComponent extends Component<ExtendProps, ExtendState> {
    constructor(props){
        super(props);
        this.state = {
            modalVisible: false
        };
    }
    formRef: any;
    render() {
        return (
            <div >
                <div style={{margin: "110px auto", width: "80%"}}>
                    <Row>
                        <Col span={8}>
                            <div style={{margin: "5px"}}>
                                <ChartCard
                                    title="Oxford Dictionary"
                                    avatar={
                                        <img
                                            style={{ width: 50, height: 50 }}
                                            src={require("../img/oxford.jpeg")}
                                            alt="indicator"
                                        />
                                    }
                                    action={
                                        <Tooltip title="Oxford Dictionary">
                                            <Icon type="info-circle-o" />
                                        </Tooltip>
                                    }

                                    footer={
                                        <a href="https://www.oxforddictionaries.com" target="_blank">Go To Oxford</a>
                                    }
                                >
                                    <span style={{fontSize: 12}}>Oxford Dictionaries puts language information at your fingertips, wherever you are</span>
                                </ChartCard>
                            </div>
                        </Col>
                        <Col span={8}>
                            <div style={{margin: "5px"}}>
                                <ChartCard
                                    title="Collins Dictionary"
                                    avatar={
                                        <img
                                            style={{ width: 56, height: 50 }}
                                            src={require("../img/collins.jpeg")}
                                            alt="indicator"
                                        />
                                    }
                                    action={
                                        <Tooltip title="Collins Dictionary">
                                            <Icon type="info-circle-o" />
                                        </Tooltip>
                                    }
                                    footer={
                                        <a href="https://www.collinsdictionary.com/" target="_blank">Go To Collins</a>
                                    }
                                >
                                    <span style={{fontSize: 12}}>Ideal dictionaries for English or bilingual word reference,thesauruses for expanding your word power.</span>
                                </ChartCard>
                            </div>
                        </Col>
                        <Col span={8}>
                            <div style={{margin: "5px"}}>
                                <ChartCard
                                    title="扇贝网"
                                    avatar={
                                        <img
                                            style={{ width: 50, height: 50 }}
                                            src={require("../img/shanbei.jpg")}
                                            alt="indicator"
                                        />
                                    }
                                    action={
                                        <Tooltip title="扇贝网">
                                            <Icon type="info-circle-o" />
                                        </Tooltip>
                                    }
                                    footer={
                                        <a href="https://www.shanbay.com/" target="_blank">Go To Shanbay</a>
                                    }
                                >
                                <span style={{fontSize: 12}}>扇贝(shanbay),提升英语能力的移动互联网学习平台,拥有包括扇贝单词、扇贝听力、扇贝口语、扇贝新闻、扇贝读书</span>
                            </ChartCard>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={8}>
                            <div style={{margin: "5px"}}>
                                <ChartCard
                                    title="CNN"
                                    avatar={
                                        <img
                                            style={{ width: 50, height: 50 }}
                                            src={require("../img/cnn.jpg")}
                                            alt="indicator"
                                        />
                                    }
                                    action={
                                        <Tooltip title="CNN">
                                            <Icon type="info-circle-o" />
                                        </Tooltip>
                                    }
                                    footer={
                                        <a href="https://edition.cnn.com/" target="_blank">Go To CNN</a>
                                    }
                                >
                                    <span style={{fontSize: 12}}>CNN is an American basic cable and satellite television news channel and an independent subsidiary</span>
                                </ChartCard>
                            </div>
                        </Col>
                        <Col span={8}>
                            <div style={{margin: "5px"}}>
                                <ChartCard
                                    title="China Daily"
                                    avatar={
                                        <img
                                            style={{ width: 50, height: 50 }}
                                            src={require("../img/chinadaily.jpg")}
                                            alt="indicator"
                                        />
                                    }
                                    action={
                                        <Tooltip title="China Daily">
                                            <Icon type="info-circle-o" />
                                        </Tooltip>
                                    }
                                    footer={
                                        <a href="http://www.chinadaily.com.cn/" target="_blank">Go To China Daily</a>
                                    }
                                >
                                    <span style={{fontSize: 12}}>China Daily has the widest print circulation of any English-language newspaper in China .</span>
                                </ChartCard>
                            </div>
                        </Col>
                        <Col span={8}>
                            <div style={{margin: "5px"}}>
                                <ChartCard
                                    title="有道词典"
                                    avatar={
                                        <img
                                            style={{ width: 50, height: 50 }}
                                            src={require("../img/youdao.jpg")}
                                            alt="indicator"
                                        />
                                    }
                                    action={
                                        <Tooltip title="有道词典">
                                            <Icon type="info-circle-o" />
                                        </Tooltip>
                                    }
                                    footer={
                                        <a href="http://cidian.youdao.com/index.html" target="_blank">Go To You Dao</a>
                                    }
                                >
                                    <span style={{fontSize: 12}}>有道词典通过独创的网络释义功能，轻松囊括互联网上的流行词汇与海量例句</span>
                                </ChartCard>
                            </div>
                        </Col>
                    </Row>
                </div>

            </div>

    );
    }
}
