/*
 * @Author: dary
 * @Date: 2021-01-28 17:16:06
 * @LastEditors: dary
 * @LastEditTime: 2021-04-12 16:07:10
 * @Description: file content
 */
import axios from 'axios'

var Apis = {
  test(date) {
    return axios.get(`/api/${date}.log`, {})
  },  
  test1() {
    return axios.post('https://www.onenote.com/api/v1.0/me/notes/pages', {})
  }
}

export default Apis;