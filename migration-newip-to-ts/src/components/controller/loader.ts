import { GetRespOptions, LoaderOptions } from '../../types/index';
import { urlOptions } from '../../types/types';
class Loader {
    private baseLink: string;
    private options: LoaderOptions;

    constructor(baseLink: string, options: LoaderOptions) {
        this.baseLink = baseLink;
        this.options = options;
    }

    public getResp(
        { endpoint, options = {} }: GetRespOptions,
        callback = (): void => {
            console.error('No callback for GET response');
        }
    ) {
        this.load('GET', endpoint, callback, options);
    }

    public errorHandler(res: Response) {
        if (!res.ok) {
            if (res.status === 401 || res.status === 404)
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            throw Error(res.statusText);
        }

        return res;
    }

    public makeUrl(options: Record<string, string>, endpoint: string): string {
        const urlOptions: urlOptions = { ...this.options, ...options };

        let url = `${this.baseLink}${endpoint}?`;

        Object.keys(urlOptions).forEach((key) => {
            url += `${key}=${urlOptions[key as keyof urlOptions]}&`;
        });

        return url.slice(0, -1);
    }

    public load(method: string, endpoint: string, callback: (data: string) => void, options = {}): void {
        fetch(this.makeUrl(options, endpoint), { method })
            .then(this.errorHandler)
            .then((res) => res.json())
            .then((data) => callback(data))
            .catch((err) => console.error(err));
    }
}

export default Loader;
