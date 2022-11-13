import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  genreIdOrCategoryName: '',
  page: 1,
  searchQuery: '',
};

export const genreOrCategory = createSlice({
  name: 'genreOrCategory',
  initialState,
  reducers: {
    selectGenreOrCategory: (state, action) => {
      console.log(action.payload);
      // state.genreOrCategoryName =
    },
  },
});

export const { selectGenreOrCategory } = genreOrCategory.actions;
export default genreOrCategory.reducer;
