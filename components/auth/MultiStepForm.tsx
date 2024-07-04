// components/MultiStepForm.tsx
'use client'
import { useEffect, useState } from 'react'
import useStepStore from '@/store/useStepStore'
import Step1 from './step1-form'
import Step2 from './step2-form'
import Step3 from './step3-form'
import Step4 from './step4-form'
import { useRouter } from 'next/navigation'
import { CircularProgress } from '@nextui-org/react'
import FixedSteps from './fixedSteps'

type MultiStepFormProps = { stepCompletion: number }

const MultiStepForm = ({ stepCompletion }: MultiStepFormProps) => {
  const { step, setStep } = useStepStore()
  const router = useRouter()
  const [isStepSet, setIsStepSet] = useState(false)

  //const router = useRouter()
  console.log('stepCompletion', stepCompletion)
  useEffect(() => {
    setStep(stepCompletion)
    setIsStepSet(true)
  }, [stepCompletion, setStep])

  /*  useEffect(() => {
    router.push(`/step${step}`)
  }, [step, router])
 */
  useEffect(() => {
    if (step === 5) {
      router.push('/')
    }
  }, [step, router])

  if (!isStepSet || step === 5) {
    return null // Prevent rendering anything if step is 5
  }

  return (
    <>
      {step < 4 && (
        <FixedSteps
          label="profil"
          size="sm"
          value={step * 20}
          color="warning"
          showValueLabel={true}
        />
      )}
      <div>
        {step === 1 && <Step1 />}
        {step === 2 && <Step2 />}
        {step === 3 && <Step3 />}
        {step === 4 && <Step4 />}
      </div>
    </>
  )
}

export default MultiStepForm
