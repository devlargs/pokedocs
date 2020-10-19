import { createSlice } from "@reduxjs/toolkit";

// export const loadCategories = createAsyncThunk(
//   "exercise/loadCategories",
//   async (_, thunkAPI) => {
//     try {
//       const url = "/api/issues/kanban";
//       const response = await fetch(url);

//       return response.json();
//     } catch (error) {
//       return thunkAPI.rejectWithValue({ error: error.message });
//     }
//   }
// );

const nameSlice = createSlice({
  name: "<name-here>",
  initialState: {},
  reducers: {},
  extraReducers: {
    // [addUser.pending as any]: (state) => {
    //   state.loading = true;
    // },
    // [addUser.fulfilled as any]: (state: any, action) => {
    //   state.users.push(action.payload);
    //   state.loading = false;
    // },
    // [addUser.rejected as any]: (state: any, action) => {
    //   state.error = action.payload.error;
    //   state.loading = false;
    // },
  },
});

// export const selectUsers = createSelector(
//   (state: any) => ({
//     users: state.exercise.users,
//     loading: state.exercise.loading,
//     error: state.exercise.error,
//   }),
//   (state) => state
// );

export default nameSlice.reducer;
