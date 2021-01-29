import { Box, Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import productApi from '../../../../api/productApi';
import { addToCart } from '../../../CartFeature/cartSlice';
import ProductList from '../../components/ProductList';

ProductListPage.propTypes = {};

function ProductListPage(props) {
  const [pagination, setPagination] = useState({
    _page: 1,
    _limit: 12,
    _totalRows: 1,
  });
  const [filters, setFilters] = useState({
    _page: 1,
    _limit: 12,
    name_like: '',
    _sort: 'createdAt',
    _order: 'desc',
  });
  const [productList, setProductList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [productname, setProductName] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [atoz, setAtoZ] = useState(false);
  const [ztoa, setZtoA] = useState(false);
  const [pricemintomax, setPriceMinToMax] = useState(false);
  const [pricemaxtomin, setPriceMaxToMin] = useState(false);
  const typingSearchTimeoutRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      try {
        const { data, pagination } = await productApi.getAll(filters);
        console.log(data);
        setProductList(data);
        setPagination(pagination);
        setLoading(false);
      } catch (error) {
        console.log('Failed to fetch product list:', error);
      }
    })();
  }, [filters]);
  const hanldePageChange = (event, value) => {
    setLoading(true);
    setFilters({
      ...filters,
      _page: value,
    });
  };
  const handleSuccessClose = () => {
    setSuccess(false);
  };
  const handleAddToCartClick = (product) => {
    const action = addToCart({
      product: {
        id: product.id,
        name: product.name,
        image: product.images[0],
        price: product.salePrice,
        quantity: 1,
      },
    });

    setProductName(product.name);
    setSuccess(true);
    dispatch(action);
  };

  const hanldeFilterSearchChange = (q) => {
    setFilters({
      ...filters,
      _page: 1,
      name_like: q.search,
    });
  };
  const handleSearchTermChange = (value) => {
    const search = value;
    setSearchTerm(value);
    if (!hanldeFilterSearchChange) return;
    if (typingSearchTimeoutRef.current) {
      clearTimeout(typingSearchTimeoutRef.current);
    }
    typingSearchTimeoutRef.current = setTimeout(() => {
      setLoading(false);
      const searchValues = {
        search: search,
      };
      hanldeFilterSearchChange(searchValues);
    }, 400);
  };
  const handleAtoZ = (checked) => {
    setAtoZ(checked);
    setZtoA(false);
    setPriceMaxToMin(false);
    setPriceMinToMax(false);
    if (checked === true) {
      setFilters({
        ...filters,
        _page: 1,
        _sort: 'name',
        _order: 'asc',
      });
    }
    if (checked === false) {
      setFilters({
        _page: 1,
        _limit: 12,
        name_like: '',
        _sort: 'createdAt',
        _order: 'desc',
      });
    }
  };
  const handleZtoA = (checked) => {
    setAtoZ(false);
    setZtoA(checked);
    setPriceMaxToMin(false);
    setPriceMinToMax(false);
    if (checked === true) {
      setFilters({
        ...filters,
        _page: 1,
        _sort: 'name',
        _order: 'desc',
      });
    }
    if (checked === false) {
      setFilters({
        _page: 1,
        _limit: 12,
        name_like: '',
        _sort: 'createdAt',
        _order: 'desc',
      });
    }
  };
  const handleMintoMax = (checked) => {
    setAtoZ(false);
    setZtoA(false);
    setPriceMaxToMin(false);
    setPriceMinToMax(checked);
    if (checked === true) {
      setFilters({
        ...filters,
        _page: 1,
        _sort: 'salePrice',
        _order: 'asc',
      });
    }
    if (checked === false) {
      setFilters({
        _page: 1,
        _limit: 12,
        name_like: '',
        _sort: 'createdAt',
        _order: 'desc',
      });
    }
  };
  const handleMaxtoMin = (checked) => {
    setAtoZ(false);
    setZtoA(false);
    setPriceMaxToMin(checked);
    setPriceMinToMax(false);
    if (checked === true) {
      setFilters({
        ...filters,
        _page: 1,
        _sort: 'salePrice',
        _order: 'desc',
      });
    }
    if (checked === false) {
      setFilters({
        _page: 1,
        _limit: 12,
        name_like: '',
        _sort: 'createdAt',
        _order: 'desc',
      });
    }
  };

  return (
    <Box>
      <Box bgcolor="white">
        <ProductList
          productdata={productList}
          onAddClick={handleAddToCartClick}
          pagination={pagination}
          onPageChange={hanldePageChange}
          loading={loading}
          onSearchChange={handleSearchTermChange}
          searchTerm={searchTerm}
          atoz={atoz}
          ztoa={ztoa}
          min={pricemintomax}
          max={pricemaxtomin}
          onChangePriceMax={handleMaxtoMin}
          onChangePriceMin={handleMintoMax}
          onChangeAtoZ={handleAtoZ}
          onChangeZtoA={handleZtoA}
        />
        <Snackbar
          open={success}
          color="primary"
          autoHideDuration={900}
          onClose={handleSuccessClose}
        >
          <Alert onClose={handleSuccessClose} severity="success">
            Bạn đã thêm sản phẩm {productname} vào giỏ hàng
          </Alert>
        </Snackbar>
      </Box>
    </Box>
  );
}

export default ProductListPage;
