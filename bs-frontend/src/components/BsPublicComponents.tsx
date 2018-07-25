import {Component} from 'react';
import * as React from 'react';
import {Layout, Menu, Icon, Row, Col} from 'antd';
import DvaProps from "../types/DvaProps";
import GlobalFooter from 'ant-design-pro/lib/GlobalFooter';

const {Header, Footer, Content} = Layout;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
interface BsProps extends DvaProps{
     headVisibility: boolean;
     dispatch : any;
}
export class BsHeader extends Component <BsProps>{
    render() {
        if(this.props.headVisibility){
            var head;
            head =
                <h1 style={{color: 'white'}}>
                <span>WordJoy</span>
                <span style={{alignSelf: "flex-end", position: 'absolute', right: 10, fontSize: 13, color: "white"}}>
                            <a style={{color: "white", marginRight: "15px"}} onClick={()=>
                            {this.props.dispatch({type: "navigation/jump", payload:{direction: "navi"}})}}>返回主页</a>
                            <a href="#" style={{color: "white",marginRight: "15px"}} onClick={()=>{
                                this.props.dispatch({type: "login/logout", payload: {}})
                            }}>用户注销</a>
                </span>
            </h1>
        }
        else{
            head=<h1 style={{color: 'white'}}>
                <span>WordJoy</span>
            </h1>
        }
        return (
            <Header style={{backgroundColor: "#4682B4"}}>
                {head}
            </Header>
        );
    }
}

export class BsFooter extends Component {
    render() {
        return (
            <Footer>
                <div style={{textAlign: 'center'}}>&copy;Panda</div>
            </Footer>
        );
    }
}

interface BarProps extends DvaProps {
    current: string;
    show: boolean;
}

export class NavigationBar extends Component<BarProps>{
    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }
    componentDidMount() {
    };
    handleClick(e) {
        if(e.key !== this.props.current)this.props.dispatch({type:'navigation/jump', payload: {direction: e.key}});
    };
    render() {
        if(this.props.show){
        return (
            <Menu onClick={this.handleClick}
                  selectedKeys={[this.props.current]}
                  mode="horizontal"
            >
                <Menu.Item key="extension">
                    <Icon type="book" />扩展包
                </Menu.Item>
                <SubMenu title={<span><Icon type="book"/>单词书</span>}>
                    <MenuItemGroup title="单词书">
                        <Menu.Item key="startRecite">背单词</Menu.Item>
                        <Menu.Item key="modify">修改单词书</Menu.Item>
                    </MenuItemGroup>
                </SubMenu>
                <Menu.Item key="notebook">
                   <Icon type="book"/>错题本
                </Menu.Item>
                <Menu.Item key="reviewAndtest">
                    <Icon type="edit" />复习考核
                </Menu.Item>

            </Menu>
        );}else {
            return null;
        }
    };

}