import React, { useRef, useContext, useState } from 'react'
import './Create.css'
import moment from 'moment'
import HackathonContext from '../../Context/HackathonContext';
import { useNavigate } from 'react-router-dom';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Axios from "axios"
function Create() {
  const titleref = useRef(null);
  const startref = useRef(null);
  const endref = useRef(null);
  const descref = useRef(null);
  const levelref = useRef(null);
  const [load, setLoad] = useState(false);
  const context = useContext(HackathonContext);
  const { addChallenge } = context;
  const navigate = useNavigate();
  const [image, setImage] = useState("");
  const [btnDisp, setBtnDisp] = useState("none");
  const [url, setUrl] = useState("http://res.cloudinary.com/dwfe4wse9/image/upload/v1665162442/ucczoyshppk6xfvtlqip.jpg")


  const handleSubmit = (e) => {
    e.preventDefault();
    let start = moment(startref.current.value, "YYYY-MM-DD").valueOf();
    let end = moment(endref.current.value, "YYYY-MM-DD").valueOf();

    if (url === "http://res.cloudinary.com/dwfe4wse9/image/upload/v1665162442/ucczoyshppk6xfvtlqip.jpg") {
      alert("Please upload the image by clicking upload button next to Image");
      return;
    }

    setTimeout(() => {
      addChallenge(titleref.current.value, start, end, url, descref.current.value, levelref.current.value);
      navigate('/')
    }, 200);

  }

  const uploadImage = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "kphfngjn")
    setLoad(true);
    Axios.post("https://api.cloudinary.com/v1_1/dwfe4wse9/image/upload",
      formData
    ).then((resp) => {

      var t = (resp.data.url);
      setUrl(t);
      console.log(t)
      setLoad(false)
    })



  }

  return (
    <>
      <h2 id="heading">Challenge Details</h2>
      <div className='formContainer'>

        <form onSubmit={handleSubmit}>
          <div className="form-group form-elements">
            <label htmlFor="exampleFormControlInput1">Challenge Name</label>
            <input type="text" className="form-control" id="exampleFormControlInput1" ref={titleref} placeholder="enter challenge title" required />
          </div>

          <div className="form-group form-elements">
            <label htmlFor="birthday">Start Date:&nbsp;</label>
            <input type="date" id="birthday" name="birthday" ref={startref} required />
          </div>
          <div className="form-group form-elements">
            <label htmlFor="birthday">End Date:&nbsp; </label>
            <input type="date" id="birthday" ref={endref} required name="birthday" />
          </div>



          <div className="form-group form-elements">
            <label htmlFor="exampleFormControlTextarea1">Description</label>
            <textarea className="form-control" id="exampleFormControlTextarea1" ref={descref} required rows="3"></textarea>
          </div>

          <div className="form-group form-elements">
            <div style={{ maxWidth: "150px" }}>
              {
                load === false ? (<><img src={url} alt="" /></>) : load === true ? (
                  <Backdrop
                    sx={{ color: 'black', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={load}
                  >
                    <CircularProgress color="inherit" />
                  </Backdrop>
                )
                  :
                  (<><img src={url} alt="" /></>)

              }
            </div>
            <label className="form-label" htmlFor="image">Choose Image and click upload button</label>
            <div style={{ display: "flex" }}>
              <input type="file" className="form-control" id="file" required name="file" onChange={event => {
                setImage(event.target.files[0]);
                setBtnDisp("");
              }} />

              <button style={{ border: "1.5px solid grey", color: "black", marginLeft: "5px", display: `${btnDisp}` }} onClick={uploadImage}>UploadImage</button>
            </div>

          </div>

          <div className="form-group form-elements">
            <label htmlFor="exampleFormControlSelect1">Level</label>
            <select className="form-control" ref={levelref} required id="exampleFormControlSelect1">
              <option>Easy</option>
              <option>Medium</option>
              <option>Hard</option>
            </select>
          </div>
          <button type="submit" className="form-button" >Save Changes</button>
        </form>
      </div>
    </>
  )
}

export default Create
