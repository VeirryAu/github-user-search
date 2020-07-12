import request from 'utils/request'

export const queryUser = (data) => {
  return request({
    url: '/search/users',
    data,
    method: 'get'
  })
}
