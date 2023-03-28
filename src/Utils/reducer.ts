interface IState {
    loading : boolean
    error : boolean
}

interface IAction {
    type : "FETCH_START" | "FETCH_SUCCESS" | "FETCH_ERROR"
}

export const INITIAL_STATE : IState = {
    loading: false,
    error: false
}

export const reducerFunction = (state : IState, action : IAction) => {
    switch(action.type){
        case "FETCH_START":
            return {
                loading : true,
                error : false
            }
        case "FETCH_SUCCESS":
            return {
                ...state,
                loading : false,
            }
        case "FETCH_ERROR":{
            return {
                loading : false,
                error : true
            }
        }
        default:
            return state
    }
}