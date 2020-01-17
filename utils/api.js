import { GET, POST } from './request.js';

export const getPost = id => GET('/default/getArticle/' + id)
export const getPostList = () => GET('/default/getArticleList')