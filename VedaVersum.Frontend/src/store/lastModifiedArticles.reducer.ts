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
  payload: VedaVersumArticle;
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
      const newArticle = action.payload;
      const articleToReplace = state.value.find(article => article.id === newArticle.id);
      let replaceIndex = -1;
      if (articleToReplace) {
        replaceIndex = state.value.indexOf(articleToReplace);
        if (articleToReplace && replaceIndex !== -1) {
          state.value[replaceIndex] = newArticle;
        }
      } else {
        state.value.push(newArticle);
      }
    },
    resetLastModifiedArticles(state: LastModifiedArticlesState) {
      state.value.length = 0;
    },
  },
});

export const { addArticleToLastModified, resetLastModifiedArticles } = lastModifiedArticlesSlice.actions;
export default lastModifiedArticlesSlice.reducer;
