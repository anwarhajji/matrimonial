import { create } from 'zustand'

interface ProfilStateProps {
  fullname: string
  setFullname: (fullname: string) => void
  username: string
  setUsername: (username: string) => void
  email: string
  setEmail: (email: string) => void
}
interface FormSteps {
  step1: boolean
  togleStep1: () => void
  step2: boolean
  togleStep2: () => void
  step3: boolean
  togleStep3: () => void
  step4: boolean
  togleStep4: () => void
}

export const useFormSteps = create<FormSteps>((set) => ({
  step1: false,
  togleStep1: () => set((state) => ({ step1: !state.step1 })),
  step2: false,
  togleStep2: () => set((state) => ({ step2: !state.step2 })),
  step3: false,
  togleStep3: () => set((state) => ({ step3: !state.step3 })),
  step4: false,
  togleStep4: () => set((state) => ({ step4: !state.step4 }))
}))
