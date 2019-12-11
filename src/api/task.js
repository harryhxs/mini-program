import request from '@/utils/request';
import axios from 'axios';
import { getToken } from '@/utils/auth';
// 获取巡检任务list
export function getTaskList(data) {
  return request({
    url: '/landInspect/fuzzyQueryLandInspectList',
    method: 'post',
    data
  })
}
// 创建巡检任务
export function creatTask(data) {
  return request({
    url: '/landInspect/createLandInspect',
    method: 'post',
    data
  })
}

// 获取巡检任务详情
export function getTaskDetails(data) {
  return request({
    url: '/landInspect/getInspectDomainObjectDetailByInspectId',
    method: 'post',
    params: data
  })
}
// 更新巡检任务信息
export function updateLandInspect(data) {
  return request({
    url: '/landInspect/updateLandInspect',
    method: 'post',
    data
  })
}
// 更新巡检任务巡检点信息
export function updateLandInspectPointInfo(data) {
  return request({
    url: '/landInspect/updateLandInspectPointInfo',
    method: 'post',
    params: data
  })
}
// 记录巡检任务巡检点信息
export function createLandInspectPoint(data) {
  return request({
    url: '/landInspect/createLandInspectPoint',
    method: 'post',
    data
  })
}
// 创建自由巡检任务及巡检点信息
export function createLandInspectAndPoint(data) {
  return request({
    url: '/landInspect/createLandInspectAndPoint',
    method: 'post',
    params: data
  })
}

// 巡检点详情
export function getPointDomainObjectDetailByPointId(data) {
  return request({
    url: '/landInspect/getPointDomainObjectDetailByPointId',
    method: 'post',
    params: data
  })
}
// 巡检点列表
export function listLandInspectPointByInspectId(data) {
  return request({
    url: '/landInspect/listLandInspectPointByInspectId',
    method: 'post',
    data
  })
}
// 案件列表
export function getLandCaseList(data) {
  return request({
    url: '/landCase/listLandCase',
    method: 'post',
    data
  })
}
// 案件详情
export function getLandCaseDetails(data) {
  return request({
    url: '/landCase/getLandCaseDetailByLandCaseId',
    method: 'post',
    params: data
  })
}
// 新增案件
export function addLandCase(data) {
  return request({
    url: '/landCase/createLandCase',
    method: 'post',
    params: data
  })
}

// 统计巡检员巡检任务情况
export function checkStatisticsReport(data) {
  return request({
    url: '/land/statistics',
    method: 'post',
    data
  })
}
// 导出案件
export function fileDownload(data, fileName) {
  return new Promise((resolve, reject) => {
    const token = getToken()
    const baseURL = process.env.VUE_APP_BASE_API
    let config = {
      headers: {
        Authorization: token
      },
      responseType: 'blob'
    }
    axios
      .post(baseURL + '/landCase/exportLandCase', data, config)
      .then(res => {
        if (!res) return
        if ('msSaveOrOpenBlob' in navigator) {
          window.navigator.msSaveOrOpenBlob(res.data, fileName)
          return;
        }
        let url = window.URL.createObjectURL(res.data)
        let aLink = document.createElement('a')
        aLink.style.display = 'none';
        aLink.href = url
        aLink.setAttribute('download', fileName)
        document.body.appendChild(aLink)
        aLink.click()
        document.body.removeChild(aLink)
        window.URL.revokeObjectURL(url)
        resolve('false')
      })
      .catch(function() {
        resolve('false')
      })
  })
}
