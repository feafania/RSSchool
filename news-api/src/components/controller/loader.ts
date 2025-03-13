import { Callback, Methods, StringRecord } from '../../types';

class Loader {
    public baseLink: string;
    public options: StringRecord;
    constructor(baseLink: string, options: StringRecord) {
        this.baseLink = baseLink;
        this.options = options;
    }

    public getResp<T>(
        { endpoint, options }: { endpoint: string; options?: StringRecord },
        callback: Callback<T> = () => {
            console.error('No callback for GET response');
        }
    ) {
        this.load(Methods.Get, endpoint, callback, options);
    }

    private errorHandler(res: Response): Response {
        if (!res.ok) {
            if (res.status === 401 || res.status === 404)
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            throw Error(res.statusText);
        }

        return res;
    }

    private makeUrl(options: StringRecord, endpoint: string): string {
        const urlOptions: StringRecord = { ...this.options, ...options };
        let url: string = `${this.baseLink}${endpoint}?`;

        Object.keys(urlOptions).forEach((key: string): void => {
            url += `${key}=${urlOptions[key]}&`;
        });

        return url.slice(0, -1);
    }

    private load<T>(method: Methods, endpoint: string, callback: Callback<T>, options: StringRecord = {}) {
        fetch(this.makeUrl(options, endpoint), { method })
            .then(this.errorHandler)
            .then((res) => res.json())
            .then(callback)
            .catch((err: Error) => console.error(err));
    }
}

export default Loader;
