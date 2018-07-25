import {Component, FormEvent, ReactNode} from 'react';
import * as React from 'react';
import {Icon, Form, Button, Input, message, Col, Select} from 'antd';
import DvaProps from '../types/DvaProps';

const FormItem = Form.Item;
const Option = Select.Option;
interface FormProps extends DvaProps {
    form: any;
    dispatch: any
}
interface LoginFormState {

}
class NewWordFormData{
    english: string;
    chinese: string;
    example: string;
    type: string;
}

export class NewWordForm extends Component<FormProps, NewWordFormData> {
    componentDidMount() {
    }

    handleSubmit = (e: FormEvent<{}>)=>{
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err: any, values: NewWordFormData)=>{
            if (err){
                message.error("Please reenter the your information")
                return;
            }
            console.log(values)
            //store the user's account info
            this.props.dispatch({type:"startRecite/add", payload:{...values}})
        })
    }

    render() {
        const {getFieldDecorator} = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: {span: 24},
                sm: {span: 6},
            },
            wrapperCol: {
                xs: {span: 24},
                sm: {span: 14},
            },
        };
        return (
            <div style={{width: "60%", background: "white", padding: "2%", margin: "0 auto", textAlign: "center"}}>
                <h1>Customize your Word Book</h1>
            <Form onSubmit={this.handleSubmit} style={{width: "80%",margin: "0 auto"}}>
                <FormItem label="English" {...formItemLayout} hasFeedback>
                    {
                        getFieldDecorator("english", {
                            rules: [
                                {required: true, message: "English"},
                                {pattern: /^[a-z]+$/, message: "小写英文字母组成"}
                            ]
                        })(
                            <Input/>
                        )
                    }
                </FormItem>
                <FormItem label="Chinese" {...formItemLayout} hasFeedback>
                    {
                        getFieldDecorator("chinese", {
                            rules: [
                                {required: true, message: "Chinese"}
                            ]
                        })(
                            <Input />
                        )
                    }
                </FormItem>
                <FormItem label="Example" {...formItemLayout} hasFeedback>
                    {
                        getFieldDecorator("example", {
                            rules: [
                                {required: true, message: "Input an example sentence"},

                            ]
                        })(
                            <Input />
                        )
                    }
                </FormItem>
                <FormItem label="Type" {...formItemLayout} hasFeedback>
                    {
                        getFieldDecorator("type", {
                            rules: [
                                {required: true, message: "Please select your gender!"}
                            ]
                        })(
                            <Select>
                                <Option value="cet4">cet4</Option>
                                <Option value="cet6">cet6</Option>
                                <Option value="toefl">toefl</Option>
                                <Option value="ielts">ielts</Option>
                            </Select>
                        )
                    }
                </FormItem>
                <Button type={"primary"} onClick={this.handleSubmit}>Create</Button>
            </Form>
            </div>
        );
    }
}

const WrappedNewWordForm: any = Form.create({})(NewWordForm);

export {WrappedNewWordForm};
