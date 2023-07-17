import React,{ MouseEventHandler } from 'react';
import Image from 'next/image';

type Props = {
  title: string;
  type?: 'button' | 'submit';
  leftIcon?: null | string;
  rightIcon?: null | string;
  handleClick?: MouseEventHandler;
  isSubmitting?: boolean;
  bgColor?: string;
  textColor?: string;
}

const Button = ({title,type,leftIcon,rightIcon,handleClick,isSubmitting,bgColor,textColor}:Props) => {

  return (
    <button type={type || 'button'} disabled={isSubmitting} onClick={handleClick}
      className={`flexCenter gap-3 px-4 py-3  rounded-xl text-sm font-medium max-md:w-full
       ${isSubmitting ? 'bg-black/50' : bgColor || 'bg-primary-purple'} 
       ${textColor || 'text-white'}
      `}
    >
      {leftIcon && <Image src={leftIcon} width={14} height={14} alt='left' />}
      {title}
      {rightIcon && <Image src={rightIcon} width={14} height={14} alt='right' />}
    </button>
  )
}

export default Button;

