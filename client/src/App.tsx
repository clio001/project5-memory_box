import React from "react";
import { Routes, Route } from "react-router-dom";
import ViewHome from "./views/ViewHome";
import ViewLogin from "./views/ViewLogin";
import ViewRegister from "./views/ViewRegister";
import ViewMyAccount from "./views/ViewMyAccount";
import ViewMyAccountEdit from "./views/ViewMyAccountEdit";
import NoMatch from "./components/NoMatch";

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
} from "@apollo/client";

function App() {
  const client = new ApolloClient({
    uri: "http://localhost:4000/graphql",
    cache: new InMemoryCache(),
  });

  return (
    <div className="Home">
      <ApolloProvider client={client}>
        <Routes>
          <Route path="/" element={<ViewHome />} />
          <Route path="/login" element={<ViewLogin />} />
          <Route path="/register" element={<ViewRegister />} />
          <Route path="/my-account" element={<ViewMyAccount />} />
          <Route path="/edit-account" element={<ViewMyAccountEdit />} />
          <Route path="*" element={<NoMatch />} />
        </Routes>
      </ApolloProvider>
    </div>
  );
}

export default App;
