import { Box } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import productApi from '../../../../api/productApi';
import EditForm from '../../components/EditForm';

EditPage.propTypes = {};

function EditPage(props) {
  let history = useHistory();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [productDetail, setProductDetail] = useState({});
  useEffect(() => {
    (async () => {
      try {
        const  data  = await productApi.getById(id);

        setProductDetail(data);
        
        setLoading(false);
      } catch (error) {
        console.log('Failed to fetch product detail:', error);
      }
    })();
  }, [id, history]);
  console.log('product', productDetail)
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
      <EditForm product={productDetail} loading={loading} onSubmit={handleSubmit} />
    </Box>
  );
}

export default EditPage;
