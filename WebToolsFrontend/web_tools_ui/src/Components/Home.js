import React, { Component } from 'react';
import axios from 'axios';
import '../css_styles/Home.css';
import def_image from '../images/default_img.jpg'
import ClipLoader from "react-spinners/ClipLoader";


// const override = css`
//   display: block;
//   margin: 0 auto;
//   border-color: red;
// `;
//https://www.npmjs.com/package/react-spinners
class Home extends Component{

    constructor(props){
        super(props);
        this.state={
            formBoxVisible:false,
            imageUploadForm:false,
            videoUploadForm:false,
            selectedFile:null,
            respImgUrl:def_image,
            response:false,
            respData:'',
            imgReadyToDownload:false,
        };
    }



    onFileChange = event =>{
      // console.log(event.target.files[0]);
      this.setState({selectedFile:event.target.files[0]});
    }


    imageUploadFormFun = (callingfrom) =>{
        //console.log(callingfrom)
        this.setState({
            formBoxVisible:true,
            imageUploadForm:true
        });

        if(callingfrom === 'extraction'){
            console.log("image extraction started");
        }

    }

    onFileUpload = () =>{
      const formData=new FormData();

      formData.append("file",this.state.selectedFile);
      console.log(this.state.selectedFile);
      axios.post('http://127.0.0.1:8000/upload_image',formData)
            .then(res=>{
              var response=res.data
              console.log(response);
              if(response.message=="success"){
                  this.setState({
                    respImgUrl:'http://'+response.url,
                    response:true,
                    respData:response
                  });
              }else{
                  this.setState({
                    response:false,
                    response:''
                  });
              }
            })
    }

    onFileMetadataDelete = () =>{
        const formData=new FormData();
        formData.append("fileName",this.state.respImgUrl)
        axios.post('http://127.0.0.1:8000/remove_image_md',formData)
              .then(res=>{
                var resp=res.data
                console.log(resp);
              })

    }

    // chooseFile = (event) =>{
    //   console.log(event.target.files[0]);
    //   this.setState({
    //     selectedFile:URL.createObjectURL(event.target.files[0])
    //   })
    // }

