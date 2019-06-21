import * as actionTypes from './actionTypes';
import axios from 'axios';
import { fromJS } from 'immutable';

export const getHouseList = (id, type) => {
    return (dispatch) => {
        let url = ''
        let formData = {}
        switch (type) {
            case 'newHouse':
                url = 'http://api.dqzfdc.com/Api/BuildInfo/PList';
                formData = {
                    Area1: id,
                    page: 1,
                    perpage: 8,
                    Status: 1,
                    sort_name: 'OrderId',
                    sort_desc: 'Desc'
                }
                break;
            case 'twoHand':
                url = 'http://api.dqzfdc.com/Api/TheSecondary/PList';
                formData = {
                    Area1: id,
                    page: 1,
                    perpage: 8,
                    Status: 1,
                    sort_name: 'OrderNum',
                    sort_desc: 'Desc'
                }
                break;
            case 'rent':
                url = 'http://api.dqzfdc.com/Api/ForLease/PList';
                formData = {
                    Area1: id,
                    page: 1,
                    perpage: 8,
                    Status: 1,
                    sort_name: 'OrderNum',
                    sort_desc: 'Desc'
                }
                break
            default:
                break
        }
        axios.post(url, formData).then((res) => {
            if(type === 'newHouse') return dispatch({
                type: actionTypes.GET_NEWHOUSE,
                id,
                data: res.data.data.list
            })
            if(type === 'twoHand') return dispatch({
                type: actionTypes.GET_TWOHAND,
                id,
                data: res.data.data.list
            })
            if(type === 'rent') return dispatch({
                type: actionTypes.GET_RENT,
                id,
                data: res.data.data.list
            })
        }).catch((error) => {
            console.log(error);
        })

    }
}


export const getCustomerArea = () => {
    return (dispatch) => {
        axios.get('http://api.dqzfdc.com/Api/CustomArea/PListAll?ParentId=0').then((res) => {
            const areaData = res.data.data.list;
            const houseData = [];
            areaData.map((item) => {
                return houseData.push({ "Id": item.Id, "data": fromJS([]) })
            });
            // console.log(houseData);
            if (houseData.length > 0) {
                dispatch(getHouseList(houseData[0].Id, 'newHouse'));
                dispatch(getHouseList(houseData[0].Id, 'twoHand'));
                dispatch(getHouseList(houseData[0].Id, 'rent'));
            };

            dispatch({
                type: actionTypes.GET_CUSTOMERAREA,
                areaData,
                houseData
            });
        }).catch((error) => {
            console.log(error);
        });
    }
}