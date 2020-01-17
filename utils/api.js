import { GET, POST } from './request.js';

// 文章列表
export const getPostList = (payload) => GET('/getArticleList/', payload)

// 文章详情
export const getPost     = id => GET('/getArticle/' + id)

// 文章类型
export const getTypeInfo = () => GET('/getTypeInfo')

