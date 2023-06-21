import React, { useState, useEffect } from 'react';
import { Spinner, Col, Button } from 'reactstrap';
import { toastr } from 'react-redux-toastr';
import { AxiosResponse } from 'axios';
import { FullMealInfo } from '../../components';
import { apiRequest, handleApiError, handleError } from '../../utils';
import { Meal, Product } from '../../types';
import { ProductList } from '../profile/components';

enum FilterDish {
  BREAKFAST = 'breakfast',
  LUNCH = 'lunch',
  DINNER = 'dinner',
}

enum FilterType {
  USE_PRODUCTS = 'use my products',
  USE_ANY_PRODUCTS = 'use any products',
}

const SuggestedMealsListPage: React.FC = () => {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [filterDish, setFilterDish] = useState<FilterDish | null>(null);
  const [filterType, setFilterType] = useState<FilterType | null>(null);

  useEffect(() => {
    if (!filterDish || !filterType) return;

    (async () => {
      try {
        setLoading(true);
        let response: AxiosResponse;

        if (filterType === FilterType.USE_PRODUCTS && products.length) {
          response = await apiRequest(`/ai-suggestions/${filterDish}/with-products`, { method: 'POST', timeout: 50000, data: { products } });
        } else {
          response = await apiRequest(`/ai-suggestions/${filterDish}`, { timeout: 50000 });
        }

        if (response.data.message) {
          return handleApiError(response.data);
        }
        setMeals((prevMeals) => [response.data, ...prevMeals]);
        setFilterDish(null);
        setFilterType(null);
        setProducts([]);
      } catch (error) {
        handleError('SUGGESTED_MEALS_LIST', error);
        toastr.error('Error', 'Failed to load suggested meals. Reload the page');
      } finally {
        setLoading(false);
      }
    })();
  }, [filterDish, filterType, products]);

  const onFilterDishChange = (dish: FilterDish) => {
    setFilterDish(dish);
  };

  const onFilterTypeChange = (type: FilterType) => {
    setFilterType(type);
  };

  if (loading && !meals.length) {
    return (
      <div className="my-5 w-100 d-flex align-items-center justify-content-center">
        <Spinner color="primary" />
      </div>
    );
  }

  return (
    <Col className="d-flex flex-column gap-3">
      <div className="d-flex align-items-center justify-content-between">
        <div className="d-flex flex-column gap-3">
          <h2>Dish type:</h2>
          <div className="d-flex align-items-center justify-content-between gap-3">
            <div>
              <Button
                color="secondary"
                onClick={() => onFilterDishChange(FilterDish.BREAKFAST)}
                className={filterDish === FilterDish.BREAKFAST ? 'bg-secondary' : 'bg-white'}
              >
                Breakfast
              </Button>
            </div>
            <div>
              <Button
                color="secondary"
                onClick={() => onFilterDishChange(FilterDish.LUNCH)}
                className={filterDish === FilterDish.LUNCH ? 'bg-secondary' : 'bg-white'}
              >
                Lunch
              </Button>
            </div>
            <div>
              <Button
                color="secondary"
                onClick={() => onFilterDishChange(FilterDish.DINNER)}
                className={filterDish === FilterDish.DINNER ? 'bg-secondary' : 'bg-white'}
              >
                Dinner
              </Button>
            </div>
          </div>
        </div>
        <div className="d-flex flex-column gap-3">
          <h2>Ingredients:</h2>
          <div className="d-flex align-items-center justify-content-between gap-3">
            <div>
              <Button
                color="secondary"
                onClick={() => onFilterTypeChange(FilterType.USE_PRODUCTS)}
                className={filterType === FilterType.USE_PRODUCTS ? 'bg-secondary' : 'bg-white'}
              >
                Use my ingredients
              </Button>
            </div>
            <div>
              <Button
                color="secondary"
                onClick={() => onFilterTypeChange(FilterType.USE_ANY_PRODUCTS)}
                className={filterType === FilterType.USE_ANY_PRODUCTS ? 'bg-secondary' : 'bg-white'}
              >
                Use any ingredients
              </Button>
            </div>
          </div>
        </div>
      </div>

      {filterType === FilterType.USE_PRODUCTS && <ProductList products={products} setProducts={setProducts} />}

      {loading && !!meals.length && (
        <div className="my-5 w-100 d-flex align-items-center justify-content-center">
          <Spinner color="primary" />
        </div>
      )}

      {meals &&
        !!meals.length &&
        meals.map((meal, index) => (
          <div key={`${meal.name}-index`} className="mt-4">
            <h1>Meal #{index + 1}</h1>
            <FullMealInfo recipeData={meal} />
          </div>
        ))}
    </Col>
  );
};

export { SuggestedMealsListPage };
