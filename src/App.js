import { BrowserRouter, Routes, Route } from "react-router-dom";

// CONTEXT
import { AppContextProvider } from "./context/app.context";

// COMPONENTS
import Layout from "./components/layout/layout.component";
import CharactersList from "./views/characters-list/characters-list.component";
import FavoritesList from "./views/favorites-list/favorites-list.component";
import CharacterDetailsList from "./views/character-details-list/character-details-list";

const App = () => {
  return (
    <BrowserRouter>
      <AppContextProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<CharactersList />} />
            <Route path="/favorites" element={<FavoritesList />} />
            <Route path="/details/:id" element={<CharacterDetailsList />} />
          </Routes>
        </Layout>
      </AppContextProvider>
    </BrowserRouter>
  );
};

export default App;
