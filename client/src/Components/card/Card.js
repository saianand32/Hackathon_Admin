import moment from 'moment'
import React,{useContext,useEffect,useState} from 'react'
import {useNavigate } from 'react-router-dom';
import HackathonContext from '../../Context/HackathonContext'
import './Card.css'
function Card(props) {
    // var ts = moment("10/15/2014").valueOf();
    // var m = moment(ts);
    // var s = m.format("M/D/YYYY")
    // const context = useContext(HackathonContext);
  
    const {challenge,updateChallenge} = props;
    const [color,setColor] = useState("")
    const [text,setText] = useState("")
    const [day,setDay] = useState(0)
    const [hour,setHour] = useState(0)
    const [minute,setMinute] = useState(0)
    const [timetext,setTimetext] = useState("")
    const[display,setDisplay] = useState("")
    const[time,setTime] = useState("Days")
    const [btnText,setBtnText] = useState("Participate Now")

    const navigate = useNavigate();

     function getTime  () {
      var date_now =  moment().valueOf();
      var date_future ;

      if(date_now<challenge.start)
      {
        setTimetext("Starts in :")
        date_future = challenge.start;
      }
      else if(date_now >= challenge.start && date_now <= challenge.end)
      {
        setTimetext("Ends in :")
        date_future = challenge.end;
      }
      else{
        setTimetext("Ended on :")
        date_future = 0;
        setDisplay("none")

        
          let time = challenge.start
          var m = moment(time);
          var s = m.format("MM/DD/YYYY");;
          let date = new Date(time * 1000);
          let months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]

          // UTC
          // console.log(date.getUTCFullYear(), date.getUTCMonth() + 1, weekday[date.getUTCDay()]);

          // Local
          // console.log(date.getFullYear(), date.getMonth() + 1, weekday[date.getDay()]);
          setDay(s);
          setHour("")
          setMinute("")
          setBtnText("View Details")
          setTime("at 12:00 AM")
          return;
      }


      // get current time
    
      // get total seconds between the times
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
    
     setDay(days+"-");
     setHour(hours+"-");
     setMinute(minutes);
     setTimeout(() => {
      getTime();
     }, 10000);
   
    }

    useEffect(()=>{

      let start = challenge.start;
      let end = challenge.end;
      if(moment().valueOf() >= start && moment().valueOf()<end )
      {
        setColor("tag tag-green")
        setText("Active")
      }
       else if(moment().valueOf() < start) 
       {
        setColor("tag tag-blue")
        setText("Upcoming")
       }
       else 
       {
        setColor("tag tag-red")
        setText("Past")
       }

       getTime()
       

    })
  return (
  
    <div>
      <div className="card">
    <div className="card__header">
      <img src={challenge.image} alt="card__image" className="card__image" style={{height:"200px",width:"500px"}}/>
    </div>
    <div className="card__body">
      <span className={color}>{text}</span>
      <h1>{challenge.title}</h1>
      <h4>{timetext}</h4>
      <div style={{display:"flex"}}>
      <h4> {day} <p style={{fontSize:"15px"}}>{time}</p></h4>
      <h4>{hour} <p style={{fontSize:"15px",display:`${display}`}}>hrs</p></h4>
      <h4> {minute}<p style={{fontSize:"15px",display:`${display}`}}>min</p></h4>
      </div>
   <button className='participateBtn' onClick={()=>{
    
    updateChallenge(challenge)
    navigate('/detail');
  
  }}>{btnText}</button>
    </div>
  </div>
    </div>
  )
}

export default Card
