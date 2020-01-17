import React,{useState, useEffect} from 'react'
import Head from 'next/head'
import { Row, Col, Icon ,Breadcrumb, Affix } from 'antd'
import dayjs from 'dayjs'

import marked from 'marked'
import hljs from "highlight.js"
import 'highlight.js/styles/monokai-sublime.css';
import Tocify from '../components/tocify.tsx'

import Header from '../components/Header'
import Author from '../components/Author'
import Footer from '../components/Footer'
import '../static/style/pages/detail.css'

import { getPost } from '../utils/api.js'

const Detail = (props) =>{

  const [ tocify,setTocify ] = useState(new Tocify())
  const [ post ] = useState(props.data)
  const [ html, setHtml ] = useState(props.data.content)
  const [ loading, setLoading ] = useState(false)

  const renderer = new marked.Renderer();
  renderer.heading = function(text, level, raw) {
    const anchor = tocify.add(text, level);
    return `<a id="${anchor}" href="#${anchor}" class="anchor-fix"><h${level}>${text}</h${level}></a>\n`;
  };
  marked.setOptions({
    renderer: renderer,
    gfm: true,
    pedantic: false,
    sanitize: false,
    tables: true,
    breaks: false,
    smartLists: true,
    smartypants: false,
    highlight: function (code) {
      return hljs.highlightAuto(code).value;
    }
  });

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
                    <Breadcrumb.Item>
                      <a href="/list">列表</a>
                    </Breadcrumb.Item>
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
                {tocify && tocify.render()}
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
    getPost(id).then(resp => resolve(resp))
  })
  return await promise;
}
export default Detail