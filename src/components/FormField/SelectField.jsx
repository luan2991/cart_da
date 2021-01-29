import React from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  FormControl,
  FormControlLabel,
  FormLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
} from '@material-ui/core';
import { Controller } from 'react-hook-form';

SelectField.propTypes = {
  name: PropTypes.string.isRequired,
  form: PropTypes.object.isRequired,

  label: PropTypes.string,
  disabled: PropTypes.bool,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    }).isRequired
  ),
};
SelectField.defaultProps = {
  label: '',
  disabled: false,
};

function SelectField(props) {
  const { name, label, options, form, disabled } = props;
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

      <FormControl error={hasErrors} component="fieldset"  >
        <InputLabel id={name}>{label}</InputLabel>
        <Controller
          name={name}
          control={form.control}
          render={({ value, onChange, onBlur }) => {
            <Select labelId={name} label={label} value={value} onChange={onChange} onBlur={onBlur} disabled={disabled}>
              {options.map((option) => (
                <MenuItem value={option.value}>{option.city}</MenuItem>
              ))}
            </Select>;
          }}
        />
      </FormControl>
    </Box>
  );
}

export default SelectField;
