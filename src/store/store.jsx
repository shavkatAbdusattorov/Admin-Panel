import { configureStore } from "@reduxjs/toolkit";
import adminPanel from "../reducers/adminPanel.jsx";

export const store = configureStore({
  reducer: {
    adminPanel: adminPanel,
  },
});
