import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import './TextInput.css';

export const TextInput = props => {
  const {
    name,
    type = 'text',
    required,
    placeholder,
    autoComplete,
    onChange,
    onBlur,
    onFocus,
    value,
    disabled,
    isValid,
    error,
    className
  } = props;

  return (
    <div
      className={cn('text-input', {
        'text-input--valid': isValid
      })}
    >
      <input
        className={cn(
          {
            'text-input__input': true,
            'text-input__input--error': !!error
          },
          className
        )}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        autoComplete={autoComplete}
        onChange={onChange}
        onBlur={onBlur}
        onFocus={onFocus}
        value={value}
        disabled={disabled}
      />
      {error && <span className='text-input__error'>{error}</span>}
    </div>
  );
};

TextInput.propTypes = {
  isValid: PropTypes.bool
};
