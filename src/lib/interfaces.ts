export interface Chroma {
    uuid: string;
    displayName: string;
    displayIcon: string | null;
    fullRender: string;
    swatch: string | null;
    streamedVideo: string | null;
    assetPath: string;
  }
  
  export interface Level {
    uuid: string;
    displayName: string;
    levelItem: string | null;
    displayIcon: string;
    streamedVideo: string | null;
    assetPath: string;
  }
  
  export interface Skin {
    uuid: string;
    displayName: string;
    themeUuid: string;
    contentTierUuid: string;
    displayIcon: string;
    wallpaper: string | null;
    assetPath: string;
    chromas: Chroma[];
    levels: Level[];
  }
  
  export interface DamageRange {
    rangeStartMeters: number;
    rangeEndMeters: number;
    headDamage: number;
    bodyDamage: number;
    legDamage: number;
  }
  
  export interface AdsStats {
    zoomMultiplier: number;
    fireRate: number;
    runSpeedMultiplier: number;
    burstCount: number;
    firstBulletAccuracy: number;
  }
  
  export interface WeaponStats {
    fireRate: number;
    magazineSize: number;
    runSpeedMultiplier: number;
    equipTimeSeconds: number;
    reloadTimeSeconds: number;
    firstBulletAccuracy: number;
    shotgunPelletCount: number;
    wallPenetration: string;
    feature: string;
    fireMode: string | null;
    altFireType: string;
    adsStats: AdsStats | null;
    altShotgunStats: null;
    airBurstStats: null;
    damageRanges: DamageRange[];
  }
  
  export interface GridPosition {
    row: number;
    column: number;
  }
  
  export interface ShopData {
    cost: number;
    category: string;
    shopOrderPriority: number;
    categoryText: string;
    gridPosition: GridPosition;
    canBeTrashed: boolean;
    image: string | null;
    newImage: string;
    newImage2: string | null;
    assetPath: string;
  }
  
  export interface Weapon {
    uuid: string;
    displayName: string;
    category: string;
    defaultSkinUuid: string;
    displayIcon: string;
    killStreamIcon: string;
    assetPath: string;
    weaponStats: WeaponStats;
    shopData: ShopData;
    skins: Skin[];
  }
  
  export interface Ability {
    slot: string;
    displayName: string;
    description: string;
    displayIcon: string | null;
  }
  
  export interface Agent {
    uuid: string;
    displayName: string;
    description: string;
    displayIcon: string;
    fullPortrait: string;
    role: {
      displayName: string;
      description: string;
      displayIcon: string;
    };
    abilities: Ability[];
  }
  
  export interface Map {
    uuid: string;
    displayName: string;
    coordinates: string;
    displayIcon: string;
    splash: string;
    listViewIcon: string;
    tacticalDescription: string;
  }
  
  export interface CompetitiveTier {
    tier: number;
    tierName: string;
    division: string;
    divisionName: string;
    largeIcon: string;
  }