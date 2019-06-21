import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Row, Col, Tabs, Card, Empty } from 'antd';

import style from './index.module.scss';
import './index.scss';

const { TabPane } = Tabs;
const { Meta } = Card;

class TabCard extends React.Component {
    constructor(props) {
        super(props);
        // this.state = {
        //     loading: true
        // };
        this.changeName = this.changeName.bind(this);
        this.renderHouse = this.renderHouse.bind(this);
    }

    // componentDidMount() {
    //     setTimeout(() => {
    //         this.setState({
    //             loading: false
    //         })
    //     }, 2000)
    // }

    render() {
        const { customeArea, getHouseList, type } = this.props;
        const defaultActiveKey = customeArea.toJS().length > 0 ? customeArea.toJS()[0].Id : ''

        return (
            <div className={[style.tabcard_container] + ' tabcard_container'}>
                <Row>
                    <Col span={8}>
                        {
                            this.changeName()
                        }
                    </Col>
                    <Col span={16}>
                        <Tabs defaultActiveKey={defaultActiveKey.toString()} onChange={(key) => (getHouseList(key, type))}>
                            {
                                customeArea.map((item) => {
                                    return (
                                        <TabPane tab={item.get('Name')} key={item.get('Id')}>
                                            <Row>
                                                {
                                                    this.renderHouse(item.get('Id'))
                                                }
                                            </Row>
                                        </TabPane>
                                    )
                                })
                            }
                        </Tabs>
                    </Col>
                </Row>
            </div>
        )
    }

    renderHouse(id) {
        switch (this.props.type) {
            case 'newHouse':
                const data_newHouse = this.props.newHouse.toJS().find((item) => {
                    return item.Id === id
                })
                if (data_newHouse.data.length > 0) {
                    return data_newHouse.data.map((item) => {
                        return (
                            <Col span={6} key={item.Id}>
                                <Link to={"/detail/" + JSON.stringify({ type: "newHouse", id: item.Id })} className={style.listItem}>
                                    <Card
                                        hoverable
                                        // loading={this.state.loading}
                                        cover={<img alt="example" src={item.CoverImg} />}
                                    >
                                        <Meta title={item.Name} description={item.Addr.slice(0, 10)} />
                                    </Card>
                                </Link>
                            </Col>
                        )
                    })
                } else {
                    return <Col span={24}><Empty /></Col>
                }
            case 'twoHand':
                const data_twoHand = this.props.twoHand.toJS().find((item) => {
                    return item.Id === id
                })
                if (data_twoHand.data.length > 0) {
                    return data_twoHand.data.map((item) => {
                        return (
                            <Col span={6} key={item.Id}>
                                <Link to={"/detail/" + JSON.stringify({ type: "twoHand", id: item.Id })} className={style.listItem}>
                                    <Card
                                        hoverable
                                        // loading={this.state.loading}
                                        cover={<img alt="example" src={item.ImgList.RealList[0].url} />}
                                    >
                                        <Meta title={item.Name} description={item.Addr.slice(0, 10)} />
                                    </Card>
                                </Link>
                            </Col>
                        )
                    })
                } else {
                    return <Col span={24}><Empty /></Col>
                }
            case 'rent':
                const data_rent = this.props.rent.toJS().find((item) => {
                    return item.Id === id
                })
                if (data_rent.data.length > 0) {
                    return data_rent.data.map((item) => {
                        return (
                            <Col span={6} key={item.Id}>
                                <Link to={"/detail/" + JSON.stringify({ type: "rent", id: item.Id })} className={style.listItem}>
                                    <Card
                                        hoverable
                                        // loading={this.state.loading}
                                        cover={<img alt="example" src={item.ImgList.RealList[0].url} />}
                                    >
                                        <Meta title={item.Name} description={item.Addr.slice(0, 10)} />
                                    </Card>
                                </Link>
                            </Col>
                        )
                    })
                } else {
                    return <Col span={24}><Empty /></Col>
                }
            default:
                return false;
        }
    }

    changeName() {
        switch (this.props.type) {
            case 'newHouse':
                return <div className={style.name}>新房</div>;
            case 'twoHand':
                return <div className={style.name}>二手房</div>;
            case 'rent':
                return <div className={style.name}>租房</div>
            default:
                break;
        }
    }
}

const mapStateToProps = (state) => {
    return {
        customeArea: state.getIn(['home', 'customeArea']),
        newHouse: state.getIn(['home', 'newHouse']),
        twoHand: state.getIn(['home', 'twoHand']),
        rent: state.getIn(['home', 'rent']),
    }
};

const mapDispatchToProps = (dispatch) => {
    return {

    }
};

export default connect(mapStateToProps, mapDispatchToProps)(TabCard);
