// Success Message For Authentication
import { CheckCircledIcon } from "@radix-ui/react-icons"

interface FormSuccessProps {
    message?: string;
}

export const FormSuccess = ({
    message,
}: FormSuccessProps) => {
    if (!message) return null;
    return (
        <div className="bg-emerald-400/20 p-3 rounded flex items-center gap-x-2 text-sm text-destructive text-emerald-500 font-bold border border-green-500">
            <CheckCircledIcon className="h-4 w-4  " />
            <p>{message}</p>
        </div>
    )
}