import { getElement } from '../../../functions/functions';
import { NewsData } from '../../../types/index';
import './news.css';

class News {
    draw(data: NewsData[]): void {
        const news = data.length >= 10 ? data.filter((_item, idx) => idx < 10) : data;

        const fragment = document.createDocumentFragment();
        const newsItemTemp = getElement<HTMLTemplateElement>(document.body, '#newsItemTemp');

        news.forEach((item, idx) => {
            const newsClone = newsItemTemp.content.cloneNode(true) as DocumentFragment;

            if (idx % 2) newsClone.querySelector('.news__item')?.classList.add('alt');

            const metaPhoto = getElement(newsClone, '.news__meta-photo');
            metaPhoto.style.backgroundImage = `url(${item.urlToImage || 'img/news_placeholder.jpg'})`;

            const metaAuthor = getElement(newsClone, '.news__meta-author');
            metaAuthor.textContent = item.author || item.source.name;

            const metaDate = getElement(newsClone, '.news__meta-date');
            metaDate.textContent = item.publishedAt.slice(0, 10).split('-').reverse().join('-');

            const descriptionTitle = getElement(newsClone, '.news__description-title');
            descriptionTitle.textContent = item.title;

            const descriptionSource = getElement(newsClone, '.news__description-source');
            descriptionSource.textContent = item.source.name;

            const descriptionContent = getElement(newsClone, '.news__description-content');
            descriptionContent.textContent = item.description;

            newsClone.querySelector('.news__read-more a')?.setAttribute('href', item.url);

            fragment.append(newsClone);
        });

        const newsElement = getElement(document.body, '.news');
        newsElement.innerHTML = '';
        newsElement.appendChild(fragment);
    }
}

export default News;
