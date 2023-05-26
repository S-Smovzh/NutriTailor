import React, { useEffect, useState } from 'react';
import { Row, Spinner } from 'reactstrap';
import { toastr } from 'react-redux-toastr';
import { apiRequest, handleApiError, handleError } from '../../utils';
import { Meal } from '../../types';
import { useParams } from 'react-router';
import { FullMealInfo } from '../../components';

const MealPage: React.FC = () => {
  const { mealId } = useParams();
  const [recipeData, setRecipeData] = useState<Meal | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipeData = async () => {
      try {
        const response = await apiRequest(`/meal/${mealId}`);
        if (response.data) {
          const { data } = response;
          if (data.message) {
            return handleApiError(data);
          } else {
            setRecipeData(response.data);
          }
        }
      } catch (error) {
        handleError('MEAL_PAGE', error);
        toastr.error('Error', 'Failed to load the receipt. Reload the page or try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchRecipeData();
  }, [mealId]);

  return (
    <Row>
      {loading && <Spinner color="primary" />}
      {!loading && !recipeData && <div>Failed to load recipe data.</div>}
      {!loading && !!recipeData && <FullMealInfo recipeData={recipeData} />}
    </Row>
  );
};

export { MealPage };
