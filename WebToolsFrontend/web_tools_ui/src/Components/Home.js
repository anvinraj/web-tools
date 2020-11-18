import React, { Component } from 'react';
import '../css_styles/Home.css';


class Home extends Component{

    constructor(props){
        super(props);
        this.state={
            formBoxVisible:false,
            imageUploadForm:false,
            videoUploadForm:false
        };
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

                    <input type="file"/>

                </div>
                }
            </div>
        );
    }
}

export default Home;