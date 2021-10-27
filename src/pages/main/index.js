import {Layout} from 'antd';
import './index.css'
import Title from "antd/es/typography/Title";
import SideBar from "../../components/sider";
import {useState} from "react";
import {Route, useHistory} from "react-router-dom";
import {useSelector} from "react-redux";
import SendFile from "../send_file";
import IncomingFiles from "../incoming_files";
import MyFiles from "../../components/myFiles";

export default function MainPage() {
  const history = useHistory()
  const store = useSelector((state)=>(state))

  let key = '1'
  if (history.location.pathname.includes('/app/my_files'))
  {
    key = '1'
  }
  if (history.location.pathname.includes('/app/inbox'))
  {
    key = '2'
  }
  if (history.location.pathname.includes('/app/send_file'))
  {
    key = '3'
  }

  const [selectedKey, setSeletedKey] = useState(key)
  const links = ['My files', 'Incoming files','Send file']

  if (!store.auth.authorized) {
    history.push('/404')
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <SideBar setSelectedKey={setSeletedKey} selectedKey={selectedKey}/>
      <Layout className="site-layout">
        <Layout.Header className="site-layout-background" style={{ padding: '16px 20px' }}>
          <Title level={3}>
            {links[parseInt(selectedKey)-1]}
          </Title>
        </Layout.Header>
        <Layout.Content style={{ margin: '16px 16px' }}>
          <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>

            <Route path={'/app/my_files'}>
              <MyFiles/>
            </Route>
            <Route exact path={'/app/inbox'}>
              <IncomingFiles/>
            </Route>
            <Route exact path={'/app/send_file'}>
              <SendFile />
            </Route>

          </div>
        </Layout.Content>
        <Layout.Footer style={{ textAlign: 'center' }}>Alfa-Team ©2021</Layout.Footer>
      </Layout>
    </Layout>
  );
}
