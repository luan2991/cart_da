import { Box, Typography } from '@material-ui/core';
import React from 'react';

NotFoundFeature.propTypes = {
    
};

function NotFoundFeature(props) {
    return (
        <Box display="flex" justifyContent="center" alignItems="center">
            <Typography variant="h2">404 Not Found</Typography>
        </Box>
    );
}

export default NotFoundFeature;