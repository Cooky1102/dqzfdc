import * as actionTypes from './actionTypes';
import { fromJS } from 'immutable';

const defaultState = fromJS({
    houseList: [],
    total_count: 0,
    newsList: []
})

export default (state = defaultState, action) => {
    switch (action.type) {
        case actionTypes.GET_NEWS:
            return state.set('newsList', fromJS(action.list))
        case actionTypes.GET_HOUSELIST:
            return state.merge({
                houseList: fromJS(action.data),
                total_count: fromJS(action.total_count)
            })
        default:
            return state
    }
}