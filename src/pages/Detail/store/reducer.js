import * as actionTypes from './actionTypes';
import { fromJS } from "immutable";

const defaultState = fromJS({
    detail: {
        ImgList: [],
        HouseUseType: []
    }
});

export default (state = defaultState, action) => {
    switch (action.type) {
        case actionTypes.GET_DETAIL:
            return state.set("detail",fromJS(action.detail))
        default:
            return state;
    }
}