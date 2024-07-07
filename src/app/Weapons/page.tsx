"use client";
import {
  displayAltFireType,
  displayFeature,
  displayFireMode,
  displayCategory,
  displayWallPenetration,
} from "@/lib/naming";
import { useEffect, useState } from "react";
import { fetchWeapons } from "@/lib/api";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Weapon, Skin } from "@/lib/interfaces";
import { ScrollArea } from "@/components/ui/scroll-area";

const WeaponsPage = () => {
  const [weapons, setWeapons] = useState<Weapon[]>([]);
  const [selectedWeapon, setSelectedWeapon] = useState<Weapon | null>(null);
  const [selectedSkin, setSelectedSkin] = useState<Skin | null>(null);
  const [skinMap, setSkinMap] = useState<Map<string, Skin>>(new Map());

  const roundValue = (value: number, decimals: number = 1) => {
    const multiplier = 10 ** decimals;
    return Math.round(value * multiplier) / multiplier;
  };

  const weaponMap = new Map();
  weapons.forEach((weapon) => {
    weaponMap.set(weapon.uuid, weapon);
  });

  useEffect(() => {
    if (selectedWeapon) {
      const skinMap = new Map();
      selectedWeapon.skins.forEach((skin) => {
        skinMap.set(skin.uuid, skin);
      });
      setSkinMap(skinMap);
    }
  }, [selectedWeapon]);

  useEffect(() => {
    setSelectedSkin(null);
  }, [selectedWeapon]);

  useEffect(() => {
    const getWeapons = async () => {
      const weaponData = await fetchWeapons();
      setWeapons(weaponData);
    };
    getWeapons();
  }, []);

  return (
    <main className="flex flex-col md:flex-row gap-4 p-4 min-w-80">
      <div className="rounded-lg flex-col border p-4 md:w-1/4 w-full lg:max-w-80">
        <legend className="px-1 text-sm font-medium pb-2 text-center">
          <h3 className="font-semibold tracking-tight text-lg">
            Select a Weapon:
          </h3>
        </legend>
        <div className="hidden md:block">
          <ScrollArea className="h-96 pr-3">
            {weapons.map((weapon) => (
              <div
                key={weapon.uuid}
                className="p-2 m-2 cursor-pointer rounded-sm flex justify-center items-center hover:bg-muted"
                onClick={() => setSelectedWeapon(weapon)}
              >
                {weapon.displayIcon ? (
                  <img
                    src={weapon.displayIcon}
                    alt={weapon.displayName}
                    className="w-auto h-12 object-contain"
                  />
                ) : (
                  <div className="w-auto h-12 flex justify-center items-center">
                    No Image
                  </div>
                )}
              </div>
            ))}
          </ScrollArea>
        </div>

        <div className="block md:hidden ">
          <Select
            onValueChange={(value) => {
              const selectedWeapon = weaponMap.get(value);
              if (selectedWeapon) {
                setSelectedWeapon(selectedWeapon);
              }
            }}
          >
            <SelectTrigger className="h-16 max-w-full">
              <SelectValue placeholder="Select a Weapon" />
            </SelectTrigger>
            <SelectContent>
              {Array.from(weaponMap.values()).map((weapon) => (
                <SelectItem key={weapon.uuid} value={weapon.uuid}>
                  <div className="flex items-center gap-2">
                    <img
                      src={weapon.displayIcon}
                      alt={weapon.displayName}
                      className="w-16 h-auto m-1"
                    />
                    <div className="flex flex-col">
                      <h2 className="font-semibold tracking-tight group flex items-center gap-2 text-lg">
                        {weapon.displayName}
                      </h2>
                      <p className="text-muted-foreground">
                        {displayCategory(weapon.category)}
                      </p>
                    </div>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex-1 rounded-xl bg-muted/50 p-4 flex flex-col items-center md:items-start">
        {!selectedWeapon ? (
          <Card className="p-6 gap-2 flex justify-center items-center w-full h-72">
            <h1 className="font-medium tracking-tight text-2xl uppercase text-center">
              Please select a weapon
            </h1>
          </Card>
        ) : (
          <div className="w-full ">
            <Card className="md:p-6 gap-2 flex flex-col md:flex-row justify-center">
              <div className="p-6 rounded-md flex flex-col">
                <div className="flex flex-row gap-2">
                  <Badge className="tracking-tight">
                    {displayCategory(selectedWeapon.category)}
                  </Badge>
                  {selectedWeapon.weaponStats?.fireMode && (
                    <Badge variant="secondary" className="tracking-tight">
                      {displayFireMode(selectedWeapon.weaponStats.fireMode)}
                    </Badge>
                  )}
                  {selectedWeapon.weaponStats?.feature && (
                    <Badge variant="secondary" className="tracking-tight">
                      {displayFeature(selectedWeapon.weaponStats.feature)}
                    </Badge>
                  )}
                </div>
                <h1 className="font-bold tracking-tight text-4xl uppercase pt-1">
                  {selectedWeapon.displayName}
                </h1>
                <p className="text-lg">
                  Cost: ¤{selectedWeapon?.shopData?.cost || 0}
                </p>
                <img
                  src={selectedSkin?.displayIcon ?? selectedWeapon.displayIcon}
                  alt={selectedWeapon.displayName}
                  className="w-auto h-36 my-4 object-contain"
                />
                <h4 className="font-semibold tracking-tight uppercase">
                  {selectedSkin?.displayName}
                </h4>
              </div>

              <div className="block p-6 w-full lg:max-w-72">
                {selectedWeapon.weaponStats?.damageRanges?.length > 0 && (
                  <>
                    {selectedWeapon.weaponStats.damageRanges.map(
                      (range, index) => (
                        <div key={index} className="flex flex-col gap-1">
                          <p className="text-sm font-semibold">
                            Damage {range.rangeStartMeters} -{" "}
                            {range.rangeEndMeters} m
                          </p>
                          {range.headDamage !== undefined && (
                            <div className="w-full flex flex-col">
                              <div className="flex flex-row justify-between items-end">
                                <p className="text-xs">Head</p>
                                <p className="text-xs text-primary font-semibold">
                                  {roundValue(range.headDamage)}
                                </p>
                              </div>
                              <Progress value={roundValue(range.headDamage)} />
                            </div>
                          )}
                          {range.bodyDamage !== undefined && (
                            <div className="w-full flex flex-col">
                              <div className="flex flex-row justify-between items-end">
                                <p className="text-xs">Body</p>
                                <p className="text-xs text-primary font-semibold">
                                  {roundValue(range.bodyDamage)}
                                </p>
                              </div>
                              <Progress value={roundValue(range.bodyDamage)} />
                            </div>
                          )}
                          {range.legDamage !== undefined && (
                            <div className="w-full flex flex-col pb-2">
                              <div className="flex flex-row justify-between items-end">
                                <p className="text-xs">Leg</p>
                                <p className="text-xs text-primary font-semibold">
                                  {roundValue(range.legDamage)}
                                </p>
                              </div>
                              <Progress value={roundValue(range.legDamage)} />
                            </div>
                          )}
                        </div>
                      )
                    )}
                  </>
                )}
              </div>
            </Card>
            <Select
              value={selectedSkin?.uuid ?? ""}
              onValueChange={(value) => {
                const selectedSkin = skinMap.get(value);
                setSelectedSkin(selectedSkin || null);
              }}
            >
              <SelectTrigger className="h-12 w-full lg:w-40 flex justify-center gap-2 items-center my-4">
                <SelectValue placeholder="Change Skin" />
              </SelectTrigger>
              <SelectContent className="flex justify-center items-center max-h-72 bg-muted/90">
                {Array.from(skinMap.values())
                  .filter((skin) => skin.displayIcon !== null)
                  .map((skin) => (
                    <SelectItem
                      key={skin.uuid}
                      value={skin.uuid}
                      className="flex justify-center"
                    >
                      <img
                        src={skin.displayIcon}
                        alt={skin.displayName}
                        className="h-8 w-auto pt-1"
                      />
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>

            <div className="flex flex-col md:flex-row justify-between lg:px-28">
              <div className="flex flex-col">
                {selectedWeapon.weaponStats && (
                  <div>
                    <h2>Weapon Stats</h2>
                    <p className="text-base">
                      Fire Rate:{" "}
                      {roundValue(selectedWeapon.weaponStats.fireRate, 1)}
                    </p>
                    <p className="text-base">
                      Magazine Size:{" "}
                      {roundValue(selectedWeapon.weaponStats.magazineSize, 0)}
                    </p>
                    <p className="text-base">
                      Run Speed Multiplier:{" "}
                      {roundValue(
                        selectedWeapon.weaponStats.runSpeedMultiplier,
                        1
                      )}
                    </p>
                    <p className="text-base">
                      Equip Time Seconds:{" "}
                      {roundValue(
                        selectedWeapon.weaponStats.equipTimeSeconds,
                        1
                      )}
                    </p>
                    <p className="text-base">
                      Reload Time Seconds:{" "}
                      {roundValue(
                        selectedWeapon.weaponStats.reloadTimeSeconds,
                        1
                      )}
                    </p>
                    <p className="text-base">
                      First Bullet Accuracy:{" "}
                      {roundValue(
                        selectedWeapon.weaponStats.firstBulletAccuracy,
                        2
                      )}
                    </p>
                    <p className="text-base">
                      Pellet Count:{" "}
                      {roundValue(
                        selectedWeapon.weaponStats.shotgunPelletCount,
                        0
                      )}
                    </p>
                    <p className="text-base">
                      Wall Penetration:{" "}
                      {displayWallPenetration(
                        selectedWeapon.weaponStats.wallPenetration
                      )}
                    </p>
                    <p className="text-base">
                      Alt Fire Type:{" "}
                      {displayAltFireType(
                        selectedWeapon.weaponStats.altFireType
                      )}
                    </p>
                  </div>
                )}
              </div>

              <div className="flex flex-col">
                {selectedWeapon.weaponStats?.adsStats && (
                  <div className="flex flex-col">
                    <h3>ADS Stats</h3>
                    <p className="text-base">
                      Zoom Multiplier:{" "}
                      {roundValue(
                        selectedWeapon.weaponStats.adsStats.zoomMultiplier,
                        1
                      )}
                    </p>
                    <p className="text-base">
                      Fire Rate:{" "}
                      {roundValue(
                        selectedWeapon.weaponStats.adsStats.fireRate,
                        1
                      )}
                    </p>
                    <p className="text-base">
                      Run Speed Multiplier:{" "}
                      {roundValue(
                        selectedWeapon.weaponStats.adsStats.runSpeedMultiplier,
                        1
                      )}
                    </p>
                    <p className="text-base">
                      Burst Count:{" "}
                      {roundValue(
                        selectedWeapon.weaponStats.adsStats.burstCount,
                        0
                      )}
                    </p>
                    <p className="text-base">
                      First Bullet Accuracy:{" "}
                      {roundValue(
                        selectedWeapon.weaponStats.adsStats.firstBulletAccuracy,
                        2
                      )}
                    </p>
                  </div>
                )}
              </div>

              <div className="flex flex-col">
                {selectedWeapon.shopData && (
                  <div className="flex flex-col">
                    {selectedWeapon.shopData.category && (
                      <p className="text-base">
                        Category: {selectedWeapon.shopData.category}
                      </p>
                    )}
                    {selectedWeapon.shopData.canBeTrashed && (
                      <p className="text-base">
                        Can Be Trashed:{" "}
                        {selectedWeapon.shopData.canBeTrashed ? "Yes" : "No"}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default WeaponsPage;
