export interface AutocompleteOption {
  label: string
  value: string
  description: string
}

export const genderOptions: AutocompleteOption[] = [
  { label: 'woman', value: 'woman', description: 'Woman' },
  { label: 'man', value: 'man', description: 'Man' }
]

export const weightOptions: AutocompleteOption[] = [
  { label: '40 kg', value: '40', description: '40 kg' },
  { label: '45 kg', value: '45', description: '45 kg' },
  { label: '50  kg', value: '50', description: '50 kg' },
  { label: '55 kg', value: '55', description: '55 kg' },
  { label: '60 kg', value: '60', description: '60 kg' },
  { label: '65 kg', value: '65', description: '65 kg' },
  { label: '70 kg', value: '70', description: '70 kg' },
  { label: '75 kg', value: '75', description: '75 kg' },
  { label: '80 kg', value: '80', description: '80 kg' },
  { label: '85 kg', value: '85', description: '85 kg' },
  { label: '90 kg', value: '90', description: '90 kg' },
  { label: '95 kg', value: '95', description: '95 kg' },
  { label: '100 kg', value: '100', description: '100 kg' },
  { label: '105 kg', value: '105', description: '105 kg' },
  { label: '110 kg', value: '110', description: '110 kg' },
  { label: '115 kg', value: '115', description: '115 kg' },
  { label: '120 kg', value: '120', description: '120 kg' },
  { label: '125 kg or more', value: '125', description: '125 kg' }
]

export const heightOptions: AutocompleteOption[] = [
  { label: '140 cm', value: '140', description: '140 cm' },
  { label: '145 cm', value: '145', description: '145 cm' },
  { label: '150 cm', value: '150', description: '150 cm' },
  { label: '155 cm', value: '155', description: '155 cm' },
  { label: '160 cm', value: '160', description: '160 cm' },
  { label: '165 cm', value: '165', description: '165 cm' },
  { label: '170 cm', value: '170', description: '170 cm' },
  { label: '175 cm', value: '175', description: '175 cm' },
  { label: '180 cm', value: '180', description: '180 cm' },
  { label: '185 cm', value: '185', description: '185 cm' },
  { label: '190 cm', value: '190', description: '190 cm' },
  { label: '195 cm', value: '195', description: '195 cm' },
  { label: '200 cm or more', value: '200', description: '200 cm' }
]
export const religionOptions: AutocompleteOption[] = [
  {
    label: 'Agnostic',
    value: 'agnostic',
    description:
      'A person who believes that nothing is known or can be known about the existence of God'
  },
  {
    label: 'Atheist',
    value: 'atheist',
    description: 'A person who disbelieves in the existence of God'
  },
  {
    label: 'Buddhist',
    value: 'buddhist',
    description: 'A follower of Buddhism'
  },
  {
    label: 'Christian',
    value: 'christian',
    description: 'A follower of Christianity'
  },
  { label: 'Hindu', value: 'hindu', description: 'A follower of Hinduism' },
  { label: 'Jewish', value: 'jewish', description: 'A follower of Judaism' },
  { label: 'Muslim', value: 'muslim', description: 'A follower of Islam' },
  {
    label: 'Other',
    value: 'other',
    description: 'A follower of another religion not listed'
  }
]

export const educationOptions: AutocompleteOption[] = [
  {
    label: 'Elementary School',
    value: 'elementary school',
    description: 'Elementary school education'
  },
  {
    label: 'High School Diploma',
    value: 'high school diploma',
    description: 'A diploma awarded to students who complete high school'
  },
  {
    label: "Bachelor's Degree",
    value: "bachelor's degree",
    description: 'An undergraduate academic degree'
  },
  {
    label: "Master's Degree",
    value: "master's degree",
    description: 'A postgraduate academic degree'
  },
  {
    label: 'Doctoral Degree',
    value: 'doctoral degree',
    description: 'A highest academic degree'
  },
  {
    label: 'Vocational Training',
    value: 'vocational training',
    description: 'Training in a specific trade or skill'
  },
  {
    label: 'Other',
    value: 'other',
    description: 'Another level of education not listed'
  }
]
export const petsOptions: AutocompleteOption[] = [
  {
    value: 'like_pets',
    label: 'Like Pets',
    description: 'Select if you like having pets in the house'
  },
  {
    value: 'dislike_pets',
    label: 'Do Not Like Pets',
    description: 'Select if you do not like having pets in the house'
  },
  {
    value: 'dog',
    label: 'Dog',
    description: 'Select if you have a dog as a pet'
  },
  {
    value: 'cat',
    label: 'Cat',
    description: 'Select if you have a cat as a pet'
  },
  {
    value: 'bird',
    label: 'Bird',
    description: 'Select if you have a bird as a pet'
  },
  {
    value: 'fish',
    label: 'Fish',
    description: 'Select if you have fish as pets'
  },
  {
    value: 'rabbit',
    label: 'Rabbit',
    description: 'Select if you have a rabbit as a pet'
  },
  {
    value: 'hamster',
    label: 'Hamster',
    description: 'Select if you have a hamster as a pet'
  },
  {
    value: 'turtle',
    label: 'Turtle',
    description: 'Select if you have a turtle as a pet'
  }
  // Add more pet options as needed
]

