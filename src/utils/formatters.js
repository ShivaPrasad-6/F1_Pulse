export function formatDate(dateText) {
  if (!dateText) {
    return 'TBA';
  }

  return new Intl.DateTimeFormat('en-US', { dateStyle: 'medium' }).format(new Date(dateText));
}
