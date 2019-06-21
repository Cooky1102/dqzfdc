import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { Row, Col, Menu, Icon, Divider } from 'antd';
import style from './index.module.scss';
import './index.scss';

import imgUrl from '../../statics/images/logo.jpg';
import wechatUrl from '../../statics/images/erweima.png';
import weiboUrl from '../../statics/images/weibo2.png';

const { SubMenu } = Menu;

class Header extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            // current: this.props.location.pathname.slice(1) === '' ? 'home' : this.props.location.pathname.slice(1),
            current: '',
            wechat_show: false,
            weibo_show: false
        };
        this.handleClick = this.handleClick.bind(this);
        this.showWX = this.showWX.bind(this);
        this.hiddenWX = this.hiddenWX.bind(this);
        this.showWB = this.showWB.bind(this);
        this.hiddenWB = this.hiddenWB.bind(this);
        this.changeTag = this.changeTag.bind(this);
    }

    componentDidMount() {
        this.changeTag()
    }

    // shouldComponentUpdate(nextProps,nextState){
    //     console.log(nextState.current === "home");
    //     console.log(this.state);
        
    //     if(nextState.current ==="home" && this.state.current === "newhouse") {
    //         return false;
    //     } else {
    //         return true;
    //     }
    // }

    componentDidUpdate() {
        // this.changeTag()
    }

    changeTag() {
        if (this.props.location.pathname.indexOf("newHouse") !== -1) {
            this.setState({
                current: "newhouse"
            })
        } else if (this.props.location.pathname.indexOf("twoHand") !== -1) {
            this.setState({
                current: "twohand"
            })
        } else if (this.props.location.pathname.indexOf("rent") !== -1) {
            this.setState({
                current: "rent"
            })
        } else {
            this.setState({
                current: this.props.location.pathname.slice(1) === '' ? 'home' : this.props.location.pathname.slice(1),
            })
        }
    }

    render() {
        return (
            <div className={[style.header_container] + ' header_container'}>
                <Row>
                    <Col span={4} className={style.logo_box}>
                        <img src={imgUrl} alt="" className={style.logo} />
                    </Col>
                    <Col span={16}>
                        <Menu onClick={this.handleClick} selectedKeys={[this.state.current]} mode="horizontal">
                            <Menu.Item key="home">
                                <Link to="/">首页</Link>
                            </Menu.Item>
                            <Menu.Item key="newhouse">
                                <Link to="/newhouse">新房</Link>
                            </Menu.Item>
                            <Menu.Item key="twohand">
                                <Link to="/twohand">二手房</Link>
                            </Menu.Item>
                            <Menu.Item key="rent">
                                <Link to="/rent">租房</Link>
                            </Menu.Item>
                            <Menu.Item key="housenews">
                                <Link to="/housenews">资讯</Link>
                            </Menu.Item>
                            <SubMenu
                                title={
                                    <span className="submenu-title-wrapper">
                                        发布房源
                                    </span>
                                }
                            >
                                <Menu.Item key="publishTwohand">二手房发布</Menu.Item>
                                <Menu.Item key="publishRent">出租房发布</Menu.Item>
                            </SubMenu>
                            <Menu.Item key="login">
                                <Link to="/login">登录</Link>
                            </Menu.Item>
                        </Menu>
                    </Col>
                    <Col span={4} className={style.focus_box}>
                        <div onMouseEnter={this.showWX} onMouseLeave={this.hiddenWX} className={style.wechat_box}>
                            <Icon type="wechat" style={{ "marginRight": "5px" }} />公众号
                            {
                                this.state.wechat_show ? <img src={wechatUrl} alt="" className={style.wechat_img} /> : null
                            }
                        </div>
                        <Divider type="vertical" />
                        <div onMouseEnter={this.showWB} onMouseLeave={this.hiddenWB} className={style.weibo_box}>
                            <Icon type="weibo-circle" style={{ "marginRight": "5px" }} />微博
                            {
                                this.state.weibo_show ? <img src={weiboUrl} alt="" className={style.weibo_img} /> : null
                            }
                        </div>
                    </Col>
                </Row>
            </div>

        );
    }

    handleClick = e => {
        // console.log('click ', e);
        this.setState({
            current: e.key,
        });
    };

    showWX() {
        this.setState({
            wechat_show: true
        })
    };

    hiddenWX() {
        this.setState({
            wechat_show: false
        })
    };

    showWB() {
        this.setState({
            weibo_show: true
        })
    };

    hiddenWB() {
        this.setState({
            weibo_show: false
        })
    };
}

const mapStateToProps = (state) => {
    return {

    }
};

const mapDispatchToProps = (dispatch) => {
    return {

    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Header));
