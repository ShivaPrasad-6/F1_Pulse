import React from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import AppShell from './components/AppShell.jsx';
import ConstructorsPage from './pages/ConstructorsPage.jsx';
import CurrentSeasonPage from './pages/CurrentSeasonPage.jsx';
import ExplorerPage from './pages/ExplorerPage.jsx';
import HomePage from './pages/HomePage.jsx';
import InformationPage from './pages/InformationPage.jsx';
import KnowledgePage from './pages/KnowledgePage.jsx';
import NewsPage from './pages/NewsPage.jsx';
import RacersPage from './pages/RacersPage.jsx';
import ControlsPage from './pages/information/ControlsPage.jsx';
import CircuitsPage from './pages/information/CircuitsPage.jsx';
import FlagsPage from './pages/information/FlagsPage.jsx';
import TyresPage from './pages/information/TyresPage.jsx';

const currentYear = new Date().getFullYear();

export const routes = [
  {
    path: '/',
    element: React.createElement(AppShell),
    children: [
      {
        index: true,
        element: React.createElement(HomePage),
      },
      {
        path: `current-season-${currentYear}`,
        element: React.createElement(CurrentSeasonPage),
      },
      {
        path: 'explorer',
        element: React.createElement(ExplorerPage),
      },
      {
        path: 'information',
        element: React.createElement(InformationPage),
        children: [
          {
            index: true,
            element: React.createElement(Navigate, { to: 'tyres', replace: true }),
          },
          {
            path: 'tyres',
            element: React.createElement(TyresPage),
          },
          {
            path: 'controls',
            element: React.createElement(ControlsPage),
          },
          {
            path: 'circuits',
            element: React.createElement(CircuitsPage),
          },
          {
            path: 'flags',
            element: React.createElement(FlagsPage),
          },
        ],
      },
      {
        path: 'racers',
        element: React.createElement(RacersPage),
      },
      {
        path: 'constructors',
        element: React.createElement(ConstructorsPage),
      },
      {
        path: 'knowledge',
        element: React.createElement(KnowledgePage),
      },
      {
        path: 'news',
        element: React.createElement(NewsPage),
      },
    ],
  },
];

export const router = createBrowserRouter(routes);
