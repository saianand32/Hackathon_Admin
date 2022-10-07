import React, { useContext, useEffect, useState } from 'react'
import { MenuProps, useStyles, options } from "./Utils";
import Card from '../../Components/card/Card';
import HackathonContext from '../../Context/HackathonContext';
import './Hackathons.css'
import moment from 'moment';
import Checkbox from "@material-ui/core/Checkbox";
import InputLabel from "@material-ui/core/InputLabel";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import FilterComponent from './FilterComponent';


function Hackathons() {
  const context = useContext(HackathonContext);
  const { challenge, getChallenges, setNewchal } = context;
  const [search, setSearch] = useState("");
  const classes = useStyles();
  const [selected, setSelected] = useState([]);
  const [text, setText] = useState(["Filter"]);
  const isAllSelected = options.length > 0 && selected.length === options.length;

  useEffect(() => {
    getChallenges();
  }, []);

  const updateChallenge = (currentChallenge) => {
    setNewchal({ id: currentChallenge._id, etitle: currentChallenge.title, edescription: currentChallenge.description, estart: currentChallenge.start, eend: currentChallenge.end, elevel: currentChallenge.level })
    window.localStorage.setItem('id',currentChallenge._id);
    let arr = [currentChallenge._id,currentChallenge.title,currentChallenge.description,currentChallenge.start,currentChallenge.end,currentChallenge.level,currentChallenge.image];

    window.localStorage.setItem('array',JSON.stringify(arr));
  }

  const isActive = (challenge) => {
    let temp = moment().valueOf();
    if (temp >= challenge.start && temp < challenge.end) return true;
    return false;
  }
  const isUpcoming = (challenge) => {
    let temp = moment().valueOf();
    if (temp < challenge.start) return true;
    return false;
  }
  const isFinished = (challenge) => {
    let temp = moment().valueOf();
    if (temp > challenge.end) return true;
    return false;
  }

  const handleOnChange =(e)=> {
    setSearch(e.target.value);
  }

  const handleChange = (event) => {
    const value = event.target.value;
    if (value[value.length - 1] === "all") {
      setSelected(selected.length === options.length ? [] : options);
      return;
    }
    setSelected(value);
  };

  return (
    <>
      <div className='searchdiv'>
        <h2>Explore Challenges</h2>
        <div className="search">
          <i className="fa fa-search"></i>
          <input type="text" className="form-control"  onChange={handleOnChange} placeholder="Search" />
       

        <FormControl className={classes.formControl} style={{marginLeft:"50px",marginTop:"-4px",backgroundColor:"white"}}>
        <InputLabel id="mutiple-select-label" style={{fontWeight:"bold",fontSize:"1em",marginLeft:"70px"}}>Filter</InputLabel>
      <Select
        labelId="mutiple-select-label"
        multiple
        defaultValue={text}
        value={selected}
        onChange={handleChange}
        renderValue={() => [""]}
        MenuProps={MenuProps}
      >
        <MenuItem
          value="all"
          classes={{
            root: isAllSelected ? classes.selectedAll : ""
          }}
        >
          <ListItemIcon>
            <Checkbox
              classes={{ indeterminate: classes.indeterminateColor }}
              checked={isAllSelected}
              indeterminate={
                selected.length > 0 && selected.length < options.length
              }
            />
          </ListItemIcon>
          <ListItemText
            classes={{ primary: classes.selectAllText }}
            primary="Select All"
          />
        </MenuItem>
        {options.map((option) => (
          <MenuItem key={option} value={option}>
            <ListItemIcon>
              <Checkbox checked={selected.indexOf(option) > -1} />
            </ListItemIcon>
            <ListItemText primary={option} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>

        </div>
        <div className='filtersDiv'>
          {
            selected.map((e)=>{
              return(
                <FilterComponent title={e}/>
              );
            })
          }
        </div>
      </div>
      <div className='gridContainer'>
        <div className='grid' >
          {challenge.map((challenge) => {

            if (search.length === 0) {
              if (selected.length === 0 || selected.includes(challenge.level) || selected.includes("All")) return (<Card challenge={challenge} updateChallenge={updateChallenge} key={challenge._id} />);

              if (selected.includes("Active"))
                if (isActive(challenge)) return (<Card challenge={challenge} updateChallenge={updateChallenge} key={challenge._id} />);

              if (selected.includes("Upcoming"))
                if (isUpcoming(challenge)) return (<Card challenge={challenge} updateChallenge={updateChallenge} key={challenge._id} />);

              if (selected.includes("Past"))
                if (isFinished(challenge)) return (<Card challenge={challenge} updateChallenge={updateChallenge} key={challenge._id} />);
            }
            else
              if(challenge.title.toLowerCase().includes(search)) return (<Card challenge={challenge} updateChallenge={updateChallenge} key={challenge._id} />);

              // return(<h1 style={{color:"white"}}>No Events Match your Search</h1>);
          })}
        </div>
      </div>
    </>
  )
}

export default Hackathons
