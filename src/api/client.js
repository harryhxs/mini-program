import request from '@/utils/request'

export function createClient(data) {
  return request({
    url: '/customer/createMember',
    method: 'post',
    data
  })
}

export function getClientList(data) {
  return request({
    url: '/customer/clientList',
    method: 'post',
    data
  })
}

export function updateEndTime(data) {
  return request({
    url: '/customer/updateEndTime',
    method: 'post',
    data
  })
}
