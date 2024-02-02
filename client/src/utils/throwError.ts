const isObjectWithMessage = (obj: unknown): obj is { message: string } => {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'message' in obj &&
    typeof (obj as { message: unknown }).message === 'string'
  );
}
export const throwError = (err: unknown): never => {
  if (err instanceof Error) {
    throw new Error(err.message)
  }

  if (isObjectWithMessage(err)) {
    throw new Error(err.message)
  }


  if(typeof err === 'string') {
    throw new Error(err)
  }

  throw new Error('Something went wrong. Please retry later!')
}