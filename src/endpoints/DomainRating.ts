import axios, { AxiosInstance } from "axios";

class DomainRating {
  private apiClient: AxiosInstance;

  constructor(private token: string) {
    this.apiClient = axios.create({
      baseURL: "https://api.ahrefs.com/v3/site-explorer",
      headers: {
        Accept: "application/json, application/xml",
        Authorization: `Bearer ${token}`,
      },
    });
  }

  get(
    domain: string,
    date: string,
    output: "json" | "csv" | "xml" | "php" = "json",
    protocol: "both" | "http" | "https" = "both"
  ): Promise<any> {
    return this.apiClient.get("/domain-rating", {
      params: {
        target: domain,
        date: date,
        output: output,
        protocol: protocol,
      },
    });
  }
}

export { DomainRating };
