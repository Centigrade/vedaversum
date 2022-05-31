import { useApolloClient } from '@apollo/client';
import { ALL_ARTICLES_QUERY, CREATED_ARTICLES_QUERY } from 'api/articles-queries';
import { GetAllArticlesResponse, VedaVersumArticle } from 'model';
import { GetUserCreatedArticlesResponse } from 'model/get-user-created-articles-response';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getLoggedInUserData, LoggedInUserData } from 'utils/main';
import ArticleItem from 'views/components/ArticleItem';

//#region type definitions
/**
 * type for the tabs for the article filter/sort
 */
interface tab {
  name: string;
  type: ActiveTab;
}
/**
 * type for active tab -> these are the only valid options:
 */
type ActiveTab = 'allArticles' | 'newArticles' | 'trendingArticles' | 'myArticles'; // TODO: clarify if new = articles the user missed or just sort by latest?

/**
 * type for sorting the articles -> these are the only valid options:
 */
type SortingOption = 'latest' | 'trending';
//#endregion

function ArticlesList() {
  //#region declare and initialize component data
  // login data from user need for "my articles" filter
  const loginUserData: LoggedInUserData = getLoggedInUserData();

  const client = useApolloClient();

  //#region state
  const [loading, setLoading] = useState(false);
  const [loadingDataError, setLoadingDataError] = useState<any>(undefined); // type is ApolloError
  // buffer data from the database
  const [allArticles, setAllArticles] = useState<VedaVersumArticle[] | undefined>([]);
  const [allCreatedArticles, setAllCreatedArticles] = useState<VedaVersumArticle[] | undefined>([]);
  // active articles = articles currently selected by the user
  const [activeArticles, setActiveArticles] = useState<VedaVersumArticle[] | undefined>([]);
  // tab selection to filter/sort articles
  const tabs: tab[] = [
    { name: 'All', type: 'allArticles' },
    { name: 'New', type: 'newArticles' },
    { name: 'Trending', type: 'trendingArticles' },
    { name: 'Yours', type: 'myArticles' },
  ];
  const [activeTab, setActiveTab] = useState<ActiveTab>('allArticles');
  //#endregion

  //#region get data from the database
  async function getDataFromDatabase() {
    setLoading(true);
    // load all articles
    const { error: errorAllArticles, data: allArticlesData } = await client.query<GetAllArticlesResponse>({
      query: ALL_ARTICLES_QUERY,
      errorPolicy: 'all',
    });

    // load all articles created by the user
    const { error: errorCreatedData, data: allCreatedArticlesData } =
      await client.query<GetUserCreatedArticlesResponse>({
        query: CREATED_ARTICLES_QUERY,
        errorPolicy: 'all',
        variables: { userEmail: loginUserData.userEmail },
      });

    setAllArticles(allArticlesData.allArticles);
    setAllCreatedArticles(allCreatedArticlesData.allArticlesCreatedByUser);
    setActiveArticles(allArticles);
    setLoading(false);
    if (errorAllArticles) {
      setLoadingDataError(errorAllArticles);
    } else if (errorCreatedData) {
      setLoadingDataError(errorCreatedData);
    }
  }

  // get data updates from the database
  useEffect(() => {
    getDataFromDatabase();
  });
  //#endregion
  //#endregion

  //#region helper functions
  /**
   * sets active tab and active articles according to the given active tab controlled by the user
   * @param selectedTab current active tab
   */
  const changeActiveArticles = (selectedTab: ActiveTab): void => {
    setActiveTab(selectedTab);
    switch (selectedTab) {
      case 'allArticles':
        allArticles ? setActiveArticles(allArticles) : setActiveArticles(undefined);
        break;
      case 'newArticles':
        activeArticles ? sortArticlesBy('latest') : setActiveArticles(undefined);
        break;
      case 'trendingArticles':
        activeArticles ? sortArticlesBy('trending') : setActiveArticles(undefined);
        break;
      case 'myArticles':
        allCreatedArticles ? setActiveArticles(allCreatedArticles) : setActiveArticles(undefined);
        break;
      default:
        setActiveArticles(undefined);
        break;
    }
  };

  /**
   * sorts all articles by a given sorting option and sets the active articles to the sorted articles
   * @param sortBy a sorting option selected by the user
   */
  function sortArticlesBy(sortBy: SortingOption) {
    if (allArticles) {
      let sortedArticles = [...allArticles];
      if (sortBy === 'latest') {
        sortedArticles.sort((a: VedaVersumArticle, b: VedaVersumArticle) => b.created.localeCompare(a.created));
      } else if (sortBy === 'trending') {
        // TODO: implement REAL logic, this is only for testing
        sortedArticles.sort((a: VedaVersumArticle, b: VedaVersumArticle) => a.created.localeCompare(b.created));
      }
      setActiveArticles(sortedArticles);
    } else {
      setActiveArticles(undefined);
    }
  }

  /**
   * !!! only for developing / debugging !!! TODO: remove before "release"
   * counts the number of articles
   * @param tab according to the given tab different articles lists are analyzed
   * @returns the number of articles
   */
  function numberOfArticles(tab: ActiveTab) {
    switch (tab) {
      case 'allArticles':
        if (allArticles) {
          return allArticles.length;
        } else {
          return '0';
        }
      case 'myArticles':
        if (allCreatedArticles) {
          return allCreatedArticles.length;
        } else {
          return '0';
        }
      default:
        if (allArticles) {
          return allArticles.length;
        } else {
          return '0';
        }
    }
  }
  //#endregion

  //#region render component
  return (
    <div>
      {/* Tabs */}
      <div className="flex items-center p-0 mb-8">
        <div className="w-full flex border-b border-gray-600">
          {tabs.map((tab, index) => (
            <div
              key={index}
              onClick={() => changeActiveArticles(tab.type)}
              className={
                'font-medium text-xl px-3 hover:cursor-pointer p-4 ' +
                (activeTab === tab.type ? 'text-primary border-b-4 border-primary' : 'text-gray-600')
              }
            >
              {/* number only for developing/debugging */}
              {`${tab.name} (${numberOfArticles(tab.type)})`}
            </div>
          ))}
        </div>
      </div>
      <div>
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
          {loading && <p>Loading...</p>}
          {!activeArticles && <p>Data is empty</p>}
          {loadingDataError && <p>{loadingDataError}</p>}
        </div>
      </div>
    </div>
  );
  //#endregion
}

export default ArticlesList;
