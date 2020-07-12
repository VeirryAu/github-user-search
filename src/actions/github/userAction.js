import {
  queryUser
} from 'services/github/userService'
import {
  RECEIVE_GITHUB_USER,
  RESET_LIST_GITHUB_USER,
  UPDATE_STATE_GITHUB_USER,
  FAILED_GITHUB_USER
} from '../types'

const receive = (list, filter) => {
  return {
    type: RECEIVE_GITHUB_USER,
    payload: {
      list,
      filter
    }
  }
}

const failed = (error) => {
  return {
    type: FAILED_GITHUB_USER,
    payload: {
      error: typeof error === 'object' ? error.message : error
    }
  }
}

const updateState = (payload) => {
  return {
    type: UPDATE_STATE_GITHUB_USER,
    payload
  }
}

const clearList = () => {
  return {
    type: RESET_LIST_GITHUB_USER
  }
}

const get = params => async (dispatch, getState) => {
  const { filter } = getState().githubUserStore

  dispatch(updateState({
    loading: true
  }))

  try {
    const response = await queryUser({
      ...filter,
      ...params
    })
    dispatch(receive(response.items, {
      ...filter,
      ...params
    }))
  } catch (error) {
    failed(error)
  }
}

const resetList = () => async (dispatch) => {
  dispatch(clearList())
}

const changeFilter = (params) => async (dispatch, getState) => {
  const { filter } = getState().githubUserStore
  dispatch(updateState({
    filter: {
      ...filter,
      ...params
    }
  }))
  dispatch(get({
    ...filter,
    ...params
  }))
}

export {
  get,
  resetList,
  changeFilter
}
