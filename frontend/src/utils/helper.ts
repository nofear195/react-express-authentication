export function handleAndConvertError(error: unknown): string {
  if (error instanceof Error) {
    console.error("An expected error occurred:", error.message);
    return error.message;
  } else {
    const errorMessage = error ? error.toString() : "Unknown error";
    console.error("An unexpected error occurred:", errorMessage);
    return errorMessage; // Return the error message as a string
  }
}
