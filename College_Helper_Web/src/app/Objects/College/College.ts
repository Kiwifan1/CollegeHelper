import { Division } from './Course';
import { GeneralInfo } from './GeneralInfo';
import { Officer } from './Officer';
import { Population } from './Population';

export interface College {
  name: string;
  generalInfo: GeneralInfo;
  officers: Officer[];
  divisions: Division[];
  degrees: Division[];
  populations: Population[];
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
};
