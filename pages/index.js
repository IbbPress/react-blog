import React, { useState } from 'react'
import Head from 'next/head'
import { Row, Col, List, Icon } from "antd";

import Header from '../components/Header'
import Author from '../components/Author'
import Footer from '../components/Footer'

import '../static/style/pages/index.css'
import PostItem from '../components/Item.js'

import { getPostList } from '../utils/api.js'

const Home = (props) =>{
  const [ mylist , setMylist ] = useState(props.data);

  return (
    <div>
    
    <Head>
      <title>Home</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <Header />

    <Row className="comm-main" type="flex" justify="center">
      <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}>
        <List
          header={<div>最新日志</div>}
          itemLayout="vertical"
          dataSource={mylist}
          renderItem={
            item => (
              <List.Item>
                <PostItem item={item} />
              </List.Item>
            )
          }
        />
      </Col>
      <Col className="comm-right" xs={0} sm={0} md={7} lg={5} xl={4}>
        <Author />
      </Col>
    </Row>

    <Footer />
  </div>
  )
}


Home.getInitialProps = async () => {
  const promise = new Promise((resolve, reject) => {
    getPostList().then(resp => resolve(resp))
  })
  return await promise;
}

export default Home
