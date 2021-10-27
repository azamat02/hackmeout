import React from "react";
import {Col, Row} from "antd";
import Title from "antd/es/typography/Title";

export default function MyFiles() {
  return (
    <>
      <Row>
        <Col className="gutter-row" span={12}>
          <Title level={3}>
            Files signed by me
          </Title>

        </Col>
        <Col className="gutter-row" span={12}>
          <Title level={3}>
            Files that were signed to me
          </Title>
        </Col>
      </Row>
    </>
  )
}
