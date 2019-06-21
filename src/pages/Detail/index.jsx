import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { actionCreators } from './store';
import { Row, Col, Carousel, Breadcrumb, Icon } from 'antd';

import style from './index.module.scss';
// import './index.scss';

class Detail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: ''
        }
        this.goLeft = this.goLeft.bind(this);
        this.goRight = this.goRight.bind(this);
        this.showPrice = this.showPrice.bind(this);
        this.handleChangeCarousel = this.handleChangeCarousel.bind(this);
    }

    componentDidMount() {
        // console.log(this.props);
        console.log(this.props.match);
        // console.log(this.props.match.params);
        // console.log(JSON.parse(this.props.match.params.data));
        // return;
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" })
        const { type, id } = JSON.parse(this.props.match.params.data);
        let name;
        switch (type) {
            case "newHouse":
                name = "新房";
                break;
            case "twoHand":
                name = "二手房";
                break;
            case "rent":
                name = "租房";
                break;
            default:
                break;
        }
        this.setState({ name })
        this.props.getDetail(type, id);
    }

    render() {
        const { detail } = this.props;

        return (
            <div className={[style.detail_container] + " detail_container"}>
                <Row type="flex" align="middle" className={style.header}>
                    <Col span={14} offset={2}>
                        <Breadcrumb separator=">">
                            <Breadcrumb.Item><Icon type="home" />大泉州房地产</Breadcrumb.Item>
                            <Breadcrumb.Item>{this.state.name}</Breadcrumb.Item>
                            <Breadcrumb.Item>详情</Breadcrumb.Item>
                        </Breadcrumb>
                    </Col>
                </Row>
                <Row className={style.content}>
                    <Col span={13} offset={1}>
                        <div className={[style.title]}>{detail.get("Name")}</div>
                        <Carousel autoplay={true} ref={carousel => this.carousel = carousel}>
                            {
                                detail.get("ImgList").map((item, index) => {
                                    return (
                                        <div key={index}>
                                            <img src={item.get("url")} alt="" className={style.carousel_img} />
                                        </div>
                                    )
                                })
                            }
                        </Carousel>
                        <div className={style.smallImg_box}>
                            <div className={style.go_left} onClick={this.goLeft}></div>
                            <ul className={[style.smallImg_container]} ref={(ul) => { this.ul = ul }}>
                                {
                                    detail.get("ImgList").map((item, index) => {
                                        return (
                                            <li key={index} className={[style.samllImg_item]} onClick={() => (this.handleChangeCarousel(index))}><img src={item.get("url")} alt="" /></li>
                                        )
                                    })
                                }
                            </ul>
                            <div className={style.go_right} onClick={this.goRight}></div>
                        </div>
                    </Col>
                    <Col span={7} offset={1} className={style.info_box}>
                        <div className={style.top_info}>
                            {
                                this.showPrice(detail)
                            }
                            {
                                detail.get("HouseUseType").map((item, index) => {
                                    return <div className={style.type} key={index}>{item}</div>
                                })
                            }
                        </div>
                        <div className={style.bottom_info}>
                            <div className={style.row}>
                                <div className={style.name}>项目地址:</div>
                                <div className={style.data} style={{ "WebkitBoxOrient": "vertical" }}>{detail.get("Addr")}</div>
                            </div>
                            <div className={style.row}>
                                <div className={style.name}>最新开盘:</div>
                                <div className={style.data}>{detail.get("SaleTime")}</div>
                            </div>
                            <div className={style.row}>
                                <div className={style.name}>联系电话:</div>
                                <div className={style.data}>{detail.get("Mobile")}</div>
                            </div>
                            <div className={style.row}>
                                <div className={style.name}>装修:</div>
                                <div className={style.data}>{detail.get("Decoration")}</div>
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }

    handleChangeCarousel(index) {
        this.carousel.goTo(index, true)
    }

    showPrice(detail) {
        const { type } = JSON.parse(this.props.match.params.data);
        switch (type) {
            case "newHouse":
                return <div className={style.price}><span className={style.num}>{detail.get("average")}</span>元/平(均价)</div>
            case "twoHand":
                return <div className={style.price}><span className={style.num}>{detail.get("Price")}</span>万元</div>
            case "rent":
                return <div className={style.price}><span className={style.num}>{detail.get("MonthlyRent")}</span>元/月</div>
            default:
                break;
        }
    }

    goLeft() {
        this.ul.scrollTo({ top: 0, left: this.ul.scrollLeft - 130, behavior: "smooth" })
    }

    goRight() {
        // console.log(this.ul.offsetWidth);
        // console.log(this.ul.scrollWidth);
        // console.log(this.ul.scrollLeft);
        this.ul.scrollTo({ top: 0, left: 130 + this.ul.scrollLeft, behavior: "smooth" })
    }



}

const mapStateToProps = (state) => {
    return {
        detail: state.getIn(['detail', 'detail'])
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        getDetail(type, id) {
            console.log("type是:" + type + "，id是" + id);
            dispatch(actionCreators.getDetail(type, id))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Detail));
