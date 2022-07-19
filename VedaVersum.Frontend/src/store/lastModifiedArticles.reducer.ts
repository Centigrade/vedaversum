import { createSlice } from '@reduxjs/toolkit';
import { VedaVersumArticle } from 'model/veda-versum-article';
//#region reducer types
/**
 * type for the last modified articles state
 */
export interface LastModifiedArticlesState {
  value: VedaVersumArticle[];
}
/**
 * type for the last modified articles actions
 */
export interface LastModifiedArticlesAction {
  type: string;
  payload: {
    updatedArticle: VedaVersumArticle;
    deleted: boolean;
  };
}
//#endregion

/**
 * last modified articles state handling
 */
const lastModifiedArticlesSlice = createSlice({
  name: 'lastModifiedArticles',
  initialState: { value: [] },
  reducers: {
    addArticleToLastModified(state: LastModifiedArticlesState, action: LastModifiedArticlesAction) {
      const newArticle = action.payload.updatedArticle;
      // check if article is already in the last modified articles list
      const articleToReplace = state.value.find(article => article.id === newArticle.id);
      let replaceIndex = -1;
      if (articleToReplace) {
        // if article is already in the last modified articles list,
        // get index of the article
        replaceIndex = state.value.indexOf(articleToReplace);
      }

      // article was DELETED
      if (action.payload.deleted) {
        // if article is in the last modified articles list,
        // remove it; if not, do nothing
        if (articleToReplace && replaceIndex !== -1) {
          state.value.splice(replaceIndex, 1);
        }
      } else {
        // article was UPDATED or CREATED
        if (articleToReplace && replaceIndex !== -1) {
          // if article is in the last modified articles list,
          // replace the article with the new version
          state.value[replaceIndex] = newArticle;
        } else {
          // add article to the last modified articles list
          state.value.push(newArticle);
        }
      }

      /* }  */
    },
    resetLastModifiedArticles(state: LastModifiedArticlesState) {
      state.value.length = 0;
    },
  },
});

export const { addArticleToLastModified, resetLastModifiedArticles } = lastModifiedArticlesSlice.actions;
export default lastModifiedArticlesSlice.reducer;
