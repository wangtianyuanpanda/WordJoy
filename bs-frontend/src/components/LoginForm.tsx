import {Component, FormEvent, ReactNode} from 'react';
import * as React from 'react';
import {Icon, Form, Button, Input, message, Col, Select} from 'antd';
import DvaProps from '../types/DvaProps';

const FormItem = Form.Item;
const Option = Select.Option;
interface FormProps extends DvaProps {
    form: any;
}
interface LoginFormState {

}
export class LoginFormData {
    name: string;
    password: string;
}

export class LoginForm extends Component<FormProps, LoginFormData> {
    componentDidMount() {
    }

    handleSubmit = (e: FormEvent<{}>)=>{
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err: any, values: LoginFormData)=>{
            if (err){
                message.error("Please reenter the your information")
                return;
            }
            console.log(values)
            //store the user's account info
            this.props.dispatch({type:"login/login", payload:{...values}})
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
            <div style={{marginTop: "18%", marginBottom: "5%"}}>
                <h1>Login</h1>
                    <Form onSubmit={this.handleSubmit}>
                        <FormItem label="Name" {...formItemLayout} hasFeedback>
                            {
                                getFieldDecorator("name", {
                                    rules: [
                                        {required: true, message: "input your name"},
                                        {pattern: /^[a-zA-z0-9]+$/, message: "由数字和字母组成"}
                                    ]
                                })(
                                    <Input prefix={<Icon type="user" style={{fontSize: 13}}/>}/>
                                )
                            }
                        </FormItem>
                        <FormItem label="Password" {...formItemLayout} hasFeedback>
                            {
                                getFieldDecorator("password", {
                                    rules: [
                                        {required: true, message: "Chinese"}
                                    ]
                                })(
                                    <Input type="password" prefix={<Icon type="unlock" style={{fontSize: 13}}/>}/>
                                )
                            }
                        </FormItem>
                        <Button type={"primary"} onClick={this.handleSubmit}>登陆</Button>
                    </Form>
            </div>
        );
    }
}

const WrappedLoginForm: any = Form.create({})(LoginForm);

export {WrappedLoginForm};
