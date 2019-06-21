import * as actionTypes from './actionTypes';
import axios from 'axios';

export const getDetail = (type, id) => {
    return (dispatch) => {
        let url = ''
        switch (type) {
            case 'newHouse':
                url = 'http://api.dqzfdc.com/Api/BuildInfo/PGet?Id=' + id;
                break;
            case 'twoHand':
                url = 'http://api.dqzfdc.com/Api/TheSecondary/PGet?Id=' + id;
                break;
            case 'rent':
                url = 'http://api.dqzfdc.com/Api/ForLease/PGet?Id=' + id;
                break;
            default:
                break;
        }
        // console.log(url);

        axios.get(url).then(res => {
            // console.log(res.data);
            if (res.data.ret === 0) {
                const data = res.data.data;
                let detail = {}
                if (type === "newHouse") {
                    detail = {
                        "Name": data.Name,
                        "Addr": data.Province + data.City + data.Area + data.Addr,
                        "SaleTime": data.SaleTime,
                        "Mobile": data.SalePhone,
                        "ImgList": data.ImgList.RealList
                    }
                    detail.Decoration = data.DecorationList.find((item) => {
                        // eslint-disable-next-line
                        return item.DictItemValue == data.Decoration;
                    }).Name
                    detail.HouseUseType = data.PropertyType.split(",").map(item=>{
                        return data.LPropertyTypeList.find(item2=>{
                            return item === item2.DictItemValue;
                        }).Name
                    })
                    const priceList = data.LPropertyPriceList.map((item) => {
                        // eslint-disable-next-line
                        return item.TargetId == data.Id ? item.ReferencePrice : ''
                    })
                    // console.log(priceList);
                    let average = 0;
                    priceList.forEach(element => {
                       average += element 
                    });
                    detail.average = average;
                } else if (type === "twoHand") {
                    detail = {
                        "Name": data.Name,
                        "Addr": data.Province + data.City + data.Area + data.Addr,
                        "SaleTime": data.Created,
                        "Mobile": data.MobilePhone,
                        "ImgList": data.ImgList.RealList,
                        "Price":data.Price
                    }
                    detail.Decoration = data.Decoration_list.find(item => {
                        // eslint-disable-next-line
                        return item.DictItemValue == data.Decoration;
                    }).Name
                    detail.HouseUseType = data.HouseUseType.split(",").map(item=>{
                        return data.HouseUseType_list.find(item2=>{
                            return item === item2.DictItemValue;
                        }).Name
                    })
                } else if (type === "rent") {
                    detail = {
                        "Name": data.Name,
                        "Addr": data.Province + data.City + data.Area + data.Addr,
                        "SaleTime": data.Created,
                        "Mobile": data.MobilePhone,
                        "ImgList": data.ImgList.RealList,
                        "MonthlyRent": data.MonthlyRent
                    }
                    detail.Decoration = data.Decoration_list.find(item => {
                        // eslint-disable-next-line
                        return item.DictItemValue == data.RenovaTions;
                    }).Name
                    detail.HouseUseType = data.HouseUseType.toString().split(",").map(item=>{
                        return data.HouseUseType_list.find(item2=>{
                            return item === item2.DictItemValue;
                        }).Name
                    })
                }

                console.log(detail);
                dispatch({
                    type: actionTypes.GET_DETAIL,
                    detail
                })
            }
        }).catch(error => {
            console.log(error);
        })
    }
}