import { Box } from '@material-ui/core';
import React from 'react';
import AddForm from '../../components/AddForm';

AddPage.propTypes = {};

function AddPage(props) {

  const handleSubmit = async (values) => {
    //   await studentApi.add(values);
    //   // re-fetch student list with current filters
    //   setFilters((x) => ({ ...x }));
    //   setOpen(false);
    //   return;
    console.log('is Add new item', values);
  };
  return (
    <Box pt={3} pl={3} pr={3} pb={22} bgcolor="#f1f1f1">
      <AddForm  onSubmit={handleSubmit} />
    </Box>
  );
}

export default AddPage;
