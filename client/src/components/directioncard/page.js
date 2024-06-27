// components/DirectionsCard.js
import React from 'react';
import { Card, CardHeader, CardContent, CardFooter, Button } from '@rafty/ui';

const DirectionsCard = ({ direction }) => {
  return (
    <Card>
      <CardHeader>Directions</CardHeader>
      <CardContent>
        {direction}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" colorScheme="error">
          Delete
        </Button>
        <Button variant="outline">View on Map</Button>
      </CardFooter>
    </Card>
  );
};

export default DirectionsCard;
