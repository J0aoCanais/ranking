import axios from "axios";

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

// Dados mock para quando não há backend disponível
const mockData = {
    persons: [
        {
            id: 1,
            primeiro_nome: "João",
            ultimo_nome: "Silva",
            alcool: 85,
            foto: null
        },
        {
            id: 2,
            primeiro_nome: "Maria",
            ultimo_nome: "Santos",
            alcool: 92,
            foto: null
        },
        {
            id: 3,
            primeiro_nome: "Pedro",
            ultimo_nome: "Costa",
            alcool: 78,
            foto: null
        }
    ]
};

const objectToFormData = (obj: Record<string, any>) => {
    const formData = new FormData();
    for (const key in obj) {
        formData.append(key, obj[key]);
    }
    return formData;
};

export const request = async (
	method: string,
	endpoint: string,
	body: any = null,
	isMultipart = false,
	accessToken: string = ""
) => {
    // Se não há URL do backend configurada, usa dados mock
    if (!BASE_URL || BASE_URL === '') {
        console.log('Using mock data - no backend URL configured');
        
        // Simula um delay de rede
        await new Promise(resolve => setTimeout(resolve, 500));
        
        if (endpoint === '/person/' && method.toLowerCase() === 'get') {
            return { success: true, data: mockData.persons };
        }
        
        if (endpoint === '/person/ranking/' && method.toLowerCase() === 'get') {
            // Retorna pessoas ordenadas por álcool (descendente)
            const sortedPersons = [...mockData.persons].sort((a, b) => b.alcool - a.alcool);
            return { success: true, data: sortedPersons };
        }
        
        if (endpoint === '/person/latest/' && method.toLowerCase() === 'get') {
            // Retorna a pessoa mais recente (simulado)
            const latestPerson = mockData.persons[mockData.persons.length - 1];
            return { success: true, data: latestPerson || null };
        }
        
        if (endpoint === '/person/create/' && method.toLowerCase() === 'post') {
            // Simula criação de uma nova pessoa
            const newPerson = {
                id: mockData.persons.length + 1,
                primeiro_nome: body.primeiro_nome,
                ultimo_nome: body.ultimo_nome,
                alcool: body.alcool,
                foto: null // Em modo mock, não salvamos fotos
            };
            mockData.persons.push(newPerson);
            return { success: true, data: newPerson };
        }
        
        if (endpoint.startsWith('/person/') && method.toLowerCase() === 'get') {
            const id = parseInt(endpoint.split('/')[2]);
            const person = mockData.persons.find(p => p.id === id);
            if (person) {
                return { success: true, data: person };
            }
            return { success: false, error: 'Person not found' };
        }
        
        // Para outros endpoints, retorna sucesso mas sem dados
        return { success: true, data: null };
    }

    const headers: Record<string, string> = {
        Accept: "application/json",
    };

    // Don't set Content-Type for multipart, let axios set it with boundary
    if (!isMultipart) {
        headers["Content-Type"] = "application/json";
    }

    if (accessToken) {
        headers.Authorization = `Bearer ${accessToken}`;
    }

    const url = `${BASE_URL}${endpoint}`;
    const payload = isMultipart
        ? (body instanceof FormData ? body : objectToFormData(body || {}))
        : (body ? JSON.stringify(body) : undefined);
    const config = {
        method,
        url,
        headers,
        data: payload,
    };

    try {
        const response = await axios(config);
        return { success: true, data: response.data };

    } catch (error: any) {
        console.error('API Error:', error);
        return { success: false, error: error.response?.data || "Unknown error" };
    }
};
