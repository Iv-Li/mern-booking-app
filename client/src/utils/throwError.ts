export const throwError = (err: unknown): never => {
  if (err instanceof Error) {
    throw new Error(err.message)
  }

  if(typeof err === 'string') {
    throw new Error(err)
  }

  throw new Error('Something went wrong. Please retry later!')
}