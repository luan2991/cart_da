import { Box, Button, Dialog, DialogContent, DialogContentText } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import productApi from '../../../../api/productApi';
import { addToCart } from '../../../CartFeature/cartSlice';
import ProductDetail from './../../components/ProductDetail';

ProductDetailPage.propTypes = {};

function ProductDetailPage(props) {
  let history = useHistory();
  const { id } = useParams();
  const [productDetail, setProductDetail] = useState([]);
  const [indexImg, setIndexImg] = useState(0);
  const [imgsProduct, setImgsProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [success, setSuccess] = useState(false);
  const dispatch = useDispatch();
  const handleAddQuantity = () => {
    setQuantity((x) => x + 1);
  };
  const handleRemoveQuantity = () => {
    if (quantity > 1) setQuantity((x) => x - 1);
    else setQuantity(1);
  };
  const hanldeAddtoCart = (product, quantity, image) => {
    const action = addToCart({
      product: {
        id: product.id,
        name: product.name,
        image: image,
        price: product.salePrice,
        quantity: quantity,
      },
    });
    dispatch(action);
    setSuccess(true);
  };
  useEffect(() => {
    (async () => {
      try {
        const result = await productApi.getById(id);
        setProductDetail(result);
        setImgsProduct(result.images);
        setLoading(false);
      } catch (error) {
        console.log('Failed to fetch product detail:', error);
        history.push('/not-found');
      }
    })();
  }, [id, history]);
  const hanldeChangleImage = (index) => {
    setIndexImg(index);
  };
  const onCloseDialog = () => {
    setSuccess(false);
  };
  const hanldeChangeQuantity = (value) => {
    setQuantity(value);
  };
  const handleBlurQuantity = (value) => {
    if (value === '') setQuantity(1);
  };
  return (
    <Box pt={3} pl={3} pr={3} pb={22} bgcolor="#f1f1f1">
      <ProductDetail
        idxImg={indexImg}
        loading={loading}
        imagesProduct={imgsProduct}
        changeIdxImg={hanldeChangleImage}
        product={productDetail}
        onRemoveQuantity={handleRemoveQuantity}
        onAddQuantity={handleAddQuantity}
        quantity={quantity}
        onAddClick={hanldeAddtoCart}
        onChangeQuantity={hanldeChangeQuantity}
        onBlurQuantity={handleBlurQuantity}
      />
      <Dialog open={success} onClose={onCloseDialog}>
        <DialogContent>
          <DialogContentText>Bạn thêm sản phẩm vào giỏ hàng thành công!</DialogContentText>
        </DialogContent>
        <Box display="flex" justifyContent="space-around">
          <Button onClick={onCloseDialog} color="primary">
            OK
          </Button>
        </Box>
      </Dialog>
    </Box>
  );
}

export default ProductDetailPage;
