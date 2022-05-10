import { useQuery } from '@apollo/client';
import { useState } from 'react';
import {
  ALL_ARTICLES_QUERY,
  CREATED_ARTICLES_QUERY,
} from '../../api/articles-queries';
import { readAuthContextFromLocalStorage } from '../../authentication/AutContext';
import { GetAllArticlesResponse, VedaVersumArticle } from '../../model';
import { GetUserCreatedArticlesResponse } from '../../model/get-user-created-articles-response';
import Menu from '../common/Menu';
import CardListItem from './CardListItem';

function CardsList() {
  // login data from user
  const loginData = readAuthContextFromLocalStorage();
  const loginUser = loginData?.user;
  const loginUserEmail = loginUser?.email!;

  /* *** request data *** */
  // TODO: is it possible to set a switch case around so that not every time the tab changes all data must be reloaded again?
  /* get data from the database */
  // load all articles
  const {
    error: errorAllCards,
    data: allCardsData,
    loading: loadingAllCards,
  } = useQuery<GetAllArticlesResponse>(ALL_ARTICLES_QUERY, {
    errorPolicy: 'all',
  });

  // load all articles created by the user
  const {
    error: errorCreatedData,
    data: allCreatedCardsData,
    loading: loadingCreatedData,
  } = useQuery<GetUserCreatedArticlesResponse>(CREATED_ARTICLES_QUERY, {
    errorPolicy: 'all',
    variables: { userEmail: loginUserEmail },
  });

  /* *** state *** */
  // tab selection
  const tabs: any[] = [
    { name: 'all articles', type: 'allArticles' },
    { name: 'my articles', type: 'myArticles' },
  ];
  const [activeTab, setActiveTab] = useState('allArticles');
  // sort selection
  const sortOptions: string[] = ['latest', 'relevant'];
  const [activeSort, setActiveSort] = useState('latest');
  // active articles (= articles currently selected by the user)
  // TODO: add await data is loaded
  const [activeArticles, setActiveArticles] = useState(
    allCardsData ? allCardsData.allArticles : undefined
  );

  // user changes active articles
  const changeActiveArticles = (selectedTab: string) => {
    setActiveTab(selectedTab);

    if (selectedTab === 'allArticles' && allCardsData) {
      setActiveArticles(allCardsData?.allArticles);
    } else if (selectedTab === 'myArticles' && allCreatedCardsData) {
      setActiveArticles(allCreatedCardsData?.allArticlesCreatedByUser);
    } else {
      setActiveArticles(undefined);
    }
  };

  // user changes sorting of articles
  const sortArticlesBy = (articles: VedaVersumArticle[], sortBy: string) => {
    let sortedArticles = [...articles];
    setActiveSort(sortBy);

    if (sortBy === 'latest') {
      sortedArticles.sort((a: VedaVersumArticle, b: VedaVersumArticle) =>
        b.created.localeCompare(a.created)
      );
    } else if (sortBy === 'relevant') {
      // TODO: implement REAL logic, this is only for testing
      sortedArticles.sort((a: VedaVersumArticle, b: VedaVersumArticle) =>
        a.created.localeCompare(b.created)
      );
    }

    setActiveArticles(sortedArticles);
  };

  // count number of articles
  function numberOfArticles(tab: string) {
    switch (tab) {
      case 'allArticles':
        if (allCardsData && allCardsData.allArticles) {
          return allCardsData.allArticles.length;
        } else {
          return '0';
        }
      case 'myArticles':
        if (
          allCreatedCardsData &&
          allCreatedCardsData.allArticlesCreatedByUser
        ) {
          return allCreatedCardsData.allArticlesCreatedByUser.length;
        } else {
          return '0';
        }
      default:
        return '0';
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
                  ? 'active-tab articles-tab px-2'
                  : 'articles-tab px-2'
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
                    ? 'active-button veda-versum-button mx-2'
                    : 'veda-versum-button mx-2'
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
            activeArticles.map((card, index) => (
              <CardListItem key={index} cardData={card} />
            ))}
          {/* data undefined */}
          {(loadingAllCards || loadingCreatedData) && <p>Loading...</p>}
          {!activeArticles && <p>Data is empty</p>}
          {(errorAllCards || errorCreatedData) && (
            <p>{errorAllCards?.message || errorCreatedData?.message} :(</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default CardsList;
