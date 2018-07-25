import * as React from 'react';
import {Component} from 'react';
import {Row, Col, Icon, Card, Table, Button, Input, Select, Form, message, Collapse} from 'antd';
import 'antd/dist/antd.css';
import DvaProps from '../types/DvaProps';
import {browserHistory, routerRedux} from 'dva/router';
import {FormEvent} from "react";
import {WrappedNewWordForm} from "./NewWordForm";

const FormItem = Form.Item
const Search = Input.Search
const Option = Select.Option
const { Column } = Table
const Panel = Collapse.Panel

interface ModifyProps extends DvaProps{
    form: any;
    dataSourceCet4: any;
    dataSourceCet6: any;
    dataSourceToefl: any;
    dataSourceIelts: any;
    dispatch: any
}


export default class ModifyComponent extends Component<ModifyProps >{
    constructor(props) {
        super(props);
        this.props.dispatch({type: "modify/getWordBook"})
    }
    callback(key) {
        console.log(key);
    }
    deleteWord(word){
        this.props.dispatch({type: "modify/delete", payload: {english: word["english"]}})
    }
    add(){
        this.props.dispatch({type: "modify/add", payload: {}});
    }
    render(){
        const columns = [
            {title: 'English', dataIndex: 'english', key: 'english'},
            {title: 'Chinese', dataIndex: 'chinese', key: 'chinese'},
            {title: 'Example', dataIndex: 'example', key: 'example'},
            {title: 'Modify',
                render: (record) => (
                <span>
                        <a onClick={() => this.deleteWord(record)}>Delete</a>
                    </span>
        )}
            // {title: 'Type', dataIndex: 'type', key: 'type'},
        ];
        return(
            <div style={{textAlign: "center", background: "white", minHeight: "600px", paddingTop: "0%"}}>
                <div style={{ margin: "0 auto"}}>
                    {/*<WrappedNewWordForm dispatch = {this.props.dispatch}/>*/}
                    <Collapse defaultActiveKey={['1']} onChange={this.callback.bind(this)}>
                        <Panel header="Cet4" key="1">
                            <Table dataSource={this.props.dataSourceCet4} columns={columns}>
                            </Table>
                        </Panel>
                        <Panel header="Cet6" key="2">
                            <Table dataSource={this.props.dataSourceCet6} columns={columns}>
                            </Table>
                        </Panel>
                        <Panel header="Toefl" key="3">
                            <Table dataSource={this.props.dataSourceToefl} columns={columns}>
                            </Table>
                        </Panel>
                        <Panel header="Ielts" key="4">
                            <Table dataSource={this.props.dataSourceIelts} columns={columns}>
                            </Table>
                        </Panel>
                    </Collapse>
                </div>
                <div style={{margin: "10px auto"}}>
                    <Button type={"primary"} onClick={this.add.bind(this)}>Add</Button>
                </div>
            </div>

        );
    }
}

