import React from 'react'

type ButtonProps = {
    children: React.ReactNode;
    
    active?: boolean;
    onClick: () => void;
    color: "black" | "blue" | "red"| "green"| "border";
    onDoubleClick?: () => void;
}

const Button = (props: ButtonProps) => {

    const { onClick, color, active, children, onDoubleClick} = props;
  return (
<button className={`rounded-lg     
${color === "black"? "bg-black" : color === "blue" ? "bg-blue-600" : color === "red" ? "bg-red-600" : color === "green" ? "bg-green-600" : color === "border" ? "border-2 " : ""}
${active ? "ring ring-white" : ""} 
${active && color === "border" ? "bg-slate-700" : ""}
rounded-lg text-white font-bold px-4 py-2 w-full `}
  onClick={onClick}
  onDoubleClick={onDoubleClick}
>
    {children}

</button>
  )
}

export default Button