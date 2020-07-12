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
    per_page: 10
  },
  list: [],
  currentItem: [],
  meta: {},
  dataSet: [],
  errorMessage: null
}

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case RECEIVE_GITHUB_USER:
      return {
        ...state,
        list: action.payload.list,
        meta: action.payload.meta
      }
    case RESET_LIST_GITHUB_USER:
      return {
        ...state,
        list: [],
        meta: {},
        dataSet: []
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
