import {Button, Table} from 'antd';
import {DownloadOutlined, EditOutlined} from '@ant-design/icons'
import {useEffect, useState} from "react";
import FileService from "../../services/fileService";
import Spinner from "../../components/extra/spinner";
import SignModal from "../../components/signModal";


export default function IncomingFiles() {
  const [files, setFiles] = useState(null)
  const [selectedDocId, setSelectedDocId] = useState()
  const fileService = new FileService()
  const [showSignModal, setShowSignModal] = useState(false)

  useEffect(()=>{
    if (files === null) {
      fileService.GetFilesByUsername().then(res=>{
        if (res.data.length) {
          console.log(res.data)
          setFiles(res.data)
        }
      })
    }
  }, [])

  let data = []

  const downloadDoc = (id) => {
    files.forEach(item=>{
      if (item.id === id) {
        const linkSource = `data:application/pdf;base64,${item.document.documentBase64}`;
        const downloadLink = document.createElement("a");
        const fileName = `${item.document.fileName}`;
        downloadLink.href = linkSource;
        downloadLink.download = fileName;
        downloadLink.click();
      }
    })
  }

  const columns = [
    {
      title: 'Sender',
      dataIndex: 'username',
    },
    {
      title: 'Filename',
      dataIndex: 'filename',
    },
    {
      title: 'Date',
      dataIndex: 'date',
    },
    {
      title: 'Actions',
      dataIndex: 'fileItem',
      render: (id) => {
        return (
          <div style={{display: 'flex', justifyContent: 'space-around'}}>
            <Button type={'primary'}
                    icon={<DownloadOutlined />} onClick={()=>{downloadDoc(id)}}>
              Download
            </Button>

            <Button type={'primary'} icon={<EditOutlined/>} onClick={()=>{setSelectedDocId(id); setShowSignModal(true)}}>
              Sign the document
            </Button>
          </div>
        )
      },
    },
  ];

  if (files === null) {
    return <> <Spinner fontSize={35}/>
    </>
  }

  data = files.map(item=>{
    let date = new Date(Date.parse(item.createdDate)).toLocaleString()
    return (
      {
        key: `${item.id}`,
        username: `${item.userSender.username}`,
        filename: `${item.document.fileName}`,
        date: `${date}`,
        fileItem: item.id,
      }
    )
  })

  return (
    <>
      <Table columns={columns} dataSource={data} />
      <SignModal setShowSignModal={setShowSignModal} showSignModal={showSignModal} documentId={selectedDocId}/>
    </>
  )
}
