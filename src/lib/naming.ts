const displayAltFireType = (type: string | null) => {
  if (!type) return "Unknown";
  const mapping: { [key: string]: string } = {
    "Zoom": "Zoom",
    "Burst": "Burst",
    "ADS": "ADS",
    "AirBurst": "AirBurst",
    "Shotgun": "Shotgun",
  };
  
  const key = type.replace(/^EWeaponAltFireDisplayType::/, "");
  return mapping[key] || type;
};

const displayFeature = (feature: string | null) => {
  if (!feature) return "Unknown";
  const mapping: { [key: string]: string } = {
    "ROFIncrease": "ROF Increase",
    "Silencer": "Silencer",
    "Silenced": "Silenced",
    "DualZoom": "Dual Zoom",
  };
  const key = feature.replace(/^EWeaponStatsFeature::/, "");
  return mapping[key] || feature;
};

const displayFireMode = (fireMode: string | null) => {
  if (!fireMode) return "Unknown";
  const mapping: { [key: string]: string } = {
    "SemiAutomatic": "Semi Automatic",
  };
  const key = fireMode.replace(/^EWeaponFireModeDisplayType::/, "");
  return mapping[key] || fireMode;
};

const displayCategory = (category: string | null) => {
  if (!category) return "Unknown";
  const mapping: { [key: string]: string } = {
    "Sidearm": "Sidearm",
    "Melee": "Melee",
    "Heavy": "Heavy",
    "Rifle": "Rifle",
    "Sniper": "Sniper",
    "SMG": "SMG",
    "Shotgun": "Shotgun",
    "LMG": "LMG",
  };
  const key = category.replace(/^EEquippableCategory::/, "");
  return mapping[key] || category;
};

const displayWallPenetration = (penetration: string | null) => {
  if (!penetration) return "Unknown";
  const mapping: { [key: string]: string } = {
    "High": "High",
    "Medium": "Medium",
    "Low": "Low",
  };
  const key = penetration.replace(/^EWallPenetrationDisplayType::/, "");
  return mapping[key] || penetration;
};

export { displayAltFireType, displayFeature, displayFireMode, displayCategory, displayWallPenetration };