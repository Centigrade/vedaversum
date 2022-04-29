import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { ALL_CARDS_QUERY } from "../../api/cards-queries";
import { GetAllCardsResponse } from "../../model";
import CardListItem from "./CardListItem";
import Menu from "../common/Menu";

function CardsList() {
  // Tab selection
  const tabs: any[] = [
    { name: "all articles", type: "allArticles" },
    { name: "my articles", type: "myArticles" },
    { name: "articles assigned to me", type: "assignedArticles" },
  ];
  const [activeTab, setActiveTab] = useState("allArticles");

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

      {/* Tabs */}
      <div className="d-flex align-items-center p-0">
        <div className="">
          {tabs.map((tab, index) => (
            <button
              key={index}
              onClick={() => setActiveTab(tab.type)}
              className={
                activeTab === tab.type
                  ? "active-tab articles-tab px-2"
                  : "articles-tab px-2"
              }
            >
              {tab.name}
            </button>
          ))}
        </div>
      </div>
      <div className="p-3 veda-versum-border">
        <h5 className="mb-4">
          Sort by
          <button className="veda-versum-button mx-2">Last modified</button>
          <button className="veda-versum-button mx-2">Alphabet asc</button>
          <button className="veda-versum-button mx-2">Alphabet desc</button>
          <button className="veda-versum-button mx-2">Most upvotes</button>
        </h5>
        {/* show ALL articles */}
        {activeTab === "allArticles" && (
          <div>
            {data.allCards.map((card, index) => (
              <CardListItem key={index} cardData={card} />
            ))}
          </div>
        )}

        {/* show articles CREATED BY the user */}
        {activeTab === "myArticles" && <div>MY ARTICLES</div>}

        {/* show articles the user is ASSIGNED TO */}
        {activeTab === "assignedArticles" && <div>ARTICLES ASSIGNED TO ME</div>}
      </div>
    </div>
  );
}

export default CardsList;
