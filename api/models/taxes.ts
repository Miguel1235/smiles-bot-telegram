export interface Taxes {
  fareuid: string;
  fareuid2: string;
  highlightText: string;
  type: string;
  type2: string;
  uid: string;
  uid2: string;
  pricingAdmin: boolean;
  flightList: FlightList[];
  region: string;
  language: string;
  totals: Totals;
  mustTwoPnrs: boolean;
  isDocumentRequired: boolean;
}

export type TaxesMap = Record<string, Taxes>;

export interface FlightList {
  type: string;
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
  airline: Airline;
  baggage: Baggage;
  validatingAirlineCode: string;
  durationNumber: number;
  duration: Duration;
  legList: LegList[];
  fareList: FareList[];
  ndc: boolean;
  trackingAmadeus: null;
  recalculate: boolean;
  fareValueSmiles: number;
  codeContext: string;
  segmentFlight: string;
  sourceFare: string;
  tracking: Tracking;
  boardingTax: FlightListBoardingTax;
  dynamicAttributeList: DynamicAttributeList[];
  cancellationTax: number;
  cancellationCurrency: string;
  refundable: boolean;
  luggageRestriction: LuggageRestriction;
  mustTwoPnrs: boolean;
  taxList: TaxList[];
  passengerByTypeList: PassengerByTypeList[];
  refundableText: string;
  ticketsTwoPnrText: TicketsTwoPnrText;
}

export interface Airline {
  code: string;
  name: string;
}

export interface Arrival {
  date: Date;
  airport: Airport;
}

export interface Airport {
  code: string;
  name: string;
  city: string;
  country: string;
  timezone?: string;
}

export interface Baggage {
  free: string;
  quantity: number;
}

export interface FlightListBoardingTax {
  rate: number;
  hasPaymentInMiles: boolean;
  miles: number;
  selectedOption: string;
  money: number;
  airlineTax: number;
  airlineTaxMiles: number;
  boardingTaxMiles: number;
  boardingTaxMoney: number;
}

export interface Duration {
  hours: number;
  minutes: number;
}

export interface DynamicAttributeList {
  type: string;
  show: boolean;
  required: boolean;
}

export interface FareList {
  uid: string;
  congener: FareListCongener;
  type: string;
  baseMiles: number;
  money: number;
  miles: number;
  airlineFareAmount: number;
  airlineFare: number;
  airlineTax: number;
  marginRecalc: null;
  recalculate: boolean;
  ruleText: string;
  shortRuleText: string;
}

export interface FareListCongener {
  fareReference: string;
  fareInfo: string;
  negotiatedFareCode: null;
}

export interface LegList {
  cabin: string;
  departure: Arrival;
  arrival: Arrival;
  flightNumber: string;
  marketingAirline: Airline;
  operationAirline: Airline;
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
  negotiatedFareCode: null;
  commentList: string[];
  fareReference: string;
}

export interface LuggageRestriction {
  type: string;
  quantity: number;
  shortText: string;
}

export interface PassengerByTypeList {
  code: string;
  fareType: string;
  value: number;
}

export interface TaxList {
  code: string;
  description: string;
  money: number;
  refundable: boolean;
  type: string;
}

export interface TicketsTwoPnrText {
  header: string;
  bodyHeader: string;
  body: string;
}

export interface Tracking {
  boardingTaxes: BoardingTaxElement[];
}

export interface BoardingTaxElement {
  origin: string;
  airportType: string;
  cost: number;
  boardingTax: number;
  airlineTax: number;
  boardingTaxMilesValue: number;
  airlineTaxMilesValue: number;
  ticketMilesValue: number;
  milesValue: number;
  action: string;
  showSite: boolean;
  trackingPricingMiles: TrackingPricingMiles;
}

export interface TrackingPricingMiles {
  PRECIFICACAO: Arredondamento;
  ARREDONDAMENTO: Arredondamento;
}

export interface Arredondamento {
  nameRule: string;
  description: string;
  value: string;
}

export interface Totals {
  total: Total;
  passenger: number;
  totalFare: Total;
  totalFareBase: Total;
  totalBoardingTax: TotalBoardingTax;
  totalPassengerTypeList: TotalPassengerTypeList[];
  totalByTypeList: any[];
  totalByTaxList: TaxList[];
}

export interface Total {
  miles: number;
  money: number;
}

export interface TotalBoardingTax {
  miles: number;
  money: number;
  airlineTax: number;
  airlineTaxMiles: number;
  boardingTaxMiles: number;
  boardingTaxMoney: number;
}

export interface TotalPassengerTypeList {
  type: string;
  passenger: number;
  totalFare: Total;
}
