import React, { useState } from 'react'
import "../style/qr.css"
 
export const QRgenerator = () => {
  const [loading,setloading] = useState(false);
  const [img , setImg] = useState("");
  const [qrdata , setqrdata] = useState("");
  const [width,setwidth] = useState(150);
  function generateQR(){
    setloading(true);
    setTimeout(() => {
      try{
        var url = `https://api.qrserver.com/v1/create-qr-code/?size=${width}x${width}&data=${encodeURIComponent(qrdata)}`;
      }
      catch(error){
        console.log("Errorr occur while generating QR :",error);
      }
      finally{
        setloading(false);
      }
    }, 1000);
  }

  function downloadQR(){
    fetch(img).then((response)=> response.blob()).then((blob)=>{
      const link = document.createElement("a");
      link.href=URL.createObjectURL(blob);
      link.download = "qr.png"
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link); 
    }).catch((error)=>{
      console.log("error occur while download the QR",error)
    });
  }

  return (
    <div className="container d-flex align-items-center justify-content-center qr" style={{height : "100vh" }}>
      <div className="container qr-container p-3 d-flex flex-column gap-4" >
        <p className="text-center title">QR Code Generator</p>
        {img && <img className="d-block mx-auto p-2" src={img} alt="qr" />}
        {loading && <p className="text-center">Please Wait.....</p>}
        <div className="form-group">
          <label htmlFor="qr-link" className="mb-2">Enter the link</label>
          <input type="text" className="form-control" id="qr-link" aria-describedby="qr-help" placeholder="Enter Link"  onChange={(e)=>{setqrdata(e.target.value)}}/>
          <small id="qr-help" className="form-text text-muted">Eg : "https://www.google.com"</small>
        </div>
        <div className="form-group">
          <label htmlFor="qr-width" className="mb-2">Enter the QR Size</label>
          <input type="text" className="form-control" id="qr-width" aria-describedby="width-help" placeholder="Enter Width" onChange={(e)=>{setwidth(e.target.value)}} />
          <small id="width-help" className="form-text text-muted">Eg : "300" </small>
        </div>
        <div className="d-flex justify-content-center gap-5 button-container">
          <button className="btn btn-success" onClick={generateQR} disabled={loading}> Generate QR Code </button>
          <button className="btn btn-danger" onClick={downloadQR}> Download QR Code </button>
        </div>
      </div>
    </div>
  )
}
