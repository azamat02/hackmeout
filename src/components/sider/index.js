import React, {useState} from "react";
import Title from "antd/es/typography/Title";
import {Menu} from "antd";
import {InboxOutlined, LogoutOutlined, ProfileOutlined, SendOutlined} from "@ant-design/icons";
import Sider from "antd/es/layout/Sider";
import {useHistory} from "react-router-dom";
import AuthService from "../../services/authService";
import {useDispatch} from "react-redux";
import {logout} from "../../redux/authReducer";

export default function SideBar(props) {
  const {selectedKey, setSelectedKey} = props
  const history = useHistory()
  const dispatch = useDispatch()
  const authService = new AuthService()
  const [collapsed, setCollapsed] = useState(false)

  return (
    <>
      <Sider collapsible collapsed={collapsed} onCollapse={()=>{setCollapsed(!collapsed)}}>
        <div className="logo" style={{visibility: collapsed ? 'hidden' : 'visible'}}>
          <Title style={{color: 'white'}} level={2}>
            Alfa-Team
          </Title>
        </div>
        <Menu theme="dark" defaultSelectedKeys={[selectedKey]} mode="inline" >
          <Menu.Item key="1" icon={<ProfileOutlined />} onClick={()=>{setSelectedKey('1'); history.push('/app/my_files')}}>
            My files
          </Menu.Item>
          <Menu.Item key="2" icon={<InboxOutlined />} onClick={()=>{setSelectedKey('2'); history.push('/app/inbox')}}>
            Incoming files
          </Menu.Item>
          <Menu.Item key="3" icon={<SendOutlined />} onClick={()=>{setSelectedKey('3'); history.push('/app/send_file')}}>
            Send file
          </Menu.Item>
          <Menu.Item key="4" icon={<LogoutOutlined />} onClick={()=>{authService.Logout();dispatch(logout()); history.push('/')}}>
            Logout
          </Menu.Item>
        </Menu>
      </Sider>
    </>
  )
}
