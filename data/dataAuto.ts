export interface AutocompleteOption {
  label: string
  value: string
  description: string
}

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

export const occupationOptions: AutocompleteOption[] = [
  {
    label: 'Software Engineer',
    value: 'software engineer',
    description: 'A person who designs and develops software'
  },
  {
    label: 'Doctor',
    value: 'doctor',
    description: 'A person who practices medicine'
  },
  {
    label: 'Lawyer',
    value: 'lawyer',
    description: 'A person who practices law'
  },
  {
    label: 'Teacher',
    value: 'teacher',
    description: 'A person who educates students'
  },
  { label: 'Artist', value: 'artist', description: 'A person who creates art' },
  {
    label: 'Other',
    value: 'other',
    description: 'Another occupation not listed'
  }
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
