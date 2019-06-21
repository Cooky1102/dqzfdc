import * as actionTypes from './actionTypes';
import axios from 'axios';

export const getHouseList = (page, value) => {
    return (dispatch) => {
        const formData = {
            page,
            perpage: 10,
            TheTitle: value,
            sort_name: "OrderNum",
            sort_desc: "Desc",
            Status: 1,
        }
        axios.post('http://api.dqzfdc.com/Api/TheSecondary/PList', formData).then((res) => {
            dispatch({
                type: actionTypes.GET_HOUSELIST,
                data: res.data.data.list,
                total_count: res.data.data.total_count
            })
        }).catch((error) => {
            console.log(error);
        })
    }
}