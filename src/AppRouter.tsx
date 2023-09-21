import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home, Gallery, Login, Wiki } from "./pages/pageIndex";
import Header from "./components/common/Header";
import RootPage from "./components/common/RootPage";
import Footer from "./components/common/Fooder";
import { Props } from "./App";

export default function AppRouter({ email }: Props) {
  return (
    <BrowserRouter>
      <Header email={email} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/wiki" element={<Wiki email={email} />} />
        <Route path="/gallery" element={<Gallery />} />
      </Routes>
      <RootPage />
      <Footer />
    </BrowserRouter>
  );
}
