export const STARTDATE = new Date('2020-01-13');
export const ENDDATE = new Date('2021-03-07');

export enum Metric {
  CASES = 'Cases',
  TOTAL_HOSPITALIZATIONS = 'Hospitalizations (Total)',
  ICU = 'Hospitalizations (in ICU)',
  VENTILATOR = 'Hospitalizations (on Ventilator)',
  DEATHS = 'Deaths',
  TESTING = 'Testing',
}

export enum Interval {
  TOTAL = 'Total',
  POPULATION_PERCENT = 'Population Percent',
  CHANGE_FROM_PRIOR_DAY = 'Change from Prior Day',
  SEVEN_DAY = '7 Day Change Percent',
}

export const pathMap = {
  [Metric.CASES]: {
    [Interval.TOTAL]: ['cases', 'total', 'value'],
    [Interval.SEVEN_DAY]: [
      'cases',
      'total',
      'calculated',
      'seven_day_change_percent',
    ],
    [Interval.CHANGE_FROM_PRIOR_DAY]: [
      'cases',
      'total',
      'calculated',
      'change_from_prior_day',
    ],
    [Interval.POPULATION_PERCENT]: [
      'cases',
      'total',
      'calculated',
      'population_percent',
    ],
  },
  [Metric.DEATHS]: {
    [Interval.TOTAL]: ['outcomes', 'death', 'total', 'value'],
    [Interval.SEVEN_DAY]: [
      'outcomes',
      'death',
      'total',
      'calculated',
      'seven_day_change_percent',
    ],
    [Interval.CHANGE_FROM_PRIOR_DAY]: [
      'outcomes',
      'death',
      'total',
      'calculated',
      'change_from_prior_day',
    ],
    [Interval.POPULATION_PERCENT]: [
      'outcomes',
      'death',
      'total',
      'calculated',
      'population_percent',
    ],
  },
  [Metric.TOTAL_HOSPITALIZATIONS]: {
    [Interval.TOTAL]: ['outcomes', 'hospitalized', 'currently', 'value'],
    [Interval.SEVEN_DAY]: [
      'outcomes',
      'hospitalized',
      'currently',
      'calculated',
      'seven_day_change_percent',
    ],
    [Interval.CHANGE_FROM_PRIOR_DAY]: [
      'outcomes',
      'hospitalized',
      'currently',
      'calculated',
      'change_from_prior_day',
    ],
    [Interval.POPULATION_PERCENT]: [
      'outcomes',
      'hospitalized',
      'currently',
      'calculated',
      'population_percent',
    ],
  },
  [Metric.ICU]: {
    [Interval.TOTAL]: [
      'outcomes',
      'hospitalized',
      'in_icu',
      'currently',
      'value',
    ],
    [Interval.SEVEN_DAY]: [
      'outcomes',
      'hospitalized',
      'in_icu',
      'currently',
      'calculated',
      'seven_day_change_percent',
    ],
    [Interval.CHANGE_FROM_PRIOR_DAY]: [
      'outcomes',
      'hospitalized',
      'in_icu',
      'currently',
      'calculated',
      'change_from_prior_day',
    ],
    [Interval.POPULATION_PERCENT]: [
      'outcomes',
      'hospitalized',
      'in_icu',
      'currently',
      'calculated',
      'population_percent',
    ],
  },
  [Metric.TESTING]: {
    [Interval.TOTAL]: ['testing', 'total', 'value'],
    [Interval.SEVEN_DAY]: [
      'testing',
      'total',
      'calculated',
      'seven_day_change_percent',
    ],
    [Interval.CHANGE_FROM_PRIOR_DAY]: [
      'testing',
      'total',
      'calculated',
      'change_from_prior_day',
    ],
    [Interval.POPULATION_PERCENT]: [
      'testing',
      'total',
      'calculated',
      'population_percent',
    ],
  },
  [Metric.VENTILATOR]: {
    [Interval.TOTAL]: [
      'outcomes',
      'hospitalized',
      'on_ventilator',
      'currently',
      'value',
    ],
    [Interval.SEVEN_DAY]: [
      'outcomes',
      'hospitalized',
      'on_ventilator',
      'currently',
      'calculated',
      'seven_day_change_percent',
    ],
    [Interval.CHANGE_FROM_PRIOR_DAY]: [
      'outcomes',
      'hospitalized',
      'on_ventilator',
      'currently',
      'calculated',
      'change_from_prior_day',
    ],
    [Interval.POPULATION_PERCENT]: [
      'outcomes',
      'hospitalized',
      'on_ventilator',
      'currently',
      'calculated',
      'population_percent',
    ],
  },
};

export function getDataArray(aggregateDataSet: any[], path: string[]) {
  return aggregateDataSet.map((entry) => getNestedValue(entry, path));
}

export function getNestedValue(obj: any, path: string[]): any {
  return path.reduce((acc, key) => acc && acc[key], obj);
}

export function getDateFromIndex(index) {
  const date = new Date(ENDDATE);
  date.setDate(date.getDate() - index);
  return date;
}

export function formatDate(date) {
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const day = date.getDate();
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();

  // Function to determine the ordinal suffix for the day
  const getOrdinal = (n) => {
    if (n > 3 && n < 21) return `${n}th`; // Special case for 11th to 13th
    switch (n % 10) {
      case 1:
        return `${n}st`;
      case 2:
        return `${n}nd`;
      case 3:
        return `${n}rd`;
      default:
        return `${n}th`;
    }
  };

  return `${month} ${getOrdinal(day)}, ${year}`;
}
