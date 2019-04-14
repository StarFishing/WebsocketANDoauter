import * as types from './mutation-types'
export const setUser = function ({ commit, state }, userName) {
  commit(types.SET_USER, userName)
}
export const setToken = function ({ commit, state }, tokrn) {
  commit(types.SET_TOKEN, tokrn)
}
