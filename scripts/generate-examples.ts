import { faker } from "@faker-js/faker";

const GENERATOR_IDS = ["GEN.A01.001", "GEN.A01.002"];

function mw(): number {
  return Math.round(faker.number.float({ min: 5, max: 50 }) * 10) / 10;
}

function cap(): number {
  return Math.round(faker.number.float({ min: 20, max: 98 }) * 10) / 10;
}

function dayStart(daysAgo: number): Date {
  const d = new Date();
  d.setUTCHours(0, 0, 0, 0);
  d.setUTCDate(d.getUTCDate() - daysAgo);
  return d;
}

function isoHour(base: Date, hour: number): string {
  const d = new Date(base);
  d.setUTCHours(hour, 0, 0, 0);
  return d.toISOString();
}

type GeneratorReading = {
  generator_id: string;
  power_reading_mw: number;
  is_producing: boolean;
};

type HistoryItem = {
  timestamp: string;
  power_reading_mw: { value: number };
  used_capacity_percentage: { value: number };
  generator_readings: GeneratorReading[];
};

function generatorReadings(producing: boolean[]): GeneratorReading[] {
  return GENERATOR_IDS.map((id, i) => ({
    generator_id: id,
    power_reading_mw: producing[i] ? mw() : 0,
    is_producing: producing[i],
  }));
}

function buildDaily28(): HistoryItem[] {
  return Array.from({ length: 28 }, (_, i) => {
    const ts = dayStart(27 - i);
    ts.setUTCHours(0, 0, 0, 0);
    return {
      timestamp: ts.toISOString(),
      power_reading_mw: { value: mw() },
      used_capacity_percentage: { value: cap() },
      generator_readings: [],
    };
  });
}

function buildTodayHourly(): HistoryItem[] {
  const today = dayStart(0);
  return Array.from({ length: 24 }, (_, h) => ({
    timestamp: isoHour(today, h),
    power_reading_mw: { value: mw() },
    used_capacity_percentage: { value: cap() },
    generator_readings: generatorReadings([
      faker.datatype.boolean({ probability: 0.85 }),
      faker.datatype.boolean({ probability: 0.85 }),
    ]),
  }));
}

function buildHourly28Days(): HistoryItem[] {
  const items: HistoryItem[] = [];
  for (let d = 27; d >= 0; d--) {
    const base = dayStart(d);
    for (let h = 0; h < 24; h++) {
      items.push({
        timestamp: isoHour(base, h),
        power_reading_mw: { value: mw() },
        used_capacity_percentage: { value: cap() },
        generator_readings: generatorReadings([
          faker.datatype.boolean({ probability: 0.85 }),
          faker.datatype.boolean({ probability: 0.85 }),
        ]),
      });
    }
  }
  return items;
}

export function generateStationHistoryExamples(): Record<
  string,
  { value: { history: HistoryItem[] } }
> {
  return {
    "daily-28": { value: { history: buildDaily28() } },
    "today-hourly": { value: { history: buildTodayHourly() } },
    "hourly-28-days": { value: { history: buildHourly28Days() } },
  };
}
