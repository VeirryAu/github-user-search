import pagination from 'utils/pagination'
import {
  queryUser
} from 'services/github/userService'
import {
  RECEIVE_GITHUB_USER,
  RESET_LIST_GITHUB_USER,
  UPDATE_STATE_GITHUB_USER,
  FAILED_GITHUB_USER
} from '../types'

const receive = (list, meta = {}) => {
  return {
    type: RECEIVE_GITHUB_USER,
    payload: {
      list,
      meta
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
  const { ...other } = params
  const dataset = await pagination({
    pageSize: filter.page,
    fetch: () => dispatch(updateState({
      loading: true
    })),
    receive: (data) => {
      dispatch(receive(data))
    },
    success: () => {
      dispatch(updateState({
        loading: false
      }))
    },
    failed: ({ message }) => dispatch(failed(message)),
    api: pageOffset => queryUser({
      ...filter,
      ...other,
      page: pageOffset + 1
    })
  })

  dataset.setReadOffset(0)

  dispatch(updateState({
    dataSet: dataset
  }))
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
