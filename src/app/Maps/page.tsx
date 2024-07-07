"use client"
import React, { useEffect, useState } from 'react';
import { fetchMaps } from "@/lib/api";
import { Map } from "@/lib/interfaces"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

const MapsPage: React.FC = () => {
  const [maps, setMaps] = useState<Map[]>([]);
  const [selectedMap, setSelectedMap] = useState<Map | null>(null);

  useEffect(() => {
    const getMaps = async () => {
      try {
        const data = await fetchMaps();
        setMaps(data);
      } catch (error) {
        console.error('Failed to fetch maps:', error);
      }
    };

    getMaps();
  }, []);

  const handleSelectMap = (mapUuid: string) => {
    const map = maps.find(map => map.uuid === mapUuid);
    setSelectedMap(map || null);
  };

  return (
    <>
      <main className="flex flex-col md:flex-row gap-4 p-4">
        <div className="rounded-lg flex-col border p-4 md:w-1/4 w-full">
          <legend className="-ml-1 px-1 text-sm font-medium pb-2 text-center">
            <h3 className="font-semibold tracking-tight text-lg">
              Select a Map:
            </h3>
          </legend>

          <div className="hidden md:block">
            <ScrollArea className="h-96">
              {maps.map((map) => (
                <div key={map.uuid} onClick={() => handleSelectMap(map.uuid)} className='cursor-pointer border border-gray-100 hover:border-2 mr-2'>
                  <img src={map.listViewIcon} alt={map.displayName} />
                </div>
              ))}
            </ScrollArea>
          </div>

          <div className="block md:hidden">
            <Select onValueChange={handleSelectMap}>
              <SelectTrigger className="max-w-300">
                <SelectValue placeholder="Select a map" />
              </SelectTrigger>
              <SelectContent>
                {maps.map((map) => (
                  <SelectItem key={map.uuid} value={map.uuid}>
                    <div className="max-w-300">
                      <p>{map.displayName}</p>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex-1 rounded-xl bg-muted/50 px-4 py-4 flex flex-col items-center">
          {!selectedMap ? (
            <Card className="p-6 gap-2 flex justify-center items-center w-full h-72">
              <h1 className="font-medium tracking-tight text-2xl uppercase">
                Please select a map
              </h1>
            </Card>
          ) : (
            <>
              <Badge className="font-bold ">{selectedMap.tacticalDescription}</Badge>
              <h1 className="font-bold tracking-tight text-5xl uppercase">{selectedMap.displayName}</h1>
              <h4 className="font-medium mb-4">{selectedMap.coordinates}</h4>
              <img src={selectedMap.splash} alt={selectedMap.displayName} className="w-full h-auto" />
            </>
          )}
        </div>
      </main>
    </>
  );
};

export default MapsPage;
