import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

export default function Spinner(props) {
  const {fontSize, color} = props
  const antIcon = <LoadingOutlined style={{ fontSize: fontSize ?? 18, color: color ?? ''}} spin />;

  return (
    <Spin indicator={antIcon} />
  )
}
