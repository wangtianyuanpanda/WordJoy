import {Component, FormEvent} from 'react';
import * as React from 'react';
import DvaProps from '../types/DvaProps';
import {Form, message, Input, Icon, Select, Button} from "antd"

const FormItem = Form.Item;
const Option = Select.Option;

interface RegisterProps extends DvaProps{
    dispatch: any;
    form: any;
}
export class RegisterFormData{
    name: string;
    password: string;
    gender: string;
    email: string;
    telephone: string
}


export class RegisterForm extends Component<RegisterProps, RegisterFormData>{
    handleSubmit = (e: FormEvent<{}>)=>{
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err: any, values: RegisterFormData)=>{
            if (err){
                message.error("Please reenter the your information")
                return;
            }
            console.log(values)
            //store the user's account info
            this.props.dispatch({type:"register/add", payload:{...values}})
        })
    }
    render(){
        const {getFieldDecorator}  = this.props.form;
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
        return(
            <Form onSubmit={this.handleSubmit}>
                <FormItem label="Name" {...formItemLayout} hasFeedback>
                    {
                        getFieldDecorator("name", {
                            rules: [
                                {required: true, message: "请输入用户名"},
                                {pattern: /^[0-9A-ZAa-z]+$/, message: "用户名由字母和数字组成"}
                            ]
                        })(
                            <Input prefix={<Icon type="user" style={{fontSize: 12}}/>}/>
                        )
                    }
                </FormItem>
                <FormItem label="Password" {...formItemLayout} hasFeedback>
                    {
                        getFieldDecorator("password", {
                            rules: [
                                {required: true, message: "请输入密码"},
                                {pattern: /^[0-9A-ZAa-z]{6,18}$/, message: "密码由6到18位字母数字组成"}
                            ]
                    })(
                        <Input type="password" prefix={<Icon type="unlock" style={{fontSize: 12}}/>}/>
                        )
                    }
                </FormItem>
                <FormItem label="Email" {...formItemLayout} hasFeedback>
                    {
                        getFieldDecorator("email", {
                            rules: [
                                {required: true, message: "请输入邮箱"},
                                {type: 'email', message: 'The input is not valid E-mail!'}

                            ]
                        })(
                            <Input prefix={<Icon type="mail" style={{fontSize: 12}}/>}/>
                        )
                    }
                </FormItem>
                <FormItem label="Gender" {...formItemLayout} hasFeedback>
                    {
                        getFieldDecorator("gender", {
                            rules: [
                                {required: true, message: "Please select your gender!"}
                            ]
                        })(
                            <Select>
                                <Option value="male">male</Option>
                                <Option value="female">female</Option>
                            </Select>
                        )
                    }
                </FormItem>
                <FormItem label='Telephone' {...formItemLayout} hasFeedback>
                    {
                        getFieldDecorator("telephone", {
                            rules: [
                                {required: true, message: "请输入电话"},
                                {pattern: /^[0-9]+$/, message: "请输入数字"}

                            ]
                        })(
                            <Input prefix={<Icon type="mail" style={{fontSize: 12}}/>}/>
                        )
                    }
                </FormItem>
                {/*<Button onClick={this.handleSubmit}>Create</Button>*/}
            </Form>
        )
    }
}

const WrappedRegisterForm: any = Form.create({})(RegisterForm)
export {WrappedRegisterForm}