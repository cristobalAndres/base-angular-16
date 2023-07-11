// Create a function to get the date from the Date object (without the time) in MMM DD YYYY format
export const getDate = (date: Date | string | undefined) => {
  if (!date) return '';
  const newDate = new Date(date);
  const month = newDate.toLocaleString('default', { month: 'short' });
  const day = newDate.getDate();
  const year = newDate.getFullYear();
  return `${month} ${day}, ${year}`;
};

// Create a function to get the time from the Date object in HH:MM AM/PM format
export const getTime = (date: Date | string | undefined) => {
  if (!date) return '';
  const newDate = new Date(date);
  const hours = newDate.getHours();
  const minutes = newDate.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const hours12 = hours % 12;
  const hours12String = hours12 ? hours12.toString() : '12';
  const minutesString = minutes < 10 ? `0${minutes}` : minutes.toString();
  return `${hours12String}:${minutesString} ${ampm}`;
};
