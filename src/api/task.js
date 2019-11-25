import request from '@/utils/request'

export function getTaskList(data) {
  return request({
    url: '/landInspect/fuzzyQueryLandInspectList',
    method: 'post',
    data
  })
}
