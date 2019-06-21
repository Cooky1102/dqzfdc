import * as actionTypes from './actionTypes';
import { fromJS } from 'immutable';

const defaultState = fromJS({
    categoryList: [],
    newsList: [],
    total_count: 0,
    loading: false
})

export default (state = defaultState, action) => {
    switch (action.type) {
        case actionTypes.CHANGE_LOADING:
            return state.set("loading", true)
        case actionTypes.GET_NEWS_CATEGORY:
            return state.set("categoryList", fromJS(action.data))
        case actionTypes.GET_NEWS_LIST:
            return state.merge({
                newsList: fromJS(action.data),
                total_count: fromJS(action.total_count),
                loading: false
            })
        default:
            return state
    }
}