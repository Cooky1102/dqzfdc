import * as actionTypes from './actionTypes';
import axios from 'axios';



export const getNews = () => {
    return (dispatch) => {
        axios.post('http://api.dqzfdc.com/Api/PCNews/PList', {
            page: 1,
            perpage: 8,
            sort_name: "Sorts",
            sort_desc: "Desc",
            Status: 1,
            FirstId: 0
        }).then(res => {
            console.log(res.data.data);
            const list = []
            for (let i = 0; i < res.data.data.list.length; i++) {
                list.push({
                    id: res.data.data.list[i].Id,
                    title: res.data.data.list[i].TheTitle
                });
            }
            console.log(list);
            
            dispatch({
                type: actionTypes.GET_NEWS,
                list
            })
        })
    }
}


export const getHouseList = (page, value) => {
    return (dispatch) => {
        const formData = {
            page,
            perpage: 10,
            Name: value,
            sort_name: "OrderId",
            sort_desc: "Desc",
            Status: 1,
        }
        axios.post('http://api.dqzfdc.com/Api/BuildInfo/PList', formData).then((res) => {
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