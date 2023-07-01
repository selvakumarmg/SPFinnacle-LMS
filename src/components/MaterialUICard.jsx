import React from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';

// Define the styled card component with gradient background
const StyledCard = styled(Card)`
  background: linear-gradient(to right, #e96443, #904e95);
  color: #fff;
`;

const MaterialUICard = () => {
  return (
    <StyledCard>
      <CardContent>
        <Typography variant="h5" component="h2">
          Card Title
        </Typography>
        <Typography variant="body2" component="p">
          This is a sample card with a gradient background.
        </Typography>
      </CardContent>
    </StyledCard>
  );
};

export default MaterialUICard;
