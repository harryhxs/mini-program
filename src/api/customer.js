import request from '@/utils/request'

export function getCustomerInfo(token) {
  return request({
    url: '/customer/getCustomerInfo',
    method: 'get'
  })
}

export function creatTask(data) {
  return request({
    url: '/landInspect/createLandInspect',
    method: 'post',
    data
  })
}

export function getUserList(data) {
  return request({
    url: '/user/userList',
    method: 'post',
    data
  })
}
