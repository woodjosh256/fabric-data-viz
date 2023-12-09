export type Fabric = {
    id: string;
    name: string;
    brand: string;
    line: string;
    construction: string;
    fabricWeight: number;
    tearStrengthWarp: number;
    tearStrengthFill: number;
    averageTearStrength: number;
    waterproof: number;
    abrasion: number;
    width: number;
    price: 'low' | 'moderate' | 'high';
    filmBacking: 'yes' | 'no';
    carbonOffset: 'yes' | 'no';
    laminatedMaterial: 'yes' | 'no';
    handFeel: 'techy' | 'softer';
    recycled: 'yes' | 'partially' | 'no';
};

export const fabricAttributeOrder: string[] = ["name", "brand", "line", "construction", "fabricWeight", "tearStrengthWarp", "tearStrengthFill", "averageTearStrength", "waterproof", "abrasion", "width", "price", "filmBacking", "carbonOffset", "laminatedMaterial", "handFeel", "recycled"];

const parseFabricDataCSV = (csv: string): Fabric[] => {
    const lines = csv.trim().split('\n');
    // const headers = lines[0].split(',');

    return lines.slice(1).map(line => {
        const values = line.split(';');

        const fabric: Fabric = {
            id: values[0],
            name: values[1],
            brand: values[2],
            line: values[3],
            construction: values[4],
            fabricWeight: parseFloat(values[5]),
            tearStrengthWarp: parseFloat(values[6]),
            tearStrengthFill: parseFloat(values[7]),
            averageTearStrength: parseFloat(values[8]),
            waterproof: parseFloat(values[9]),
            abrasion: parseFloat(values[10]),
            width: parseFloat(values[11]),
            price: values[12] as 'low' | 'moderate' | 'high',
            filmBacking: values[13] as 'yes' | 'no',
            carbonOffset: values[14] as 'yes' | 'no',
            laminatedMaterial: values[15] as 'yes' | 'no',
            handFeel: values[16] as 'techy' | 'softer',
            recycled: values[17] as 'yes' | 'partially' | 'no',
        };

        return fabric;
    });
};

