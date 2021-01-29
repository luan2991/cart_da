import React from 'react';
import PropTypes from 'prop-types';
import { Box, Button, FormLabel } from '@material-ui/core';
import { Controller } from 'react-hook-form';

RandomPhotoField.propTypes = {
  name: PropTypes.string.isRequired,
  form: PropTypes.object.isRequired,

  label: PropTypes.string,
  disabled: PropTypes.bool,
};
RandomPhotoField.defaultProps = {
  label: '',
  defaultValues: '',
  disabled: false,
};

function RandomPhotoField(props) {
  const { name, label, form, disabled } = props;
  const { errors } = form;
  const errorsMessage = errors[name]?.message;
  const hasErrors = !!errorsMessage;

  const hanldeRandomClick = (onChange) => {
    //random number
    const randomNumber = Math.trunc(Math.random() * 1000);
    //build new url
    const newValue = `https://picsum.photos/id/${randomNumber}/400/200`;
    //update control value : onChange
    onChange(newValue);
  };
  const hanldeRandomClickv2 = () => {
    //random number
    const randomNumber = Math.trunc(Math.random() * 1000);
    //build new url
    const newValue = `https://picsum.photos/id/${randomNumber}/400/200`;
    // //update control value : onChange
    // onChange(newValue);
    form.setValue(name,newValue,{shouldValidate:true});
  };
  return (
    <Box mt={1} mb={2}>
      {/* <Controller
        name={name}
        control={form.control}
        as={TextField}
        disabled={disabled}
        fullWidth
        error={hasErrors}
        label={label}
        helperText={errorsMessage}
        variant="outlined"
      /> */}
      <FormLabel>{label}</FormLabel>
      <Controller
        name={name}
        control={form.control}
        render={({ onChange, onBlur, value, ref }) => (
          <Box>
            <Box
              component="img"
              src={value || 'https://via.placeholder.com/400x200'}
              onError={() => {
                //random number
                const randomNumber = Math.trunc(Math.random() * 1000);
                //build new url
                const newValue = `https://picsum.photos/id/${randomNumber}/400/200`;
                //update control value : onChange
                onChange(newValue);
              }}
            />

            <Button type="button" onClick={hanldeRandomClickv2}>
              Change Image
            </Button>
          </Box>
        )}
      />
    </Box>
  );
}

export default RandomPhotoField;
