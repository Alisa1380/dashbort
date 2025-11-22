export interface Vehicle {
  id: string;
  number: string;
  status: string;
  user: string;
  territory: string;
  passage?: string;
  exit?: string;
  timestamp: string;
  type: 'entry' | 'exit';
}

export interface HistoryEntry {
  number: string;
  time: string;
  type: 'entry' | 'exit';
}

export interface DatabaseRecord {
  id: string;
  photo?: string;
  number: string;
  date: string;
  access: 'Резидент' | 'Гость' | 'Такси';
  fullName: string;
  phone: string;
  accessType: string;
}

export interface Application {
  id: string;
  number: string;
  applicant: string;
  date: string;
  validityPeriod: string;
  status: 'Резидент' | 'Гость' | 'Такси';
  actions: string;
}

export interface Statistics {
  entry: number;
  exit: number;
  onApplication: number;
  rejection: number;
  onTerritory: number;
}

export interface Analytics {
  loadOnCheckpoint: {
    resident: { percentage: number; count: number };
    guest: { percentage: number; count: number };
    taxi: { percentage: number; count: number };
  };
  hourlyStatistics: any[];
}

// Mock data
export let vehicles: Vehicle[] = [
  {
    id: '1',
    number: 'X333OH',
    status: 'На территории',
    user: 'Иванов Иван Иванович',
    territory: 'КПП-1',
    passage: '24.10.2025 10:00',
    timestamp: '2025-10-24T10:00:00',
    type: 'entry'
  }
];

export let history: HistoryEntry[] = [
  { number: 'ПРОЕЗД', time: '24.10.2025 10:00', type: 'entry' },
  { number: 'ВЫЕЗД', time: '22.10.2025 09:30', type: 'exit' }
];

export let databaseRecords: DatabaseRecord[] = [
  {
    id: '1',
    number: 'Л0100Г',
    date: '24.10.2025',
    access: 'Резидент',
    fullName: 'Иванов Иван Иванович',
    phone: '+7 000 000 00 00',
    accessType: 'Резидент'
  },
  {
    id: '2',
    number: 'В176ХС',
    date: '23.10.2025',
    access: 'Резидент',
    fullName: 'Петров Петр Петрович',
    phone: '+7 111 111 11 11',
    accessType: 'Резидент'
  }
];

export let applications: Application[] = [
  {
    id: 'М01',
    number: 'АМ001А',
    applicant: 'Петров Олег Петрович',
    date: '24.10.2025',
    validityPeriod: '24.10.2025 - 27.10.2025',
    status: 'Резидент',
    actions: 'pending'
  },
  {
    id: 'М02',
    number: 'Р016ВА',
    applicant: 'Иванов Иван Иванович',
    date: '24.10.2025',
    validityPeriod: '24.10.2025 - 29.10.2025',
    status: 'Резидент',
    actions: 'pending'
  },
  {
    id: 'М03',
    number: 'Г004АД',
    applicant: 'Смирнов Семен Семенович',
    date: '24.10.2025',
    validityPeriod: '24.10.2025 - 25.10.2025',
    status: 'Гость',
    actions: 'pending'
  }
];

export let statistics: Statistics = {
  entry: 142,
  exit: 128,
  onApplication: 12,
  rejection: 2,
  onTerritory: 25
};

export let analytics: Analytics = {
  loadOnCheckpoint: {
    resident: { percentage: 78, count: 158 },
    guest: { percentage: 15, count: 30 },
    taxi: { percentage: 78, count: 14 }
  },
  hourlyStatistics: []
};
