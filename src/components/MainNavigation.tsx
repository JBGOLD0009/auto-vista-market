
import * as React from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

const MainNavigation: React.FC = () => {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <Link to="/">
            <NavigationMenuLink className={cn("hover:bg-accent hover:text-accent-foreground focus:bg-accent", "group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors")}>
              Inicio
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger>Vehículos</NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="grid gap-3 p-4 md:w-[400px] lg:w-[500px]">
              <Link to="/vehicles?type=nuevos" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                <div className="text-sm font-medium leading-none">Nuevos</div>
                <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                  Descubre nuestra gama de vehículos nuevos
                </p>
              </Link>
              <Link to="/vehicles?type=seminuevos" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                <div className="text-sm font-medium leading-none">Seminuevos</div>
                <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                  Vehículos de segunda mano en excelentes condiciones
                </p>
              </Link>
              <Link to="/vehicles?type=ofertas" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                <div className="text-sm font-medium leading-none">Ofertas</div>
                <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                  Las mejores promociones y descuentos
                </p>
              </Link>
              <Link to="/vehicles" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                <div className="text-sm font-medium leading-none">Ver todo</div>
                <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                  Explora todo nuestro catálogo de vehículos
                </p>
              </Link>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger>Marcas</NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="grid grid-cols-2 gap-3 p-4 md:w-[400px] lg:w-[500px]">
              {["Toyota", "Honda", "Ford", "Tesla", "BMW", "Mercedes", "Audi", "Volkswagen", "Nissan", "Hyundai"].map((brand) => (
                <Link 
                  key={brand} 
                  to={`/vehicles?brand=${brand}`}
                  className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                >
                  <div className="text-sm font-medium leading-none">{brand}</div>
                </Link>
              ))}
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <Link to="/about">
            <NavigationMenuLink className={cn("hover:bg-accent hover:text-accent-foreground focus:bg-accent", "group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors")}>
              Nosotros
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <Link to="/services">
            <NavigationMenuLink className={cn("hover:bg-accent hover:text-accent-foreground focus:bg-accent", "group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors")}>
              Servicios
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <Link to="/contact">
            <NavigationMenuLink className={cn("hover:bg-accent hover:text-accent-foreground focus:bg-accent", "group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors")}>
              Contacto
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default MainNavigation;
