import { AxiosRequestConfig } from "axios";
import apiFacade from "./apiFacade.ts";

const api = {
    get: async (url: string, config?: AxiosRequestConfig) => {
        return await apiFacade.get(url, config);
    },
    post: async <T>(url: string, data: T, config?: AxiosRequestConfig) => {
        return await apiFacade.post(url, data, config);
    },
    patch: async <T>(url: string, data: T, config?: AxiosRequestConfig) => {
        return await apiFacade.patch(url, data, config);
    },
    delete: async (url: string, config?: AxiosRequestConfig) => {
        return await apiFacade.delete(url, config);
    }
};

export interface SuccessResponse {
    status_code: number;
    details: string;
}

export interface SiloResponseData {
    status_code: number;
    data: SiloResponse[];
}

export interface CompanyResponseData<T> {
    company: T;
}

export interface SiloResponse {
    id: number;
    uuid: string;
    name: string;
    description: string;
    capacity: number;
    company_id: number;
    group_id: string;

}

interface Company {
    companies: [];
}

export interface CompanyResponse {
    company: Company[];
}

const SILO_ENDPOINT = {
    GET_SILOS: '/fermentators_info',
    CREATE_SILO: '/fermentators',
    UPDATE_SILO: '/fermentators',
};

const COMPANY_ENDPOINT = {
    GET_COMPANIES: '/companies',
    CREATE_COMPANY: '/companies',
    UPDATE_COMPANY: '/companies',
};

export const companyApi = {
    getCompanyInfo: async (companyId?: number): Promise<CompanyResponse> => {
        let url = `${COMPANY_ENDPOINT.GET_COMPANIES}?company_id=${companyId}`;

        if (!companyId) {
            url = `${COMPANY_ENDPOINT.GET_COMPANIES}`;
        }

        const response = await api.get(url);
        return response.data;
    },

    getAllCompanies: async (): Promise<CompanyResponse[]> => {
        const response = await api.get(COMPANY_ENDPOINT.GET_COMPANIES);
        return response;
    },

    createCompany: async (company: Company): Promise<CompanyResponse> => {
        let url = `${COMPANY_ENDPOINT.CREATE_COMPANY}`

        const response = await api.post(url, company);
        return response.data;
    },

    updateCompany: async (company: Company): Promise<CompanyResponse> => {
        let url = `${COMPANY_ENDPOINT.CREATE_COMPANY}`

        const response = await api.patch(url, company);
        return response.data;
    },
}

export const siloApi = {
    getFermentatorsInfo: async (companyId: number, fermentatorUuid?: string): Promise<SiloResponse[]> => {
        let url = `${SILO_ENDPOINT.GET_SILOS}?company_id=${companyId}`;

        if (fermentatorUuid) {
            url += `&fermentator_uuid=${fermentatorUuid}`;
        }

        const response = await api.get(url);
        return response.data;
    },

    createSilo: async (silo: SiloResponse): Promise<SiloResponse> => {
        let url = `${SILO_ENDPOINT.CREATE_SILO}`;

        const response = await api.post(url, silo);
        return response;
    },

    updateSilo: async (silo: SiloResponse): Promise<SiloResponse> => {
        let url = `${SILO_ENDPOINT.UPDATE_SILO}`;

        const response = await api.patch(url, silo);
        return response;
    }

};

export default  api;