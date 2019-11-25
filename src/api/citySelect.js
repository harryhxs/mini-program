import request from '@/utils/request'

export function getCitySelectList(params) {
  return request({
    url: '/area/list',
    method: 'get',
    params
  })
}
