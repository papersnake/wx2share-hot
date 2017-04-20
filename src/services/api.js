import axios from 'axios'
import Promise from 'bluebird'

Promise.config({
  longStackTraces: true,
  warnings: true // note, run node with --trace-warnings to see full stack traces for warnings
})

const instance = axios.create({
  baseURL: 'http://www.wx2share.com'
})

class Api {
  static fetchItemList (data) {
    return Promise.resolve(instance.get('/Api/tbk/items', {
      params: {
        param: JSON.stringify(data)
      }
    }))
  }

  static fetchItemById (id) {
    return Promise.resolve(instance.get('/Api/tbk/item', {
      params: {
        id: id
      }
    }))
  }

  static fetchCategoryList () {
    return Promise.resolve(instance.get('/Api/tbk/cates'))
  }

  static createTpwd (data) {
    console.log(data)
    return Promise.resolve(instance.get('/Api/tpwd/tpwdcreate', {
      params: {
        param: JSON.stringify(data)
      }
    }))
  }

  static getPromo () {
    return Promise.resolve(instance.get('/Api/tpwd/promo'))
  }
}

export default Api
