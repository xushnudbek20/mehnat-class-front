// import { loginKadrlar, login, store, getInfo, logout } from '@/api/user'
import { setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'
import axios from "axios";

axios.defaults.baseURL = 'http://manage.mehnat.test/api/v1/'
export const actions = {
  // user login
  login({ commit }, credientials) {
    return new Promise((resolve, reject) => {
      axios.post('/login', credientials)
        .then(res => {
          const result = res.data
          commit('SET_USER_TOKEN', result.access_token)
          commit('SET_IS_AUTH', true)
          // commit('SET_USER', result.user)
          // commit('SET_USER_ROLE', result.role[0])
          setToken(result.access_token)
          resolve()
        }).catch(err => {
          reject(err)
        })
    }) 
  },
  // user logout
  logout({ commit }) {
    return new Promise((resolve, reject) => {
      axios.get('logout')
        .then(res => {
          commit('SET_USER_TOKEN', '')
          commit('SET_IS_AUTH', false)
          removeToken()
          resetRouter()
          resolve(res)
        }).catch(err => {
          reject(err)
        })
    })
  },
  getInfo({ commit }) {
    return new Promise((resolve, reject) => {
      axios.post('/auth/get-info')
        .then(res => {
          debugger
          if (res.success === true) {
            commit('SET_USER', res.result.user)
            commit('SET_IS_AUTH', true)
            commit('SET_USER_ROLE', res.result.roles[0])
            resolve(res)
          } else {
            reject(res)
          }
        })
        .catch(err => {
          reject(err)
        })
    })
  }
}
