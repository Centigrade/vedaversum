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
      const articleToReplace = state.value.find(article => article.id === newArticle.id);
      let replaceIndex = -1;

      if (articleToReplace) {
        replaceIndex = state.value.indexOf(articleToReplace);
        if (articleToReplace && replaceIndex !== -1) {
          // DELETED
          if (action.payload.deleted) {
            console.log('entered deleted');
            state.value.splice(replaceIndex, 1);
            // UPDATED
          } else {
            console.log('entered updated');
            state.value[replaceIndex] = newArticle;
          }
        }
        // CREATED
      } else {
        console.log('entered created');
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