export const occupationOptions: AutocompleteOption[] = [
  { value: 'student', label: 'Student', description: 'Student' },
  { value: 'professional', label: 'Professional', description: 'Professional' },
  { value: 'entrepreneur', label: 'Entrepreneur', description: 'Entrepreneur' },
  { value: 'homemaker', label: 'Homemaker', description: 'Homemaker' },
  { value: 'retired', label: 'Retired', description: 'Retired' },
  { value: 'unemployed', label: 'Unemployed', description: 'Unemployed' },
  { value: 'freelancer', label: 'Freelancer', description: 'Freelancer' },
  { value: 'artist', label: 'Artist', description: 'Artist' },
  {
    value: 'teacher',
    label: 'Teacher/Educator',
    description: 'Teacher/Educator'
  },
  {
    value: 'healthcare',
    label: 'Healthcare Professional',
    description: 'Healthcare Professional'
  },
  { value: 'engineer', label: 'Engineer', description: 'Engineer' },
  {
    value: 'it',
    label: 'Information Technology (IT) Professional',
    description: 'Information Technology (IT) Professional'
  },
  {
    value: 'businessowner',
    label: 'Business Owner',
    description: 'Business Owner'
  },
  { value: 'salesperson', label: 'Salesperson', description: 'Salesperson' },
  {
    value: 'manager',
    label: 'Manager/Administrator',
    description: 'Manager/Administrator'
  },
  {
    value: 'government',
    label: 'Government Employee',
    description: 'Government Employee'
  },
  {
    value: 'lawyer',
    label: 'Lawyer/Legal Professional',
    description: 'Lawyer/Legal Professional'
  },
  {
    value: 'accountant',
    label: 'Accountant/Financial Professional',
    description: 'Accountant/Financial Professional'
  },
  { value: 'consultant', label: 'Consultant', description: 'Consultant' },
  { value: 'other', label: 'Other', description: 'Other' }
]

export const incomeOptions: AutocompleteOption[] = [
  {
    label: 'Less than $20,000',
    value: 'less than $20,000',
    description: 'An annual income of less than $20,000'
  },
  {
    label: '$20,000 - $50,000',
    value: '$20,000 - $50,000',
    description: 'An annual income between $20,000 and $50,000'
  },
  {
    label: '$50,000 - $100,000',
    value: '$50,000 - $100,000',
    description: 'An annual income between $50,000 and $100,000'
  },
  {
    label: 'More than $100,000',
    value: 'more than $100,000',
    description: 'An annual income of more than $100,000'
  }
]

export const smokingHabitsOptions: AutocompleteOption[] = [
  {
    label: 'Non-Smoker',
    value: 'non-smoker',
    description: 'A person who does not smoke'
  },
  {
    label: 'Occasional Smoker',
    value: 'occasional smoker',
    description: 'A person who smokes occasionally'
  },
  {
    label: 'Regular Smoker',
    value: 'regular smoker',
    description: 'A person who smokes regularly'
  }
]

export const drinkingHabitsOptions: AutocompleteOption[] = [
  {
    label: 'Non-Drinker',
    value: 'non-drinker',
    description: 'A person who does not drink'
  },
  {
    label: 'Occasional Drinker',
    value: 'occasional drinker',
    description: 'A person who drinks occasionally'
  },
  {
    label: 'Regular Drinker',
    value: 'regular drinker',
    description: 'A person who drinks regularly'
  }
]

export const travelPreferencesOptions: AutocompleteOption[] = [
  {
    label: 'Beach',
    value: 'beach',
    description: 'A person who prefers to travel to beach destinations'
  },
  {
    label: 'City',
    value: 'city',
    description: 'A person who prefers to travel to city destinations'
  },
  {
    label: 'Nature',
    value: 'nature',
    description: 'A person who prefers to travel to nature destinations'
  },
  {
    label: 'Other',
    value: 'other',
    description:
      'A person who prefers to travel to another type of destination not listed'
  }
]

export const maritalStatusOptions: AutocompleteOption[] = [
  {
    label: 'Single',
    value: 'single',
    description: 'A person who is not married'
  },
  {
    label: 'Married',
    value: 'married',
    description: 'A person who is married'
  },
  {
    label: 'Divorced',
    value: 'divorced',
    description: 'A person who is divorced'
  },
  {
    label: 'Widowed',
    value: 'widowed',
    description: 'A person who is widowed'
  },
  {
    label: 'Other',
    value: 'other',
    description: 'A person who has another marital status not listed'
  }
]

// ... and so on for the other categories
