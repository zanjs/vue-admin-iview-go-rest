import fetch from './fetch.js'

// // 登录
// export function login (data) {
//   return fetch({
//     url: `''`,
//     method: 'post',
//     data
//   })
// }

const Login = data => {
  return fetch({
    url: `/v1/login`,
    method: 'POST',
    data
  })
}
// // 登出
// export function logout () {
//   return fetch({
//     url: '',
//     method: 'post'
//   })
// }

const recordExcelList = params => {
  return fetch({
    url: `/v1/records/excel`,
    method: 'get',
    params
  })
}

const recordList = params => {
  return fetch({
    url: `/v1/records?limit=${params.limit}&offset=${params.offset}`,
    method: 'get',
    params: ''
  })
}

const productList = params => {
  return fetch({
    url: `/v1/products?category=${params.category}&limit=${params.limit}&page=${params.page}`,
    method: 'get',
    params: ''
  })
}

const wareroomList = params => {
  return fetch({
    url: `/v1/warerooms?category=${params.category}&limit=${params.limit}&page=${params.page}`,
    method: 'get',
    params: ''
  })
}

const productCreate = params => {
  return fetch({
    url: `/v1/products`,
    method: 'POST',
    params: params
  })
}

const productUpdate = params => {
  return fetch({
    url: `/v1/products/${params.id}`,
    method: 'PUT',
    params: params
  })
}

const wareroomCreate = params => {
  return fetch({
    url: `/v1/warerooms`,
    method: 'POST',
    params: params
  })
}

const wareroomUpdate = params => {
  return fetch({
    url: `/v1/warerooms/${params.id}`,
    method: 'PUT',
    params: params
  })
}

const productDelete = params => {
  return fetch({
    url: `/v1/products/${params.id}`,
    method: 'DELETE',
    params: ''
  })
}

const wareroomDelete = params => {
  return fetch({
    url: `/v1/warerooms/${params.id}`,
    method: 'DELETE',
    params: ''
  })
}

const orderList = params => {
  return fetch({
    url: `/api/data/${params.category}/${params.limit}/${params.page}`,
    method: 'get',
    params: ''
  })
}

const articleList = params => {
  return fetch({
    url: `/api/search/query/listview/category/Android/count/${params.limit}/page/${params.page}`,
    method: 'get',
    params: ''
  })
}

const userList = params => {
  return fetch({
    url: '/api/person/getPersonListByCompany',
    method: 'get',
    params: params
  })
}

/**
 * 提交用户注册信息
 * @param params
 */
const postUserInfo = params => {
  return fetch({
    url: '',
    method: 'post',
    data: params
  })
}

/**
 * 验证邮箱 token是否过期
 * @param params
 */
const checkToken = params => {
  return fetch({
    url: '',
    method: 'get',
    params: params
  })
}
const apiList = {
  Login,
  recordList,
  recordExcelList,
  productUpdate,
  productList,
  wareroomList,
  productCreate,
  wareroomCreate,
  wareroomUpdate,
  productDelete,
  wareroomDelete,
  orderList,
  articleList,
  userList,
  postUserInfo,
  checkToken
}

export default apiList
