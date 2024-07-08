// stores/useStepStore.ts
import { create } from 'zustand'

interface StepStore {
  step: number
  setStep: (step: number) => void
}

const useStepStore = create<StepStore>((set) => ({
  step: 0,
  setStep: (step) => set({ step })
}))
export default useStepStore
