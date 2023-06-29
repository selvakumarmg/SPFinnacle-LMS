import React from 'react';
import { Card } from 'antd';
import '../styles/animatedCard.css';

const AnimatedCard = () => {
  return (
    <Card className="animated-card">
      <div className="animated-card-content">
        <h2>Animated Card</h2>
        <p>This is a sample animated card using Ant Design.</p>
      </div>
    </Card>
  );
};

export default AnimatedCard;
