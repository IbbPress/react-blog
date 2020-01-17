
import React,{useState} from 'react'
import Head from 'next/head'
import {Row, Col , List ,Icon ,Breadcrumb  } from 'antd'
import axios from 'axios'
import dayjs from 'dayjs'
import Header from '../components/Header'
import Author from '../components/Author'
import Footer from '../components/Footer'
import '../static/style/pages/list.css'

import { getPostList } from '../utils/api.js'

const Home = (props) =>{
  console.log('props: ', props);
  const [ mylist , setMylist ] = useState(
    props.data.data
  );


  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <Header />
      <Row className="comm-main" type="flex" justify="center">
        <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}  >
            <div>
              <div className="bread-div">
                <Breadcrumb>
                  <Breadcrumb.Item><a href="/">首页</a></Breadcrumb.Item>
                  <Breadcrumb.Item>视频列表</Breadcrumb.Item>
                </Breadcrumb>
              </div>

              <List
                itemLayout="vertical"
                dataSource={mylist}
                renderItem={item => (
                  <List.Item>
                    <div className="list-title">
                      <a href={`/detail?id=${item.id}`}>{item.title}</a>
                    </div>
                    <div className="list-icon">
                      <span><Icon type="calendar" />{ dayjs.unix(item.add_time).format('YYYY-MM-DD') }</span>
                      <span><Icon type="folder" /> 视频教程</span>
                      <span><Icon type="fire" /> {item.view_count}人</span>
                    </div>
                    <div className="list-content">{item.content}</div>  
                  </List.Item>
                )}
              />  

            </div>
        </Col>

        <Col className="comm-right" xs={0} sm={0} md={7} lg={5} xl={4}>
          <Author />
        </Col>
      </Row>
      <Footer/>

   </>
  )

}

Home.getInitialProps = async () => {
  const promise = new Promise((resolve, reject) => {
    getPostList().then(resp => resolve(resp))
  })
  return await promise;
}

export default Home