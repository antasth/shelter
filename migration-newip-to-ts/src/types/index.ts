export interface SourceResponse {
    sources: Source[];
    status: string;
}

export interface Source {
    id: string;
    name: string;
    description: string;
    url: string;
    category: string;
    language: string;
    country: string;
}

export interface NewsData {
    author: string;
    content: string;
    description: string;
    publishedAt: string;
    source: NewsSource;
    title: string;
    url: string;
    urlToImage: string;
}

export interface NewsSource {
    id: string;
    name: string;
}

export interface DataResponse {
    articles: Article[];
    status: string;
    totalResults: number;
}

export interface Article {
    source: {
        id: string;
        name: string;
    };
    author: string;
    content: string;
    description: string;
    publishedAt: string;
    title: string;
    url: string;
    urlToImage: string;
}
