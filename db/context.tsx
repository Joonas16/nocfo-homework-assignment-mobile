import { createContext, useContext, useState, ReactNode } from "react";
import { Plant } from "~/types/plant";

export type PlantContextType = {
  plants: Plant[];
  addPlant: (plant: Plant) => void;
  removePlantById: (id: string) => void;
  getPlantById: (id: string) => Plant | undefined;
  updatePlantById: (id: string, plant: Plant) => void;
};

const PlantContext = createContext<PlantContextType | undefined>(undefined);

export const PlantProvider = ({ children }: { children: ReactNode }) => {
  const [plants, setPlants] = useState<Plant[]>([]);

  const addPlant = (plant: Plant) => {
    setPlants((prevPlants) => [...prevPlants, plant]);
  };

  const removePlantById = (id: string) => {
    setPlants((prevPlants) => prevPlants.filter((plant) => plant.id !== id));
  };

  const getPlantById = (id: string) => {
    return plants.find((plant) => plant.id === id);
  };

  const updatePlantById = (id: string, plant: Plant) => {
    setPlants((prevPlants) => prevPlants.map((p) => (p.id === id ? plant : p)));
  };

  return (
    <PlantContext.Provider
      value={{
        plants,
        addPlant,
        removePlantById,
        getPlantById,
        updatePlantById,
      }}
    >
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
