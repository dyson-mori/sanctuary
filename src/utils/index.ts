export * from './actions';
export * from './fetcher';

export function capitalizeFirstLetter(val: string) {
  if (!val) {
    return 'undefined'
  };

  return String(val).charAt(0).toUpperCase() + String(val).slice(1);
};

export function formatBytes(bytes, decimals = 2) {
  if (!+bytes) return '0 Bytes'

  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ['Bytes', 'kb', 'mb', 'gb', 'tb', 'pb', 'EB', 'ZB', 'YB']

  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
};

export async function convertUrlToBlob(url: string) {

  // try {
  // Fazendo a requisição para obter os dados do vídeo
  const response = await fetch(url);

  // Verifica se a resposta foi bem-sucedida
  if (!response.ok) {
    throw new Error(`Erro ao carregar o vídeo: ${response.statusText}`);
  }

  // Obtém o Blob do vídeo
  const blob = await response.blob();

  // Cria o Blob URL
  const blobUrl = URL.createObjectURL(blob);

  // Define o Blob URL como o src da tag <video>
  return blobUrl;

// Libera o Blob URL após o uso (opcional, mas recomendado)
// videoPlayer.addEventListener("ended", () => {
//   URL.revokeObjectURL(blobUrl);
// });
// } catch (error) {
//   console.error("Erro ao converter URL para Blob:", error);
// }
}

// export const find_social_media = () => {
//   return <Onlyfans key={item} width={50} height={50} />
// };