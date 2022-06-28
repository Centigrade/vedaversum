import { VedaVersumArticle } from 'model/veda-versum-article';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveTab } from 'store/activeTab.reducer';
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

  // set active articles according to the active tab
  const activeTab = useSelector((state: RootState) => state.activeTab.value);
  const dispatch = useDispatch();
  //#endregion

  //#region helper functions
  /**
   * sets active tab and active articles according to the active tab controlled by the user
   */
  // callback makes that the active articles change automatically when the active tab has changed
  const changeActiveArticles = useCallback(
    (selectedTab: ActiveTab) => {
      dispatch(setActiveTab(selectedTab));
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
    [allArticles, articlesCreatedByUser, dispatch],
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
          <div className="top-px transform translate-y-px font-medium text-xl px-3 py-4 text-gray-600 ml-12">
            Articles
          </div>
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
