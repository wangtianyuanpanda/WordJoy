import {Component} from 'react';
import * as React from 'react';
import {WrappedNewWordForm} from './NewWordForm';
import DvaProps from '../types/DvaProps';

class AddPageProps implements DvaProps {
    public dispatch: any;
}

export default class AddPageComponent extends Component<AddPageProps, {}> {
    render() {
        return (
            <div style={{textAlign: "center", background: "#ECECEC", minHeight: "600px", paddingTop: "7%"}}>
                <div style={{margin: "0 auto"}}>
                <WrappedNewWordForm dispatch={this.props.dispatch}/>
                </div>
            </div>
        );
    }
}
