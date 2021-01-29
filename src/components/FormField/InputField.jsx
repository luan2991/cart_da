import React from 'react';
import PropTypes from 'prop-types';
import { Box, TextField } from '@material-ui/core';
import { Controller } from 'react-hook-form';

InputField.propTypes = {
  name: PropTypes.string.isRequired,
  form: PropTypes.object.isRequired,
  type: PropTypes.string,
  label: PropTypes.string,
  disabled: PropTypes.bool,
  variant:PropTypes.string,
  defaultValue: PropTypes.string,
};
InputField.defaultProps = {
  label: '',
  disabled: false,
  type: 'text',
  variant:'outlined',
  multiline:false,
  rows:1,
  defaultValue: '',
};

function InputField(props) {
  const { name, type, label, form, disabled,variant,defaultValue, multiline ,rows,} = props;
  const { errors } = form;
  const errorsMessage = errors[name]?.message;
  const hasErrors = !!errorsMessage;
  return (
    <Box >
      <Controller
        name={name}
        control={form.control}
        render={({ onChange, onBlur, value, ref }) => (
          <TextField
            name={name}
            defaultValue={defaultValue}
            multiline={multiline}
            rows={rows}
            disabled={disabled}
            fullWidth
            label={label}
            value={value}
            variant={variant}
            onChange={onChange}
            onBlur={onBlur}
            error={hasErrors}
            helperText={errorsMessage}
            type={type}
          />
        )}
      />
    </Box>
  );
}

export default InputField;
