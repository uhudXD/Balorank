import { Weapon, Agent, Map, CompetitiveTier } from "@/lib/interfaces";

const BASE_URL = 'https://valorant-api.com/v1';

export const fetchWeapons = async (): Promise<Weapon[]> => {
  const response = await fetch(`${BASE_URL}/weapons`);
  const data = await response.json();
  return data.data;
};

export const fetchAgents = async (): Promise<Agent[]> => {
  const response = await fetch(`${BASE_URL}/agents?isPlayableCharacter=true`);
  const data = await response.json();
  return data.data.map((agent: Agent) => ({
   ...agent,
    abilities: agent.abilities.filter((ability) => ability.slot!== "Passive"),
  }));
};

export const fetchMaps = async (): Promise<Map[]> => {
  const response = await fetch(`${BASE_URL}/maps`);
  const data = await response.json();
  return data.data;
};

export const fetchCompetitiveTiers = async (): Promise<CompetitiveTier[]> => {
  const response = await fetch(`${BASE_URL}/competitivetiers`);
  const data = await response.json();
  return data.data;
};
