# Dropdown React components created using `create-react-app` by SW49GO

## Presentation :
This is a reusable React component that allows you to display a customizable Dropdown in your application.

The component is TypeScript compatible and includes a type definition file (DropdownReact.d.ts) for an improved development experience. In a TypeScript project, the TypeScript compiler will automatically use this definition file.

### Examples Custom style :
<img src="https://raw.githubusercontent.com/SW49GO/React-Dropdown/master/public/assets/example.jpg" alt="dropdowns"/>

## Installing the package in your project:
```bash
npm i dropdown-react-sw49go
```
## Prerequisites :
- Node.js v18.16.0

## Dependencies to install :
- "react": "^18.2.0"
- "react-dom": "^18.2.0"
- "prop-types": "^15.8.1"
- "react-icons": "^5.0.1"

## Format of datas for the list inside dropdown :
```
\\ DATA in the form of a character string
export const data = [{name:'Hello'}, {name:'Goodbye'} ....]

\\ OR numeric
export const data = [{name:52}, {name:10}....]

\\ OR DATA where the 'name' is displayed but which returns 'abbreviation'
export const data =[{name:'California', abbreviation:'CL'},{name:'Flower', abbreviation: 15}....]
```

## Imported the component into your project:
```
import { DropdownReact } from 'dropdown-react-sw49go'
import React, { useState } from 'react'
// import your DATA array

function App(){
    const [option, setOption] = useState(null) 
    console.log('option selected in the dropdown list:', option)

    const handleOption = (selectedOption) =>{
        setOption(selectedOption)
    }

    return (
        <div>
            <DropdownReact data={data} 
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

```

# Using the different component options (Props):
- data (array) : array to be displayed in the dropdown list
- onSelect (function) : the callBack function to return the selected option
- sortAZ (boolean) : sort data alphabetically
- sortNum (boolean) : sort data numeric from smallest to largest
- initialOption (string) : default option displayed in the dropdown header if it's different of the first 'name' of your array
- styleContainer (CssProperties) : style of the principal container
- styleHeader (CssProperties) : style of the container that return default otpion of dropdown header
- styleContainerList (CssProperties) : style of the container of the list 
- styleList (CssProperties) : style of option list
- bckColorOverList (string) : the background color to apply when mouse over an option
- colorTextOverList (string) : the color the text to apply when mouse over an option

![Texte alternatif](https://raw.githubusercontent.com/SW49GO/React-Dropdown/master/public/assets/example.jpg)
