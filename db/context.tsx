import { createContext, useContext, useState, ReactNode } from "react";
import { Plant } from "~/types/plant";

export type PlantContextType = {
  plants: Plant[];
  addPlant: (plant: Plant) => void;
  removePlant: (id: string) => void;
};

const PlantContext = createContext<PlantContextType | undefined>(undefined);

export const PlantProvider = ({ children }: { children: ReactNode }) => {
  const [plants, setPlants] = useState<Plant[]>([]);

  const addPlant = (plant: Plant) => {
    setPlants((prevPlants) => [...prevPlants, plant]);
  };

  const removePlant = (id: string) => {
    setPlants((prevPlants) => prevPlants.filter((plant) => plant.id !== id));
  };

  return (
    <PlantContext.Provider value={{ plants, addPlant, removePlant }}>
      {children}
    </PlantContext.Provider>
  );
};

export const usePlantContext = () => {
  const context = useContext(PlantContext);

  if (!context) {
    throw new Error("usePlantContext must be used within a PlantProvider");
  }

  return context;
};
