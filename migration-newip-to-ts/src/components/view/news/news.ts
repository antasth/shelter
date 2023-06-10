import { NewsData } from '../../../types/index';
import './news.css';

class News {
    draw(data: NewsData[]): void {
        // console.log(data);
        const news: NewsData[] = data.length >= 10 ? data.filter((_item, idx) => idx < 10) : data;

        const fragment: DocumentFragment = document.createDocumentFragment();
        const newsItemTemp: HTMLTemplateElement | null = document.querySelector('#newsItemTemp');

        news.forEach((item, idx) => {
            if (newsItemTemp) {
                const newsClone: DocumentFragment = newsItemTemp.content.cloneNode(true) as DocumentFragment;

                if (idx % 2) newsClone.querySelector('.news__item')?.classList.add('alt');
                const metaPhoto: HTMLElement | null = newsClone.querySelector('.news__meta-photo');
                if (metaPhoto instanceof HTMLElement) {
                    metaPhoto.style.backgroundImage = `url(${item.urlToImage || 'img/news_placeholder.jpg'})`;
                }
                const metaAuthor: HTMLElement | null = newsClone.querySelector('.news__meta-author');
                if (metaAuthor instanceof HTMLElement) {
                    metaAuthor.textContent = item.author || item.source.name;
                }
                const metaDate: HTMLElement | null = newsClone.querySelector('.news__meta-date');
                if (metaDate instanceof HTMLElement) {
                    metaDate.textContent = item.publishedAt.slice(0, 10).split('-').reverse().join('-');
                }
                const descriptionTitle: HTMLElement | null = newsClone.querySelector('.news__description-title');
                if (descriptionTitle instanceof HTMLElement) {
                    descriptionTitle.textContent = item.title;
                }
                const descriptionSource: HTMLElement | null = newsClone.querySelector('.news__description-source');
                if (descriptionSource instanceof HTMLElement) {
                    descriptionSource.textContent = item.source.name;
                }
                const descriptionContent: HTMLElement | null = newsClone.querySelector('.news__description-content');
                if (descriptionContent instanceof HTMLElement) {
                    descriptionContent.textContent = item.description;
                }
                newsClone.querySelector('.news__read-more a')?.setAttribute('href', item.url);

                fragment.append(newsClone);
            }
        });
        const newsElement: HTMLElement | null = document.querySelector('.news');
        if (newsElement) {
            newsElement.innerHTML = '';
            newsElement.appendChild(fragment);
        }
    }
}

export default News;
