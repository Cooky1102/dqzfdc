import * as actionTypes from './actionTypes';
import { fromJS } from 'immutable';

const defaultState = fromJS({
    customeArea: [],
    newHouse: [],
    twoHand: [],
    rent: [],
    ad: [{
        url: 'http://static.dqzfdc.com/2019516151054207675215394.jpg'
    }, {
        url: 'http://static.dqzfdc.com/2019516151054129879953955.gif'
    }, {
        url: 'http://static.dqzfdc.com/201943096278516503742.png'
    }]
});

export default (state = defaultState, action) => {
    switch (action.type) {
        case actionTypes.GET_RENT:
            const copy_rent = state.get('rent').toJS();
            copy_rent.map((item, index) => {
                return parseInt(item.Id) === parseInt(action.id) && item.data.length === 0 ? copy_rent[index].data.push(...action.data) : false
            });
            return state.set('rent', fromJS(copy_rent));
        case actionTypes.GET_TWOHAND:
            const copy_twoHand = state.get('twoHand').toJS();
            copy_twoHand.map((item, index) => {
                return parseInt(item.Id) === parseInt(action.id) && item.data.length === 0 ? copy_twoHand[index].data.push(...action.data) : false
            });
            return state.set('twoHand', fromJS(copy_twoHand));
        case actionTypes.GET_NEWHOUSE:
            const copy_newHouse = state.get('newHouse').toJS();
            copy_newHouse.map((item, index) => {
                return parseInt(item.Id) === parseInt(action.id) && item.data.length === 0 ? copy_newHouse[index].data.push(...action.data) : false
            });
            return state.set('newHouse', fromJS(copy_newHouse));
        case actionTypes.GET_CUSTOMERAREA:
            return state.merge({
                'customeArea': fromJS(action.areaData),
                'newHouse': fromJS(action.houseData),
                'twoHand': fromJS(action.houseData),
                'rent': fromJS(action.houseData),
            });
        default:
            return state;
    }
}