import HttpRequest from '@/axios/api.request'

const URL_PREFIX = 'consumer/index/'
export const IndexGoodsQryAction = () => {
  return HttpRequest.request({
    url: URL_PREFIX + 'getGoods',
    method: 'post'
  })
}

export const UserAddAction = (parameter) => {
  return HttpRequest.request({
    url: 'user/',
    method: 'post',
    params: parameter
  })
}

export const UserUpdateAction = (parameter) => {
  return HttpRequest.request({
    url: 'user/',
    method: 'put',
    params: parameter
  })
}

export const UserDelAction = (parameter) => {
  return HttpRequest.request({
    url: 'user/',
    method: 'delete',
    params: {
      no: parameter
    }
  })
}
