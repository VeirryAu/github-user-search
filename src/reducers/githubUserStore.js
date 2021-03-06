import {
  RECEIVE_GITHUB_USER,
  RESET_LIST_GITHUB_USER,
  UPDATE_STATE_GITHUB_USER,
  FAILED_GITHUB_USER
} from 'actions/types'

const initialState = {
  loading: false,
  filter: {
    page: 1,
    per_page: 20
  },
  reachMax: false,
  list: [],
  errorMessage: null
}

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case RECEIVE_GITHUB_USER: {
      return {
        ...state,
        loading: false,
        list: action.payload.filter.page === 1 ? Array.from(action.payload.list) : [...state.list, ...action.payload.list]
      }
    }
    case RESET_LIST_GITHUB_USER:
      return {
        ...state,
        reachMax: false,
        filter: {
          ...state.filter,
          page: 1
        },
        list: []
      }
    case UPDATE_STATE_GITHUB_USER:
      return { ...state, ...action.payload }
    case FAILED_GITHUB_USER:
      return {
        ...state,
        errorMessage: action.payload.error,
        loading: false
      }
    default:
      return state
  }
}
