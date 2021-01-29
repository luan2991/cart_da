import {
  Box,
  CircularProgress,
  Container,
  FormControlLabel,
  IconButton,
  InputAdornment,
  makeStyles,
  TextField,
  Typography,
} from '@material-ui/core';
import Switch from '@material-ui/core/Switch';
import { Search } from '@material-ui/icons';
import { Pagination } from '@material-ui/lab';
import PropTypes from 'prop-types';
import React from 'react';
import ProductItem from '../ProductItem';

ProductList.propTypes = {
  loading: PropTypes.bool,
  productdata: PropTypes.array.isRequired,
  pagination: PropTypes.object.isRequired,
  onPageChange: PropTypes.func,
  onAddClick: PropTypes.func,
  onSearchChange: PropTypes.func,
  searchTerm: PropTypes.string,
  onChangePriceMax: PropTypes.func,
  onChangePriceMin: PropTypes.func,
  onChangeAtoZ: PropTypes.func,
  onChangeZtoA: PropTypes.func,
  atoz: PropTypes.bool,
  ztoa: PropTypes.bool,
  min: PropTypes.bool,
  max: PropTypes.bool,
};
ProductList.defaultsProps = {
  loading: true,
  onPageChange: null,
  onAddClick: null,
  onSearchChange: null,
  searchTerm: '',
  onChangePriceMax: null,
  onChangePriceMin: null,
  onChangeAtoZ: null,
  onChangeZtoA: null,
  atoz: null,
  ztoa: null,
  min: null,
  max: null,
};

const useStyle = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  loading: {
    display: 'flex',
    '& > *': {
      marginLeft: theme.spacing(2),
    },
  },
}));

function ProductList({
  loading,
  productdata,
  onPageChange,
  pagination,
  onAddClick,
  onSearchChange,
  searchTerm,
  onChangePriceMax,
  onChangePriceMin,
  onChangeAtoZ,
  onChangeZtoA,
  atoz,
  ztoa,
  min,
  max,
}) {
  const classes = useStyle();
  const { _page, _limit, _totalRows } = pagination;
  const totalPages = Math.ceil(_totalRows / _limit);

  const handlePageChange = (event, value) => {
    if (onPageChange) {
      console.log(value);
      onPageChange(event, value);
    }
  };

  return (
    <Container fixed>
      <Box justifyContent="center">
        <Typography align="center" variant="h2" component="h2">
          Sản Phẩm
        </Typography>
        <TextField
          fullWidth
          label="Search"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment>
                <IconButton>
                  <Search />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Box>

      <Box pt={2} pb={2}>
        {loading === true && (
          <Box className={classes.loading} alignItems="center" justifyContent="center">
            <CircularProgress />
            <CircularProgress />
            <CircularProgress />
          </Box>
        )}
        {loading === false && productdata.length > 0 && (
          <Box display="flex">
            <Box>
              <Box className={classes.root} maxWidth={900}>
                {productdata.map((product) => (
                  <Box key={product.id} ml={1} mb={1}>
                    <ProductItem onAddClick={onAddClick} product={product} />
                  </Box>
                ))}
              </Box>
              <Box display="flex" mt={2} justifyContent="center" alignItems="center">
                <Pagination
                  count={totalPages}
                  page={_page}
                  onChange={handlePageChange}
                  siblingCount={1}
                  boundaryCount={2}
                  variant="outlined"
                  color="primary"
                />
              </Box>
            </Box>
            <Box width="30%" mr={2}>
              <Typography component="h5" variant="h5">
                Sắp xếp sản phẩm
              </Typography>
              <FormControlLabel
                control={
                  <Switch
                    checked={atoz}
                    onChange={(e) => onChangeAtoZ && onChangeAtoZ(e.target.checked)}
                    name="atoz"
                  />
                }
                label="A->Z"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={ztoa}
                    onChange={(e) => onChangeZtoA && onChangeZtoA(e.target.checked)}
                    name="ztoa"
                  />
                }
                label="Z->A"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={min}
                    onChange={(e) => onChangePriceMin && onChangePriceMin(e.target.checked)}
                    name="mintomax"
                  />
                }
                label="$ min -> $ max"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={max}
                    onChange={(e) => onChangePriceMax && onChangePriceMax(e.target.checked)}
                    name="maxtomin"
                  />
                }
                label="$ max -> $ min"
              />
            </Box>
          </Box>
        )}
        {!productdata.length && loading === false && (
          <Box minHeight={400} display="flex" justifyContent="center">
            <Typography> Không tìm thấy sản phẩm bạn cần</Typography>
          </Box>
        )}
      </Box>
    </Container>
  );
}

export default ProductList;
