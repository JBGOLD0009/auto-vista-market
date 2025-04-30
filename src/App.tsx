
import { Route, Routes } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import VehicleDetailsDialogManager from "./components/VehicleDetailsDialogManager";
import "./App.css";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      
      {/* Vehicle Details Dialog Manager - será utilizado por el código JavaScript */}
      <VehicleDetailsDialogManager />
    </>
  );
}

export default App;
