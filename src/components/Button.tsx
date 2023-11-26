import React from 'react'

type ButtonProps = {
    children: React.ReactNode;
    
    active?: boolean;
    onClick: () => void;
    color: "black" | "blue" | "red"| "green" ;
}

const Button = (props: ButtonProps) => {

    const { onClick, color, active, children} = props;
  return (
<button className={`rounded-lg  ${active? "bg-red-500" : "active:bg-gray-700"} ${color === "black"? "bg-black" : color === "blue" ? "bg-blue-600" : color === "red" ? "bg-red-600" : "bg-green-600"} `}
  onClick={onClick}
>
    {children}

</button>
  )
}

export default Button