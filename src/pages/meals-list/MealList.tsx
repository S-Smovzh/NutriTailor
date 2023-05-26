import React, { useState, useEffect } from 'react';
import { Spinner, Row, Col, Label, Input } from 'reactstrap';
import { toastr } from 'react-redux-toastr';
import { Meals, PageSize, Sort } from '../../components';
import { apiRequest, handleApiError, handleError } from '../../utils';
import { Meal } from '../../types';

enum SORTING_OPTIONS {
  COOKING_TIME = 'Est. Cooking Time',
  COMPLEXITY = 'Complexity',
  NAME = 'Name',
  CATEGORY = 'Category',
}

enum SORTING_OPTIONS_KEYS {
  'Est. Cooking Time' = 'estimatedCookingTimeMinutes',
  Complexity = 'complexity',
  Name = 'name',
  Category = 'category',
}

const MealListPage: React.FC = () => {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const [filter, setFilter] = useState('');
  const [sort, setSort] = useState<{ name: SORTING_OPTIONS; direction: 1 | -1 }>({ name: SORTING_OPTIONS.NAME, direction: 1 });

  useEffect(() => {
    (async () => {
      const items = await onRequest();
      if (items) {
        setMeals(items);
      }
    })();
  }, [filter, sort, itemsPerPage]);

  useEffect(() => {
    (async () => {
      const items = await onRequest();
      if (items) {
        setMeals([...meals, ...items]);
      }
    })();
  }, [page]);

  const onRequest = async () => {
    try {
      const response = await apiRequest(
        `/meal?filter=${JSON.stringify(filter)}&sort=${JSON.stringify({ [SORTING_OPTIONS_KEYS[sort.name]]: sort.direction })}&skip=${
          (page - 1) * itemsPerPage
        }&limit=${itemsPerPage}`
      );
      if (response.data.message) {
        return handleApiError(response.data);
      }
      return response.data.items;
    } catch (error) {
      handleError('MEALS_LIST', error);
      toastr.error('Error', 'Failed to load meals. Reload the page');
    } finally {
      setLoading(false);
    }
  };

  const handleScroll = () => {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const onFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(event.target.value);
    setPage(1);
  };

  const onPageSizeChange = (size: number) => {
    setItemsPerPage(size);
    setPage(1);
  };

  const onSortOptionChange = (name: SORTING_OPTIONS) => {
    setSort({ ...sort, name });
    setPage(1);
  };

  const onSortDirectionChange = (direction: 1 | -1) => {
    setSort({ ...sort, direction });
    setPage(1);
  };

  if (loading && !meals.length) {
    return (
      <div className="my-5 w-100 d-flex align-items-center justify-content-center">
        <Spinner color="primary" />
      </div>
    );
  }

  return (
    <Col className="d-flex flex-column gap-4">
      <div className="d-flex gap-3">
        <div className="d-flex flex-column justify-content-end w-50">
          <Label htmlFor="filter">Search:</Label>
          <Input id="filter" type="text" value={filter} onChange={onFilterChange} />
        </div>
        <Sort options={Object.values(SORTING_OPTIONS)} selectedOption={sort} onOptionSelect={onSortOptionChange} onDirectionSelect={onSortDirectionChange} />
        <PageSize currentSize={itemsPerPage} onSizeChange={onPageSizeChange} />
      </div>

      <Meals meals={meals} />
      {loading && !!meals.length && (
        <div className="my-5 w-100 d-flex align-items-center justify-content-center">
          <Spinner color="primary" />
        </div>
      )}
    </Col>
  );
};

export { MealListPage };
