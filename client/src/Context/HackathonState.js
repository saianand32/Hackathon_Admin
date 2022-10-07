import React,{useState} from 'react'
import HackathonContext from './HackathonContext'

const HackathonState = (props) =>{
  const host = "http://localhost:5000"

  const [challenge,setChallenge] = useState([]);

  const [newchal,setNewchal] = useState({id:"", etitle:"",edescription:"",estart:0,eend:0,elevel:""});

  //get all note
  const getChallenges = async() =>{
    const resp = await fetch(`${host}/api/Hackathons/fetchallchallenges`,{
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
      },
          });
          const json = await resp.json();
        //   const j = json.reverse();
  // 
    setChallenge(json)
  }
//   //Add note
  const addChallenge = async(title, start,end,image, description,level) =>{
    const resp = await fetch(`${host}/api/Hackathons/addchallenge`,{
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
        
      },
        body: JSON.stringify({title, start,end,image, description,level })
          });
          // const json = resp.json();
//    const challengetemp ={
      
//         "title": title,
//         "start": start,
//         "end" : end,
//         "image": image,
//         "description": description,
//         "tag": tag,
//         "level":level
//       }
    //   const temp = challenge.concat(challengetemp).reverse()
    // SetChallenge(temp)
    getChallenges();
  }
//   //delete note
  const deleteChallenge = async(id) =>{
//  const newNotes = notes.filter((note)=>{return note._id!==id})
//  SetNotes(newNotes)
const resp = await fetch(`${host}/api/Hackathons/deletechallenge/${id}`,{
  method: 'DELETE',
  headers: {
      'Content-Type': 'application/json',
  },
      });
      getChallenges();

  }
  //edit note
  const editChallenge = async (id,title, start,end,image, description,level) =>{
    const resp = await fetch(`${host}/api/Hackathons/updatechallenge/${id}`,{
method: 'PUT',
headers: {
    'Content-Type': 'application/json',
},
  body: JSON.stringify({id,title, start,end,image, description,level})
    });
    const json = resp.json();
    getChallenges();
  }
return(
    <HackathonContext.Provider value = {{challenge,setChallenge,getChallenges,addChallenge,deleteChallenge,editChallenge,newchal,setNewchal}}>
        {props.children}
    </HackathonContext.Provider>
);
}


export default HackathonState;