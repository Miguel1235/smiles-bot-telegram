export interface Flights {
  requestedFlightSegmentList: RequestedFlightSegmentList[];
  resultType: string;
  hasCongener: boolean;
  hasG3: boolean;
  tripType: string;
  tripTypeRequest: string;
  factorOneSegment: number;
  factorTwoSegments: number;
  factorUsed: string;
  compareFlight: CompareFlight;
  pricingChannelList: null;
  isSmFlexActive: boolean;
  passenger: Passenger;
}

export type FlightsByDay = Record<string, FlightList>;

export interface CompareFlight {
  flightUidOneway: string;
  flightUidRT: string;
}

export interface Passenger {
  adults: string;
  children: string;
  infants: string;
}

export interface RequestedFlightSegmentList {
  type: string;
  flightList: FlightList[];
  airports: Airports;
  cabinList: string[];
  companyList: CompanyList[];
  otherFlightList: OtherFlightList[];
  bestPricing: BestPricing;
}

export interface Airports {
  departureAirportList: ArrivalAirportList[];
  arrivalAirportList: ArrivalAirportList[];
}

export interface ArrivalAirportList {
  code: string;
  name: string;
  city: string;
  country: string;
  timezone?: string;
}

export interface BestPricing {
  miles: number;
  sourceFare: string;
  fare: Fare;
  smilesMoney: SmilesMoney;
}

export interface Fare {
  type: string;
}

export interface SmilesMoney {
  fare: Fare;
  miles: number;
  money: number;
}

export interface CompanyList {
  code: string;
  name: string;
}

export interface FlightList {
  uid: string;
  stops: number;
  cabin: string;
  sourceGDS: string;
  tripType: string;
  availableSeats: number;
  mostWanted: boolean;
  promotional: boolean;
  airlineTax: number;
  airlineTaxMiles: number;
  airlineFlightMoney: number;
  airlineFlightMiles: number;
  isAirlineTaxWithFlight: boolean;
  departure: Arrival;
  arrival: Arrival;
  airline: CompanyList;
  baggage: FlightListBaggage;
  validatingAirlineCode: string;
  durationNumber: number;
  duration: Duration;
  legList: LegList[];
  fareList: FlightListFareList[];
  ndc: boolean;
  trackingAmadeus: null;
  recalculate: boolean;
  fareValueSmiles: number;
  codeContext: string;
  segmentFlight: string;
  type: string;
  sourceFare: string;
  recommended: boolean;
}

export interface Arrival {
  date: Date;
  airport: ArrivalAirportList;
}

export interface FlightListBaggage {
  free: string;
  quantity: number;
}

export interface Duration {
  hours: number;
  minutes: number;
}

export interface FlightListFareList {
  uid: string;
  congener: FareListCongener;
  type: string;
  money: number;
  miles: number;
  baseMiles: number;
  airlineFareAmount: number;
  airlineFare: number;
  airlineTax: number;
  marginRecalc: null;
  recalculate: boolean;
  offer?: number;
}

export interface FareListCongener {
  fareReference: string;
  fareInfo: string;
  negotiatedFareCode: null | string;
}

export interface LegList {
  cabin: string;
  departure: Arrival;
  arrival: Arrival;
  flightNumber: string;
  marketingAirline: CompanyList;
  operationAirline: CompanyList;
  equipment: string;
  stops: number;
  isConnection: string;
  isMainLeg: boolean | string;
  congener: LegListCongener;
  duration: number;
}

export interface LegListCongener {
  resBookDesigCode: string;
  eTicketEligibility: string;
  fareInfo: string;
  negotiatedFareCode: null | string;
  commentList: string[];
}

export interface OtherFlightList {
  uid: string;
  stops: number;
  cabin: string;
  sourceGDS: string;
  tripType: string;
  availableSeats: number;
  departure: Arrival;
  arrival: Arrival;
  airline: CompanyList;
  baggage: OtherFlightListBaggage;
  validatingAirlineCode: string;
  durationNumber: number;
  duration: Duration;
  timeStop: Duration;
  hourMainStop: string;
  airportMainStop: ArrivalAirportList;
  legList: LegList[];
  fareList: OtherFlightListFareList[];
  trackingAmadeus: null;
  recalculate: boolean;
  fareValueSmiles: number;
  ndc: boolean;
  codeContext: string;
  segmentFlight: string;
  type: string;
  sourceFare: string;
  mostWanted?: boolean;
  promotional?: boolean;
  airlineTax?: number;
  airlineTaxMiles?: number | null;
  airlineFlightMoney?: number;
  airlineFlightMiles?: number;
  isAirlineTaxWithFlight?: boolean;
}

export interface OtherFlightListBaggage {
  free: string;
  quantity: number;
  code: string;
}

export interface OtherFlightListFareList {
  uid: string;
  congener: FareListCongener;
  type: string;
  money: number;
  miles: number;
  baseMiles: number;
  airlineFareAmount: number | string;
  airlineFare: number;
  airlineTax: number;
  legListCost?: string;
  legListCurrency?: string;
  marginRecalc: null;
  recalculate: boolean;
  offer?: number;
  fareValue?: number;
}
