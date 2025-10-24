// dexie-schema.ts
import Dexie from 'dexie';

export interface Trip {
  tripId: string;
  userId: string;
  shiftId?: string;
  dateKey: string;
  startTimestamp: string;
  endTimestamp?: string;
  durationSeconds?: number;
  distanceMeters?: number;
  valueAmount?: number;
  startLocation?: { lat: number; long: number };
  endLocation?: { lat: number; long: number };
  startPointName?: string;
  endPointName?: string;
  gpsPointsRef?: string;
  status: 'active' | 'completed' | 'cancelled';
  synced: boolean;
  retryCount: number;
  createdAt: string;
  updatedAt?: string;
}

export interface Shift {
  shiftId: string;
  userId: string;
  startTimestamp: string;
  endTimestamp?: string;
  totalDurationSeconds?: number;
  totalDistanceMeters?: number;
  totalAmount?: number;
  tripsCount?: number;
  status: 'active' | 'paused' | 'ended';
  synced: boolean;
  createdAt: string;
  updatedAt?: string;
}

export interface DailyGoal {
  dateKey: string;
  targetAmount: number;
  targetHoursSeconds: number;
  targetMonthlyTrips?: number;
  achievedAmount: number;
  achievedHoursSeconds: number;
  achievedDistanceMeters: number;
  carriedOverAmount: number;
  carriedOverHoursSeconds: number;
  effectiveFrom?: string;
  effectiveTo?: string;
  lastUpdatedAt?: string;
  synced: boolean;
}

export interface SyncQueueItem {
  id?: number;
  opType: string;
  payload: any;
  createdAt: string;
  lastAttemptAt?: string;
  retryCount: number;
  status: 'pending' | 'inProgress' | 'done' | 'failed';
}

export class AppDB extends Dexie {
  trips!: Dexie.Table<Trip, string>;
  shifts!: Dexie.Table<Shift, string>;
  dailyGoals!: Dexie.Table<DailyGoal, string>;
  goalHistory!: Dexie.Table<any, number>;
  syncQueue!: Dexie.Table<SyncQueueItem, number>;

  constructor() {
    super('TripTrackerDB');
    this.version(1).stores({
      trips: 'tripId, dateKey, shiftId, startTimestamp, distanceMeters',
      shifts: 'shiftId, userId, startTimestamp, status',
      dailyGoals: 'dateKey, lastUpdatedAt',
      goalHistory: '++id, dateKey, savedAt',
      syncQueue: '++id, opType, createdAt, status'
    });
  }
}

export const db = new AppDB();
