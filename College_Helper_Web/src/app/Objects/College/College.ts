import { CollegeBoard } from './Collegeboard/CollegeBoard';
import { Division } from './Course';
import { GeneralInfo } from './GeneralInfo';
import { Officer } from './Officer';
import { Population } from './Population';

export interface College {
  name: string;
  generalInfo: GeneralInfo | null;
  officers: Officer[] | null;
  divisions: Division[] | null;
  degrees: Division[] | null;
  populations: Population[] | null;
  ceeb: Number | null;
  collegeBoard: CollegeBoard | null;
}

export const testCollege: College = {
  name: 'The Chicago School of Professional Psychology at Los Angeles',
  generalInfo: {
    address: {
      street: '707 Wilshire Boulevard',
      city: 'Los Angeles',
      state: 'California',
      country: null,
      zip: '90017',
      website: 'https://www.thechicagoschool.edu/los-angeles',
    },
    funding: 'Private',
    history:
      'Created 1979 and forms part of a network of psychology schools across the USA',
    academicYear:
      'The academic year typically begins with the last Monday in August and ends with the end of the summer semester, typically the third week in August. The School has a continuous enrollment policy and requires summer school for all programs. Seme',
    languages: ['English'],
    accreditations: [
      'Higher Learning Commission',
      'WASC Senior College and University Commission',
      'American Psychological Association, Commission on Accreditation',
    ],
  },
  officers: [
    {
      name: 'Michele Nealon',
      title: 'President',
    },
    {
      name: 'Alisha DeWalt',
      title: 'Executive Director of TCSPP Global',
    },
  ],
  divisions: [
    {
      name: 'Psychology',
      fieldsOfStudy: [
        'Behavioural Sciences',
        'Clinical Psychology',
        'Industrial and Organizational Psychology',
        'Leadership',
        'Psychology',
        'Social and Community Services',
      ],
    },
  ],
  degrees: [
    {
      name: "Bachelor's Degree",
      fieldsOfStudy: ['Psychology'],
    },
    {
      name: "Post-bachelor's Diploma/Certificate",
      fieldsOfStudy: ['Behavioural Sciences'],
    },
    {
      name: "Master's Degree",
      fieldsOfStudy: ['Clinical Psychology', 'Psychology'],
    },
    {
      name: "Doctor's Degrees (Professional Practice)",
      fieldsOfStudy: ['Education', 'Psychology'],
    },
    {
      name: "Doctor's Degree (Research/Scholarship)",
      fieldsOfStudy: [
        'Behavioural Sciences',
        'Clinical Psychology',
        'Industrial and Organizational Psychology',
        'Leadership',
        'Psychology',
      ],
    },
  ],
  populations: [
    {
      type: 'Staff',
      total: 300,
      yearGathered: '2021-2022',
    },
    {
      type: 'Students',
      total: 5912,
      yearGathered: '2021-2022',
    },
  ],
  ceeb: 4330,

  collegeBoard: {
    admissions: {
      gpaRange: {
        '3.75': -1,
        '3.5': -1,
        '3.25': -1,
        '3.0': -1,
        '2.5': -1,
        '2.0': -1,
        '0.0': -1,
      },
      satRange: {
        satTotalRange: {
          min: 1160,
          max: 1440,
        },
        satMathRange: {
          min: 580,
          max: 720,
        },
        satReadingRange: {
          min: 580,
          max: 720,
        },
      },
      actRange: {
        compositeRange: {
          min: 24,
          max: 30,
        },
      },
      acceptanceRate: {
        description: 'Not Available',
        rate: 'Not Available',
        applicantCount: -1,
        admittedCount: -1,
        enrolledCount: -1,
      },
    },
    academics: {
      graduationRate: 'Not Available',
      retentionRate: 'Not Available',
      studentFacultyRatio: 'Not Available',
    },
    costs: {
      avgNetPrice: -1,
      netPriceIncome: {
        '<30k': -1,
        '30-48k': -1,
        '48-75k': -1,
        '75-110k': -1,
        '110k+': -1,
      },
      stickerPrice: {
        inState: -1,
        outOfState: -1,
      },
      otherCosts: {
        housing: -1,
        supplies: -1,
        personal: -1,
        transportation: -1,
      },
    },
  },
};
