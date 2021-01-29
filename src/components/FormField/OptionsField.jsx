import React from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  ButtonGroup,
  FormControl,
  FormLabel,
} from '@material-ui/core';
import { Controller } from 'react-hook-form';

OptionField.propTypes = {
  name: PropTypes.string.isRequired,
  form: PropTypes.object.isRequired,

  label: PropTypes.string,
  disabled: PropTypes.bool,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    })
  ).isRequired,
  onChange: PropTypes.func,
};

OptionField.defaultProps = {
  label: '',
  disabled: false,
  onChange:null,
};

function OptionField(props) {
  const { name, label, form, disabled, options } = props;
  const { errors } = form;
  const errorMessage = errors[name]?.message;
  const hasError = !!errorMessage;
 const externalOnChange=props.onChange||(()=>{});
  return (
    <Box mt={1} mb={2}>
      <FormControl error={hasError} component="fieldset">
        <FormLabel component="legend">{label}</FormLabel>
        <Controller
          name={name}
          control={form.control}
          render={({ value, onChange, onBlur }) => (
            <ButtonGroup color="primary" aria-label="outlined primary button group">
            {options.map((option) => (
              <Button
                
                variant={option.value === value ? 'contained' : 'outlined'}
                onClick={() => {
                  onChange(option.value)
                  externalOnChange(option.value)
                }}
                key={option.value}
                disabled={disabled}
                onBlur={onBlur}
              >
                {option.label}
              </Button>))}
              
            </ButtonGroup>
          )}
        />
        {/* <Controller
          name={name}
          control={form.control}
          render={({ value, onChange, onBlur }) => (
            <RadioGroup
              aria-label={name}
              name={name}
              value={value}
              onChange={onChange}
              onBlur={onBlur}
            >
              {options.map((option) => (
                <FormControlLabel
                  key={option.value}
                  value={option.value}
                  control={<Radio color="primary" />}
                  label={option.label}
                  disabled={disabled}
                />
              ))}
            </RadioGroup>
          )}
        />*/}
        {/* <FormHelperText>{errorMessage}</FormHelperText> */}
      </FormControl>
    </Box>
  );
}

export default OptionField;
