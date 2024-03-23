import React, { useState } from 'react'
import './index.css'
import { DropdownReact } from '../lib'

const tab = [{
  "name": "Alabama",
  "abbreviation": "AL"
},
{
  "name": "Alaska",
  "abbreviation": "AK"
},
{
  "name": "American Samoa",
  "abbreviation": "AS"
},
{
  "name": "Arizona",
  "abbreviation": "AZ"
},
{
  "name": "Arkansas",
  "abbreviation": "AR"
},
{
  "name": "California",
  "abbreviation": "CA"
},
{
  "name": "Colorado",
  "abbreviation": "CO"
},
{
  "name": "Connecticut",
  "abbreviation": "CT"
}]


function App() {

  const [option, setOption] = useState(null) 
  console.log('option selected in the dropdown list:', option)

  const handleOption = (selectedOption) =>{
    setOption(selectedOption)
  }
  return (
  <div>
    <DropdownReact data={tab} 
                   onSelect={handleOption} 
                   initialOption={'California'}
                   sortAZ={true}
                   styleContainer={{width:'8rem'}}
                   styleHeader={{backgroundColor:'#54AE10'}}
                   styleContainerList={{backgroundColor:'#90AE20', color:'white', border:'1.5px solid #54AE10'}}
                   bckColorOverList={'#FF5'}
                   colorTextOverList={'#54AE10'}
                   />
  </div>
  )
}

export default App
