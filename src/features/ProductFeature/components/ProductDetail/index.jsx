import React from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Container,
  Typography,
  makeStyles,
  CircularProgress,
  IconButton,
  TextField,
  Button,
} from '@material-ui/core';
import { AddCircle, AddShoppingCart, FeaturedPlayList, RemoveCircle } from '@material-ui/icons';

ProductDetail.propTypes = {
  changeIdxImg: PropTypes.func.isRequired,
  imagesProduct: PropTypes.array,
  loading: PropTypes.bool,
  onRemoveQuantity: PropTypes.func,
  onAddQuantity: PropTypes.func,
  quantity: PropTypes.number,
  onAddClick: PropTypes.func,
  onChangeQuantity:PropTypes.func,
  onBlurQuantity:PropTypes.func,
};
ProductDetail.defaultProps = {
  changeIdxImg: null,
  idxImg: 0,
  imagesProduct: [],
  loading: true,
  onRemoveQuantity: null,
  onAddQuantity: null,
  quantity: 1,
  onAddClick: null,
  onChangeQuantity:null,
  onBlurQuantity:null,
};

const useStyles = makeStyles(() => ({
  carticon: {
    fontSize: '68px',
  },
  empttycart: {
    width: '500px',
    height: '300px',
  },
  empty: {
    fontWeight: '800',
  },
  home: {
    textDecoration: 'none',
  },
  border: {
    borderRight: '.1rem dotted #c7c7cd',
  },
  bordermainimg: {
    borderBottom: '.1rem dotted #c7c7cd',
  },
  bordersmimg: {
    border: '.1rem dotted #c7c7cd',
    cursor: 'pointer',
    '&:hover': {
      opacity: '0.5',
    },
  },
  imgchose: {
    opacity: '0.5',
  },
}));

function ProductDetail({
  changeIdxImg,
  product,
  idxImg,
  imagesProduct,
  loading,
  onRemoveQuantity,
  onAddQuantity,
  quantity,
  onAddClick,
  onChangeQuantity,
  onBlurQuantity,
}) {
  const classes = useStyles();
  return (
    <Container fixed>
      <Box bgcolor="white" minHeight={455} pb={2}>
        <Box display="flex" justifyContent="center" alignContent="center">
          <FeaturedPlayList className={classes.carticon} color="primary" />
          <Typography variant="h2" component="h2">
            Chi tiết sản phẩm
          </Typography>
        </Box>
        {loading === false && (
          <Box mt={2} ml={2} mr={2} display="flex" flexDirection="row">
            <Box display="flex" flexDirection="column" className={classes.border}>
              <Box
                ml={2}
                pb={2}
                className={classes.bordermainimg}
                display="flex"
                justifyContent="center"
              >
                <img
                  alt={product.name}
                  width={444}
                  height={444}
                  src={
                    imagesProduct.length < 0
                      ? 'https://via.placeholder.com/444x444.png'
                      : imagesProduct[idxImg]
                  }
                />
              </Box>
              <Box display="flex" ml={2} mt={1}>
                {imagesProduct.length < 0 && (
                  <Box borderRadius={1} mr={2} className={classes.bordersmimg}>
                    <img
                      alt={product.name}
                      width={64}
                      height={64}
                      src="https://via.placeholder.com/444x444.png"
                    />
                  </Box>
                )}
                {imagesProduct.length > 0 &&
                  imagesProduct.map(
                    (image, index) =>
                      index < 6 && (
                        <Box
                          className={classes.bordersmimg}
                          borderRadius={1}
                          display="flex"
                          justifyContent="center"
                          alignContent="center"
                          mr={2}
                          key={index}
                          onClick={() => changeIdxImg && changeIdxImg(index)}
                        >
                          <img
                            alt={product.name}
                            className={index === idxImg ? classes.imgchose : ''}
                            width={64}
                            height={64}
                            src={image}
                          />
                        </Box>
                      )
                  )}
              </Box>
            </Box>
            <Box display="flex" flexDirection="column" ml={1}>
              <Typography variant="h4">{product.name}</Typography>
              <Typography variant="h4">
                {new Intl.NumberFormat('vi-VI', { style: 'currency', currency: 'VND' }).format(
                  product.salePrice
                )}
              </Typography>

              <Box mt={2} width={300} display="flex">
                <IconButton
                  onClick={() => onRemoveQuantity && onRemoveQuantity()}
                  color="secondary"
                >
                  <RemoveCircle />
                </IconButton>

                <TextField onBlur={(e)=>onBlurQuantity && onBlurQuantity(e.target.value)}
                  onChange={(e)=>onChangeQuantity && onChangeQuantity(e.target.value)}
                  inputProps={{ min: 0, style: { textAlign: 'center' } }}
                  fullWidth
                  type="number"
                  value={quantity}
                />

                <IconButton onClick={() => onAddQuantity && onAddQuantity()} color="primary">
                  <AddCircle />
                </IconButton>
              </Box>
              <Box width={300}>
                <Button
                  color="primary"
                  onClick={() => onAddClick && onAddClick(product, quantity, imagesProduct[0])}
                  fullWidth
                  variant="contained"
                >
                  <AddShoppingCart fontSize="default" />
                  Thêm vào Giỏ Hàng
                </Button>
              </Box>
            </Box>
          </Box>
          
        )}
       
        {loading === true && (
          <Box
            className={classes.loading}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <CircularProgress />
            <Box mr={1}></Box>
            <CircularProgress />
            <Box mr={1}></Box>
            <CircularProgress />
          </Box>
        )}
      </Box>
      {loading === false && (
          <Box pl={1} pr={1} pt={1} bgcolor="white" dangerouslySetInnerHTML={{__html: product.description}} minHeight={455} mt={2}>

          </Box>
        )}
    </Container>
  );
}

export default ProductDetail;
