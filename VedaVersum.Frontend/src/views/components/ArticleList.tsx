import { useQuery } from "@apollo/client";
import {
  ALL_ARTICLES_QUERY,
  CREATED_ARTICLES_QUERY,
} from "api/articles-queries";
import { readAuthContextFromLocalStorage } from "authentication/AutContext";
import { GetAllArticlesResponse, VedaVersumArticle } from "model";
import { GetUserCreatedArticlesResponse } from "model/get-user-created-articles-response";
import { useState } from "react";
import { Link } from "react-router-dom";
import ArticleItem from "views/components/ArticleItem";
import "views/styles/ArticleList.scss";

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

  /* *** state *** */
  interface tab {
    name: string;
    type: string;
  }
  // tab selection
  const tabs: any[] = [
    { name: "All", type: "allArticles" },
    { name: "New", type: "newArticles" }, // TODO: new = articles the user missed or just sort by latest?
    { name: "Trending", type: "trendingArticles" },
    { name: "Yours", type: "myArticles" },
  ];
  const [activeTab, setActiveTab] = useState("allArticles");
  // active articles (= articles currently selected by the user)
  // TODO: add await data is loaded
  const [activeArticles, setActiveArticles] = useState(
    allArticlesData ? allArticlesData.allArticles : undefined
  );

  // user changes active articles
  const changeActiveArticles = (selectedTab: string) => {
    setActiveTab(selectedTab);

    switch (selectedTab) {
      case "allArticles":
        allArticlesData
          ? setActiveArticles(allArticlesData.allArticles)
          : setActiveArticles(undefined);
        break;
      case "newArticles":
        activeArticles
          ? sortArticlesBy("latest")
          : setActiveArticles(undefined);
        break;
      case "trendingArticles":
        activeArticles
          ? sortArticlesBy("relevant")
          : setActiveArticles(undefined);
        break;
      case "myArticles":
        allArticlesData
          ? setActiveArticles(allCreatedArticlesData?.allArticlesCreatedByUser)
          : setActiveArticles(undefined);
        break;
      default:
        setActiveArticles(undefined);
        break;
    }
  };

  // user changes sorting of articles
  function sortArticlesBy(sortBy: string) {
    if (allArticlesData?.allArticles) {
      let sortedArticles = [...allArticlesData.allArticles];

      if (sortBy === "latest") {
        sortedArticles.sort((a: VedaVersumArticle, b: VedaVersumArticle) =>
          b.created.localeCompare(a.created)
        );
      } else if (sortBy === "relevant") {
        // TODO: implement REAL logic, this is only for testing
        sortedArticles.sort((a: VedaVersumArticle, b: VedaVersumArticle) =>
          a.created.localeCompare(b.created)
        );
      }
      setActiveArticles(sortedArticles);
    } else {
      setActiveArticles(undefined);
    }
  }

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
        if (allArticlesData && allArticlesData.allArticles) {
          return allArticlesData.allArticles.length;
        } else {
          return "0";
        }
    }
  }

  /* *** RENDER COMPONENT *** */
  return (
    <div className="article-list">
      <h1>Start reading</h1>
      {/* Tabs */}
      <div className="d-flex align-items-center p-0">
        <div className="d-flex">
          {tabs.map((tab, index) => (
            <div
              key={index}
              onClick={() => changeActiveArticles(tab.type)}
              className={
                activeTab === tab.type ? "tab selected-tab px-2" : "tab px-2"
              }
            >
              {/* TODO: number only for debugging */}
              {`${tab.name} (${numberOfArticles(tab.type)})`}
            </div>
          ))}
        </div>
      </div>
      <div className="p-3">
        {/* show articles */}
        <div>
          {/* data available */}
          {activeArticles &&
            activeArticles.map((article, index) => (
              // TODO: pretty url
              // const articleURL = article.title.replace(" ", "-"); /${replaceSpaces(article.title)}
              <Link to={`/${article.id}`} key={index}>
                {/* <Link
                to={{
                  pathname: `/${article.title}`,
                  state: { id: article.id },
                }}
                key={index}
              > */}
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
