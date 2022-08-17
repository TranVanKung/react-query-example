import { createStore } from "redux";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { composeWithDevTools } from "redux-devtools-extension";
import createRootReducer from "./reducer";

const persistConfig = {
  key: "edu_admin",
  storage,
  whitelist: ["App", "Auth", "TeacherExamination"],
};

const persistedReducer = persistReducer(persistConfig, createRootReducer());

const store = createStore(persistedReducer, composeWithDevTools());
const persistor = persistStore(store);

export { store, persistor };
