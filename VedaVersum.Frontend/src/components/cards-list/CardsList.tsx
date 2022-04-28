import React from "react";
import { useQuery } from "@apollo/client";
import { ALL_CARDS_QUERY } from "../../api/cards-queries";
import { GetAllCardsResponse } from "../../model";
import CardListItem from "./CardListItem";
import Menu from "../common/Menu";

function CardsList() {
  const { error, data, loading } = useQuery<GetAllCardsResponse>(
    ALL_CARDS_QUERY,
    {
      errorPolicy: "all",
    }
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error.message} :(</p>;

  if (!data) return <p>Data is empty</p>;

  console.log(data.allCards);

  return (
    <div className="px-4 py-3 w-75">
      {/* main functionalities */}
      <Menu />

      {/* articles */}
      <h2 className="my-4">Articles</h2>
      <h5 className="mb-4">Sort by</h5>
      <div>
        {data.allCards.map((card, index) => (
          <CardListItem key={index} cardData={card} />
        ))}
      </div>
    </div>
  );
}

export default CardsList;
