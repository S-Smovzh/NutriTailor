import React from 'react';
import { Col, List, ListInlineItem } from 'reactstrap';
import { Meal } from '../../types';

const FullMealInfo = ({ recipeData }: { recipeData: Meal }) => {
  const { name, nutritionScore, linkToOriginal, tags, category, estimatedCookingTimeMinutes, complexity, ingredients, images, videos, stepByStepGuide } =
    recipeData;
  return (
    <Col className="d-flex flex-column gap-3">
      <h2 className="text-center">{name}</h2>
      <div className="text-center">
        <span className="h6 mb-1">Category:</span> <span>{category}</span>
      </div>
      {!Number(estimatedCookingTimeMinutes) && (
        <div className="text-center">
          <span className="h6 mb-1">Estimated Cooking Time not provided</span>
        </div>
      )}
      {complexity && (
        <div className="text-center">
          <span className="h6 mb-1">Complexity:</span> <span>{complexity}</span>
        </div>
      )}
      {images && !!images.length && (
        <div className="d-flex align-content-center justify-content-center">
          {images.map((image, index) => (
            <img src={image} width={400} alt={`Image ${index}`} key={index} />
          ))}
        </div>
      )}
      {videos && !!videos.length && (
        <div className="d-flex align-content-center justify-content-center">
          {videos.map((video, index) => (
            <video src={video} width={400} key={index} controls />
          ))}
        </div>
      )}
      <div style={{ textAlign: 'justify', textIndent: '40px' }}>{stepByStepGuide}</div>
      {ingredients && !!ingredients.length && (
        <div>
          <span className="h6 mb-1">Ingredients:</span>
          <List className="p-0 d-flex flex-column">
            {ingredients.map(({ name, measurement, amount }) => (
              <ListInlineItem key={`${name} - ${amount} ${measurement}`}>
                <span>
                  {name} - {amount} {measurement}
                </span>
              </ListInlineItem>
            ))}
          </List>
        </div>
      )}
      <div>
        <span className="h6 mb-1">Nutrition Score: </span>
        <span>{JSON.stringify(nutritionScore)}</span>
      </div>
      {tags && tags.length && (
        <div>
          <span className="h6 mb-1">Tags: </span>
          {tags.map((tag) => `#${tag}`).join(', ')}
        </div>
      )}
      {linkToOriginal && (
        <span>
          <span className="h6 mb-1">Origin: </span>
          <span className="text-wrap">{linkToOriginal}</span>
        </span>
      )}
    </Col>
  );
};

export { FullMealInfo };
