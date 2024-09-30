// ScoresComponent.js
import React from 'react';
import { Card, ListGroup } from 'react-bootstrap';

const ScoresComponent = ({ scores }) => {
  return (
    <Card>
      <Card.Header>Scores</Card.Header>
      <ListGroup variant="flush">
        {scores.map((score, index) => (
          <ListGroup.Item key={index}>
            {score.user_id}: {score.score}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Card>
  );
};

export default ScoresComponent;
