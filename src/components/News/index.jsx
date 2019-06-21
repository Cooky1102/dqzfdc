import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Empty } from 'antd';

import style from './index.module.scss';

class News extends React.Component {
    render() {
        const { newsList } = this.props;

        return (
            <div className={[style.news_container]}>
                <div className={[style.header]}>
                    <div className={[style.title]}>房源资讯</div>
                    <Link to="/housenews">
                        <div className={[style.more]}>更多</div>
                    </Link>
                </div>
                <ul>
                    {
                        newsList.toJS().length > 0 ?
                            newsList.map(item => {
                                return <li key={item.get('id')} className={[style.newsItem]}>{item.get('title')}</li>
                            })
                            :
                            <Empty />
                    }
                </ul>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        newsList: state.getIn(['newHouse', 'newsList'])
    }
};

const mapDispatchToProps = (dispatch) => {
    return {

    }
};

export default connect(mapStateToProps, mapDispatchToProps)(News);
