import { useState, useCallback } from 'react'

interface FormValues {
  email: string
  password: string
  fullName?: string
}

interface FormErrors {
  email?: string
  password?: string
  fullName?: string
}

export const useForm = (initialValues: FormValues) => {
  const [values, setValues] = useState<FormValues>(initialValues)
  const [errors, setErrors] = useState<FormErrors>({})

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target

    // Update the form values
    setValues((prevValues) => ({
      ...prevValues,
      [id]: value
    }))

    // Clear the error for the current field if there's a value
    if (value) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [id]: undefined
      }))
    }
  }, [])

  const handleBlur = useCallback((e: any) => {
    const { id, value } = e.target
    if (!value) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [id]: 'Trường này không được để trống'
      }))
    }
  }, [])

  return { values, errors, handleChange, handleBlur }
}
