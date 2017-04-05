import vue from 'vue'
import axios from 'axios'
import Promise from 'bluebird'

Promise.config({
  longStackTraces: true,
  warnings: true // note, run node with --trace-warnings to see full stack traces for warnings
})

const instance = axios.create({
  baseURL: 'http://www.wx2share.com'
})
// import services from '../../../services/services'

const _get = ({url, query}, commit) => {
  if (commit) commit('START_LOADING')
  let _url
  if (query) {
    _url = `http://www.wx2share.com${url}?${query}`
  } else {
    _url = `http://www.wx2share.com${url}`
  }

  return vue.http.get(_url)
    .then((res) => {
      if (commit) commit('FINISH_LOADING')
      if (res.status >= 200 && res.status < 300) {
        return res.data
      }
      return Promise.reject(new Error(res.status))
    })
}

export const fetchCategoryList = ({commit}) => {
  const url = `/Api/tbk/cates`
  return _get({url}, commit)
    .then((json) => {
      if (json.success) {
        return commit('FETCH_CATEGORY_LIST_SUCCESS', json.cates)
      }
      return Promise.reject(new Error(json.message))
    })
    .catch((error) => {
      return Promise.reject(error)
    })
}

/**
export const fetchItemList = ({commit}, data) => {
  const url = '/Api/tbk/items'
  let param = JSON.stringify(data)
  const query = `param=${param}`
  return _get({url, query}, commit)
      .then((json) => {
        if (json.success) {
          return commit('FETCH_ITEM_LIST_SUCCESS', json.items)
        }
        return Promise.reject(new Error(json.message))
      })
      .catch((error) => {
        return Promise.reject(error)
      })
}**/
export const fetchItemList = ({commit}, data) => {
  // let param = data;
  // console.log(data)
  if (commit) commit('START_LOADING')
  return instance.get('/Api/tbk/items', {
    params: {
      param: JSON.stringify(data)
    }
  }).then((response) => {
    console.log(response)
    if (commit) commit('FINISH_LOADING')
    let json = response.data
    if (json.success) {
      return commit('FETCH_ITEM_LIST_SUCCESS', json.items)
    }
    return Promise.reject(new Error(json.message))
  }).catch((error) => {
    return Promise.reject(error)
  })
}

export const fetchItemById = ({commit}, id) => {
  if (commit) commit('START_LOADING')
  return instance.get('/Api/tbk/item', {
    params: {
      id: id
    }
  }).then((response) => {
    if (commit) commit('FINISH_LOADING')
    let json = response.data
    if (json.success) {
      return commit('FETCH_ITEM_SUCCESS', json.items) // todo: 要把items 重命名为 item 避免命名重复生在歧义
    }
    return Promise.reject(new Error(json.message))
  }).catch((error) => {
    return Promise.reject(error)
  })
}
export const clearItem = ({commit}) => {
  commit('CLEAR_ITEM')
}
/**
export const getGyItemList = ({commit}, xls) => {
  return services.getGyItemList(xls)
      .then((data) => {
        return commit('GET_HOT_ITEM_LIST_SUCCESS', data)
      })
      .catch((error) => {
        return Promise.reject(error)
      })
}
**/
