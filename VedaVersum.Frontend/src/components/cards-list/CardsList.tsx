import React from 'react';
import { useQuery } from '@apollo/client';
import { ALL_CARDS_QUERY } from '../../api/cards-queries';
import { GetAllCardsResponse } from '../../model';

function CardsList() {
  const { error, data, loading } = useQuery<GetAllCardsResponse>(
    ALL_CARDS_QUERY,
    {
      errorPolicy: 'all',
    }
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error.message} :(</p>;

  if (!data) return <p>Data is empty</p>;

  console.log(data);

  return (
    <>
      <h1>Cards list</h1>
      <ul>
        {data.allCards.map(({ id, title }) => (
          <li key={id}>{title}</li>
        ))}
      </ul>
    </>
  );
}

export default CardsList;
