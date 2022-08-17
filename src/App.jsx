import { ConfigProvider } from "antd";
import viVN from "antd/lib/locale/vi_VN";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { QueryClient, QueryClientProvider } from "react-query";
import "moment/locale/vi";
import "antd/dist/antd.css";
import "antd/dist/antd.variable.min.css";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { store, persistor } from "@/redux/store";
import AppRoute from "@/route";
import { GlobalStyle } from "./style";

ConfigProvider.config({
  theme: {
    primaryColor: "#375DE7",
  },
});

const queryClient = new QueryClient();

const App = () => {
  return (
    <ConfigProvider locale={viVN}>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <QueryClientProvider client={queryClient}>
            <AppRoute />
          </QueryClientProvider>

          <GlobalStyle />
        </PersistGate>
      </Provider>
    </ConfigProvider>
  );
};

export default App;
