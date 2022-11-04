import { MemoryRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from 'pages/Home';
import NotFound from 'pages/NotFound';
import Bar from 'pages/Bar';
import Line from 'pages/Line';
import Pie from 'pages/Pie';
import Scatter from 'pages/Scatter';

export default function App() {
  return (
    <MemoryRouter>
      <Routes>
        <Route path="/" element={<Home />} />
          <Route path="bar" element={<Bar/>}></Route>
          <Route path="line" element={<Line/>}></Route>
          <Route path="pie" element={<Pie/>}></Route>
          <Route path="scatter" element={<Scatter/>}></Route>
          <Route path="*" element={<NotFound/>}></Route>
      </Routes>
    </MemoryRouter>
  );
}
