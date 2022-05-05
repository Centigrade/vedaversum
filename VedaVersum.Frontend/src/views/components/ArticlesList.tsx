import { useQuery } from "@apollo/client";
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ALL_ARTICLES_QUERY,
  CREATED_ARTICLES_QUERY,
} from "../../api/articles-queries";
import { readAuthContextFromLocalStorage } from "../../authentication/AutContext";
import { GetAllArticlesResponse, VedaVersumCard } from "../../model";
import { GetUserCreatedArticlesResponse } from "../../model/get-user-created-articles-response";
import Menu from ".//Menu";
import ArticleItem from "./ArticleItem";

function ArticlesList() {
  // login data from user
  const loginData = readAuthContextFromLocalStorage();
  const loginUser = loginData?.user;
  const loginUserEmail = loginUser?.email!;

  /* *** request data *** */
  // TODO: is it possible to set a switch case around so that not every time the tab changes all data must be reloaded again?
  /* get data from the database */
  // load all articles
  const {
    error: errorAllArticles,
    data: allArticlesData,
    loading: loadingAllArticles,
  } = useQuery<GetAllArticlesResponse>(ALL_ARTICLES_QUERY, {
    errorPolicy: "all",
  });

  // load all articles created by the user
  const {
    error: errorCreatedData,
    data: allCreatedArticlesData,
    loading: loadingCreatedData,
  } = useQuery<GetUserCreatedArticlesResponse>(CREATED_ARTICLES_QUERY, {
    errorPolicy: "all",
    variables: { userEmail: loginUserEmail },
  });

  console.log(allCreatedArticlesData);

  /* *** state *** */
  // tab selection
  const tabs: any[] = [
    { name: "all articles", type: "allArticles" },
    { name: "my articles", type: "myArticles" },
  ];
  const [activeTab, setActiveTab] = useState("allArticles");
  // sort selection
  const sortOptions: string[] = ["latest", "relevant"];
  const [activeSort, setActiveSort] = useState("latest");
  // active articles (= articles currently selected by the user)
  // TODO: add await data is loaded
  const [activeArticles, setActiveArticles] = useState(
    allArticlesData ? allArticlesData.allArticles : undefined
  );

  // user changes active articles
  const changeActiveArticles = (selectedTab: string) => {
    setActiveTab(selectedTab);

    if (selectedTab === "allArticles" && allArticlesData) {
      setActiveArticles(allArticlesData?.allArticles);
    } else if (selectedTab === "myArticles" && allCreatedArticlesData) {
      setActiveArticles(allCreatedArticlesData?.allArticlesCreatedByUser);
    } else {
      setActiveArticles(undefined);
    }
  };

  // user changes sorting of articles
  const sortArticlesBy = (articles: VedaVersumCard[], sortBy: string) => {
    let sortedArticles = [...articles];
    setActiveSort(sortBy);

    if (sortBy === "latest") {
      sortedArticles.sort((a: VedaVersumCard, b: VedaVersumCard) =>
        b.created.localeCompare(a.created)
      );
    } else if (sortBy === "relevant") {
      // TODO: implement REAL logic, this is only for testing
      sortedArticles.sort((a: VedaVersumCard, b: VedaVersumCard) =>
        a.created.localeCompare(b.created)
      );
    }

    setActiveArticles(sortedArticles);
  };

  // count number of articles
  function numberOfArticles(tab: string) {
    switch (tab) {
      case "allArticles":
        if (allArticlesData && allArticlesData.allArticles) {
          return allArticlesData.allArticles.length;
        } else {
          return "0";
        }
      case "myArticles":
        if (
          allCreatedArticlesData &&
          allCreatedArticlesData.allArticlesCreatedByUser
        ) {
          return allCreatedArticlesData.allArticlesCreatedByUser.length;
        } else {
          return "0";
        }
      default:
        return "0";
    }
  }

  // capitalize first letter of a given string
  function capitalizeFirstLetter(word: string) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }

  /* *** RENDER COMPONENT *** */
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
              onClick={() => changeActiveArticles(tab.type)}
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
        {activeArticles && (
          // sort options
          <h5 className="mb-4">
            Sort by
            {sortOptions.map((sortBy, index) => (
              <button
                key={index}
                className={
                  activeSort === sortBy
                    ? "active-button veda-versum-button mx-2"
                    : "veda-versum-button mx-2"
                }
                onClick={() => sortArticlesBy(activeArticles, sortBy)}
              >
                {capitalizeFirstLetter(sortBy)}
              </button>
            ))}
          </h5>
        )}
        {/* show articles */}
        <div>
          {/* data available */}
          {activeArticles &&
            activeArticles.map((article, index) => (
              // TODO: pretty url const articleURL = article.title.replace(" ", "-");
              <Link to={`/${article.id}`} key={index}>
                <ArticleItem articleData={article} preview={true} />
              </Link>
            ))}
          {/* data undefined */}
          {(loadingAllArticles || loadingCreatedData) && <p>Loading...</p>}
          {!activeArticles && <p>Data is empty</p>}
          {(errorAllArticles || errorCreatedData) && (
            <p>{errorAllArticles?.message || errorCreatedData?.message} :(</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ArticlesList;
