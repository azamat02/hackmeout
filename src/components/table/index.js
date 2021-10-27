import React from "react";
import {Button, Table} from "antd";
import {DownloadOutlined, EditOutlined} from "@ant-design/icons";
import Spinner from "../extra/spinner";

export default function DataTable(props) {
  const {files} = props

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
      sorter: ()=>  new Date()
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
          </div>
        )
      },
    },
  ];

  if (files === null) {
    return <> <Spinner fontSize={35}/>
    </>
  }

  let data = files.map(item=>{
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
    </>
  )
}
