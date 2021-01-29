import React from 'react';
import PropTypes from 'prop-types';
import { Box, Checkbox, FormControl, FormControlLabel } from '@material-ui/core';
import { Controller } from 'react-hook-form';

CheckBoxField.propTypes = {
  name: PropTypes.string.isRequired,
  form: PropTypes.object.isRequired,

  label: PropTypes.string,
  disabled: PropTypes.bool,
};
CheckBoxField.defaultProps = {
  label: '',
  defaultValues: '',
  disabled: false,
};

function CheckBoxField(props) {
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
        error={hasErrors}
        label={label}
        helperText={errorsMessage}
        variant="outlined"
      /> */}
      <FormControl>
      <Controller
        name={name}
        control={form.control}
        render={({ onChange, onBlur, value, ref }) => (
          <FormControlLabel
           
            label={label}
            // error={hasErrors}
            // helperText={errorsMessage}
            control={
              <Checkbox
                name={name}
                error={hasErrors}
                helperText={errorsMessage}
                value={value}
                checked={value}
                onChange={(e) => onChange(e.target.checked)}
                color="primary"
                disabled={disabled}
              />
            }
          />
        )}
      />
      </FormControl>
    </Box>
  );
}

export default CheckBoxField;
