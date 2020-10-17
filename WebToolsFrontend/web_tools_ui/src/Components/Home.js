import React, { Component } from 'react';
import '../css_styles/Home.css';


class Home extends Component{
    render(){
        return(
            <div className="body">
                <div className="heading">Web Tools</div>
                <div className="mainBox">
                    <a href="#"><div className="item"> Face Detection from Image</div></a>
                    <a href="#"><div className="item"> Face Detection from Video</div></a>

                </div>
            </div>
        );
    }
}

export default Home;