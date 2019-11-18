import request from '@/utils/request'

export function getTaskList(data) {
  return request({
    url: '/user/login',
    method: 'post',
    data
  })
}
