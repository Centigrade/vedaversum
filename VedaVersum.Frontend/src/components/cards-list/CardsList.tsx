import { useQuery } from "@apollo/client";
import { useState } from "react";
import {
  ALL_CARDS_QUERY,
  ASSIGNED_CARDS_QUERY,
  CREATED_CARDS_QUERY,
} from "../../api/cards-queries";
import { readAuthContextFromLocalStorage } from "../../authentication/AutContext";
import { GetAllCardsResponse } from "../../model";
import { GetUserAssignedCardsResponse } from "../../model/get-user-assigned-cards-response";
import { GetUserCreatedCardsResponse } from "../../model/get-user-created-cards-response";
import Menu from "../common/Menu";
import CardListItem from "./CardListItem";

function CardsList() {
  // set tab selection
  const tabs: any[] = [
    { name: "all articles", type: "allArticles" },
    { name: "my articles", type: "myArticles" },
    { name: "articles assigned to me", type: "assignedArticles" },
    { name: "my bookmarks", type: "bookmarkedArticles" },
  ];
  const [activeTab, setActiveTab] = useState("allArticles");

  const loginData = readAuthContextFromLocalStorage();
  const loginUser = loginData?.user;
  const loginUserEmail = loginUser?.email!;

  // TODO: is it possible to set a switch case around so that not every time the tab changes all data must be reloaded again?
  /* get data from the database */
  // load all cards
  const {
    error: errorAllCards,
    data: allCardsData,
    loading: loadingAllCards,
  } = useQuery<GetAllCardsResponse>(ALL_CARDS_QUERY, {
    errorPolicy: "all",
  });

  // load all cards created by the user
  const {
    error: errorCreatedData,
    data: allCreatedCardsData,
    loading: loadingCreatedData,
  } = useQuery<GetUserCreatedCardsResponse>(CREATED_CARDS_QUERY, {
    errorPolicy: "all",
    variables: { userEmail: loginUserEmail },
  });

  // load all cards assigned to the user
  const {
    error: errorAssignedCards,
    data: allAssignedCardsData,
    loading: loadingAssignedCards,
  } = useQuery<GetUserAssignedCardsResponse>(ASSIGNED_CARDS_QUERY, {
    errorPolicy: "all",
    variables: { userEmail: loginUserEmail },
  });

  // load all cards bookmarked by the user
  /* const {
    error: errorBookmarkedCards,
    data: allBookmarkedCardsData,
    loading: loadingBookmarkedCards,
  } = useQuery<GetUserCardsResponse>(BOOKMARKED_CARDS_QUERY, {
    errorPolicy: "all",
    variables: { loginUser },
  }); */

  /*allCardsData
    ? console.log(allCardsData.allCards)
    : console.error(errorAllCards);
  allCreatedCardsData
    ? console.log(allCreatedCardsData.allCardsCreatedByUser)
    : console.error(errorCreatedData);
  allAssignedCardsData
    ? console.log(allAssignedCardsData.allCardsAssignedToUser)
    : console.error(errorAssignedCards);*/

  function numberOfArticles(tab: string) {
    switch (tab) {
      case "allArticles":
        if (allCardsData && allCardsData.allCards) {
          return allCardsData.allCards.length;
        } else {
          return "0";
        }
      case "myArticles":
        if (allCreatedCardsData && allCreatedCardsData.allCardsCreatedByUser) {
          return allCreatedCardsData.allCardsCreatedByUser.length;
        } else {
          return "0";
        }
      case "assignedArticles":
        if (
          allAssignedCardsData &&
          allAssignedCardsData.allCardsAssignedToUser
        ) {
          return allAssignedCardsData.allCardsAssignedToUser.length;
        } else {
          return "0";
        }
      default:
        return "0";
      /* case "bookmarkedArticles":
        if (allBookmarkedCardsData && allBookmarkedCardsData.allBookmarkedCards) {
          return allBookmarkedCardsData.allBookmarkedCards.length;
        } else {
          return "0";
        } */
    }
  }

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
              {`${tab.name} (${numberOfArticles(tab.type)})`}
            </button>
          ))}
        </div>
      </div>
      <div className="p-3 veda-versum-border">
        <h5 className="mb-4">
          Sort by
          {/* TODO https://www.javascripttutorial.net/array/javascript-sort-an-array-of-objects/ */}
          <button className="veda-versum-button mx-2">Last modified</button>
          <button className="veda-versum-button mx-2">Alphabet asc</button>
          <button className="veda-versum-button mx-2">Alphabet desc</button>
          <button className="veda-versum-button mx-2">Most upvotes</button>
        </h5>
        {/* show ALL articles */}
        {activeTab === "allArticles" && (
          <div>
            {/* data available */}
            {allCardsData &&
              allCardsData.allCards.map((card, index) => (
                <CardListItem key={index} cardData={card} />
              ))}
            {/* catch other states */}
            {loadingAllCards && <p>Loading...</p>}
            {!allCardsData && <p>Data is empty</p>}
            {errorAllCards && <p>{errorAllCards.message} :(</p>}
          </div>
        )}

        {/* show articles CREATED BY the user */}
        {activeTab === "myArticles" && (
          <div>
            {/* data available */}
            {allCreatedCardsData &&
              allCreatedCardsData.allCardsCreatedByUser.map((card, index) => (
                <CardListItem key={index} cardData={card} />
              ))}
            {/* catch other states */}
            {loadingCreatedData && <p>Loading...</p>}
            {!allCreatedCardsData && <p>Data is empty</p>}
            {errorCreatedData && <p>{errorCreatedData.message} :(</p>}
          </div>
        )}

        {/* show articles the user is ASSIGNED TO */}
        {activeTab === "assignedArticles" && (
          <div>
            {/* data available */}
            {allAssignedCardsData &&
              allAssignedCardsData.allCardsAssignedToUser.map((card, index) => (
                <CardListItem key={index} cardData={card} />
              ))}
            {/* catch other states */}
            {loadingAssignedCards && <p>Loading...</p>}
            {!allAssignedCardsData && <p>Data is empty</p>}
            {errorAssignedCards && <p>{errorAssignedCards.message} :(</p>}
          </div>
        )}

        {/* show articles the user BOOKMARKED */}
        {/* {activeTab === "bookmarkedArticles" && <div> */}
        {/* data available */}
        {/*  {allBookmarkedCardsData &&
              allBookmarkedCardsData.allBookmarkedCards.map((card, index) => (
                <CardListItem key={index} cardData={card} />
              ))} */}
        {/* catch other states */}
        {/*  {loadingBookmarkedCards && <p>Loading...</p>}
            {!allBookmarkedCardsData && <p>Data is empty</p>}
            {errorBookmarkedCards && <p>{errorBookmarkedCards.message} :(</p>}
            </div>} */}
      </div>
    </div>
  );
}

export default CardsList;
