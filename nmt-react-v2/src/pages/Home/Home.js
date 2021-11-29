import React, { Fragment } from 'react';
import TranslationTool from '../../components/TranslationTool/TranslationTool';
import svgLogo from './logo2.svg';
import './Home.scss';

const Home = () => {
    return (
        <Fragment>
            <div className="container">
                <div className="row mt-5">
                    <div className="col-lg-8 my-3">
                        <div className="title">Low-Resource Language Translation for the Belt and Road</div>
                        <div className="paragraph">
                        Our project provides one-stop translation and technical solutions for 21 languages in countries along the Belt and Road.
                            <br/>
                            <br/>
                            The frontend uses ReactJS to dynamically render the DOM and Bootstrap
                            to make the website responsive. The backend is written in Python using
                            Flask to easily define the API endpoints. The machine learning model was built using Pytorch and OpenNMT.
                        </div>
                    </div>
                    <div className="col-md-4 my-5 d-none d-lg-block">
                        <img className="illustration" src={svgLogo} alt="" />
                    </div>
                </div>
            </div>
            <TranslationTool />
            
        </Fragment>
    );
};

export default Home;