export const cutText = (text, limit) => {
  let newText = text.slice(0, limit);
  if (text.length > limit) return newText + "...";
  return newText;
};