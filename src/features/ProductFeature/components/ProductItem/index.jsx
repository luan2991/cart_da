import { Box, Button, IconButton, makeStyles, Paper, Typography } from '@material-ui/core';
import { AddShoppingCart, Edit } from '@material-ui/icons';
import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';


ProductItem.propTypes = {
  loading: PropTypes.bool,
  product: PropTypes.any,
  onAddClick: PropTypes.func,
};

ProductItem.defaultProps = {
  loading: false,
  onAddClick: null,
};

const useStyles = makeStyles(() => ({
  itemlink: {
    textDecoration: 'none',
    color: 'black',
  },
  btnedit: {
    backgroundColor:"black",
    opacity: '0.2',
    '&:hover': {
      backgroundColor:"black",
      opacity: '1',
    },
  },
}));

function ProductItem({ loading, product, onAddClick }) {
  const classes = useStyles();
  return (
    <Box width={200}>
      <Paper variant="outlined">
        <Link className={classes.itemlink} to={`/${product.id}/detail`}>
          <Box
            style={{ backgroundSize: '100% 100%', backgroundImage: `url(${product.images[0]})` }}
            title={product.name}
            width={199}
            height={150}
            pt={1}
            display="flex"
            justifyContent="flex-end"
          >
            <Link to={`/${product.id}/edit`}>
              <IconButton className={classes.btnedit} color="primary">
                <Edit />
              </IconButton>
            </Link>
          </Box>
          <Box mt={1} pb={1} ml={1}>
            <Typography variant="h6" gutterBottom>
              {product.name}
            </Typography>
          </Box>
          <Box mt={1} pb={1} ml={1}>
            <Typography variant="h6" gutterBottom>
              Giá:{' '}
              {new Intl.NumberFormat('vi-VI', { style: 'currency', currency: 'VND' }).format(
                product.salePrice
              )}
            </Typography>
          </Box>
        </Link>
        <Box justifyContent="center" display="flex" alignItems="center">
          <Button
            color="primary"
            onClick={() => onAddClick && onAddClick(product)}
            fullWidth
            variant="contained"
          >
            <AddShoppingCart fontSize="default" />
            Thêm Giỏ Hàng
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}

export default ProductItem;
