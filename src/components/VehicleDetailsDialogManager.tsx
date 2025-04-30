
import React, { useState, useEffect } from 'react';
import VehicleDetailsDialog from './VehicleDetailsDialog';

interface Vehicle {
  id: number;
  brand: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  fuel: string;
  transmission: string;
  image: string;
  type?: string;
  badge?: string;
}

const VehicleDetailsDialogManager: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentVehicle, setCurrentVehicle] = useState<Vehicle | null>(null);

  useEffect(() => {
    // Define the function to open the dialog
    const openDialog = (vehicle: Vehicle) => {
      setCurrentVehicle(vehicle);
      setIsOpen(true);
    };

    // Expose the function to the window object
    if (typeof window !== 'undefined') {
      window.openVehicleDetailsDialog = openDialog;
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
  };

  if (!currentVehicle) {
    return null;
  }

  return (
    <VehicleDetailsDialog
      isOpen={isOpen}
      onClose={handleClose}
      vehicle={currentVehicle}
    />
  );
};

export default VehicleDetailsDialogManager;

// Add type declaration for window
declare global {
  interface Window {
    openVehicleDetailsDialog: (vehicle: Vehicle) => void;
    ReactVehicleDetailsDialog: any;
    vehiclesData: Vehicle[];
    formatPrice: (price: number) => string;
    formatMileage: (mileage: number) => string;
  }
}
