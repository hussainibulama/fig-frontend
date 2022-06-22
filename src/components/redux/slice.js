import { createSlice } from "@reduxjs/toolkit";

export const counterSlice = createSlice({
  name: "data",
  initialState: {
    interest: "",
    type: "",
  },
  reducers: {
    UpdateInitials: (state, action) => {
      state.interest = action.payload.interest;
      state.type = action.payload.type;
    },
  },
});

export const { UpdateInitials } = counterSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const InitialValues = (state) => state.data;

export default counterSlice.reducer;
