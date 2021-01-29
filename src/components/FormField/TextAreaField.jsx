import React from 'react';
import PropTypes from 'prop-types';
import { Box, TextField } from '@material-ui/core';
import { Controller } from 'react-hook-form';

TextAreaField.propTypes = {
  name: PropTypes.string.isRequired,
  form: PropTypes.object.isRequired,

  label: PropTypes.string,
  disabled: PropTypes.bool,
};
TextAreaField.defaultProps = {
  label: '',
  defaultValues: '',
  disabled: false,
};

function TextAreaField(props) {
  const { name, label, form, disabled } = props;
  const { errors } = form;
  const errorsMessage = errors[name]?.message;
  const hasErrors = !!errorsMessage;
  return (
    <Box mt={1} mb={2}>
      {/* <Controller
        name={name}
        control={form.control}
        as={TextField}
        disabled={disabled}
        fullWidth
        multiline
        rows={4}
        error={hasErrors}
        label={label}
        helperText={errorsMessage}
        variant="outlined"
      /> */}
      <Controller
        name={name}
        control={form.control}
        render={({ onChange, onBlur, value, ref }) => (
          <TextField
            name={name}
            disabled={disabled}
            fullWidth
            multiline
            rows={4}
            label={label}
            value={value}
            variant="outlined"
            onChange={onChange}
            onBlur={onBlur}
            error={hasErrors}
            helperText={errorsMessage}
          />
        )}
      />
    </Box>
  );
}

export default TextAreaField;
