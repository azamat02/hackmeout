import Title from "antd/es/typography/Title";
import {useState} from "react";
import {Button, message, Select} from "antd";
import UserService from "../../services/userService";
import {useHistory} from "react-router-dom";
import swal from "sweetalert";
import FileService from "../../services/fileService";
import {InboxOutlined, SendOutlined} from "@ant-design/icons";
import Dragger from "antd/es/upload/Dragger";

export default function SendFile(){
  const [usernameToSend, setUsernameToSend] = useState()
  const [searchList, setSearchList] = useState([])
  const [base64, setBase64] = useState('')
  const [filename, setFilename] = useState('')

  const fileService = new FileService()
  const userService = new UserService()
  const user = JSON.parse(localStorage.getItem('user'))
  const history = useHistory()

  const search = (value) => {
    userService.GetAllUsers().then(res=>{
      if (res.data) {
        let sortedArray = res.data.filter(item=>{
          if (user.id !== item.id) {
            if (item.username.toLowerCase().includes(value.toLowerCase())) {
              return item
            }
          }
          return null
        })
        if (sortedArray !== searchList) {
          setSearchList(sortedArray)
        }
      }
    })
  }

  let handleSearch = value => {
    if (value) {
      search(value)
    } else {
      setSearchList([])
    }
  };

  const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });

  const props = {
    name: 'file',
    maxCount: 1,
    listType: 'picture',
    onRemove: ()=>{
      setBase64('')
    },
    beforeUpload: file => {
      (
        async ()=> {
          setFilename(file.name)
          let base64 = await toBase64(file)
          base64 = base64.substring(28,base64.length)
          console.log(base64)
          setBase64(base64)
        }
      )()

      return false;
    }
  };

  const upload = () => {
    if (usernameToSend === '') {
      message.error('Choose user to send!')
      return
    }
    if (base64 === '') {
      message.error('Choose file to send!')
      return
    }
    fileService.SendFile({userReceiveUsername: usernameToSend, documentBase64: base64, fileName: filename.substring(0, filename.length-4)}).then(res=>{
      console.log(res)
      swal('Success!', 'File uploaded successfully!', 'success')
      setTimeout(()=>{
        window.location = history.location.pathname
      }, 1000)
    })
  }

  const options = searchList.map(d => <Select.Option key={d.id} value={d.username}>{d.username}</Select.Option>);

  return (
    <>
      <Title level={3}>
        Choose receiver
      </Title>

      <br/>

      <Select
        showSearch
        value={usernameToSend}
        placeholder={'Enter user name'}
        style={{width: '50%', fontSize: '20px'}}
        defaultActiveFirstOption={false}
        showArrow={false}
        filterOption={false}
        onSearch={handleSearch}
        onChange={(value)=>{setUsernameToSend(value)}}
        notFoundContent={null}
      >
        {options}
      </Select>

      <br/>
      <br/>

      <Title level={3}>
        Choose file
      </Title>

      <br/>

      <>
        <Dragger {...props}>
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">Click or drag file to this area to upload</p>
          <p className="ant-upload-hint">
            Support for a single or bulk upload. Strictly prohibit from uploading company data or other
            band files
          </p>
        </Dragger>
        <br/><br/>
        <Button icon={<SendOutlined />} type={'primary'} style={{height: '40px'}} onClick={()=>{upload()}}>Send document</Button>
      </>
    </>
  )
}
