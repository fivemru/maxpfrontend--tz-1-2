import { useState, useEffect } from 'react';

export const useValidation = ({
  initValues = {},
  validate,
  onSubmit,
  validateWhenInit = false,
  validateOnBlur = true,
  validateOnChange = true,
}) => {
  const [didMounted, setDidMounted] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [values, setValues] = useState({ ...initValues });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const handleValidate = () => {
    const errors = {};
    for (const field in validate) {
      const check = validate[field];
      errors[field] = check(values[field]);
    }
    setErrors(errors);

    const noErrors = Object.values(errors).every(err => !err);
    if (isValid !== noErrors) setIsValid(noErrors);
  };

  const handleBlur = e => {
    const { currentTarget } = e;
    setTouched({ ...touched, [currentTarget.name]: true });
  };

  const handleChange = e => {
    const { currentTarget } = e;
    const nextValues = { ...values, [currentTarget.name]: currentTarget.value };
    setValues(nextValues);
  };

  const handleSubmit = e => {
    e.preventDefault();

    // set all touched to true
    setTouched(
      Object.assign({}, ...Object.keys(values).map(f => ({ [f]: true })))
    );

    const noErrors = Object.values(errors).every(err => !err);
    if (noErrors) onSubmit(values);
  };

  useEffect(() => {
    if (didMounted && validateOnBlur) handleValidate();
  }, [touched]);

  useEffect(() => {
    if (didMounted && validateOnChange) handleValidate();
  }, [values]);

  useEffect(() => {
    if (validateWhenInit) handleValidate();
    setDidMounted(true);
  }, []);

  return {
    values,
    errors,
    touched,
    isValid,
    handleChange,
    handleBlur,
    handleSubmit,
    handleValidate,
    setValues,
    setTouched,
  };
};
