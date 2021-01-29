import React from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Container,
  Dialog,
  DialogContent,
  DialogContentText,
  makeStyles,
  Typography,
} from '@material-ui/core';
import ShopIcon from '@material-ui/icons/Shop';
import EmptyCart from './../../../../image/empty_cart.png';
import { Link } from 'react-router-dom';
import CartItem from './../CartItem';
import { useSelector } from 'react-redux';
import { totalSelector } from './../../selectors';
import { Delete, MonetizationOn } from '@material-ui/icons';

// const cart_empty= ;
CartList.propTypes = {
  list: PropTypes.array,
  onAddQuantity: PropTypes.func,
  onRemoveQuantity: PropTypes.func,
  onRemoveAll: PropTypes.func,
  onRemoveItem: PropTypes.func,
  onPay: PropTypes.func,
  onCloseRemoveItem: PropTypes.func,
  onOpenRemoveItem: PropTypes.func,
  openRemoveItem: PropTypes.bool,
  openRemoveAll: PropTypes.bool,
  onCloseRemoveAll: PropTypes.func,
  onOpenRemoveAll: PropTypes.func,
  openPay: PropTypes.bool,
  onClosePay: PropTypes.func,
  onChangeQuantity:PropTypes.func,
  onBlurQuantity:PropTypes.func,
  onSuccessPay:PropTypes.func,
};
CartList.defaultProps = {
  list: [],
  onAddQuantity: null,
  onRemoveQuantity: null,
  onRemoveAll: null,
  onRemoveItem: null,
  onPay: null,
  onCloseRemoveItem: null,
  onOpenRemoveItem: null,
  openRemoveItem: false,
  openRemoveAll: false,
  onCloseRemoveAll: null,
  onOpenRemoveAll: null,
  openPay: false,
  onClosePay: null,
  onChangeQuantity:null,
  onBlurQuantity:null,
  onSuccessPay:null,
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
    borderTop: '.1rem dotted #c7c7cd',
  },
}));
function CartList({
  list,
  onAddQuantity,
  onRemoveQuantity,
  onRemoveItem,
  onRemoveAll,
  onPay,
  onCloseRemoveItem,
  onOpenRemoveItem,
  openRemoveItem,
  openRemoveAll,
  onCloseRemoveAll,
  onOpenRemoveAll,
  openPay,
  onClosePay,
  onChangeQuantity,
  onBlurQuantity,
  onSuccessPay,
}) {
  const classes = useStyles();
  const totalAmount = useSelector(totalSelector);
  return (
    <Container fixed>
      <Box bgcolor="white" minHeight={455}>
        <Box display="flex" justifyContent="center" alignContent="center">
          <ShopIcon className={classes.carticon} color="primary" />
          <Typography variant="h2" component="h2">
            Cart
          </Typography>
        </Box>
        {!list.length && (
          <Box>
            <Box mt={4} display="flex" flexDirection="column">
              <Box display="flex" justifyContent="center" alignContent="center">
                <img className={classes.empttycart} alt="Giỏ hàng đang trống" src={EmptyCart} />
              </Box>
              <Box display="flex" justifyContent="center" alignContent="center">
                <Typography className={classes.empty} variant="body1">
                  Giỏ hàng đang trống
                </Typography>
              </Box>
            </Box>
            <Box mt={2} pb={2} display="flex" justifyContent="center" alignContent="center">
              <Link to="/" className={classes.home}>
                <Button variant="contained" color="secondary">
                  Tiếp tục mua sắm
                </Button>
              </Link>
            </Box>
          </Box>
        )}
        {list.length > 0 && (
          <Box display="flex" justifyContent="space-around" pb={2}>
            <Box pb={2} width="70%">
              {list.map((product, index) => (
                <Box className={index === 0 ? '' : classes.border}>
                  <CartItem
                    item={product}
                    openRemoveItem={openRemoveItem}
                    onAddQuantity={onAddQuantity}
                    onRemoveQuantity={onRemoveQuantity}
                    onRemoveItem={onRemoveItem}
                    onCloseRemoveItem={onCloseRemoveItem}
                    onOpenRemoveItem={onOpenRemoveItem}
                    key={product.id}
                    onChangeQuantity={onChangeQuantity}
                    onBlurQuantity={onBlurQuantity}
                  />
                </Box>
              ))}
            </Box>
            <Box
              display="flex"
              width="30%"
              flexDirection="column"
              justifyContent="space-between"
              mr={2}
              minHeight={455}
            >
              <Box>
                <Typography variant="h6">
                  Tổng tiền:
                  {new Intl.NumberFormat('vi-VI', { style: 'currency', currency: 'VND' }).format(
                    totalAmount
                  )}
                </Typography>
                <Button
                  fullWidth
                  variant="contained"
                  onClick={onOpenRemoveAll}
                  color="secondary"
                  startIcon={<Delete />}
                >
                  Xóa hết giỏ hàng
                </Button>
              </Box>
              <Button
                variant="contained"
                onClick={onPay}
                startIcon={<MonetizationOn />}
                color="primary"
              >
                Thanh Toán
              </Button>
            </Box>
          </Box>
        )}
      </Box>
      {/* Open Remove All Dialog */}
      <Dialog open={openRemoveAll} onClose={onCloseRemoveAll}>
        <DialogContent>
          <DialogContentText>Bạn có muốn xóa hết sản phẩm không?</DialogContentText>
        </DialogContent>
        <Box display="flex" justifyContent="space-around">
          <Button autoFocus onClick={onCloseRemoveAll} color="secondary">
            Không
          </Button>
          <Button onClick={onRemoveAll} color="secondary" autoFocus>
            Xóa Hết
          </Button>
        </Box>
      </Dialog>
      {/* Open Pay Dialog */}
      <Dialog open={openPay} onClose={onClosePay}>
        <DialogContent>
          <DialogContentText>Bạn có muốn thanh toán không?</DialogContentText>
        </DialogContent>
        <Box display="flex" justifyContent="center">
          <Button onClick={onClosePay} color="secondary">
            Không
          </Button>
          <Button onClick={onSuccessPay} color="primary">
            Có
          </Button>
        </Box>
      </Dialog>
    </Container>
  );
}

export default CartList;
