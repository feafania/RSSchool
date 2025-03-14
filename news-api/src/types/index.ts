export enum Methods {
    Get = 'GET',
    Post = 'POST',
    Put = 'PUT',
    Delete = 'DELETE',
}
export type StringRecord = Record<string, string>;

export type Callback<T = unknown> = (data: T) => void;

type Result = 'ok' | 'error';

export interface NewsArticleItem {
    source: SourceObject;
    author: string;
    title: string;
    description: string;
    url: string;
    urlToImage: string;
    publishedAt: string; // The date and time that the article was published, in UTC (+000)
    content: string; // The unformatted content of the article, where available. This is truncated to 200 chars
}
export type SourceObject = {
    id: string | null;
    name: string;
};

export interface ApiResponse<T> {
    status: Result;
    sources?: ReadonlyArray<T>;
    articles?: ReadonlyArray<T>;
}

export type NewsSource = Partial<
    { id: string; name: string; category: string; language: string; country: string } & Pick<
        NewsArticleItem,
        'url' | 'description'
    >
>;

export type NewsArticle = Partial<NewsArticleItem>;
