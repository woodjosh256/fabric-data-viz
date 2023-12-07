type Fabric = {
    fabricName: string;
    brand: string;
    line: string;
    countryOfOrigin: string;
    construction: string;
    fabricWeight: number; // Assuming oz/yd2 is a numeric value
    tearStrengthWarp: number; // lb
    tearStrengthFill: number; // lb
    averageTearStrength: number; // lb
    waterproof: number; // Assuming psi/bar is a numeric value
    abrasion: number; // cycles
    width: number; // in
    price: 'low' | 'moderate' | 'high';
    filmBacking: 'yes' | 'no';
    fluorocarbonFreeDWR: 'yes' | 'no' | 'unclear';
    cleenTec: 'yes' | 'no';
    carbonOffset: 'yes' | 'no';
    laminatedMaterial: 'yes' | 'no';
    handFeel: 'techy' | 'softer';
    recycled: 'yes' | 'partially' | 'no';
};