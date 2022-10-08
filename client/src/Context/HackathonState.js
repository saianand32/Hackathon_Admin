import React, { useState } from 'react'
import HackathonContext from './HackathonContext'

const HackathonState = (props) => {
  const host = "http://localhost:5000"

  const [challenge, setChallenge] = useState([]);

  const [newchal, setNewchal] = useState({ id: "", etitle: "", edescription: "", estart: 0, eend: 0, elevel: "" });

  //get challenge
  const getChallenges = async () => {
    const resp = await fetch(`${host}/api/Hackathons/fetchallchallenges`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const json = await resp.json();
    setChallenge(json)
  }

  //add challenge
  const addChallenge = async (title, start, end, image, description, level) => {
     await fetch(`${host}/api/Hackathons/addchallenge`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',

      },
      body: JSON.stringify({ title, start, end, image, description, level })
    });
    getChallenges();
  }

  //delete challenge
  const deleteChallenge = async (id) => {

     await fetch(`${host}/api/Hackathons/deletechallenge/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    getChallenges();

  }


  //edit challenge
  const editChallenge = async (id, title, start, end, image, description, level) => {
     await fetch(`${host}/api/Hackathons/updatechallenge/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id, title, start, end, image, description, level })
    });
    getChallenges();
  }
  return (
    <HackathonContext.Provider value={{ challenge, setChallenge, getChallenges, addChallenge, deleteChallenge, editChallenge, newchal, setNewchal }}>
      {props.children}
    </HackathonContext.Provider>
  );
}


export default HackathonState;