import React from 'react'
import './Hackathons.css'

function FilterComponent(props) {
    const {title} = props;
  return (
    <div>
      <button id="filterbutton">{title}</button>
    </div>
  )
}

export default FilterComponent
