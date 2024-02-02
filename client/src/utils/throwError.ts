export const isObjectWithMessage = (obj: unknown): obj is { message: string } => {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'message' in obj &&
    typeof (obj as { message: unknown }).message === 'string'
  );
}

export const getErrorMsg = (err: unknown): string => {
  if (err instanceof Error || isObjectWithMessage(err)) {
    return err.message
  }

  if(typeof err === 'string') {
    return err
  }

  return 'Something went wrong. Please retry later!'
}
export const throwError = (err: unknown): never => {
  const msg = getErrorMsg(err)
  throw new Error(msg)
}