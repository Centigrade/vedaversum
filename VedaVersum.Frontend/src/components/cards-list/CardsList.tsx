import React from 'react';
import { useQuery } from '@apollo/client';
import { ALL_CARDS_QUERY } from '../../api/cards-queries';
import { GetAllCardsResponse } from '../../model';
import CardListItem from './CardListItem';

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

  console.log(data.allCards);

  return (
    <div>
      <h2>Cards list</h2>
      <h5>Sort by</h5>
        {data.allCards.map((card, index) => (
          <CardListItem key={index} cardData={card}/>
        ))}
    </div>
  );
}

export default CardsList;
