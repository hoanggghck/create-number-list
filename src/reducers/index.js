const InitialState = {
    list: []
}

const rootReducer = (state = InitialState,action) => {
    switch(action.type){
        case "SAVE_LIST":
            return {
                ...state,
                list: action.list
            }
            default:break;
    } 
    return state;
}
export default rootReducer;