import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ScrollView, RefreshControl } from 'react-native'
import EmptyState from 'components/EmptyState'
import {
  changeFilter
} from 'actions/github/userAction'
import { List } from 'native-base'
import SearchItem from './SearchItem'

class ListContent extends Component {
  state = {
    refreshing: false
  }

  setCurrentReadOffset = (event) => {
    const { dataSet } = this.props
    let itemHeight = 300
    let currentOffset = Math.floor(event.nativeEvent.contentOffset.y)
    let currentItemIndex = Math.ceil(currentOffset / itemHeight)
    dataSet.setReadOffset(currentItemIndex)
  }

  _refresh = async () => {
    const { dispatch } = this.props
    await dispatch(changeFilter({
      page: 1
    }))
  }

  setCurrentReadOffset = (event) => {
    const { dataSet } = this.props
    let itemHeight = 70
    let currentOffset = Math.floor(event.nativeEvent.contentOffset.y)
    let currentItemIndex = Math.ceil(currentOffset / itemHeight)
    dataSet.setReadOffset(currentItemIndex)
  }

  render () {
    const {
      list
    } = this.props

    const { refreshing } = this.state

    return (
      <ScrollView
        scrollEventThrottle={300}
        onScroll={event => this.setCurrentReadOffset(event)}
        removeClippedSubviews
        refreshControl={(
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => this._refresh()}
          />
        )}
      >
        {
          list && list.length > 0 ? (
            list.map((record, index) => {
              if (!record.isSettled) {
                return
              }
              const item = record.content
              if (!item) return
              return (
                <List>
                  <SearchItem
                    key={index}
                    item={item}
                  />
                </List>
              )
            })
          ) : (<EmptyState title="Search User" />)
        }
      </ScrollView>
    )
  }
}

const mapStateToProps = state => ({
  loading: state.githubUserStore.loading,
  meta: state.githubUserStore.meta,
  list: state.githubUserStore.list,
  dataSet: state.githubUserStore.dataSet,
  errorMessage: state.githubUserStore.errorMessage
})

export default connect(mapStateToProps)(ListContent)
