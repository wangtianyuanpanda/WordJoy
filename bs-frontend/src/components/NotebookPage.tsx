import * as React from 'react';
import {Component} from 'react';
import {Form, Button, Modal, Input, Icon, Select, Table, Divider} from 'antd';
import DvaProps from '../types/DvaProps';
import {WrappedInfoEditForm} from './InfoEditForm';

interface NotebookProps extends DvaProps {
    form: any;
    dataSource: any;
}

interface NotebookState {
    modalVisible: boolean;
}

const columns = [
    {title: 'English', dataIndex: 'english', key: 'english'},
    {title: 'Chinese', dataIndex: 'chinese', key: 'chinese'},
    {title: 'Example', dataIndex: 'example', key: 'example'},
    {title: 'Type', dataIndex: 'type', key: 'type'},
];


const FormItem = Form.Item;
const Option = Select.Option;



export default class UserManagePageComponent extends Component<NotebookProps, NotebookState> {
    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false
        };
    }

    formRef: any;

    render() {
        return (
            <div>
                <Table columns={columns} dataSource={this.props.dataSource}/>
            </div>

        );
    }
}

