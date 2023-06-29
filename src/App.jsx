import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import CaissiereProduit from "./pages/cassiere/CaissiereProduit";
import CaissiereFacturation from "./pages/cassiere/CaissiereFacturation";
import CaissiereCategorie from "./pages/cassiere/CaissiereCategorie";
import CassiereCatPro from "./pages/cassiere/CassiereCatPro";

import MagAccueil from "./pages/magasinier/MagAccueil";
import MagCategorie from "./pages/magasinier/MagCategorie";
import MagCatPro from "./pages/magasinier/MagCatPro";
import MagProduit from "./pages/magasinier/MagProduit";
import MagStock from "./pages/magasinier/MagStock";

//Routes

function App() {
  return ( 
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} ></Route>
        <Route path="/caissiere/:id/produit/:num" element={<CaissiereProduit />} ></Route>
        <Route path="/caissiere/:id/produit/:idCat/:num" element={<CassiereCatPro />} ></Route>
        <Route path="/caissiere/:id/facturation" element={<CaissiereFacturation />} ></Route>
        <Route path="/caissiere/:id/categorie/:num" element={<CaissiereCategorie />} ></Route>

        <Route path="/magasinier/:id" element={<MagAccueil />} ></Route>
        <Route path="/magasinier/:id/produit/:idCat/:num" element={<MagCatPro />} ></Route>
        <Route path="/magasinier/:id/produit/:num" element={<MagProduit />} ></Route>
        <Route path="/magasinier/:id/categorie/:num" element={<MagCategorie />} ></Route>
        <Route path="/magasinier/:id/stock" element={<MagStock />} ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
