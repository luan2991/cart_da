import React from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Typography,
  makeStyles,
  TextField,
  IconButton,
  Dialog,
  DialogContent,
  DialogContentText,
  Button,
} from '@material-ui/core';
import { AddCircle, Delete, RemoveCircle } from '@material-ui/icons';
import { Link } from 'react-router-dom';

CartItem.propTypes = {
  item: PropTypes.any.isRequired,
  onAddQuantity: PropTypes.func,
  onRemoveQuantity: PropTypes.func,
  onRemoveItem: PropTypes.func,
  onChangeQuantity:PropTypes.func,
  onBlurQuantity:PropTypes.func,
};
CartItem.defaultProps = {
  onAddQuantity: null,
  onRemoveQuantity: null,
  onRemoveItem: null,
  onChangeQuantity:null,
  onBlurQuantity:null,
};
const useStyles = makeStyles(() => ({
  name: {
    marginLeft: '16px',
  },
  linkdetail:{
    textDecoration:"none",
  }
}));
function CartItem({
  item,
  onAddQuantity,
  onRemoveQuantity,
  onRemoveItem,
  onCloseRemoveItem,
  onOpenRemoveItem,
  openRemoveItem,
  onChangeQuantity,
  onBlurQuantity,
}) {
  const classes = useStyles();
  const quantity = item.product.quantity;
  return (
    <Box>
      <Box display="flex" justifyContent="space-between">
        <Box ml={2} mt={2} mb={2} display="flex">
        <Link className={classes.linkdetail} to={`/${item.product.id}/detail`}>
          <img width={100} height={100} alt={item.product.name} src={item.product.image} />
          </Link>
          <Box>
            <Link className={classes.linkdetail} to={`/${item.product.id}/detail`}>
              <Typography className={classes.name} variant="h6">
                {item.product.name}
              </Typography>
            </Link>
          </Box>
        </Box>
        <Box mr={2} mt={2} mb={2} display="flex" alignItems="center">
          <Typography variant="h6">
            {new Intl.NumberFormat('vi-VI', { style: 'currency', currency: 'VND' }).format(
              item.product.price
            )}
          </Typography>

          <Box ml={1} display="flex">
            <IconButton
              onClick={() => onRemoveQuantity && onRemoveQuantity(item.product)}
              color="secondary"
            >
              <RemoveCircle />
            </IconButton>

            <TextField
              onBlur={(e)=>onBlurQuantity && onBlurQuantity(item.product.id,e.target.value)}
              onChange={(e)=>onChangeQuantity && onChangeQuantity(item.product.id,e.target.value)}
              inputProps={{ min: 0, style: { textAlign: 'center' } }}
              fullWidth
              type="number"
              value={quantity}
            />

            <IconButton
              onClick={() => onAddQuantity && onAddQuantity(item.product)}
              color="primary"
            >
              <AddCircle />
            </IconButton>
          </Box>
          <IconButton onClick={onOpenRemoveItem} color="secondary">
            <Delete />
          </IconButton>
        </Box>
      </Box>
      <Dialog open={openRemoveItem} onClose={onCloseRemoveItem}>
        <DialogContent>
          <DialogContentText>Bạn có muốn xóa sản phẩm này không?</DialogContentText>
        </DialogContent>
        <Box display="flex" justifyContent="space-around">
          <Button  onClick={onCloseRemoveItem} color="secondary">
            Không
          </Button>
          <Button
            onClick={() => onRemoveItem && onRemoveItem(item.product)}
            color="secondary"
            
          >
            Xóa
          </Button>
        </Box>
      </Dialog>
    </Box>
  );
}

export default CartItem;
