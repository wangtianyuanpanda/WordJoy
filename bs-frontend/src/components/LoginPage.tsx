import {Component} from 'react';
import * as React from 'react';
import {WrappedLoginForm} from './LoginForm';
import DvaProps from '../types/DvaProps';

class LoginPageProps implements DvaProps {
    public dispatch: any;
}

export default class LoginPageComponent extends Component<LoginPageProps, {}> {
    render() {
        return (
            <div style={{textAlign: "center"}}>
                <h2>Login</h2>
                <div>
                </div>
                <WrappedLoginForm dispatch={this.props.dispatch}/>
            </div>
        );
    }
}
