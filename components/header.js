import React, { useState, useEffect } from 'react';
import "../static/style/components/header.css";
import { Row,Col, Menu, Icon, } from 'antd'

import { getTypeInfo } from '../utils/api.js'

const Header = () => {

  const [ navList, setNavList ] = useState([])

  useEffect(() => {
    fetchNavList();
  }, [])

  const fetchNavList = async () => {
    try {
      const resp = await getTypeInfo()
      setNavList(resp.data);
    } catch (error) {
      
    }
  }

  return (
    <div className="header">
      <Row type="flex" justify="center">
        <Col  xs={24} sm={24} md={10} lg={15} xl={12}>
          <a href="/">
            <span className="header-logo">wencaizhang</span>
            <span className="header-text">前端开发</span>
          </a>
        </Col>
  
        <Col className="memu-div" xs={0} sm={0} md={14} lg={8} xl={6}>
          <Menu  mode="horizontal">
            <Menu.Item key="home">
              <Icon type="home" />
              首页
            </Menu.Item>
            {navList.map(nav => (
              <Menu.Item key={nav.orderNum}>
                <a href={`/list/${nav.orderNum}`}>
                  {nav.typeName}
                </a>
              </Menu.Item>
            ))}
          </Menu>
        </Col>
      </Row>
    </div>
  )
}

export default Header;