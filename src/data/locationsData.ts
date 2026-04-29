export interface StoreLocation {
  id: string;
  region: string;
  state: string;
  city: string;
  address: string;
  lat: number;
  lng: number;
  phone?: string;
  hours?: string;
}

export const locationsData: StoreLocation[] = [
  // Acadiana
  {
    id: "lafayette-1",
    region: "Acadiana",
    state: "LA",
    city: "Lafayette",
    address: "2127 Kaliste Saloom Rd",
    lat: 30.1875,
    lng: -92.0354,
    phone: "1 (866) 538-0918",
    hours: "Mon-Thu: 7am-9pm | Fri: 7am-8pm | Sat: 8am-7pm | Sun: 11am-6pm"
  },
  {
    id: "lafayette-2",
    region: "Acadiana",
    state: "LA",
    city: "Lafayette",
    address: "4660 Johnston Street",
    lat: 30.1764,
    lng: -92.0620,
    phone: "1 (866) 538-0918",
    hours: "Mon-Thu: 7am-9pm | Fri: 7am-8pm | Sat: 8am-7pm | Sun: 11am-6pm"
  },
  {
    id: "broussard-1",
    region: "Acadiana",
    state: "LA",
    city: "Broussard",
    address: "224 St. Nazaire Suite 102, Broussard LA 70518",
    lat: 30.1345,
    lng: -91.9567
  },
  {
    id: "broussard-2",
    region: "Acadiana",
    state: "LA",
    city: "Broussard",
    address: "6422 Ambassador Caffery Pkwy Suite B, Broussard LA 70518",
    lat: 30.1466,
    lng: -91.9640
  },
  {
    id: "abbeville",
    region: "Acadiana",
    state: "LA",
    city: "Abbeville",
    address: "100 Broadmoore Blvd Ste 1, Abbeville LA 70510",
    lat: 29.9744,
    lng: -92.1343
  },
  {
    id: "breaux-bridge",
    region: "Acadiana",
    state: "LA",
    city: "Breaux Bridge",
    address: "1880 Rees St #101, Breaux Bridge LA 70517",
    lat: 30.2749,
    lng: -91.8998
  },

  {
    id: "opelousas",
    region: "Acadiana",
    state: "LA",
    city: "Opelousas",
    address: "1540 S Union St, Opelousas LA 70570",
    lat: 30.5335,
    lng: -92.0815
  },
  {
    id: "youngsville",
    region: "Acadiana",
    state: "LA",
    city: "Youngsville",
    address: "1700 Chemin Metairie Pkwy #601, Youngsville LA 70592",
    lat: 30.1002,
    lng: -91.9960
  },

  // West Louisiana
  {
    id: "crowley",
    region: "West Louisiana",
    state: "LA",
    city: "Crowley",
    address: "1823 North Parkerson Ave. Suite H, Crowley LA 70526",
    lat: 30.2110,
    lng: -92.3746
  },
  {
    id: "deridder",
    region: "West Louisiana",
    state: "LA",
    city: "Deridder",
    address: "1606 North Pine St, DeRidder LA 70634",
    lat: 30.8466,
    lng: -93.2893
  },
  {
    id: "eunice",
    region: "West Louisiana",
    state: "LA",
    city: "Eunice",
    address: "1516 Hwy 190 East Suite A, Eunice LA 70535",
    lat: 30.4941,
    lng: -92.4179
  },
  {
    id: "lake-charles",
    region: "West Louisiana",
    state: "LA",
    city: "Lake Charles",
    address: "3814 Ryan St Ste 300, Lake Charles LA 70601",
    lat: 30.2266,
    lng: -93.2174
  },
  {
    id: "moss-bluff",
    region: "West Louisiana",
    state: "LA",
    city: "Moss Bluff",
    address: "271 US-171 #1400, Moss Bluff LA 70611",
    lat: 30.3005,
    lng: -93.1979
  },
  {
    id: "sulphur",
    region: "West Louisiana",
    state: "LA",
    city: "Sulphur",
    address: "341 N. Cities Service Hwy, Sulphur LA 70663",
    lat: 30.2366,
    lng: -93.3774
  },

  // East Louisiana
  {
    id: "baton-rouge",
    region: "East Louisiana",
    state: "LA",
    city: "Baton Rouge",
    address: "9065 Perkins Rd. Suite D, Baton Rouge LA 70810",
    lat: 30.4515,
    lng: -91.1871
  },

  // Central Louisiana
  {
    id: "alexandria",
    region: "Central Louisiana",
    state: "LA",
    city: "Alexandria",
    address: "6503 Coliseum Blvd Suite D, Alexandria LA 71303",
    lat: 31.3113,
    lng: -92.4451
  },
  {
    id: "pineville",
    region: "Central Louisiana",
    state: "LA",
    city: "Pineville",
    address: "2951A Monroe Highway, Pineville LA 71360",
    lat: 31.3224,
    lng: -92.4343
  },

  // South Louisiana
  {
    id: "new-iberia",
    region: "South Louisiana",
    state: "LA",
    city: "New Iberia",
    address: "601 E. Admiral Doyle Drive, New Iberia LA 70560",
    lat: 30.0035,
    lng: -91.8187
  },

  // Alabama
  {
    id: "pell-city",
    region: "Alabama",
    state: "AL",
    city: "Pell City",
    address: "2055 Martin Street South, Pell City AL 35128",
    lat: 33.5862,
    lng: -86.2816
  },
  {
    id: "trussville",
    region: "Alabama",
    state: "AL",
    city: "Trussville",
    address: "7274 Gadsden Hwy Suite 108, Trussville AL 35173",
    lat: 33.6198,
    lng: -86.6089
  },

  // Mississippi
  {
    id: "petal",
    region: "Mississippi",
    state: "MS",
    city: "Petal",
    address: "922 Hwy. 42 Unit 5, Petal MS 39465",
    lat: 31.3468,
    lng: -89.2601
  },
  {
    id: "wiggins",
    region: "Mississippi",
    state: "MS",
    city: "Wiggins",
    address: "1704 Central Avenue W, Wiggins MS 39577",
    lat: 30.8582,
    lng: -89.1367
  }
];
