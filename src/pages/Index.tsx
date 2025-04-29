
import { useEffect } from "react";
import { Link } from "react-router-dom";

const Index = () => {
  useEffect(() => {
    // Redirect to the regular HTML application
    window.location.href = "/index.html";
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Auto Vista Market</h1>
        <p className="text-xl text-gray-600 mb-6">Redirigiendo a la aplicación de ventas de vehículos...</p>
        <Link to="/index.html" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Ir a la aplicación
        </Link>
      </div>
    </div>
  );
};

export default Index;
