import axios, { AxiosResponse } from 'axios';

export class DomainRating {
    token: string;

    constructor(token: string) {
        this.token = token;
    }

    async get(domain: string): Promise<AxiosResponse> {
        try {
            const response = await axios.get(`https://api.ahrefs.com/v3/site-explorer/domain-rating?target=${domain}`, {
                headers: {
                    'Accept': 'application/json, application/xml',
                    'Authorization': `Bearer ${this.token}`
                }
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    }
}
