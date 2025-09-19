
const Button = ({ onClick, label, className = "", type = "button" }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={` ${className}`}
    >
      {label}
    </button>
  );
};

export default Button;