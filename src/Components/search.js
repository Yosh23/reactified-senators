import React, { useState, useEffect } from 'react'
import SearchForm from './SearchForm'

const URI = "https://www.govtrack.us/api/v2/role?current=true&role_type=senator"


// filterAll iterates over filter object looping through each key:value pair, 
//each loop filters by a new condition returning the filtered array, 
//each loop reduces the results array by one condition until all conditions have been filtered. 
const filterAll = (senators, filter) => {
  console.log('filterAll:', filter)
  let results = senators
  Object.keys(filter).forEach((item) => {
    results = results.filter(senator => {
      let check = eval(`senator.${item}`)
      // console.log('filter[item]', Boolean(eval(filter[item]))) // this is the val
      console.log('--filter item', item) // this is the key
      if(item === 'leadership_title') {
        if(filter[item] === '!null') {
          // console.log('working check', Boolean(check) )
          // console.log('working boolean', Boolean(filter[item]))
          // return console.log('working')
          return Boolean(check) === Boolean(filter[item])
        }
        return check === eval(filter[item])
      }
      return check === filter[item]
    })
  });
  return results
}

// const filterByState = (senators, state) => senators.filter(senator => senator.state === state.toUpperCase())
// const filterByParty = (senators, party) => senators.filter(senator => senator.party === party)
// // const filterByPartyNState = (senators, state, party) => senators.filter(senator => senator.state === state.toUpperCase() && senator.party === party)

const getSenators = async (url) => fetch(url).then(res => res.json()).then(data => data.objects)

// const searchSenators = (senators, filter) => {
//   // console.log('searchSenators filter:', filter)
//   // console.log('searchSenators senators:', senators)
//   // Make sure the filter.party and filter.state are both being used
//   if (filter.party && filter.state)
//     return senators.filter(senator => filter.party === senator.party && filter.state.toUpperCase() === senator.state)
//   else if (!filter.party && !filter.state)
//     return senators
//   // Determine which filter is being used and filter appropriately predicated upon the filter object 
//   return filter.party ?
//     filterByParty(senators, filter.party) :
//     filterByState(senators, filter.state)
// }

const style = {
  color: 'blue',
  textAlign: 'left'
}

export default () => {
  const [senators, setSenators] = useState([])
  const [searched, setSearched] = useState([])
  // console.log('senators', senators)

  const searchedResults = searched.map((senator, index) =>
    <div key={index} style={style}>
      <ul>
        <li>Name: {senator.person.firstname} {senator.person.lastname}</li>
        <li>State: {senator.state}</li>
        <li>Party: {senator.party}</li>
        <li>Rank: {senator.senator_rank}</li>
        <li>Class: {senator.senator_class}</li>
        <li>Leadership Title: {senator.leadership_title}</li>
      </ul>
      <hr />
    </div>
  )

  useEffect(() => {
    getSenators(URI).then(res => setSenators(res))
  })

  return (
    <div>
      <SearchForm
        onSearched={filter => {
          // console.log('filter', filter)
          const filtered = filterAll(senators, filter)
          // const filtered = searchSenators(senators, filter)
          setSearched(filtered)
          console.log('filtered', filtered)
        }} />

      <ul>
        {searchedResults}
      </ul>
    </div>
  )
}
