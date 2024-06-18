import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Layout from "./components/shared/Layout";
import Dashboard from "./components/Dashboard";
import Store from "./components/store/Store";
import StoreDetail from "./components/store/StoreDetail";
import StoreSettings from "./components/store/StoreSettings";
import OfferDetails from "./components/offer/OfferDetail";
import OfferList from "./components/offer/OfferList";
import EditOffer from "./components/offer/EditOffer";
import Login from "./components/auth/Login";
import Feedback from "./components/Canny";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="/store" element={<Store />} />
          <Route path="/store/:id" element={<StoreDetail />} />
          <Route path="/store/settings/:id" element={<StoreSettings />} />
          <Route path="/offer/:id" element={<OfferDetails />} />
          <Route path="/offer/list/:id" element={<OfferList />} />
          <Route path="/offer/list/edit/:id" element={<EditOffer />} />
        </Route>
        <Route path="/login" element={<Login />} />
        {/* <Route path="/register" element={<Register />} /> */}
        <Route path="/canny" element={<Feedback />} />
      </Routes>
    </Router>
  );
}

export default App;