export const getFabricData = () => {
    const csvData = `Id;Fabric Name;Brand;Line;Construction;Fabric Weight (oz/yd2);Tear Strength Warp (lb);Tear Strength Fill (lb);Average Tear Strength (lb);Waterproof (psi / bar);Abrasion (cycles);Width (in);Price;Film backing (good for seam taping);Carbon Offset;Laminated Material;Hand feel;Recycled
1;EPLX200;Challenge;EcoPak EPLX;C0 DWR, 200d face, 45° Blue CrossPly, 0.5 mil matte film;4.3;21.2;17.2;19.2;200;500;56;Moderate;Yes;no;Yes;Techy;Yes
2;EPLX200 RS;Challenge;EcoPak EPLX;C0 DWR, 200d Ripstop face, 45° Blue CrossPly, 0.5 mil matte film;4.8;22.8;19.7;21.25;200;300;56;Moderate;Yes;no;Yes;Techy;Yes
3;EPLX400;Challenge;EcoPak EPLX;C0 DWR, 400d face, 45° Blue CrossPly, 0.5 mil matte film;6.9;34.4;26.7;30.55;200;3000;56;Moderate;Yes;no;Yes;Techy;Yes
4;EPLX450 RS;Challenge;EcoPak EPLX;C0 DWR, 450d Ripstop face, 45° Blue CrossPly, 0.5 mil matte film;7.6;36.7;28.3;32.5;200;1500;56;Moderate;Yes;no;Yes;Techy;Yes
5;EPLX600 RE/COR;Challenge;EcoPak EPLX;C0 DWR, 600d face, 45° Blue CrossPly, 0.5 mil matte film;9.75;38.8;41.1;39.95;200;3000;56;Moderate;Yes;no;Yes;Techy;Yes
6;EPLX840 Ballistic;Challenge;EcoPak EPLX;C0 DWR, 840d Ballistic face, 45° Blue CrossPly, 0.5 mil matte film;9.85;51.3;49.5;50.4;200;4400;56;Moderate;Yes;no;Yes;Techy;Yes
7;EPLX1680 Ballistic;Challenge;EcoPak EPLX;C0 DWR, 1680d Ballistic face, 45° Blue CrossPly, 0.5 mil matte film;12.3;114.1;107.3;110.7;200;10200;56;Moderate;Yes;no;Yes;Techy;Yes
8;EPX70RS;Challenge;EcoPak EPX;C0 DWR, 70d Ripstop face, 45° Blue CrossPly, 70d ripstop backing;5.05;17.8;14.1;15.95;200;300;56;Moderate;No;no;Yes;Softer;Yes
9;EPX200;Challenge;EcoPak EPX;C0 DWR, 200d face, 45° Blue CrossPly, 70d ripstop backing;5.9;26.7;24.8;25.75;200;500;56;Moderate;No;no;Yes;Softer;Yes
10;EPX400d;Challenge;EcoPak EPX;C0 DWR, 400d face, 45° Blue CrossPly, 70d ripstop backing;8.95;37.8;33.8;35.8;200;3000;56;Moderate;No;no;Yes;Softer;Yes
11;EPX600;Challenge;EcoPak EPX;C0 DWR, 600d face, 45° Blue CrossPly, 70d ripstop backing;9.97;42.6;39.7;41.15;200;2000;56;Moderate;No;no;Yes;Softer;Yes
12;EPX70HH;Challenge;EcoPak Hyrid;Liquid Crystal Polymer, 70d face, 45° Blue CrossPly, 70d ripstop backing;5.25;17.8;14.1;15.95;200;1000;56;Moderate;No;no;Yes;Softer;Partially
13;EPX240 Denim;Challenge;EcoPak Hyrid;240d recycled polyester/nylon face, 45° Blue CrossPly, 70d ripstop backing;9.9;37.7;36;36.85;200;3000;56;Moderate;No;no;Yes;Softer;Partially
14;EPX400HH;Challenge;EcoPak Hyrid;Liquid Crystal Polymer, 400d face, 45° Blue CrossPly, 70d ripstop backing;9.15;37.8;33.8;35.8;200;15000;56;Moderate;No;no;Yes;Softer;Partially
15;UltraTX50;Challenge;UltraTX;50d ripstop face, Ultra 45° CrossPly, 0.25 mil film backing;2.4;250;250;250;200;500;59;Moderate;Yes;no;Yes;Techy;Partially
16;Ultra100;Challenge;UltraWeave;100d face, 0.5 mil RUV film backing;2.92;69.4;89.6;79.5;200;3600;58;High;Yes;no;Yes;Techy;No
17;Ultra200;Challenge;UltraWeave;200d face, 0.5 mil RUV film backing;3.5;103.1;133.2;118.15;200;4400;58;High;Yes;no;Yes;Techy;No
18;Ultra400;Challenge;UltraWeave;400d face, 0.5 mil RUV film backing;4.85;114.5;117.6;116.05;200;8800;58;High;Yes;no;Yes;Techy;No
19;Ultra800;Challenge;UltraWeave;800d face, 0.5 mil RUV film backing;8.5;250;250;250;200;16000;58;High;Yes;no;Yes;Techy;No
20;UltraStretch;Challenge;UltraStretch;C0 DWR, Nylon 6.6 blended with Ultra and stretch fiber;5.5;250;250;250;0;3000;44;Moderate;No;no;No;Softer;No
21;UltraGrid;Challenge;UltraGrid;C0 DWR, 210d recycled nylon, double Ultra ripstop, 1500mm PU backing;3.9;250;250;250;2.13;1100;59;Moderate;No;no;No;Softer;Partially
22;VX21;Dimension Polyant;X-Pac X4;DWR, 210 denier Plain Weave Nylon face, 0.25 mil polyester film, Black post-consumer recycled polyester X-PLY® at 22°, 50 denier polyester taffeta backing;6.2;24.4;17.2;20.8;200;500;59;Moderate;No;yes;Yes;Techy;Partially
23;VX21 CIRÉ;Dimension Polyant;X-Pac X4;DWR, 210 denier Nylon, Black post-consumer recycled polyester X-PLY® at 22°, 0.25 mil polyester film, 50 denier polyester backing;6;24.4;17.2;20.8;200;2000;59;Moderate;No;yes;Yes;Techy;Partially
24;VX42;Dimension Polyant;X-Pac X4;DWR, 420 denier Nylon face, Black post-consumer recycled polyester X-PLY® at 22°, 0.25 mil polyester film, 50 denier polyester taffeta backing;8.8;31.2;21.6;26.4;200;1700;59;Moderate;No;yes;Yes;Techy;Partially
25;VX03 RIPSTOP;Dimension Polyant;X-Pac X4;DWR, 30x40 denier, Ripstop Nylon face, Black post-consumer recycled polyester X-PLY® at 22°, 0.25 mil polyester film, 50 denier polyester taffeta backing;3.8;11.1;9.4;10.25;200;600;59;Moderate;No;yes;Yes;Techy;Partially
26;VX07 RIPSTOP;Dimension Polyant;X-Pac X4;DWR, 70 denier, Ripstop Nylon face, Black post-consumer recycled polyester X-PLY® at 22°, 0.25 mil polyester film, 50 denier polyester taffeta backing;4.9;12.7;11.2;11.95;200;500;59;Moderate;No;yes;Yes;Techy;Partially
27;UVX40;Dimension Polyant;X-Pac X4;Ultra-PE/polyester ripstop, Black post-consumer recycled polyester X-PLY® at 22°, 0.25 mil polyester film, 50 denier polyester taffeta;7.1;28;22;25;200;1000;57;High;No;no;Yes;Techy;Partially
28;RVX25;Dimension Polyant;X-Pac X4;DWR, 250d Polyester face, Black post-consumer recycled polyester X-PLY® at 22°, 0.25 mil polyester film, 50 denier polyester backing;7.9;21.6;19.3;20.45;200;2000;55;Moderate;No;no;Yes;Techy;Partially
29;VX21 RIPSTOP Soft;Dimension Polyant;X-Pac X4;DWR, 210 denier Ripstop Nylon face, Polyester and PU waterproof coating, Black post-consumer recycled polyester X-PLY® at 22°, 50 denier polyester taffeta backing;5.5;16.9;13.5;15.2;200;900;59;Moderate;No;yes;Yes;Softer;Partially
30;UX10;Dimension Polyant;X-Pac X3;100% Ultra-PE weave (100 denier) face, Aramid X-PLY reinforcement at 22o, Polyester film backing;2.5;61.8;50.4;56.1;200;500;59;High;Yes;no;Yes;Techy;No
31;RX15;Dimension Polyant;X-Pac X3;DWR, 150 denier 100% Recycled Polyester Face, Black post-consumer recycled polyester X-PLY at 22°, 0.5 mil polyester film;5.8;24.8;18.1;21.45;200;600;59;Moderate;Yes;yes;Yes;Techy;Partially
32;RX30;Dimension Polyant;X-Pac X3;DWR, 300 denier 100% Recycled Polyester Face, Black post-consumer recycled polyester X-PLY at 22°, 0.5 mil polyester film;7.7;19;17.9;18.45;200;2000;59;Moderate;Yes;yes;Yes;Techy;Partially
33;RX36;Dimension Polyant;X-Pac X3;DWR, 300x600 denier 100% Recycled Polyester Face, Black post-consumer recycled polyester X-PLY at 22°, 0.5 mil polyester film;10.5;63;61.1;62.05;200;2000;59;Moderate;Yes;yes;Yes;Techy;Partially
34;X21;Dimension Polyant;X-Pac X3;DWR, 210 denier Nylon face, Black post-consumer recycled polyester X-PLY at 22°, 0.5 mil shiny polyester film backing;5.2;16;12;14;200;900;59;Moderate;Yes;no;Yes;Techy;Partially
35;X42;Dimension Polyant;X-Pac X3;DWR, 420 denier Nylon face, Black post-consumer recycled polyester X-PLY at 22°, 0.5 mil shiny polyester film backing;7.7;31.4;23.7;27.55;200;1700;59;Moderate;Yes;no;Yes;Techy;Partially
36;X50;Dimension Polyant;X-Pac X3;DWR, 500 denier Cordura Nylon face, Black post-consumer recycled polyester X-PLY at 22°, 0.5 mil shiny polyester film backing;9.3;38.5;32.6;35.55;200;2000;57;Moderate;Yes;no;Yes;Techy;Partially
37;X51;Dimension Polyant;X-Pac X3;DWR, 500 x 1000 denier Cordura Nylon face, Black post-consumer recycled polyester X-PLY at 22°, 0.5 mil shiny polyester film backing;9.6;39;52;45.5;200;3000;57;Moderate;Yes;no;Yes;Techy;Partially
38;X33 CAMOUFLAGE;Dimension Polyant;X-Pac X3;DWR, 330 denier Cordura Nylon face, Black post-consumer recycled polyester X-PLY at 22°, 0.5 mil shiny polyester film backing;7.3;23;18.9;20.95;200;2000;57;Moderate;Yes;no;Yes;Techy;Partially
39;X50 CAMOUFLAGE;Dimension Polyant;X-Pac X3;DWR, 500 denier Cordura Nylon face, Black post-consumer recycled polyester X-PLY at 22°, 0.5 mil shiny polyester film backing;9.3;38.5;32.6;35.55;200;2000;57;Moderate;Yes;no;Yes;Techy;Partially
40;X50 TACTICAL;Dimension Polyant;X-Pac X3;DWR, 400d armid X-PLY at 22°, 500 denier Cordura Nylon face, 0.5 mil shiny polyester film backing;10.9;63.9;58.4;61.15;200;2000;57;Moderate;Yes;no;Yes;Techy;No
41;WX21;Dimension Polyant;X-Pac X3;DWR, 210 denier Nylon face, Black post-consumer recycled polyester X-PLY at 22°, Black post-consumer recycled polyester warp insert at 2EPI, 0.5 mil shiny polyester film backing;5.7;25.5;15.5;20.5;200;800;59;Moderate;Yes;no;Yes;Techy;Partially
42;X11;Dimension Polyant;X-Pac X3;DWR, 10oz Natural Cotton Duck, Black post-consumer recycled polyester X-PLY at 22°, 0.5 mil shiny polyester film backing;11.5;13.3;9.4;11.35;200;1750;55;Moderate;Yes;yes;Yes;Techy;Partially
43;LS07;Dimension Polyant;X-Pac LS;Non-Woven Polyester LiteSkin Face, DP UvT top-coating, 0.5 mil polyester film, 70d Rip-Stop Nylon backing;4.3;6.1;6.3;6.2;200;2000;59;Moderate;No;no;Yes;Techy;No
44;LS07 SOFT;Dimension Polyant;X-Pac LS;Non-Woven Polyester LiteSkin Face, DP UvT top-coating, 70d Rip-Stop Nylon backing;3.4;5.1;5.3;5.2;160;2000;59;Moderate;No;no;Yes;Softer;No
45;LS21;Dimension Polyant;X-Pac LS;Non-Woven Polyester LiteSkin Face, DP UvT top-coating, 0.5 mil polyester film, 210d Nylon backing;6.3;9.3;6.3;7.8;200;2000;59;Moderate;No;no;Yes;Techy;No
46;LS42;Dimension Polyant;X-Pac LS;Non-Woven Polyester LiteSkin Face, DP UvT top-coating, 0.5 mil polyester film, 420d Nylon backing;8.5;20.9;18.4;19.65;200;2000;59;Moderate;No;no;Yes;Techy;No`;
    return parseFabricDataCSV(csvData);
}
