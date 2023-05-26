import React from 'react';
import { Card, CardBody, CardImg, CardTitle, Col, List, ListInlineItem, Row } from 'reactstrap';
import { Meal } from '../../types';
import { Link } from 'react-router-dom';
import { Pages } from '../../enums';

type MealsProps = {
  meals: Meal[];
};

const Meals = ({ meals }: MealsProps) => (
  <Row>
    {!!meals.length &&
      meals.map(({ _id, images, name, nutritionScore, linkToOriginal, tags, category, estimatedCookingTimeMinutes, complexity, ingredients }) => (
        <Col key={_id ?? name} md={4} className="d-flex align-items-stretch">
          <Link to={Pages.MEAL.replace(':mealId', _id)} className="d-flex text-decoration-none">
            <Card className="mb-3 text-dark">
              <CardBody>
                <Col className="d-flex flex-column gap-3">
                  <CardTitle tag="h5">{name}</CardTitle>
                  {images && !!images.length && <CardImg src={images[0]} alt={name} />}
                  <span>
                    <span className="h6 mb-1">Category:</span> <span>{category}</span>
                  </span>
                  {ingredients && !!ingredients.length && (
                    <div>
                      <span className="h6 mb-1">Ingredients:</span>
                      <List className="p-0 d-flex flex-column">
                        {ingredients.slice(0, 5).map(({ name, measurement, amount }) => (
                          <ListInlineItem key={`${name} - ${amount} ${measurement}`}>
                            <span>
                              {name} - {amount} {measurement}
                            </span>
                          </ListInlineItem>
                        ))}
                        <ListInlineItem>...</ListInlineItem>
                      </List>
                    </div>
                  )}
                  {nutritionScore && <>{nutritionScore}</>}
                  {Number(estimatedCookingTimeMinutes) > 0 && (
                    <span>
                      <span className="h6 mb-1">Estimated Cooking Time:</span> <span>{estimatedCookingTimeMinutes} minutes</span>
                    </span>
                  )}
                  {!Number(estimatedCookingTimeMinutes) && (
                    <span>
                      <span className="h6 mb-1">Estimated Cooking Time not provided</span>
                    </span>
                  )}
                  {tags && tags.length && (
                    <div>
                      <span className="h6 mb-1">Tags: </span>
                      {tags
                        .slice(0, 5)
                        .map((tag) => `#${tag}`)
                        .join(', ')}
                    </div>
                  )}
                  {complexity && (
                    <span>
                      <span className="h6 mb-1">Complexity:</span> <span>{complexity}</span>
                    </span>
                  )}
                  {linkToOriginal && (
                    <span>
                      <span className="h6 mb-1">Origin: </span>
                      <span className="text-wrap">{linkToOriginal}</span>
                    </span>
                  )}
                </Col>
              </CardBody>
            </Card>
          </Link>
        </Col>
      ))}
  </Row>
);

export { Meals };
