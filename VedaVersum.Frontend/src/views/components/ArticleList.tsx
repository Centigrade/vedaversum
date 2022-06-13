import { VedaVersumArticle } from 'model/veda-versum-article';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import ArticleItem from 'views/components/ArticleItem';

//#region type definitions
/**
 * type for the component props
 */
interface ArticleListProps {
  allArticles: VedaVersumArticle[];
  articlesCreatedByUser: VedaVersumArticle[];
}
/**
 * type for the tabs for the article filter/sort
 */
interface Tab {
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

function ArticlesList(props: ArticleListProps) {
  //#region state
  const [allArticles] = useState<VedaVersumArticle[]>(props.allArticles);
  const [articlesCreatedByUser] = useState<VedaVersumArticle[]>(props.articlesCreatedByUser);
  // active articles = articles currently selected by the user
  const [activeArticles, setActiveArticles] = useState<VedaVersumArticle[]>(allArticles);
  // tab selection to filter/sort articles
  const tabs: Tab[] = [
    { name: 'All', type: 'allArticles' },
    { name: 'New', type: 'newArticles' },
    { name: 'Trending', type: 'trendingArticles' },
    { name: 'Yours', type: 'myArticles' },
  ];
  const [activeTab, setActiveTab] = useState<ActiveTab>('allArticles');
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
        setActiveArticles(allArticles);
        break;
      case 'newArticles':
        activeArticles ? sortArticlesBy('latest') : setActiveArticles([]);
        break;
      case 'trendingArticles':
        activeArticles ? sortArticlesBy('trending') : setActiveArticles([]);
        break;
      case 'myArticles':
        articlesCreatedByUser ? setActiveArticles(articlesCreatedByUser) : setActiveArticles([]);
        break;
      default:
        setActiveArticles(allArticles);
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
        sortedArticles.sort((a: VedaVersumArticle, b: VedaVersumArticle) => b.accessCounter - a.accessCounter);
      }
      setActiveArticles(sortedArticles);
    } else {
      setActiveArticles([]);
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
        if (articlesCreatedByUser) {
          return articlesCreatedByUser.length;
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
        </div>
      </div>
    </div>
  );
  //#endregion
}

export default ArticlesList;
