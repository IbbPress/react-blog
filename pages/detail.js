import React,{useState, useEffect} from 'react'
import Head from 'next/head'
import { Row, Col, Icon ,Breadcrumb, Affix } from 'antd'
import axios from 'axios'
import dayjs from 'dayjs'

// import ReactMarkdown from 'react-markdown'
import MarkNav from 'markdown-navbar';
import 'markdown-navbar/dist/navbar.css';

import marked from 'marked'
// import hljs from "highlight.";
import hljs from "highlight.js"

import 'highlight.js/styles/monokai-sublime.css';

import Header from '../components/Header'
import Author from '../components/Author'
import Footer from '../components/Footer'
import '../static/style/pages/detail.css'

let markdown='# P01:课程介绍和环境搭建\n' +
  '[ **M** ] arkdown + E [ **ditor** ] = **Mditor**  \n' +
  '> Mditor 是一个简洁、易于集成、方便扩展、期望舒服的编写 markdown 的编辑器，仅此而已... \n\n' +
   '**这是加粗的文字**\n\n' +
  '*这是倾斜的文字*`\n\n' +
  '***这是斜体加粗的文字***\n\n' +
  '~~这是加删除线的文字~~ \n\n'+
  '\`console.log(111)\` \n\n'+
  '# p02:来个Hello World 初始Vue3.0\n' +
  '> aaaaaaaaa\n' +
  '>> bbbbbbbbb\n' +
  '>>> cccccccccc\n'+
  '***\n\n\n' +
  '# p03:Vue3.0基础知识讲解\n' +
  '> aaaaaaaaa\n' +
  '>> bbbbbbbbb\n' +
  '>>> cccccccccc\n\n'+
  '# p04:Vue3.0基础知识讲解\n' +
  '> aaaaaaaaa\n' +
  '>> bbbbbbbbb\n' +
  '>>> cccccccccc\n\n'+
  '#5 p05:Vue3.0基础知识讲解\n' +
  '> aaaaaaaaa\n' +
  '>> bbbbbbbbb\n' +
  '>>> cccccccccc\n\n'+
  '# p06:Vue3.0基础知识讲解\n' +
  '> aaaaaaaaa\n' +
  '>> bbbbbbbbb\n' +
  '>>> cccccccccc\n\n'+
  '# p07:Vue3.0基础知识讲解\n' +
  '> aaaaaaaaa\n' +
  '>> bbbbbbbbb\n' +
  '>>> cccccccccc\n\n'+
  '``` var a=11; ```'

  const renderer = new marked.Renderer();

  marked.setOptions({
    renderer: renderer, 
    gfm: true,
    pedantic: false,
    sanitize: false,
    tables: true,
    breaks: false,
    smartLists: true,
    smartypants: false,
    highlight (code) {
      return hljs.highlightAuto(code).value;
    },
  }); 
  
      // let html = marked(props.article_content) 
      
const Detail = (props) =>{
  console.log('props: ', props.data);

  const [ post ] = useState(props.data)
  const [ html, setHtml ] = useState(props.data.content)
  const [ loading, setLoading ] = useState(false)

  const myFuction = async () => {
    let newhtml =await marked(post.content)
    setHtml(newhtml)
    setLoading(false)
  }
  useEffect( ()=>{
    setTimeout(()=>{
      myFuction()
    },100)
  },[])

  return (
    <div>
      <Head>
        <title>博客详细页</title>
      </Head>
  
      <Header />
  
        <Row className="comm-main" type="flex" justify="center">
          <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}  >
              <div>
                <div className="bread-div">
                  <Breadcrumb>
                    <Breadcrumb.Item><a href="/">首页</a></Breadcrumb.Item>
                    <Breadcrumb.Item>视频列表</Breadcrumb.Item>
                    <Breadcrumb.Item>{post.title}</Breadcrumb.Item>
                  </Breadcrumb>
                </div>
  
                <div>
                  <div className="detailed-title">
                    {post.title}
                  </div>
                  <div className="list-icon center">
                    <span><Icon type="calendar" />{ dayjs.unix(post.add_time).format('YYYY-MM-DD') }</span>
                    <span><Icon type="folder" /> 视频教程</span>
                    <span><Icon type="fire" /> {post.view_count}人</span>
                  </div>
                  <div
                    className="detailed-content"
                    dangerouslySetInnerHTML={{ __html: html }}
                  />
               </div>
              </div>
          </Col>
  
          <Col className="comm-right" xs={0} sm={0} md={7} lg={5} xl={4}>
            <Author />
            <Affix offsetTop={5}>
              <div className="detailed-nav comm-box">
                <div className="nav-title">文章目录</div>
                <MarkNav
                  className="article-menu"
                  source={post.content}
                  ordered={false}
                />
              </div>
            </Affix>
          </Col>
        </Row>
        <Footer/>
     </div>
  )
}

Detail.getInitialProps = async (context) => {
  const { id } = context.query;

  const promise = new Promise((resolve, reject) => {
    const baseUrl = 'http://127.0.0.1:7002';
    let url = '/default/getArticle/'
    axios(baseUrl + url + id).then(resp => {
      resolve(resp.data)
    })
  })
  return await promise;
}
export default Detail