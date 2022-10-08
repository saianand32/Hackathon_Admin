import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './Card.css'
function Card(props) {

  const { challenge, updateChallenge } = props;
  const [color, setColor] = useState("")
  const [text, setText] = useState("")
  const [day, setDay] = useState(0)
  const [hour, setHour] = useState(0)
  const [minute, setMinute] = useState(0)
  const [timetext, setTimetext] = useState("")
  const [display, setDisplay] = useState("")
  const [time, setTime] = useState("Days")
  const [btnText, setBtnText] = useState("Participate Now")

  const navigate = useNavigate();

  function getTime() {
    var date_now = moment().valueOf();
    var date_future;

    if (date_now < challenge.start) {
      setTimetext("Starts in :")
      date_future = challenge.start;
    }
    else if (date_now >= challenge.start && date_now <= challenge.end) {
      setTimetext("Ends in :")
      date_future = challenge.end;
    }
    else {
      setTimetext("Ended on :")
      date_future = 0;
      setDisplay("none")


      let time = challenge.start
      var m = moment(time);
      var s = m.format("MM/DD/YYYY");;
      setDay(s);
      setHour("")
      setMinute("")
      setBtnText("View Details")
      setTime("at 12:00 AM")
      return;
    }



    var delta = Math.abs(date_future - date_now) / 1000;

    var days = Math.floor(delta / 86400);
    delta -= days * 86400;

    var hours = Math.floor(delta / 3600) % 24;
    delta -= hours * 3600;

    var minutes = Math.floor(delta / 60) % 60;
    delta -= minutes * 60;

    setDay(days + "-");
    setHour(hours + "-");
    setMinute(minutes);
    setTimeout(() => {
      getTime();
    }, 10000);

  }

  useEffect(() => {

    let start = challenge.start;
    let end = challenge.end;
    if (moment().valueOf() >= start && moment().valueOf() < end) {
      setColor("tag tag-green")
      setText("Active")
    }
    else if (moment().valueOf() < start) {
      setColor("tag tag-blue")
      setText("Upcoming")
    }
    else {
      setColor("tag tag-red")
      setText("Past")
    }

    getTime()


  })
  return (

    <div>
      <div className="card">
        <div className="card__header">
          <img src={challenge.image} alt="card__image" className="card__image" style={{ height: "200px", width: "500px" }} />
        </div>
        <div className="card__body">
          <span className={color}>{text}</span>
          <h1 style={{ fontSize: "20px", fontWeight: "bold" }}>{challenge.title}</h1>
          <h4>{timetext}</h4>
          <div style={{ display: "flex" }}>
            <h4> {day} <p style={{ fontSize: "15px" }}>{time}</p></h4>
            <h4>{hour} <p style={{ fontSize: "15px", display: `${display}` }}>hrs</p></h4>
            <h4> {minute}<p style={{ fontSize: "15px", display: `${display}` }}>min</p></h4>
          </div>
          <button className='participateBtn' onClick={() => {

            updateChallenge(challenge)
            navigate('/detail');

          }}><i className="fa-regular fa-circle-check" style={{ marginRight: "4px" }}></i>{btnText}</button>
        </div>
      </div>
    </div>
  )
}

export default Card
