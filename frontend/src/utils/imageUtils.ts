/**
 * Utilities para trabalhar com imagens do backend
 */

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

/**
 * Constrói a URL completa para uma imagem a partir do seu caminho relativo.
 * @param relativePath - Caminho relativo da imagem (ex: /media/person_photos/foto.jpg)
 * @returns URL completa da imagem ou uma string vazia se não for possível construir.
 */
export const buildImageUrl = (relativePath: string | null | undefined): string => {
  if (!relativePath) {
    return "https://via.placeholder.com/190"; // Retorna placeholder se não houver caminho
  }

  // Se a URL já for absoluta, retorna-a diretamente
  if (relativePath.startsWith('http://') || relativePath.startsWith('https://')) {
    return relativePath;
  }

  if (!BASE_URL) {
    console.error("VITE_BACKEND_URL não está definido.");
    return "https://via.placeholder.com/190"; // Fallback se a URL base não estiver definida
  }

  // Garante que a URL base não tem uma barra no final
  const cleanBaseUrl = BASE_URL.endsWith('/') ? BASE_URL.slice(0, -1) : BASE_URL;
  
  // Garante que o caminho relativo começa com uma barra
  const cleanRelativePath = relativePath.startsWith('/') ? relativePath : `/${relativePath}`;

  return `${cleanBaseUrl}${cleanRelativePath}`;
};

/**
 * Função de fallback para imagens que não carregam.
 * @param e - Evento de erro da imagem
 */
export const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
  e.currentTarget.src = "https://via.placeholder.com/190";
  e.currentTarget.onerror = null; // Evita loops de erro
};
