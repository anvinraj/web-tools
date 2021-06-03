import React, { Component } from 'react';
import axios from 'axios';
import '../css_styles/Home.css';
import def_image from '../images/default_img.jpg'


class Home extends Component{

    constructor(props){
        super(props);
        this.state={
            formBoxVisible:false,
            imageUploadForm:false,
            videoUploadForm:false,
            selectedFile:null,
            respImgUrl:def_image,
            response:false
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
                    response:true
                  });
              }else{
                  this.setState({
                    response:false
                  });
              }

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
                          <button className="buttonBox" onClick={this.onFileUpload}>Submit</button>
                          <br/>

                          <div className="contentBox">
                              <div className="imgBox">
                                  {this.state.response ?
                                      <img src={this.state.respImgUrl} className="imageStyle"/>
                                  : null }
                              </div>
                              <div className="descBox"></div>
                          </div>


                        </div>
                    </div>
                }
            </div>
        );
    }
}

export default Home;
