/**
 * Created by yanji on 2018/7/30.
 * http通用工具函数
 */
import axios from 'axios';
import Cookie from 'js-cookie';
import { Message } from 'element-ui'

const usrLogin=()=>{
  console.log('1111111')
}

/**
 * 公用get请求
 * @param url       接口地址
 * @param msg       接口异常提示
 * @param headers   接口所需header配置
 */
// 设置超时时间 10s

axios.defaults.timeout = 10000;
//添加请求拦截器
axios.interceptors.request.use(config => {
    const token = Cookie.get('token')
    if ( token != null ) {
      config.headers.token = token;
    }
    //在发送请求之前做某事，比如说 设置loading动画显示
    //config.headers.token = '111'
    return config
  }, error => {
    //请求错误时做些事
    return Promise.reject(error)
  })
  
  //添加响应拦截器
//添加响应拦截器
axios.interceptors.response.use(response => {
  let data = response.data
    switch (data.code) {// 根据返回的code值来做不同的处理（和后端约定）
      case 200:
        // 这一步保证数据返回，如果没有return则会走接下来的代码，不是未登录就是报错
        return response
      case 400:
        return response
      default:
    }
    // 若不是正确的返回code，且已经登录，就抛出错误
    let err = {};
    err.data = data
    err.url = response.config.url
    err.response = response
    throw err
  }, (err) => { // 这里是返回状态码不为200时候的错误处理
    err.data = err.response.data;
    err.url = err.config.url;
    err.response = response
    if (err && err.response) {
      switch (err.response.status) {
        case 401:
          err.message = err.data.msg||'接口异常'
        break
        case 403:
          err.message = '当前账号访问异常,请重新登录'
          break
        case 404:
          window.location.replace ('/404')
          err.message = `请求地址出错`
          break
        case 408:
          err.message = '请求超时'
          break
        case 410:
          err.message = err.data.msg||'确定即立即刷新'
          break
        case 500:
          //window.location.replace ('/500')
          err.message = '服务器内部错误'
          break
        case 501:
          err.message = '服务未实现'
          break
        case 502:
          err.message = '网关错误'
          break
        case 503:
          window.location.replace ('/503')
          err.message = '服务不可用'
          break
        case 504:
          err.message = '网关超时'
          break
        case 505:
          err.message = 'HTTP版本不受支持'
          break
        default:
      }
    }
    return Promise.reject(err)
})
export const get = ({url, data, msg = '接口异常', headers,time}) =>
    axios.get(url,{params:data}, headers).then(res => response(res)).catch(err => {
      if(err.data.code === 406){
          usrLogin()
          return;
        }
        errHandle(err, msg)
        return Promise.reject(err)
    });

/**
 * 公用post请求
 * @param url       接口地址
 * @param data      接口参数
 * @param msg       接口异常提示
 * @param headers   接口所需header配置
 */
export const post = ({url, data, msg = '接口异常', headers}) =>
  axios.post(url, data, headers).then(res => response(res)).catch(err => {
    if(err.data.code === 406){
        usrLogin()
        return;
    }
    errHandle(err, msg)
    return Promise.reject(err)
  });

    

/**
 * 公用状态码操作
 * @param res     请求结果
 */

const response = (res => {
    const result = res.data;
    return result;
})

const errHandle = (err,msg) =>{
  // 第一种情况：处理返回回来的code
  switch (err.data&&err.data.code) {
    case 401:
      err.message = err.data.msg||'接口异常'
    break
    case 403:
      err.message = '当前账号访问异常,请重新登录'
      break
    case 404:
      window.location.replace ('/404')
      err.message = err.data.msg||`请求地址出错`
      break
    case 407:
      err.message = err.data.msg||`不显示toast`
      break
    case 408:
      err.message = err.data.msg||'请求超时'
      break
    case 409:
      err.message = err.data.msg||'确定即取消'
      break
    case 410:
      err.message = err.data.msg||'确定即立即刷新'
      break
    case 500:
      //window.location.replace ('/500')
      err.message = err.data.msg||'服务器内部错误'
      break
    case 501:
      err.message = err.data.msg||'服务未实现'
      break
    case 502:
      err.message = err.data.msg||'网关错误'
      break
    case 503:
      window.location.replace ('/503')
      err.message = err.data.msg||'服务不可用'
      break
    case 504:
      err.message = err.data.msg||'网关超时'
      break
    case 505:
      err.message = err.data.msg||'HTTP版本不受支持'
      break
    default:
  }

  // 第二种情况：当没有返回code的时候，处理 err.message
  if(err.message){
    let $1 = RegExp.$1;
    let statusCode = err.message.match(/\d+/,$1);
    switch (err.data && statusCode && statusCode[0]){
      case "500":
        //window.location.replace ('/500')
        err.message = err.data.msg||'服务器内部错误'
        break
      case "503":
        window.location.replace ('/503')
        err.message = err.data.msg||'服务暂不可用，请稍后再试！'
        break
      default:
    }
  }
  Message({
    showClose: true,
    message: err.message||msg,
    type: 'error'
  });
}