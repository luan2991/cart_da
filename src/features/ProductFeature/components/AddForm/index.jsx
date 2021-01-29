import React from 'react';
import PropTypes from 'prop-types';
import { Box, Container, Typography, makeStyles, Button } from '@material-ui/core';
import { AddToQueue } from '@material-ui/icons';
import InputField from '../../../../components/FormField/InputField';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
AddForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
AddForm.defaultProps = {};

const useStyles = makeStyles(() => ({
  addicon: {
    fontSize: '68px',
  },
}));

function AddForm({ onSubmit }) {
  const classes = useStyles();
  const schema = yup.object().shape({
    name: yup
      .string()
      .required('Mời bạn nhập tên sản phẩm.')
      .test('Tên sản phẩm phải có ít nhất 2 từ', 'Tên sản phẩm quá ngắn.', (value) => {
        return value.split(' ').length >= 2;
      }),

    price: yup
      .number()
      .required('MỜi bạn nhập giá sản phẩm.')
      .min(1000, 'Giá sản phẩm không được thấp hơn 1000 đ'),
    description: yup
      .string()
      .required('Mời bạn nhập chi tiết sản phẩm.')
      .test('Chi tiết sản phẩm phải có ít nhất 2 từ', 'Chi tiết sản phẩm quá ngắn.', (value) => {
        return value.split(' ').length >= 2;
      }),
  });
  const form = useForm({
    mode: 'onBlur',
    defaultValues: {
      name: '',
      price: '',
      description: '',
    },
    resolver: yupResolver(schema),
  });
  const handleFormSubmit = async (values) => {
    console.log('Submit values: ', values);
    if (onSubmit) {
      await onSubmit(values);
    }
  };
  const { isSubmitting } = form.formState;
  return (
    <Container fixed>
      <Box bgcolor="white" minHeight={455} pb={2}>
        <Box display="flex" justifyContent="center" alignContent="center">
          <AddToQueue className={classes.addicon} color="primary" />
          <Typography variant="h2" component="h2">
            Thêm sản phẩm
          </Typography>
        </Box>

        <form noValidate autoComplete="off" onSubmit={form.handleSubmit(handleFormSubmit)}>
          <Box mt={2} mr={2} display="flex" flexDirection="row">
            <Box width={800} ml={2}>
              <InputField name="name" type="text" label="Tên sản phẩm" form={form} />
            </Box>
            <Box ml={2}>
              <InputField name="price" type="number" label="Giá sản phẩm" form={form} />
            </Box>
          </Box>

          <Box ml={2} mt={2} mr={2}>
            <InputField
              name="description"
              type="text"
              multiline={true}
              rows={4}
              label="Chi tiết sản phẩm"
              form={form}
            />
          </Box>
          <Box mt={2} display="flex" justifyContent="center">
            <Button disabled={isSubmitting} type="submit" color="primary" variant="contained">
              Thêm sản phẩm
            </Button>
          </Box>
        </form>
      </Box>
    </Container>
  );
}

export default AddForm;
