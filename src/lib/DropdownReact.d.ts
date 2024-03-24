import * as React from 'react'

// Declaration of the different typings of the Component for compatibility with Typescrypt users

interface DropdownReactProps {
  data: any[];
  initialOption?: string | number;
  styleContainer?:React.CSSProperties;
  styleHeader?:React.CSSProperties;
  styleContainerList?:React.CSSProperties;
  styleList?: React.CSSProperties;
  bckColorOverList?: string,
  colorTextOverList?: string,
  onSelect: (...args: any[]) => void
}

declare const DropdownReact: React.FunctionComponent<DropdownReactProps>

export default DropdownReact