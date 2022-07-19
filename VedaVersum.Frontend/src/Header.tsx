import { useSubscription } from '@apollo/client';
import { AnyAction } from '@reduxjs/toolkit';
import { ARTICLE_CHANGED_SUBSCRIPTION } from 'api/subscriptions';
import logoWithName from 'assets/logo-with-name.svg';
import { VedaVersumArticle } from 'model/veda-versum-article';
import { Dispatch, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { addArticleToLastModified } from 'store/lastModifiedArticles.reducer';
import { increaseNotificationsCounter } from 'store/notificationsCounter.reducer';
import { articleAction, getLoggedInUserData, LoggedInUserData, resetAllViewSettings } from 'utils/main';
import ArticleEditor from 'views/components/ArticleEditor';
import PopUpModal from 'views/components/PopUpModal';
import UserFlyoutMenu from './views/components/UserFlyoutMenu';

function Header() {
  //#region state
  const dispatch: Dispatch<AnyAction> = useDispatch();

  // needed to filter changes that the user made by her/himself
  const userData: LoggedInUserData = getLoggedInUserData();

  // variable needed for router navigation
  const navigateTo: NavigateFunction = useNavigate();
  //#endregion

  //#region subscription to article changes
  const { data: subscriptionData } = useSubscription(ARTICLE_CHANGED_SUBSCRIPTION);

  useEffect(() => {
    if (subscriptionData) {
      const articleAction: articleAction = subscriptionData.articleChanged.action;
      const updatedArticle: VedaVersumArticle = subscriptionData.articleChanged.vedaVersumArticle;
      // This executes each time when GraphQL pushes subscription notification
      if (articleAction === 'DELETE') {
        dispatch(addArticleToLastModified({ updatedArticle: updatedArticle, deleted: true }));
      } else if (
        updatedArticle.userUpdated !== userData.userEmail &&
        updatedArticle.userCreated !== userData.userEmail
      ) {
        dispatch(addArticleToLastModified({ updatedArticle: updatedArticle, deleted: false }));
        dispatch(increaseNotificationsCounter());
      }
    }
  }, [subscriptionData, dispatch, userData.userEmail]);
  //#endregion

  //#region render component
  return (
    <nav className="bg-gray-800 header flex">
      <div className="w-full px-6 py-5 flex justify-between items-center">
        <div className="w-1/2 flex">
          <button onClick={() => resetAllViewSettings(dispatch, navigateTo)}>
            <img src={logoWithName} alt="VedaVersum Logo" />
          </button>
        </div>
        <div className="w-1/2 flex items-center justify-end">
          {/* create new article button */}
          <PopUpModal show={ArticleEditor} openModalText="Start writing" dataContext="" />
          {/* avatar image */}
          <UserFlyoutMenu></UserFlyoutMenu>
        </div>
      </div>
    </nav>
  );
  // };
}
//#endregion
export default Header;
