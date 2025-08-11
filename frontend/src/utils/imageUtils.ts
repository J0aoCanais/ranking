/**
 * Utilities para trabalhar com imagens do backend
 */

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

/**
 * Constrói a URL completa para uma imagem de pessoa
 * @param personId - ID da pessoa
 * @returns URL completa para a imagem
 */
export const getPersonImageUrl = (personId: number): string => {
  if (!BASE_URL) {
    return "https://via.placeholder.com/190";
  }
  
  const cleanBaseUrl = BASE_URL.endsWith('/') ? BASE_URL.slice(0, -1) : BASE_URL;
  return `${cleanBaseUrl}/person/persons/${personId}/image/`;
};

/**
 * Constrói a URL da imagem baseada na resposta da API
 * @param foto - Campo foto retornado pela API
 * @param personId - ID da pessoa (fallback)
 * @returns URL da imagem ou placeholder
 */
export const getImageSrc = (foto: string | null, personId?: number): string => {
  // Se a foto já é uma URL completa válida, usa ela
  if (foto && (foto.startsWith('http://') || foto.startsWith('https://'))) {
    return foto;
  }
  
  // Se não há foto mas temos ID, tenta construir a URL
  if (!foto && personId) {
    return getPersonImageUrl(personId);
  }
  
  // Se não há foto válida, retorna placeholder
  if (!foto || foto === null || foto === 'null') {
    return "https://via.placeholder.com/190";
  }
  
  // Se é um caminho relativo, constrói a URL completa
  if (BASE_URL && foto.startsWith('/')) {
    const cleanBaseUrl = BASE_URL.endsWith('/') ? BASE_URL.slice(0, -1) : BASE_URL;
    return `${cleanBaseUrl}${foto}`;
  }
  
  return foto;
};

/**
 * Testa se uma URL de imagem está acessível
 * @param url - URL da imagem para testar
 * @returns Promise que resolve true se a imagem carrega
 */
export const testImageUrl = (url: string): Promise<boolean> => {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = url;
  });
};

/**
 * URL para o endpoint de teste de imagens
 */
export const getTestImagesUrl = (): string => {
  if (!BASE_URL) return '';
  
  const cleanBaseUrl = BASE_URL.endsWith('/') ? BASE_URL.slice(0, -1) : BASE_URL;
  return `${cleanBaseUrl}/person/test-images/`;
};
