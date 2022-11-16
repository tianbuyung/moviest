import React from 'react';
import { Box, Button, styled, Typography } from '@mui/material';

const PageButton = styled(Button)({
  margin: '30px 2px',
});

const Pagination = ({ currentPage, totalPages, setPage }) => {
  const handlePrev = () => {
    if (currentPage !== 1) {
      setPage((prevPage) => prevPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage !== totalPages) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  if (totalPages === 0) return null;

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <PageButton variant="contained" color="primary" type="button" onClick={handlePrev}>
        Prev
      </PageButton>
      <Typography
        variant="h4"
        sx={{ margin: '0 20px !important', color: (theme) => theme.palette.text.primary }}
      >
        {currentPage}
      </Typography>
      <PageButton variant="contained" color="primary" type="button" onClick={handleNext}>
        Next
      </PageButton>
    </Box>
  );
};

export default Pagination;
