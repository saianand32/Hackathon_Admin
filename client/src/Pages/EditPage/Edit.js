import React ,{useRef,useContext,useEffect,useState}from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import './Edit.css'
import moment from 'moment'
import HackathonContext from '../../Context/HackathonContext';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Axios from "axios"
import { UTurnLeftTwoTone } from '@mui/icons-material';

function Edit() {
    const titleref = useRef(null);
    const startref = useRef(null);
    const endref = useRef(null);
    const descref = useRef(null);
    const levelref = useRef(null);
    const [load,setLoad] = useState(1);
    const context = useContext(HackathonContext);
    const {editChallenge,challenge} = context;

    // const[details,setDetails] = useState({title:"",start:0,end:0,desc:"",level:"",_id:""});
    // const [note,setNote] = useState({id:"", etitle:"",edescription:"",etag:""});
    const [id,setId] = useState("");
    const [etitle,setEtitle] = useState("");
    const [estart,setEstart] = useState(0);
    const [eend,setEend] = useState(0);
    const [edesc,setEdesc] = useState("");
    const [elevel,setElevel] = useState("");
    const [url,setUrl] = useState("")
    const [imgdata,setimgdata] = useState("")
    const [image,setImage] = useState("");
    // const [startDate,setStartdate] = new Date(estart)
    const navigate = useNavigate();

    useEffect(()=>{

       
       const array = JSON.parse(localStorage.getItem('array'));
    
          setId(array[0]);
          setEtitle(array[1])
          setEdesc(array[2])
          setEstart(array[3])
          setEend(array[4])
          setElevel(array[5])
          setimgdata(array[6])
    
    

    })

    const handleOnClick=()=>{

       
            let start = moment(startref.current.value,"YYYY-MM-DD").valueOf();
            let end = moment(endref.current.value,"YYYY-MM-DD").valueOf();
            setTimeout(() => {
             editChallenge(id,titleref.current.value, start,end,url, descref.current.value,levelref.current.value);
             navigate('/')
            }, 600);
            
            
    }
    
    const uploadImage=(e)=>{
      e.preventDefault();
      const formData = new FormData();
      formData.append("file",image);
      formData.append("upload_preset","kphfngjn")
      setLoad(2);
      Axios.post("https://api.cloudinary.com/v1_1/dwfe4wse9/image/upload",
      formData
      ).then((resp)=>{
        
        var t = (resp.data.url);
        setUrl(t);
        console.log(t)
        setLoad(3)
      })
    }
      
  return (
    <>
    <h2 id="heading">Edit Challenge Details</h2>
      <div className='formContainer'>
        
      <form>
  <div className="form-group form-elements">
    <label htmlFor="exampleFormControlInput1">Challenge Name</label>
    <input type="email" className="form-control" id="exampleFormControlInput1" defaultValue={etitle} ref = {titleref} placeholder="enter challenge title"/>
  </div>

  <div className="form-group form-elements">
  <label htmlFor="birthday">Start Date:&nbsp;</label>
{/* <input type="date" id="birthday" name="birthday" ref = {startref} defaultValue={"2019-09-25"} /> */}
<input type="date" id="birthday" name="birthday" ref = {startref}  />
  </div>
  <div className="form-group form-elements">
  <label htmlFor="birthday">End Date:&nbsp; </label>
<input type="date" id="birthday" ref = {endref}   name="birthday"/>
{/* <input type="date" id="birthday" ref = {endref}  defaultValue={"2013-01-08"} name="birthday"/> */}
  </div>
  

 
  <div className="form-group form-elements">
    <label htmlFor="exampleFormControlTextarea1">Description</label>
    <textarea className="form-control" id="exampleFormControlTextarea1" defaultValue={edesc} ref = {descref}  rows="3"></textarea>
  </div>

  <div className="form-group form-elements">
  <div style={{maxWidth:"150px"}}>
    {
      load === 1 ? (<><img src={imgdata} alt="" /></>) : load===2?(
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
  <label className="form-label" htmlFor="customFile">Upload an Image</label>
  <div style={{display:"flex"}}>
  <input type="file" className="form-control" id="file"  name="file" onChange={event=>{
  setImage(event.target.files[0]);
}} />

<button style={{border:"1.5px solid grey",color:"black",marginLeft:"5px"}} onClick={uploadImage}>UploadImage</button>
  </div>
  </div>

  <div className="form-group form-elements">
    <label htmlFor="exampleFormControlSelect1">Level</label>
    <select className="form-control" ref = {levelref} defaultValue={elevel} id="exampleFormControlSelect1">
      <option>Easy</option>
      <option>Medium</option>
      <option>Hard</option>
    </select>
  </div>

</form>
  <button onClick={handleOnClick}className='form-button'>Save Changes</button>
      </div>
    </>
  )
}

export default Edit
