import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes.ts';

export default function App() {
  return <RouterProvider router={router} />;
}
