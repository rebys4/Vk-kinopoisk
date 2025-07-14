import React from 'react'
import './App.css'
import { AppRoot, Group, PanelHeader, SplitCol, SplitLayout } from '@vkontakte/vkui';
import { Link, Route, Routes } from 'react-router-dom';

const MainPage = React.lazy(() => import("./pages/MainPage"));
const FilmPage = React.lazy(() => import("./pages/FilmPage"));
const FavoritesPage = React.lazy(() => import("./pages/FavoritesPage"));

const App: React.FC = () => {
  return (<AppRoot>
    <SplitLayout>
      <SplitCol>
        <PanelHeader>ВК "Кинопоиск"</PanelHeader>
        <React.Suspense fallback={<div>Загрузка...</div>}>
          <Group>
            <nav style={{ padding: "16px" }}>
              <Link to="/">Главная</Link> | {" "}
              <Link to="/favorites">Избранное</Link>
            </nav>
            <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/movie/:id" element={<FilmPage />} />
              <Route path="/favorites" element={<FavoritesPage />} />
            </Routes>
          </Group>
        </React.Suspense>
      </SplitCol>
    </SplitLayout>
  </AppRoot>)
};

export default App;
