import { combineReducers } from 'redux-immutable';
import { reducer as homeReducer } from '../pages/Home/store';
import { reducer as newHouseReducer } from '../pages/NewHouse/store';
import { reducer as twoHandReducer } from '../pages/TwoHand/store';
import { reducer as rentReducer } from '../pages/Rent/store';
import { reducer as detailReducer } from '../pages/Detail/store';
import { reducer as houseNewsReducer } from '../pages/HouseNews/store';


export default combineReducers({
    home: homeReducer,
    newHouse: newHouseReducer,
    twoHand: twoHandReducer,
    rent: rentReducer,
    detail: detailReducer,
    houseNews: houseNewsReducer
});