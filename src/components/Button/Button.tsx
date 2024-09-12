import React from 'react';
import styles from './Button.module.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'link' | 'danger';
  children: React.ReactNode;
  loading?: boolean;
}

const Button: React.FC<ButtonProps> = ({ variant = 'primary', children, loading = false, ...props }) => {
  return (
    <button 
      className={`${styles.button} ${styles[variant]} ${loading ? styles.loading : ''}`} 
      disabled={loading || props.disabled} 
      {...props}
    >
      {loading ? <span className={styles.spinner}></span> : children}
    </button>
  );
};

export default Button;