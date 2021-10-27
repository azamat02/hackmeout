import React from 'react';
import {Modal} from 'antd';
import DrawSign from "../drawSign";
import FileService from "../../services/fileService";
import swal from 'sweetalert'
import {useHistory} from "react-router-dom";

const fileService = new FileService()

const downloadSign = (documentId) => {
  let svg = document.querySelector( "#sign" );
  let svgData = new XMLSerializer().serializeToString( svg );

  let canvas = document.createElement( "canvas" );
  let ctx = canvas.getContext( "2d" );

  let img = document.createElement( "img" );
  img.setAttribute( "src", "data:image/svg+xml;base64," + btoa( svgData ) );

  let url = ''
  img.onload = function() {
    ctx.drawImage( img, 0, 0 );

    // Now is done
    console.log( canvas.toDataURL( "image/png" ) );
    url = canvas.toDataURL( "image/png" )

    fileService.SendSign({documentForSigningId: documentId, singImage64: url.substring(22, url.length)}).then(res=>{
      console.log(res)
    })
  };
}

export default function SignModal(props){
  const {showSignModal, setShowSignModal, documentId} = props

  const handleOk = () => {
    downloadSign(documentId)
    setShowSignModal(false);
    swal('Success!', 'Document signed!', 'success')
    window.location = '/app/my_files'
  };

  const handleCancel = () => {
    setShowSignModal(false);
  };

  return (
    <>
      <Modal title="Sign document" visible={showSignModal} onOk={()=>{handleOk()}} okText={'Complete signing'} onCancel={()=>{handleCancel()}}>
        <DrawSign/>
      </Modal>
    </>
  );
};