    render(){
        return(
            <div className="body">
                <ClipLoader color="ffffff" loading={true}  size={150} />
                <div className="heading">Web Tools</div>

                {!this.state.formBoxVisible ?
                    <div className="mainBox">
                        <a onClick={() => this.imageUploadFormFun("extraction")}><div className="item"> Image details Extraction</div></a>
                        <a onClick={() => this.imageUploadFormFun("face_detection")}><div className="item"> Face Detection from Image</div></a>
                        <a><div className="item"> Face Detection from Video</div></a>

                    </div>
                :
                    <div className="mainBox">
                        <div className="fileBox" >
                          <input type="file" onChange={this.onFileChange}/>
                          <button className="buttonBox" onClick={this.onFileUpload}>Upload</button>
                          { this.state.response ?
                              <button className="buttonBoxDel" onClick={this.onFileMetadataDelete}>Delete all Metadata</button>
                          : null }

                          {this.state.imgReadyToDownload ?
                              <button className="buttonBoxDownload" onClick={this.onFileUpload}>Download Image</button>
                          : null }

                          <br/>
                          {this.state.response ?
                              <div className="contentBox">
                                  <div className="imgBox">
                                      <img src={this.state.respImgUrl} className="imageStyle"/>
                                  </div>
                                  <div className="descBox">
                                      <div className="divRow"><div className="tagSpan">ExifVersion</div><div className="divSep">:</div><div className="valueSpan">{this.state.respData.data.ExifVersion}</div></div>
                                      <div className="divRow"><div className="tagSpan">ComponentsConfiguration</div><div className="divSep">:</div><div className="valueSpan">{this.state.respData.data.ComponentsConfiguration}</div></div>
                                      <div className="divRow"><div className="tagSpan">ShutterSpeedValue</div><div className="divSep">:</div><div className="valueSpan">{this.state.respData.data.ShutterSpeedValue}</div></div>
                                      <div className="divRow"><div className="tagSpan">DateTimeOriginal</div><div className="divSep">:</div><div className="valueSpan">{this.state.respData.data.DateTimeOriginal}</div></div>
                                      <div className="divRow"><div className="tagSpan">DateTimeDigitized</div><div className="divSep">:</div><div className="valueSpan">{this.state.respData.data.DateTimeDigitized}</div></div>
                                      <div className="divRow"><div className="tagSpan">ApertureValue</div><div className="divSep">:</div><div className="valueSpan">{this.state.respData.data.ApertureValue}</div></div>
                                      <div className="divRow"><div className="tagSpan">BrightnessValue</div><div className="divSep">:</div><div className="valueSpan">{this.state.respData.data.BrightnessValue}</div></div>
                                      <div className="divRow"><div className="tagSpan">ExposureBiasValue</div><div className="divSep">:</div><div className="valueSpan">{this.state.respData.data.ExposureBiasValue}</div></div>
                                      <div className="divRow"><div className="tagSpan">MaxApertureValue</div><div className="divSep">:</div><div className="valueSpan">{this.state.respData.data.MaxApertureValue}</div></div>
                                      <div className="divRow"><div className="tagSpan">MeteringMode</div><div className="divSep">:</div><div className="valueSpan">{this.state.respData.data.MeteringMode}</div></div>
                                      <div className="divRow"><div className="tagSpan">Flash</div><div className="divSep">:</div><div className="valueSpan">{this.state.respData.data.Flash}</div></div>
                                      <div className="divRow"><div className="tagSpan">ColorSpace</div><div className="divSep">:</div><div className="valueSpan">{this.state.respData.data.ColorSpace}</div></div>
                                      <div className="divRow"><div className="tagSpan">ExifImageWidth</div><div className="divSep">:</div><div className="valueSpan">{this.state.respData.data.ExifImageWidth}</div></div>
                                      <div className="divRow"><div className="tagSpan">ExifInteroperabilityOffset</div><div className="divSep">:</div><div className="valueSpan">{this.state.respData.data.ExifInteroperabilityOffset}</div></div>
                                      <div className="divRow"><div className="tagSpan">SceneCaptureType</div><div className="divSep">:</div><div className="valueSpan">{this.state.respData.data.SceneCaptureType}</div></div>
                                      <div className="divRow"><div className="tagSpan">ExifImageHeight</div><div className="divSep">:</div><div className="valueSpan">{this.state.respData.data.ExifImageHeight}</div></div>
                                      <div className="divRow"><div className="tagSpan">Contrast</div><div className="divSep">:</div><div className="valueSpan">{this.state.respData.data.Contrast}</div></div>
                                      <div className="divRow"><div className="tagSpan">Saturation</div><div className="divSep">:</div><div className="valueSpan">{this.state.respData.data.Saturation}</div></div>
                                      <div className="divRow"><div className="tagSpan">Sharpness</div><div className="divSep">:</div><div className="valueSpan">{this.state.respData.data.Sharpness}</div></div>
                                      <div className="divRow"><div className="tagSpan">Model</div><div className="divSep">:</div><div className="valueSpan">{this.state.respData.data.Model}</div></div>
                                      <div className="divRow"><div className="tagSpan">YCbCrPositioning</div><div className="divSep">:</div><div className="valueSpan">{this.state.respData.data.YCbCrPositioning}</div></div>
                                      <div className="divRow"><div className="tagSpan">Make</div><div className="divSep">:</div><div className="valueSpan">{this.state.respData.data.Make}</div></div>
                                      <div className="divRow"><div className="tagSpan">ExposureTime</div><div className="divSep">:</div><div className="valueSpan">{this.state.respData.data.ExposureTime}</div></div>
                                      <div className="divRow"><div className="tagSpan">XResolution</div><div className="divSep">:</div><div className="valueSpan">{this.state.respData.data.XResolution}</div></div>
                                      <div className="divRow"><div className="tagSpan">YResolution</div><div className="divSep">:</div><div className="valueSpan">{this.state.respData.data.YResolution}</div></div>
                                      <div className="divRow"><div className="tagSpan">FNumber</div><div className="divSep">:</div><div className="valueSpan">{this.state.respData.data.FNumber}</div></div>
                                      <div className="divRow"><div className="tagSpan">SceneType</div><div className="divSep">:</div><div className="valueSpan">{this.state.respData.data.SceneType}</div></div>
                                      <div className="divRow"><div className="tagSpan">ExposureProgram</div><div className="divSep">:</div><div className="valueSpan">{this.state.respData.data.ExposureProgram}</div></div>
                                      <div className="divRow"><div className="tagSpan">GPSInfo</div><div className="divSep">:</div><div className="valueSpan">{this.state.respData.data.GPSInfo}</div></div>
                                      <div className="divRow"><div className="tagSpan">CustomRendered</div><div className="divSep">:</div><div className="valueSpan">{this.state.respData.data.CustomRendered}</div></div>
                                      <div className="divRow"><div className="tagSpan">ISOSpeedRatings</div><div className="divSep">:</div><div className="valueSpan">{this.state.respData.data.ISOSpeedRatings}</div></div>
                                      <div className="divRow"><div className="tagSpan">ResolutionUnit</div><div className="divSep">:</div><div className="valueSpan">{this.state.respData.data.ResolutionUnit}</div></div>
                                      <div className="divRow"><div className="tagSpan">ExposureMode</div><div className="divSep">:</div><div className="valueSpan">{this.state.respData.data.ExposureMode}</div></div>
                                      <div className="divRow"><div className="tagSpan">FlashPixVersion</div><div className="divSep">:</div><div className="valueSpan">{this.state.respData.data.FlashPixVersion}</div></div>
                                      <div className="divRow"><div className="tagSpan">WhiteBalance</div><div className="divSep">:</div><div className="valueSpan">{this.state.respData.data.WhiteBalance}</div></div>
                                      <div className="divRow"><div className="tagSpan">Software</div><div className="divSep">:</div><div className="valueSpan">{this.state.respData.data.Software}</div></div>
                                      <div className="divRow"><div className="tagSpan">DateTime</div><div className="divSep">:</div><div className="valueSpan">{this.state.respData.data.DateTime}</div></div>
                                      <div className="divRow"><div className="tagSpan">DigitalZoomRatio</div><div className="divSep">:</div><div className="valueSpan">{this.state.respData.data.DigitalZoomRatio}</div></div>
                                      <div className="divRow"><div className="tagSpan">ExifOffset</div><div className="divSep">:</div><div className="valueSpan">{this.state.respData.data.ExifOffset}</div></div>

                                  </div>
                              </div>
                          : null }


                        </div>
                    </div>
                }
            </div>
        );
    }
}

export default Home;
