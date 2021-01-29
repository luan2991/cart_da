import { Box, Button, Dialog, DialogContent, DialogContentText } from '@material-ui/core';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, changeCart, clearCart, removeFromCart, removeQuantityItem } from './cartSlice';
import CartList from './components/CartList';

CartFeature.propTypes = {};

function CartFeature(props) {
  const cartList = useSelector((state) => state.cart.cartItems);
  const [openRemoveItemDialog, setOpenRemoveItemDialog] = useState(false);
  const [openRemoveAllDialog, setOpenRemoveAllDialog] = useState(false);
  const [openPayDialog, setOpenPayDialog] = useState(false);
  const [openSuccessPayDialog, setOpenSuccessPayDialog] = useState(false);
  const dispatch = useDispatch();

  const handleAddQuantity = (item) => {
    const action = addToCart({
      product: {
        id: item.id,
        name: item.name,
        image: item.images,
        price: item.salePrice,
        quantity: 1,
      },
    });
    dispatch(action);
  };
  const handleRemoveQuantity = (item) => {
    const action = removeQuantityItem({
      product: { id: item.id },
    });
    dispatch(action);
  };
  const handleRemoveAll = () => {
    const action = clearCart();
    dispatch(action);
    setOpenRemoveAllDialog(false);
  };
  const handleRemoveItem = (item) => {
    const action = removeFromCart({
      id: item.id,
    });
    dispatch(action);
    setOpenRemoveItemDialog(false);
  };
  const hanldePay = () => {
    setOpenPayDialog(true);
  };
  const handleOpenRemoveItem = (item) => {
    setOpenRemoveItemDialog(true);
  };

  const handleCloseItem = () => {
    setOpenRemoveItemDialog(false);
  };
  const handleOpenRemoveAll = (item) => {
    setOpenRemoveAllDialog(true);
  };

  const handleCloseAll = () => {
    setOpenRemoveAllDialog(false);
  };

  const handleClosePay = () => {
    setOpenPayDialog(false);
  };

  const hanldeChangeQuantity = (id, value) => {
    const action = changeCart({
      id: id,
      quantity: value,
    });
    dispatch(action);
  };

  const handleBlurQuantity = (id, value) => {
    if (value === '') {
      const action = changeCart({
        id: id,
        quantity: 1,
      });
      dispatch(action);
    }
  };

  const hanldeSuccessPay = () => {
    setOpenPayDialog(false);
    const action = clearCart();
    dispatch(action);
    setOpenSuccessPayDialog(true);
  };

  console.log(cartList);
  return (
    <Box pt={3} pl={3} pr={3} pb={22} bgcolor="#f1f1f1">
      <CartList
        list={cartList}
        openRemoveItem={openRemoveItemDialog}
        openRemoveAll={openRemoveAllDialog}
        openPay={openPayDialog}
        onAddQuantity={handleAddQuantity}
        onRemoveQuantity={handleRemoveQuantity}
        onRemoveAll={handleRemoveAll}
        onRemoveItem={handleRemoveItem}
        onCloseRemoveItem={handleCloseItem}
        onOpenRemoveItem={handleOpenRemoveItem}
        onCloseRemoveAll={handleCloseAll}
        onOpenRemoveAll={handleOpenRemoveAll}
        onPay={hanldePay}
        onClosePay={handleClosePay}
        onChangeQuantity={hanldeChangeQuantity}
        onBlurQuantity={handleBlurQuantity}
        onSuccessPay={hanldeSuccessPay}
      />
      <Dialog open={openSuccessPayDialog}>
        <DialogContent>
          <DialogContentText>Bạn đã thanh toán thành công!</DialogContentText>
        </DialogContent>
        <Box display="flex" justifyContent="center">
          <Button onClick={() => setOpenSuccessPayDialog(false)} color="primary">
            OK
          </Button>
        </Box>
      </Dialog>
    </Box>
  );
}

export default CartFeature;
