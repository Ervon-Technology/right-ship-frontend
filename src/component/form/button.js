import React from 'react';
import { useNavigate } from 'react-router-dom';

const Button = ({
  text,
  onClick,
  to, // Optional prop for navigation
  size,
  color = 'blue',
  disabled = false,
  additionalClasses = '',
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (to) {
      navigate(to);
    } else if (onClick) {
      onClick();
    }
  };

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-md',
    lg: 'px-5 py-3 text-lg',
  };

  const colorClasses = {
    blue: 'bg-blue-500 hover:bg-blue-600 text-white',
    green: 'bg-green-500 hover:bg-green-600 text-white',
    red: 'bg-red-500 hover:bg-red-600 text-white',
    gray: 'bg-gray-500 hover:bg-gray-600 text-white',
  };

  const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed' : '';

  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      className={`rounded-md ${sizeClasses[size]} ${colorClasses[color]} ${disabledClasses} ${additionalClasses} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-${color}-500`}
    >
      {text}
    </button>
  );
};

export default Button;
