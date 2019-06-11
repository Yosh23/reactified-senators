import React, { useState } from 'react'

// export default ({ onSearched }) => {
export default props => {
  const [filterState, setFilterState] = useState('')
  const [filterName, setName] = useState('')
  const [filterParty, setParty] = useState('')
  const [filterSenator_rank, setRank] = useState('')
  const [filterSenator_class, setClass] = useState('')
  const [filterLeadership_title, setLeadership] = useState('')

  let filter = {} 

  const filterBuilder = () => {
    const inputs = document.getElementById("searchByForm").elements
    for (let i = 0; i < inputs.length; i++) {
      let filterKeys = inputs[i].name
      let filterVals = eval(`filter${filterKeys.charAt(0).toUpperCase() + filterKeys.slice(1)}`)
      if (filterKeys !== '' && filterVals !== '') { filter[filterKeys] = (filterVals) } // this works for all but leadership_title
      // if('leadership_title' === filterKeys && filterVals !== "") { 
      //   console.log('leadership_title filterVals',filterVals)
      //   return filter[filterKeys] = (filterVals) 
      // }
      // if (filterKeys !== '' && filterVals !== '') { filter[filterKeys] = (filterVals) }
    }
  }

  return (
    <form id="searchByForm"
      onSubmit={e => {
        e.preventDefault()
        filterBuilder()
        // const filter = { state: filterState, party: filterParty, name: filterName } // need func to build this object based on selected inputs, can .reduce() be used to do this?
        // const filter = {} // need func to build this object based on selected inputs, can .reduce() be used to do this?
        console.log('filter', filter)

        // debugger
        if (props.onSearched) {
          props.onSearched(filter)
        }
      }}
    >
      <label htmlFor="state">State</label>
      <input type="text" className="inPut" name="state" minLength="2" maxLength="2" value={filterState} onChange={e => setFilterState(e.target.value.toUpperCase())} />
      {/* <label htmlFor="name">Name</label>
      <input type="text" className="inPut" name="name" value={filterName} onChange={e => setName(e.target.value)} /> */}
      <select name="party" onChange={e => setParty(e.target.value)}>
        <option value="">All</option>
        <option value="Democrat">Democrat</option>
        <option value="Republican">Republican</option>
        <option value="Independent">Independent</option>
      </select>

      {/** test new filterBuilder options */}
      <select name ="senator_rank" onChange={e => setRank(e.target.value)}>
      <option value="">Select Rank</option>
        <option value="senior">Senior</option>
        <option value="junior">Junior</option>
      </select>

      <select name ="senator_class" onChange={e => setClass(e.target.value)}>
      <option value="">Select Class</option>
        <option value="class1">Class 1</option>
        <option value="class2">Class 2</option>
        <option value="class3">Class 3</option>
      </select>

      <select name ="leadership_title" onChange={e => setLeadership(e.target.value)}>
      <option value="">Select</option>
        <option value="!null">True</option>
        <option value="null">False</option>
      </select>
      {/**end test */}
      
      <input type="submit" value="Submit" />
    </form>
  )
}
