import * as actionTypes from './actionTypes';
import axios from 'axios';

export const getNewsCategory = () => {
    return (dispatch) => {
        axios.post('http://api.dqzfdc.com/Api/PCNewsCategory/PList', {
            page: 1,
            perpage: 20,
            Status: 1,
            sort_name: "Id",
            sort_desc: "Asc",
            FirstId: 0
        }).then(res => {
            // console.log(res.data);
            dispatch({
                type: actionTypes.GET_NEWS_CATEGORY,
                data: res.data.data.list
            })
        }).catch(error => {
            console.log(error);
        })
    }
}


export const getNewsList = (category, page, value) => {
    console.log("分类：" + category + "页码：" + page + "关键字：" + value);
    return (dispatch) => {
        const formData = {
            page: page,
            perpage: 5,
            sort_name: "Sorts",
            sort_desc: "Desc",
            Status: 1,
            FirstId: 0,
            Category: category === "0" ? '' : parseInt(category),
            TheTitle: value,
        }
        axios.post('http://api.dqzfdc.com/Api/PCNews/PList', formData).then((res) => {
            console.log(res.data);

            dispatch({
                type: actionTypes.GET_NEWS_LIST,
                data: res.data.data.list,
                total_count: res.data.data.total_count
            })
        }).catch((error) => {
            console.log(error);
        })
    }
}