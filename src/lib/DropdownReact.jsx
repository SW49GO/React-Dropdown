import React, { useState, useEffect, useRef } from 'react'
import { FaCaretUp, FaCaretDown } from 'react-icons/fa'
import * as config  from './Config.js'
import PropTypes from 'prop-types'

function DropdownReact({data, 
                        onSelect, 
                        sortAZ,
                        sortNum, 
                        initialOption, 
                        styleContainer:customContainer,
                        styleHeader:customHeader,
                        styleContainerList:customContainerList, 
                        styleList:customList,
                        bckColorOverList,
                        colorTextOverList
                    }){


    // State to Open and Close DropDown
    const [isOpen, setIsOpen] = useState(false)
    const toggleDropDown = () => setIsOpen(!isOpen)

    // Config Style 
    const SelectConfig = config.defaultConfig
    let mergedStyleContainer = {
        ...SelectConfig.styleContainer,
        ...customContainer
    }
    const openStyle = {borderRadius : '.3125rem .3125rem 0 0'}
    let mergedStyleHeader = {
        ...SelectConfig.styleHeader,
        ...customHeader
        }
    if (isOpen) {
        mergedStyleHeader = {
          ...mergedStyleHeader,
          ...openStyle,
        }
    }
    let mergedStyleContainerList = {
        ...SelectConfig.styleContainerList,
        ...customContainerList
    }
    let mergedStyleList = {
        ...SelectConfig.styleList,
        ...customList
    }

    // Sort the table alphabetically if necessary
    let datas
    if(sortAZ){
        datas = data.sort((a,b)=>a.name.localeCompare(b.name, 'fr'))
    }else if(sortNum){
        datas = data.sort((a,b)=>a.name - b.name)
    }else{
        datas = data
    }
    // State for the option displayed by default
    const [optionSelected, setOptionSelected] = useState(datas ? datas[0].name:'')
    useEffect(()=>{
        if(initialOption){
            setOptionSelected(initialOption)
        }
    }, [initialOption])


    // Function to retrieve selection
    const handleOptionSelected=(option)=>{
        // If option is an array (for the option that contains abbreviation and name)
        if(Array.isArray(option)){
            setOptionSelected(option[1])
            onSelect(option[0])
        }else{
            setOptionSelected(option)
            onSelect(option)
        }
        setIsOpen(false)
    }
    // Creating a reference for each option in the list
    const listRef= useRef(null)
    // Each time the DropDown list is opened, the scroll is positioned on the default element (initialOption)
    useEffect(() => {
        if (listRef.current) {
          const selectedOptionElement = listRef.current.querySelector(`[data-option="${optionSelected}"]`);
          if (selectedOptionElement) {
            const scrollTo = selectedOptionElement.offsetTop - listRef.current.offsetTop;
            listRef.current.scrollTo({ top: scrollTo, behavior: 'smooth' });
          }
        }
      }, [isOpen, optionSelected])

    return(
        <div style={mergedStyleContainer}>
            <div style={mergedStyleHeader} onClick={toggleDropDown}>
                <div>{optionSelected}</div>
                <div>{isOpen ? <FaCaretUp/> : <FaCaretDown/>}</div>
            </div>
            {isOpen &&
            <div ref={listRef} style={mergedStyleContainerList} data-testid='dropDownList'>
                {datas.map((item,index)=>(
                    <div data-testid={`option-${item.name}`} data-option={item.name} style={mergedStyleList} key={index} onClick={() => {item.abbreviation ? handleOptionSelected([item.abbreviation, item.name]) :handleOptionSelected(item.name)}}
                    onMouseOver={(event) => {
                        event.target.style.backgroundColor = bckColorOverList || `#d3cdcd`
                        event.target.style.color = colorTextOverList || mergedStyleContainerList.color
                      }}
                      onMouseOut={(event) => {
                        event.target.style.backgroundColor = mergedStyleContainerList.backgroundColor
                        event.target.style.color = mergedStyleContainerList.color
                      }}
                    >{item.name}</div>
                ))}
            </div>
            }
        </div>
    )
}

DropdownReact.propTypes = {
    data: PropTypes.array,
    onSelect: PropTypes.func,
    initialOption: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
      ]),
    styleContainer: PropTypes.object,
    styleHeader: PropTypes.object,
    styleContainerList: PropTypes.object,
    styleList: PropTypes.object,
    bckColorOverList: PropTypes.string,
    colorTextOverList: PropTypes.string
}

export default DropdownReact