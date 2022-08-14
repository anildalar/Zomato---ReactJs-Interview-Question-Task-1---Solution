import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import OrderHistoryView from './pages/OrderHistoryView';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="home" element={<Home />} />
          <Route path="order_history_view" element={<OrderHistoryView />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
