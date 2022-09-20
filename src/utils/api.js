/*
 * @Author: dary
 * @Date: 2021-01-28 17:16:06
 * @LastEditors: Dary
 * @LastEditTime: 2022-03-15 11:55:22
 * @Description: file content
 */
import axios from 'axios'

var Apis = {
  test(date) {
    return axios.get(`/api/${date}.log`, {})
  },  
  getCatImg(code) {
    return axios.post(`/apix/cat/${code}`, {})
  },
  test1(code) {
    return axios.post(`/apix/list`, {})
  }
}

export default Apis;