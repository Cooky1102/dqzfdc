import React from 'react';
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';
import { actionCreators } from './store';
import { actionTypes } from './store';
import { Row, Col, Input, Breadcrumb, Icon, Pagination, List, Menu, Spin } from 'antd';

import style from './index.module.scss';
import './index.scss';

const Search = Input.Search;

class HouseNews extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentMenu: '0',
            page: 1,
            value: '',
        }
        this.handleClickMenu = this.handleClickMenu.bind(this);
        this.handleChangePage = this.handleChangePage.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
    }

    componentDidMount() {
        this.props.getNewsCategory();
        this.props.getNewsList(this.state.currentMenu, 1, this.state.value);
    }

    render() {
        const { categoryList, newsList, total_count, loading } = this.props;
        return (
            <div className={[style.houseNews_container] + " houseNews_container"}>
                <Row type="flex" align="bottom" className={style.search_container}>
                    <Col span={12} offset={4}>
                        <Search placeholder="请输入资讯关键字搜索" onSearch={value => this.handleSearch(value)} enterButton size="large" />
                    </Col>
                    <Col span={14} offset={4}>
                        <Breadcrumb separator=">">
                            <Breadcrumb.Item><Icon type="home" />大泉州房地产</Breadcrumb.Item>
                            <Breadcrumb.Item>资讯</Breadcrumb.Item>
                        </Breadcrumb>
                    </Col>
                </Row>
                <Row>
                    <Col span={16} offset={4}>
                        <Menu onClick={this.handleClickMenu} selectedKeys={[this.state.currentMenu]} mode="horizontal">
                            <Menu.Item key='0'>全部</Menu.Item>
                            {
                                categoryList.map(item => {
                                    return <Menu.Item key={item.get('Id')}>{item.get('Name')}</Menu.Item>
                                })
                            }
                        </Menu>
                        <List
                            itemLayout="vertical"
                            size="default"
                            dataSource={newsList}
                            renderItem={item => (
                                <List.Item
                                    key={item.get("Id")}
                                    extra={
                                        <img
                                            width={240}
                                            height={145}
                                            alt="CoverImg"
                                            src={item.get("CoverImg")}
                                        />
                                    }
                                >
                                    <List.Item.Meta
                                        title={item.get("TheTitle")}
                                        description={<div className={[style.description_container]}><div><Icon type="sound" />来源：{item.get("Source")}{item.get('Created')}</div><div style={{ "WebkitBoxOrient": "vertical" }} className={style.newsContent}>{item.get('PCNewsContent').replace(/<[^>]+>/gim, "").slice(10)}</div></div>}
                                    />
                                </List.Item>
                            )}
                        />
                        <Pagination defaultPageSize={5} current={this.state.page} hideOnSinglePage={true} showQuickJumper total={total_count} onChange={this.handleChangePage} />
                    </Col>
                </Row>
                {
                    loading ? <div className={[style.loading]}><Spin size="large" /></div> : null
                }
            </div>
        )
    }

    handleClickMenu(e) {
        console.log(e.key);
        this.setState({
            currentMenu: e.key,
        }, () => {
            this.handleChangePage(1)
        });
    }


    handleSearch(value) {
        this.setState({
            value
        }, () => {
            this.handleChangePage(1)
        })
    }

    handleChangePage(pageNumber) {
        this.props.changeLoading();
        this.setState({
            page: pageNumber,
            loading: true
        }, () => {
            this.props.getNewsList(this.state.currentMenu, this.state.page, this.state.value);
        })
        window.scrollTo({
            top: 208,
            left: 0,
            behavior: "instant"
        });
    }

}

const mapStateToProps = (state) => {
    return {
        categoryList: state.getIn(['houseNews', 'categoryList']),
        newsList: state.getIn(['houseNews', 'newsList']),
        total_count: state.getIn(['houseNews', 'total_count']),
        loading: state.getIn(['houseNews', 'loading'])
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        getNewsCategory() {
            dispatch(actionCreators.getNewsCategory());
        },
        getNewsList(category, page, value) {
            dispatch(actionCreators.getNewsList(category, page, value));
        },
        changeLoading() {
            dispatch({
                type: actionTypes.CHANGE_LOADING
            })
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(HouseNews);
