
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface VehicleDetailsProps {
  isOpen: boolean;
  onClose: () => void;
  vehicle: {
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
  };
}

const VehicleDetailsDialog: React.FC<VehicleDetailsProps> = ({
  isOpen,
  onClose,
  vehicle,
}) => {
  // Format price with thousands separator
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("es-ES").format(price);
  };

  // Format mileage with thousands separator
  const formatMileage = (mileage: number) => {
    return new Intl.NumberFormat("es-ES").format(mileage);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            {vehicle.brand} {vehicle.model} {vehicle.year}
          </DialogTitle>
          <DialogDescription>
            <span className="text-lg font-semibold text-primary">
              ${formatPrice(vehicle.price)}
            </span>
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4">
          <div className="relative aspect-video w-full overflow-hidden rounded-lg">
            <img
              src={vehicle.image}
              alt={`${vehicle.brand} ${vehicle.model}`}
              className="object-cover w-full h-full"
            />
            {vehicle.badge && (
              <span className="absolute top-2 right-2 bg-primary text-white px-3 py-1 rounded-full text-sm font-medium">
                {vehicle.badge}
              </span>
            )}
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <img src="../assets/icons/speedometer.svg" alt="Kilometraje" className="w-5 h-5" />
              <span className="text-sm">{formatMileage(vehicle.mileage)} km</span>
            </div>
            <div className="flex items-center gap-2">
              <img src="../assets/icons/fuel.svg" alt="Combustible" className="w-5 h-5" />
              <span className="text-sm">{vehicle.fuel}</span>
            </div>
            <div className="flex items-center gap-2">
              <img src="../assets/icons/gear.svg" alt="Transmisión" className="w-5 h-5" />
              <span className="text-sm">{vehicle.transmission}</span>
            </div>
            {vehicle.type && (
              <div className="flex items-center gap-2">
                <img src="../assets/icons/car-sale.svg" alt="Tipo" className="w-5 h-5" />
                <span className="text-sm">{vehicle.type}</span>
              </div>
            )}
          </div>
          
          <div className="flex justify-end mt-4">
            <Button variant="outline" onClick={onClose} className="mr-2">
              Cerrar
            </Button>
            <Button>
              Contactar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default VehicleDetailsDialog;

// Expose to vanilla JS
if (typeof window !== 'undefined') {
  window.ReactVehicleDetailsDialog = VehicleDetailsDialog;
}
