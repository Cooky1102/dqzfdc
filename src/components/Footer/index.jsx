import React from 'react';
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';
// import { Row, Col, Tabs, Card } from 'antd';

import style from './index.module.scss';


class Footer extends React.Component {
    render() {

        return (
            <div className={style.footer_container}>
                <div className={style.row_1}>
                    <span>社区</span>
                    <span>帮助</span>
                    <span>更多体验</span>
                    <span>链接合作</span>
                    <span>服务声明</span>
                    <span>更新日志</span>
                    <span>意见反馈</span>
                    <span>关于我们</span>
                </div>
                <div className={style.row_2}>
                    服务电话:0595-22933966 传真:0595-22933966 地址：福建省泉州市丰泽区北峰街道北清东路562号优众兴业园三楼303室
                </div>
                <div className={style.row_3}>
                    Copyright © 2019-2022 dqzfdc.com All rights reserved.闽ICP备 18010150号-1
                </div>
            </div>
        )
    }

}

const mapStateToProps = (state) => {
    return {

    }
};

const mapDispatchToProps = (dispatch) => {
    return {

    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Footer);
