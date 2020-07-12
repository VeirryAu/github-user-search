import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm, getFormValues } from 'redux-form'
import {
  StyleSheet
} from 'react-native'
import {
  View
} from 'native-base'
import Input from 'components/Form/Input'
import {
  resetList,
  changeFilter
} from 'actions/github/userAction'

import validate from './validate'

const styles = StyleSheet.create({
  inputContainer: {
    width: '100%'
  }
})

class Form extends Component {
  searchSubmit = async (search) => {
    const { dispatch } = this.props
    if (search) {
      await dispatch(resetList())
      await dispatch(changeFilter({ ...search, page: 1 }))
    } else {
      await dispatch(resetList())
      await dispatch(changeFilter({ q: '', page: 1 }))
    }
  }

  render () {
    const {
      loading,
      handleSubmit
    } = this.props

    return (
      <View style={styles.inputContainer}>
        <Field
          name="q"
          placeholder="Search Github users"
          maxLength={255}
          component={Input}
          iconName={loading ? 'spinner' : 'search'}
          autoFocus
          keyboardType="default"
          onSubmitEditing={handleSubmit(this.searchSubmit)}
        />
      </View>
    )
  }
}

const mapStateToProps = (state) => ({
  values: getFormValues('SearchForm')(state),
  loading: state.githubUserStore.loading,
  currentItem: state.githubUserStore.currentItem,
  errorMessage: state.githubUserStore.errorMessage
})

export default reduxForm({
  form: 'SearchForm',
  validate
})(connect(mapStateToProps)(Form))
