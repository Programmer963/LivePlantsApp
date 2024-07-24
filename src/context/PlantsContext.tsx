import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const URL_API = 'http://localhost/api/public/plant';

type Plant = {
  id: number;
  userId: number;
  name: string;
  species: string;
  imageUrl: string;
  careInstructions: string;
  lastWateredDate: string | null;
  nextWateringDate: string | null;
};

type PlantsContextType = {
  plants: Plant[];
  getPlants: (userId: number) => Promise<void>;
  searchPlants: (searchQuery: string) => void;
  sortPlants: () => void;
  addPlant: (plant: Omit<Plant, 'id'>) => Promise<void>;
  updatePlant: (plant: Plant) => Promise<void>;
  deletePlant: (plantId: number) => Promise<void>;
};

const PlantsContext = createContext<PlantsContextType | undefined>(undefined);

export const PlantsProvider = ({ children }: { children: ReactNode }) => {
  
  const [plants, setPlants] = useState<Plant[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
        getPlants(user.id);
    }
  }, [user])

  const searchPlants = (searchQuery: string) => {
    const filteredData = plants.filter(plant =>
      plant.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setPlants(filteredData);
    console.log(plants)
  };

  const sortPlants = () => {
    const sortedData = [...plants].sort((a, b) => a.name.localeCompare(b.name));
    setPlants(sortedData);
  };


  const getPlants = async (userId: number) => {
    try {
      const response = await axios.get(`${URL_API}/getPlantsByUserId/${userId}`);
      setPlants(response.data);
    } catch (error) {
      console.error('Failed to get plants', error);
    }
  };

  const addPlant = async (plant: Omit<Plant, 'id'>) => {
    try {
      const params = new URLSearchParams({
        userId: plant.userId.toString(),
        name: plant.name,
        species: plant.species,
        imageUrl: plant.imageUrl,
        careInstructions: plant.careInstructions,
        lastWateredDate: plant.lastWateredDate ?? '',
        nextWateringDate: plant.nextWateringDate ?? ''
      });
      
      const response = await axios.post(`${URL_API}/add?${params.toString()}`);
      setPlants([...plants, response.data]);
    } catch (error) {
      console.error('Failed to add plant', error);
    }
  };

  const updatePlant = async (plant: Plant) => {
    try {
      const response = await axios.put(`${URL_API}/edit/${plant.id}`, plant);
      setPlants(plants.map(p => (p.id === plant.id ? response.data : p)));
    } catch (error) {
      console.error('Failed to update plant', error);
    }
  };

  const deletePlant = async (plantId: number) => {
    try {
      await axios.delete(`${URL_API}/delete/${plantId}`);
      setPlants(plants.filter(p => p.id !== plantId));
    } catch (error) {
      console.error('Failed to delete plant', error);
    }
  };

  return (
    <PlantsContext.Provider value={{ plants, getPlants, searchPlants, sortPlants, addPlant, updatePlant, deletePlant }}>
      {children}
    </PlantsContext.Provider>
  );
};

export const usePlants = () => {
  const context = useContext(PlantsContext);
  if (!context) {
    throw new Error('usePlants must be used within a PlantsProvider');
  }
  return context;
};
