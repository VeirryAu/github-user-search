import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'


import githubUserStore from './githubUserStore'

export default combineReducers({
  form: formReducer,
  githubUserStore
})
