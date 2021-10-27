import React, {useState} from "react";
import {MouseDraw} from "../mouseDraw";
import {Button} from "antd";
import {DeleteOutlined} from '@ant-design/icons'


export default function DrawSign() {
  const [currentLine, setCurrentLine] = useState({ trickness: 2, points: [] });
  const [lines, setLines] = useState([]);

  const clear = () => {
    setCurrentLine({ trickness: 2, points: [] })
    setLines([])
  }

  return (
    <div
      className="App"
      style={{ overflow: "hidden" }}
    >
      <h1>Click and drag to draw sign</h1>

      <div style={{display: 'flex', justifyContent: 'start', marginTop: '20px'}}>
        <div style={{borderStyle: 'solid', borderWidth:'2px', borderColor:'color'}}>
          <svg width="200px" height="100px" id={'sign'}>
            <MouseDraw x={0} y={0} width={200} height={100} thickness={2} currentLine={currentLine} setCurrentLine={setCurrentLine} lines={lines} setLines={setLines}/>
          </svg>
        </div>
      </div>
      <br/>
      <Button type={'primary'} icon={<DeleteOutlined />} onClick={clear}>Clear</Button>
    </div>
  );
}
