import React, { Component } from 'react'
import { connect } from 'react-redux'
import { FlatList } from 'react-native'
import EmptyState from 'components/EmptyState'
import {
  changeFilter,
  resetList
} from 'actions/github/userAction'
import { View } from 'native-base'
import SearchItem from './SearchItem'

class ListContent extends Component {
  _refresh = async () => {
    const { dispatch } = this.props
    await dispatch(resetList())
    await dispatch(changeFilter({
      page: 1
    }))
  }

  _handleLoadMore = () => {
    const { filter, dispatch } = this.props
    dispatch(changeFilter({
      page: filter.page + 1
    }))
  }

  render () {
    const {
      list,
      filter,
      loading
    } = this.props

    return (
      <View>
        {list && !list.loading && list.length === 0 ? (
          <EmptyState title="Search User" />
        ) : null}
        {list && list.length > 0 && (
          <FlatList
            data={list}
            renderItem={({ item }) => (
              <SearchItem
                item={item}
              />
            )}
            keyExtractor={item => `${item.id}`}
            // ListHeaderComponent={this._renderHeader}
            onRefresh={this._refresh}
            refreshing={loading}
            onEndReached={this._handleLoadMore}
            onEndReachedThreshold={0.5}
            initialNumToRender={filter.per_page}
          />
        )}
      </View>
    )
  }
}

const mapStateToProps = state => ({
  loading: state.githubUserStore.loading,
  filter: state.githubUserStore.filter,
  list: state.githubUserStore.list,
  errorMessage: state.githubUserStore.errorMessage
})

export default connect(mapStateToProps)(ListContent)
