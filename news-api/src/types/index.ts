export interface NewsSource {
    id: string;
    name: string;
    description: string;
    url: string;
    category: string; // The type of news to expect from this news source.
    language: string;
    country: string; // The country this news source is based in (and primarily writes about).
}

export interface NewsApiResponse {
    status: string; // If the request was successful or not. Options: ok, error. In the case of error a code and message property will be populated.
    sources: NewsSource[];
}
