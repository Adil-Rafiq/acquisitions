export const formatValidationErrors = errors => {
  // Case: no errors
  if (!errors || !errors.issues || errors.issues.length === 0) {
    return {
      error: 'Validation failed',
      fields: {},
    };
  }

  const fields = {};

  for (const issue of errors.issues) {
    const field = issue.path.join('.') || 'root';

    // Keep only the first error per field
    if (!fields[field]) {
      fields[field] = issue.message;
    }
  }

  return {
    error: 'Validation failed',
    fields,
  };
};
