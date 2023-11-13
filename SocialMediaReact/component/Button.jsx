import React from "react";

const Button = ({
  label,
  backgroundColor,
  border,
  width,
  height,
  color,
  background,
  customClass,
  onClick,
}) => {
  const buttonStyle = {
    backgroundColor: backgroundColor,
    background: background,
    border: border,
    width: width,
    height: height,
    color: color,
  };

  return (
    <button
      style={buttonStyle}
      onClick={onClick}
      className={`button-hover ${customClass}`}
    >
      {label}
    </button>
  );
};

export default Button;
