import * as z from 'zod'

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, {
    message: 'Password is required'
  })
})
export const UserFormValidation = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be at most 50 characters')
    .refine(
      (name) => /^[a-zA-Z\s]+$/.test(name),
      'Name must only contain letters and spaces'
    ),
  // email: z.string().email('Invalid email address'),
  phone: z
    .string()
    .refine((phone) => /^\+\d{10,15}$/.test(phone), 'Invalid phone number')
})

export const RegisterSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(6, {
      message: 'Minimum 6 characters'
    }),
    name: z
      .string()
      .min(2, 'Name must be at least 2 characters')
      .max(50, 'Name must be at most 50 characters')
      .regex(/^[a-zA-Z\s]+$/, 'Name must only contain letters and spaces'),
    confirmPassword: z.string().min(6, {
      message: 'Password must be at least 6 characters long'
    })
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'] // Sets the error path to the confirmPassword field
  })

export const ResetSchema = z.object({
  email: z.string().email({
    message: 'Email is required'
  })
})

export const ProfileACCOUNTSchema = z.object({
  height: z.string().optional(),
  weight: z.string().optional(),
  religion: z.string().optional(),
  education: z.string().optional(),
  occupation: z.string().optional(),
  income: z.string().optional(),
  smokinghabits: z.string().optional(),
  drinkinghabits: z.string().optional(),
  travelpreferences: z.string().optional(),
  maritalstatus: z.string().optional(),
  kids: z.string().optional(),
  city: z.string().optional(),
  country: z.string().optional()
})

export const SettingSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be at most 50 characters')
    .regex(/^[a-zA-Z\s]+$/, 'Name must only contain letters and spaces'),
  age: z.coerce
    .number()
    .int()
    .min(18, 'Minimum AGE is 18 years')
    .max(80, 'Maximum AGE is 80 years'),
  fullname: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be at most 50 characters')
    .regex(/^[a-zA-Z\s]+$/, 'Name must only contain letters and spaces'),
  phonenumber: z
    .string()
    .min(9, 'phone number must be at least 9 characters')
    .max(12, 'phone number must be at most 12 characters')
    .regex(/^[0-9+\s]+$/, 'phone number must be numeric')
})

export const NewPasswordSchema = z.object({
  password: z.string().min(6, {
    message: 'Minimum 6 characters'
  })
})

export const GoogleSchema = z.object({
  profilcomplete: z.boolean(),
  username: z.string().min(4, {
    message: 'Minimum of 4 characters required'
  }),
  fullname: z.string().min(6, {
    message: 'Minimum of 6 characters required'
  }),
  gender: z.string().min(1, {
    message: 'Please enter your gender'
  }),

  age: z.coerce
    .number()
    .int()
    .min(18, 'Minimum AGE is 18 years')
    .max(80, 'Maximum AGE is 80 years')
})
export const GoogleSchema1 = z.object({
  username: z.string().min(4, {
    message: 'Minimum of 4 characters required'
  }),
  fullname: z.string().min(6, {
    message: 'Minimum of 6 characters required'
  }),
  gender: z.string().min(1, {
    message: 'Please enter your gender'
  }),

  age: z.coerce
    .number()
    .int()
    .min(18, 'Minimum AGE is 18 years')
    .max(80, 'Maximum AGE is 80 years')
})
export const ProfilDetailsSchema = z.object({
  city: z.string().min(2, 'City is required'),
  country: z.string().min(2, 'Country is required'),
  height: z.string().min(2, ' height is required'),
  weight: z.string().min(2, 'weight is required'),
  education: z.string().min(1, 'education or qualification is required'),
  occupation: z.string().min(1, 'occupation is required'),
  income: z.string().min(2, 'income details is required'),
  smokinghabits: z.string().min(2, 'smokinghabits is required'),
  drinkinghabits: z.string().min(3, 'drinkinghabits is required'),
  religion: z.string().min(3, 'religion is required'),
  travelpreferences: z.string().min(3, 'travelpreferences is required'),
  maritalstatus: z.string().min(3, 'maritalstatus is required'),
  kids: z.string().min(2, 'details about kids is required'),
  pets: z.string().min(3, 'details about pets is required'),
  phonenumber: z.string().min(10, 'phone number is required')
})

export const Step1Schema = z.object({
  city: z.string().min(2, 'City is required'),
  country: z.string().min(2, 'Country is required'),
  height: z.string().min(2, 'Height is required'),
  weight: z.string().min(2, 'Weight is required')
})

export const Step2Schema = z.object({
  education: z.string().min(1, 'Education or qualification is required'),
  occupation: z.string().min(1, 'Occupation is required'),
  income: z.string().min(2, 'Income details are required'),
  smokinghabits: z.string().min(2, 'Smoking habits are required')
})

export const Step3Schema = z.object({
  drinkinghabits: z.string().min(3, 'Drinking habits are required'),
  religion: z.string().min(3, 'Religion is required'),
  travelpreferences: z.string().min(3, 'Travel preferences are required'),
  maritalstatus: z.string().min(3, 'Marital status is required')
})

export const Step4Schema = z.object({
  kids: z.string().min(2, 'Details about kids are required'),
  pets: z.string().min(3, 'Details about pets are required'),
  phonenumber: z.string().min(10, 'Phone number is required')
})
