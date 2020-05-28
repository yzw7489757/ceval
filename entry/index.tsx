import React from 'react';
import { render } from 'react-dom';
import { FolderOpenOutlined } from '@ant-design/icons';

import {
  Route,
  Link,
  BrowserRouter
} from "react-router-dom";
import { Layout, Menu, PageHeader } from 'antd';
import { name } from '../package.json';

import menuDataList from './ui-json';
import './index.less';

const { Content, Sider } = Layout;
const { SubMenu } = Menu;


document.addEventListener('DOMContentLoaded', () => {
  render(
    (
      <div>
        <PageHeader
          className="site-page-header"
          title={name}
          subTitle="Local debugging,.."
        />
        <BrowserRouter>
          <Layout style={{minHeight: 'calc(100vh - 72px)'}}>
            <Sider width={200} style={{ background: '#fff' }}>
              <Menu mode="inline" defaultSelectedKeys={[location.pathname]} defaultOpenKeys={menuDataList.map(group=>group.subPath)} style={{ height: '100%', borderRight: 0 }} >
              {
                menuDataList.map(item => 
                  <SubMenu 
                    key={item.subPath} 
                    title={<span><FolderOpenOutlined />{item.title}</span>}>
                    {
                      item.menuItems.map(({label, path}) => (
                          <Menu.Item key={path}><Link to={path}>{label}</Link></Menu.Item>
                        )
                      )
                    }
                  </SubMenu>
                )
              }
              </Menu>
            </Sider>
            <Layout style={{ padding: 12 }}>
              <Content style={{ background: '#fff', padding: '10px 20px' }}>
                <div className="App-ViewEngine">
                  {
                    menuDataList.map(item => item.menuItems).flat(1).map(({path, app}) => (
                        <Route key={path} exact path={path} component={app} />
                    ))
                  }
                </div>
              </Content>
            </Layout>
          </Layout>
        </BrowserRouter>
      </div>
  ),  document.getElementById('root'))
})