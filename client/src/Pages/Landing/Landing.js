import React from "react";
import "./Landing.css";
import imgRocket from "../../Assets/rocket.svg";
import ai_img from "../../Assets/ai_img.svg";
import manicon from "../../Assets/manicon.svg";
import robot from "../../Assets/robot.svg";
import { useNavigate } from "react-router-dom";

function Landing() {
  const navigate = useNavigate();
  return (
    <>
      <div className="landingPageContainer">
        <div className="textDiv">
          <div className="textDivHeading">
            <div className="headText"> Accelerating Innovation with Global AI Challenges</div>
            <p style={{ color: "#ECECEC" }} id="para">
              Al Challenges at DPhi simulate real-world problems. It is a
              great place to put your Al/Data Science skills to test on
              diverse datasets allowing you to foster learning through
              competitions.
            </p>
            <button onClick={() => navigate('/create')} className="createButton">Create Challenge</button>
          </div>
        </div>
        <div className="imgDiv">
          <img src={imgRocket} alt="" />
        </div>
      </div>
      <div className="landBanner">
        <div className="landInfo">
          <div>
            <img src={ai_img} alt="" />
          </div>
          <div style={{ marginLeft: "30px" }}>
            <h2>100K+</h2>
            <p>AI model submissions</p>
          </div>

        </div>
        <div className="landInfo">
          <div>
            <img src={manicon} alt="" />
          </div>
          <div style={{ marginLeft: "30px" }}>
            <h2>50K+</h2>
            <p>Data Scientists</p>
          </div>

        </div>
        <div className="landInfo">
          <div>
            <img src={robot} alt="" />
          </div>
          <div style={{ marginLeft: "30px", borderRadius: "1px solid #002A3B" }}>
            <h2>100+</h2>
            <p>AI Challenges hosted</p>
          </div>

        </div>
      </div>
    </>
  );
}

export default Landing;
