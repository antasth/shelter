import { Endpoints } from '../../types/enum';
import { DataResponse, SourceResponse } from '../../types/index';
import { CallBackType } from '../../types/types';
import AppLoader from './appLoader';

class AppController extends AppLoader {
    getSources(callback: CallBackType<SourceResponse>): void {
        super.getResp(
            {
                endpoint: Endpoints[0],
            },
            callback
        );
    }

    getNews(e: Event, callback: CallBackType<DataResponse>): void {
        let target = <HTMLElement>e.target;
        const newsContainer = <HTMLElement>e.currentTarget;
        if (
            target === null ||
            newsContainer === null ||
            !(target instanceof HTMLElement) ||
            !(newsContainer instanceof HTMLElement)
        ) {
            throw new Error('Incorrect target');
        }
        if (target && newsContainer) {
            while (target !== newsContainer) {
                if (target.classList.contains('source__item')) {
                    const sourceId: string | null = target.getAttribute('data-source-id');
                    if (sourceId) {
                        if (newsContainer.getAttribute('data-source') !== sourceId) {
                            newsContainer.setAttribute('data-source', sourceId);
                            super.getResp(
                                {
                                    endpoint: Endpoints[1],
                                    options: {
                                        sources: sourceId,
                                    },
                                },
                                callback
                            );
                        }
                    }
                    return;
                }
                target = target.parentNode as HTMLElement;
            }
        }
    }
}

export default AppController;
