export const normalizeError = (error: any) => ({
  status: error?.status,
  message: error?.message,
  hasError: !!error?.hasError,
})
