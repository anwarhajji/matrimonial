// components/SuccessAlert.tsx
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { CheckCircledIcon } from '@radix-ui/react-icons'

interface SuccessAlertProps {
  title: string
  description: string
  fields?: Array<{ label: string; value: string | number | boolean }>
}

export function SuccessAlert({
  title,
  description,
  fields
}: SuccessAlertProps) {
  return (
    <Alert className="border-green-500 bg-green-50 dark:bg-green-900 dark:border-green-700">
      <CheckCircledIcon className="h-4 w-4 text-green-600 dark:text-green-400" />
      <AlertTitle className="text-green-800 dark:text-green-200">
        {title}
      </AlertTitle>
      <AlertDescription className="text-green-700 dark:text-green-300">
        {description}
        {fields && (
          <ul className="mt-2 space-y-1">
            {fields.map((field, index) => (
              <li key={index}>
                <span className="font-medium">{field.label}:</span>{' '}
                {field.value.toString()}
              </li>
            ))}
          </ul>
        )}
      </AlertDescription>
    </Alert>
  )
}
