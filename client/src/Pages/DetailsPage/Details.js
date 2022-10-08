import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import HackathonContext from "../../Context/HackathonContext";
import "./Details.css";
import moment from "moment";
import level from "../../Assets/level.svg"

function Details() {
  const context = useContext(HackathonContext);
  const { deleteChallenge } = context;
  const [id, setId] = useState("");
  const [edesc, setEdesc] = useState("");
  const [etitle, setEtitle] = useState("");
  const [estart, setEstart] = useState(0);
  const [eend, setEend] = useState(0);
  const [text, setTimetext] = useState("");
  const [day, setDay] = useState("");
  const [hour, setHour] = useState("");
  const [minute, setMinute] = useState("");
  const [elevel, setElevel] = useState("");
  const navigate = useNavigate();

  useEffect(() => {

    myfun();
  });

  const myfun = async () => {

    getTime();
    const array = JSON.parse(localStorage.getItem('array'));

    setId(array[0]);
    setEtitle(array[1])
    setEdesc(array[2])
    setEstart(array[3])
    setEend(array[4])
    setElevel(array[5])
  }
  function getTime() {
    var date_now = moment().valueOf();
    var date_future;

    if (date_now < estart) {
      setTimetext("Starts in -")
      date_future = estart;
    }
    else if (date_now >= estart && date_now <= eend) {
      setTimetext("Ends in -")
      date_future = eend;
    }
    else {
      setTimetext("Ended on -")
      date_future = 0;


      let time = estart
      var m = moment(time);
      var s = m.format("MM/DD/YYYY");;
      setDay(s + "  at 12:00 AM");
      setHour("")
      setMinute("")
      return;
    }


    // get current time
    var delta = Math.abs(date_future - date_now) / 1000;

    // calculate (and subtract) whole days
    var days = Math.floor(delta / 86400);
    delta -= days * 86400;

    // calculate (and subtract) whole hours
    var hours = Math.floor(delta / 3600) % 24;
    delta -= hours * 3600;

    // calculate (and subtract) whole minutes
    var minutes = Math.floor(delta / 60) % 60;
    delta -= minutes * 60;

    setDay(days + "days  :");
    setHour(hours + "hours  :");
    setMinute(minutes + " minutes");
    setTimeout(() => {
      getTime();
    }, 10000);

  }

  const handleOnCLick = () => {
    deleteChallenge(id);
    navigate("/");
  };

  const takeToEdit = () => {
    navigate("/edit");
  };
  return (
    <div className="detailConntainer">
      <div className="blueHeader">
        <button className="yellow"> <i className="fa-regular fa-clock"></i> {text} {day}  {hour}  {minute}</button>
        <h1>{etitle}</h1>
        <h4>
           This is a generalized descrition. Hackathon description is below.
        </h4>
        <div className="level" style={{ backgroundColor: "black", zIndex: "1000" }}>
          <img src="" alt="" />
        </div>
        <div id="leveldiv"><img src={level}></img>  {elevel}</div>
      </div>
      <div className="subHeader">
        <div style={{ marginLeft: "2em", minHeight: "9vh", borderBottom: "5px solid green" }}>
          <h3 style={{}}>Overview</h3>
        </div>
        <div >
          <button className="editbtn" onClick={takeToEdit}>Edit</button>
          <button className="delbtn" onClick={handleOnCLick}>delete</button>
        </div>
      </div>
      <div style={{ fontWeight: "bold", color: "rgb(85, 82, 82)", padding: "50px" }}>
        {edesc}
      </div>
    </div>
  );
}

export default Details;
