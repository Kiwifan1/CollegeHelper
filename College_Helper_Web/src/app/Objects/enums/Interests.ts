export enum InterestCriteriaEnum {
  'Real Estate',
  'History',
  'Wildlife Conservation',
  'Building Trades',
  'Motorcycling',
  'Writing',
  'Literature',
  'Social Justice',
  'Media',
  'Welding',
  'Aviation',
  'International Travel',
  'Entrepreneurship',
  'Running',
  'Leadership',
  'Performing and Theatrical Arts',
  'Outdoor Activities',
  'Environmentalism',
  'Entertainment',
  'Art',
  'Sports',
  'Diversity',
  'Health',
  'Other',
  'Science',
  'Racial Equality',
  'Jazz',
  'Special Event and Tent Industry',
  'Teaching',
  'Business',
  'Golf',
  'Public Service',
  'Public Affairs',
  'Political Science',
  'Broadcast Journalism',
  'Music',
  'Health Research',
  'Poetry',
  'Agriculture',
  'Nature',
  'Construction',
  'Chemistry',
  'Government',
}

export enum InterestOtherEnum {
  'International relations and global affairs',
  'Hereford Cattle Breeding',
  'Motorcycling',
  'Endangered Species',
  'Welding',
  'Bedding  Crops',
  'French',
  'Physics',
  'Global perspective',
  'Hawaiian language, culture, and history',
  'California seed industry',
  'Performing and Theatrical Arts',
  'Computer logic and programming technology',
  'woody plant production',
  'Communications',
  'e-sports',
  'National or international security policy',
  'Trigonometry',
  'Content creation',
  'Engineering',
  'Public Service',
  'Energy Industry',
  'Floral crops',
  'Poetry',
  'Horticulture',
  'Industries using and/or manufacturing pressure vessels or related components',
  'Construction',
  "Florida's nursery and landscape industry",
  'Chemistry',
  'Iron and steel industry',
  'Wildlife Management',
  'International Studies',
  'Preventing overdoses',
  'History',
  'Public Speaking',
  'Baseball',
  'Writing',
  'Metal/Wood Fabrication',
  'Commercial',
  'Social Justice',
  'Working with the elderly',
  'Social studies',
  'Drumming',
  'Dorper Sheep',
  'Language',
  'Equipment leasing industry',
  'Wood Plant Propagation',
  'Taken advanced placement courses',
  'Human Rights',
  'Creative writing',
  'Transportation',
  'Military',
  'Diversity',
  'Radio service',
  'Racial Equality',
  'Medicine',
  null,
  'Broadcasting',
  'Creative arts (arts and humanities)',
  'Public Policy',
  'First Aid',
  'Clinical or non-clinical career in health industry',
  'Welfare and protection of animals',
  'Career involving marketing',
  'Art of the Spanish Americas',
  'STEM',
  'Media/Journalism',
  'Architecture',
  'Environmental marketing and sales',
  'Securities litigation',
  'Doctor',
  'Being a professional pilot',
  'Artificial Intelligence (AI)',
  'Mental health',
  "Worker's Rights",
  "NASA's mission",
  'Agriculture',
  'Photography',
  'Public health',
  'Interest in working with HealthPartners upon graduation',
  'Truck Driving',
  "women's rights and issues",
  'Dance',
  'Active voice of change in community',
  'Creative Writing',
  'inclusion',
  'Product development and design',
  'Public transportation',
  'Social science',
  'Mentoring',
  'Involved in speech',
  'Interest and commitment of working in high-needs schools',
  'Clarinet',
  'Traditional Service Fields',
  'Passion for nursing',
  'English',
  'STEAM-based subjects',
  'Exhibit desire to bring back expertise from their college experience to help the Hawaiian community',
  'Math',
  'Research',
  'Officer Cadet training',
  'Classical Composition',
  'Journalism',
  'Financial law',
  'Social Studies',
  'Family and child practice',
  'Civil War',
  'Wildlife Trapping',
  'Voice',
  'Travelling',
  'Technology',
  'Passion for biomedical and biopharmaceutical innovation',
  'Science',
  'Public advocacy',
  'HEREFORD CATTLE BREEDING',
  'Interest in the values and tradition of the Hawaiian Civic Club Movement',
  'Organ',
  'Ethics and integrity',
  'Thermodynamics',
  'Chicano studies',
  'Sports marketing',
  'Medicine or cancer research',
  'Fishery conservation and sustainability',
  'Math and science',
  'Sustainability',
  'Theater',
  'Legal studies',
  'Space transportation',
  'Hopsice',
  'Archeology',
  'Drafting',
  'Providing healthcare to underserved communities',
  'Safe schools and citizenship',
  'International Relations',
  'Mathematics',
  'Occupational Safety Training',
  'Healthcare',
  'Beverage Innovation',
  'Has interests besides academics',
  'Sailing',
  'Woody Plant Breeding',
  'Southwestern Field Archaeology',
  'International Travel',
  'Aviation',
  'Library',
  'Entrepreneurship',
  'Floodplain or stormwater management',
  'Chevron and energy industry',
  'Pulp and Paper Industry',
  'Driving',
  'Recreation',
  'Athletics',
  'Desires to become self-supporting',
  'Consulting',
  'Interested in home economics',
  'Finance',
  'Beef or dairy cattle',
  'Aerodynamics',
  'Radio',
  'Technical field',
  'Law',
  'Hawaiian language, culture, history',
  'Horticultural Sales and Marketing',
  'Special Education',
  'Classical Music',
  'Engineering and Mathematics',
  'Consumer/Retail industries',
  'Studying Abroad',
  'NASA',
  'Western water',
  'Sexual assault and violence awareness',
  'Gerontology and dementia',
  'Social concerns',
  'Gaming',
  'Computer/Electronics',
  'Fuels, combustion, or the power industry',
  'Japanese culture',
  'Performing Arts',
  'Accounting',
}

export interface Interest {
  interestCriteria: InterestCriteriaEnum;
  interestOther: InterestOtherEnum;
}
