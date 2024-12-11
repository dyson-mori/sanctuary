export * from './actions';
export * from './fetcher';

export function capitalizeFirstLetter(val: string) {
  return String(val).charAt(0).toUpperCase() + String(val).slice(1);
};

// export const find_social_media = () => {
//   return <Onlyfans key={item} width={50} height={50} />
// };