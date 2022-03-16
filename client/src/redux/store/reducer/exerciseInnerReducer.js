/*eslint-disable*/
import { exercisesConst,deleteCollection,insertCollection,updateCollection,viewCollection, CurrentUser, CurrentPrice, CurrentPlan, Exerciseplan } from "../constant/exerciseInnerConst";
const initialState = {
    reset:1,
    insert:[],
    update:[],
    delete:[],
    view:[],
    crruser:[],
    crrprlan:'',
    crrpayinfo:[],
    plan:''
}
const ExercisesReducer = (state=initialState,{type,payload})=>{
    switch (type) {
        case exercisesConst.RESET_DAY:
            return {...state,reset:payload}
        case deleteCollection.DELETE_COLLECTION:
            return {...state,delete:payload}
        case insertCollection.INSERT_COLLECTION:
            return {...state,insert:payload}
        case updateCollection.UPDATE_COLLECTION:
            return {...state,update:payload}
        case viewCollection.VIEW_COLLECTION:
            return {...state,view:payload}
        case CurrentUser.CURRENT_USER:
            return {...state,crruser:payload}
        case CurrentPlan.CURRENT_PLAN:
            return {...state,crrprlan:payload}
        case CurrentPrice.CURRENT_PRICE:
            return {...state,crrpayinfo:payload}
        case Exerciseplan.EXERCISEPLAN:
            return {...state,plan:payload}
        default:
            return state            
    }
}
export default ExercisesReducer