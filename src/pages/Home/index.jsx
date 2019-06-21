import React from 'react';
import { connect } from 'react-redux';
import { actionCreators } from './store';
import { Row, Col, Carousel, Input, Select,message } from 'antd';
import style from './index.module.scss';
import './index.scss';

import TabCard from '../../components/TabCard';
import Ad from '../../components/Ad';

const InputGroup = Input.Group;
const Search = Input.Search;
const { Option } = Select;

class Home extends React.Component {
    componentDidMount() {
        // 获取城市列表
        this.props.getCustomerArea()
    }
    render() {
        const { ad } = this.props;
        return (
            <div className={[style.home_container] + " home_container"}>
                <div className={[style.carousel_container]}>
                    <Carousel autoplay={true}>
                        <div>
                            <img src="http://static.dqzfdc.com/201965115254916319578039.jpg" alt="" className={style.carousel_img} />
                        </div>
                        <div>
                            <img src="https://img.917.com/www/images/index/2.jpg" alt="" className={style.carousel_img} />
                        </div>
                    </Carousel>
                    <div className={style.search_container}>
                        <Row type="flex" justify="center">
                            <Col span={12}>
                                <InputGroup compact>
                                    <Select defaultValue="Option1" size="large">
                                        <Option value="Option1">新房</Option>
                                        <Option value="Option2">二手房</Option>
                                        <Option value="Option3">租房</Option>
                                    </Select>
                                    <Search style={{ width: '84%' }} placeholder="搜索" onSearch={value => message.error("未开发~")} size="large" enterButton allowClear />
                                </InputGroup>
                            </Col>
                        </Row>
                    </div>
                </div>
                <Row type="flex" justify="center">
                    <Col span={22}>
                        <TabCard getHouseList={this.props.getHouseList} type="newHouse" />
                    </Col>
                </Row>
                <Row type="flex" justify="center">
                    <Col span={22}><Ad url={ad.toJS()[0].url} /></Col>
                </Row>
                <Row type="flex" justify="center">
                    <Col span={22}>
                        <TabCard getHouseList={this.props.getHouseList} type="twoHand" />
                    </Col>
                </Row>
                <Row type="flex" justify="center">
                    <Col span={22}><Ad url={ad.toJS()[1].url} /></Col>
                </Row>
                <Row type="flex" justify="center">
                    <Col span={22}>
                        <TabCard getHouseList={this.props.getHouseList} type="rent" />
                    </Col>
                </Row>
                <Row type="flex" justify="center">
                    <Col span={22}><Ad url={ad.toJS()[2].url} /></Col>
                </Row>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        ad: state.getIn(['home', 'ad'])
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        getCustomerArea() {
            dispatch(actionCreators.getCustomerArea());
        },
        getHouseList(key, type) {
            console.log(key, type);
            dispatch(actionCreators.getHouseList(key,type))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
