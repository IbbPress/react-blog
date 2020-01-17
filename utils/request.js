import axios from "axios";

// 创建 axios 实例
const service = axios.create({
  baseURL: "http://127.0.0.1:7002",
  // timeout: 20000 // 请求超时时间
});

// 服务端响应失败处理函数
const errHandle = error => {
  return Promise.reject(error);
};

// request 拦截器
service.interceptors.request.use(config => {
  console.log('config: ', config);
  return config;
}, errHandle);

// response 拦截器
service.interceptors.response.use(response => {
  // console.log('response.data: ', response.data);
  return response.data;
}, errHandle);

function trimPayload (payload={}) {
  Object.keys(payload).forEach(key => {
    const value = payload[key];
    if ( Object.prototype.toString.call(value) === '[object String]') {
      if (key === 'description') {
        // 描述字段跳过不处理
      } else if (value === '' || value === undefined) {
        delete payload[key]
      }
    }
    if ( Object.prototype.toString.call(value) === '[object Object]') {
      trimPayload (value)
    }
  })
  return payload;
}

/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} payload [请求时携带的参数]
 */
export function GET(url, payload) {
  return service.get(url, {
    params: trimPayload(payload)
  });
}
/**
 * post方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} payload [请求时携带的参数]
 */
export function POST(url, payload) {
  return service.post(url, trimPayload(payload));
}
/**
 * delete方法，对应delete请求
 * @param {String} url [请求的url地址]
 * @param {Object} payload [请求时携带的参数]
 */
export function DELETE(url, payload) {
  return service.delete(url, {
    data: trimPayload(payload)
  });
}
