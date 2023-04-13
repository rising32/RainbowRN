export type IUser = {
  _id: string;
  userId: string;
  accessToken: string;
  username: string;
  userName: string;
  firstName: string;
  lastName: string;
  role: number;
  photoUrl?: string;
};
export type SNType = 'RLM' | 'MPT';

export type ICalibration = {
  _id: string;
  caliDate: string;
  caliInstrumentSN: number;
  caliInstrumentSNType: SNType;
  caliRLMReading?: string;
  caliMPTForce?: string;
  caliPhoto?: string;
  caliInspector: string;
  caliInspectorName: string;
  caliStatus: number;
};

export type IInspection = {
  _id: string;
  poleid: string;
  wonoid: string;
  inspectorid: string;
  status: string;
  inspectionDate?: string;
  lossMassClass?: number;
  lossMassLSU?: number;
  magneticDefect?: string;
  rejectReason?: string;
  poleMaterial?: number;
  poleShape?: number;
  poleBrand?: number;
  poleYear?: string;
  poleType?: number;
  poleSurface?: number;
  poleGround?: number;
  poleBase?: string;
  poleBody?: string;
  poleArm?: string;
  note?: string;
  lossMass1?: number;
  lossMass2?: number;
  lossMass3?: number;
  lossMass4?: number;
  magnetic1?: number;
  magnetic2?: number;
  magnetic3?: number;
  magnetic4?: number;
  rustCondition?: number;
  observation?: string;
  observationLast?: string;
  photosPoleId?: string;
  photosPoleLabel?: string;
  photosEntirePole?: string;
  photosOther?: string;
  photosPoleBase1?: string;
  photosPoleBase2?: string;
  photosPoleBase3?: string;
  photosPoleBase4?: string;
};

export type IWorkNumber = {
  _id: string;
  woNumber: string;
  quantity: number;
  assetOwner: string;
  zoneDistrict: number;
};

export type IPole = {
  _id: string;
  poleidLocation: string;
  poleidName: string;
  poleidType: number;
};

export type ILocation = {
  _id: string;
  locationOwner: string;
  locationZone: number;
  locationName: string;
  locationDiv: number;
};

export type IAdmin = {
  _id: string;
  firstName: string;
  lastName: string;
  role: number;
  ConEntityName: string;
  ConEntityAddress: string;
  ConProjectManager: string;
  ConProjectManagerTelNo: string;
  ConFinanceManager: string;
  ConFinanceManagerTelNo: string;
};

export type InspectionStatus = 'begin' | 'rejected' | 'accepted';

export type PhotoFileType = {
  uri: string;
  name: string;
  type: string;
};

export type InstrumentItemType = {
  instrumentName: SNType;
  instrumentType: number;
  instrumentFrom: number;
  instrumentTo: number;
};
export type InstrumentType = {
  instrumentRLM: InstrumentItemType[];
  instrumentMPT: InstrumentItemType[];
};
