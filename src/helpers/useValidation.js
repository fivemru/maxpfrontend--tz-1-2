import { useState } from 'react';

export const useValidation = ({
  initValues = {},
  validate,
  onSubmit,
  validateWhenInit = false,
  validateOnBlur = true,
  validateOnChange = true
}) => {
  const [firstInit, setFirstInit] = useState(true);
  const [isValid, setIsValid] = useState(false);
  const [values, setValues] = useState({ ...initValues });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const handleValidate = nextValues => {
    const errors = {};
    const actualValues = nextValues || values;

    for (const field in validate) {
      const check = validate[field];
      errors[field] = check(actualValues[field]);
    }
    setErrors(errors);

    const noErrors = Object.values(errors).every(err => !err);
    if (isValid !== noErrors) setIsValid(noErrors);
  };

  const handleBlur = e => {
    const { target } = e;
    setTouched({ ...touched, [target.name]: true });
    if (validateOnBlur) handleValidate();
  };

  const handleChange = e => {
    const { target } = e;
    const nextValues = { ...values, [target.name]: target.value };
    setValues(nextValues);
    // pass actual values
    if (validateOnChange) handleValidate(nextValues);
  };

  const handleSubmit = e => {
    e.preventDefault();

    // set all touched to true
    setTouched(
      Object.assign({}, ...Object.keys(values).map(f => ({ [f]: true })))
    );

    handleValidate();

    const noErrors = Object.values(errors).every(err => !err);
    if (noErrors) onSubmit(values);
  };

  if (validateWhenInit && firstInit) {
    setFirstInit(false);
    handleValidate();
  }

  return {
    values,
    errors,
    touched,
    isValid,
    handleChange,
    handleBlur,
    handleSubmit,
    handleValidate,
    setValues: nextValues => {
      setValues(nextValues);
      handleValidate(nextValues);
    },
    setTouched
  };
};
