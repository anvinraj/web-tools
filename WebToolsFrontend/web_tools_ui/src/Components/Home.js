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
            respImgUrl:def_image
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
              this.setState({
                respImgUrl:'http://'+response.url
              });
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
                      <img src={this.state.respImgUrl}/>
                    </div>
                </div>
                }
            </div>
        );
    }
}

export default Home;
