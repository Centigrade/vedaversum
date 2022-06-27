import { VedaVersumArticle } from 'model/veda-versum-article';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store/store';
import { sortArticlesBy } from 'utils/main';
import RenderedArticles from './RenderedArticles';

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
export type ActiveTab = 'allArticles' | 'newArticles' | 'trendingArticles' | 'myArticles';
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
    { name: 'My', type: 'myArticles' },
  ];
  // read active tab from local storage to keep sorting
  const localStorageActiveTab = localStorage.getItem('activeTab');
  let currentActiveTab: ActiveTab = 'allArticles';
  if (localStorageActiveTab && isActiveTab(localStorageActiveTab)) {
    currentActiveTab = localStorageActiveTab;
  }
  // active tab that defines which articles are shown
  const [activeTab, setActiveTab] = useState<ActiveTab>(currentActiveTab);

  // set active articles according to the active tab
  const activeTab2 = useSelector((state: RootState) => state.activeTab);
  const dispatch = useDispatch();
  //#endregion

  //#region helper functions
  /**
   * checks if a given string is one of the active tabs
   * @param value string that is checked
   * @returns boolean if value is an active tab
   */
  function isActiveTab(value: string): value is ActiveTab {
    const activeTabs = ['allArticles', 'newArticles', 'trendingArticles', 'myArticles'];
    return activeTabs.includes(value);
  }

  /**
   * sets active tab and active articles according to the active tab controlled by the user
   */
  // callback makes that the active articles change automatically when the active tab has changed
  const changeActiveArticles = useCallback(
    (selectedTab: ActiveTab) => {
      setActiveTab(selectedTab);
      localStorage.setItem('activeTab', selectedTab);
      switch (selectedTab) {
        case 'allArticles':
          setActiveArticles(allArticles);
          break;
        case 'newArticles':
          setActiveArticles(sortArticlesBy('latest', allArticles));
          break;
        case 'trendingArticles':
          setActiveArticles(sortArticlesBy('trending', allArticles));
          break;
        case 'myArticles':
          articlesCreatedByUser ? setActiveArticles(articlesCreatedByUser) : setActiveArticles([]);
          break;
        default:
          setActiveArticles(allArticles);
          break;
      }
    },
    [allArticles, articlesCreatedByUser],
  );
  //#endregion

  // on mount: set active articles according to the active tab
  useEffect(() => {
    changeActiveArticles(activeTab);
  }, [changeActiveArticles, activeTab]);

  //#region render component
  return (
    <div>
      <h1 className="my-3 text-head font-semibold">Start reading</h1>
      {/* Tabs */}
      <div className="flex items-center p-0 mb-8">
        <div className="w-full flex border-b border-gray-600">
          {tabs.map((tab, index) => (
            <div
              key={index}
              onClick={() => changeActiveArticles(tab.type)}
              className={
                'top-px transform translate-y-px font-medium text-xl px-3 hover:cursor-pointer py-4 ' +
                (activeTab === tab.type ? 'text-primary border-b-4 border-primary' : 'text-gray-600')
              }
            >
              {tab.name}
            </div>
          ))}
          <div className="top-px transform translate-y-px font-medium text-xl px-3 py-4 text-gray-600">Articles</div>
        </div>
      </div>
      <div>
        {/* show articles */}
        <div>
          <RenderedArticles articles={activeArticles}></RenderedArticles>
        </div>
      </div>
    </div>
  );
  //#endregion
}

export default ArticlesList;
