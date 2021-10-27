import React, {useEffect, useState} from "react";
import {Col, Row} from "antd";
import Title from "antd/es/typography/Title";
import FileService from "../../services/fileService";
import DataTable from "../table";

export default function MyFiles() {
  const [filesSignedByMe, setFilesSignedByMe] = useState()
  const [filesSignedForMe, setFilesSignedForMe] = useState()
  const filesService = new FileService()

  useEffect(()=>{
    filesService.GetFilesSignedByMe().then(res=>{
      setFilesSignedByMe(res.data)
    })
    filesService.GetFilesSignedForMe().then(res=>{
      setFilesSignedForMe(res.data)
    })
  },[])

  return (
    <>
      <Row>
        <Col className="gutter-row" span={24}>
          <Title level={3}>
            Files signed by me
          </Title>

          {filesSignedByMe ?
            <DataTable files={filesSignedByMe}/> : 'No files found'}
        </Col>
        <Col className="gutter-row" span={24}>
          <Title level={3}>
            Files that were signed to me
          </Title>

          {filesSignedForMe ?
            <DataTable files={filesSignedForMe}/> : 'No files found'}
        </Col>
      </Row>
    </>
  )
}
