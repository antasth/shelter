import { Source } from '../../../types/index';
import './sources.css';

class Sources {
    draw(data: Source[]): void {
        const fragment: DocumentFragment = document.createDocumentFragment();
        const sourceItemTemp: HTMLTemplateElement | null = document.querySelector('#sourceItemTemp');

        data.forEach((item) => {
            if (sourceItemTemp) {
                const sourceClone: DocumentFragment = sourceItemTemp.content.cloneNode(true) as DocumentFragment;
                const itemName: HTMLElement | null = sourceClone.querySelector('.source__item-name');
                if (itemName instanceof HTMLElement) {
                    itemName.textContent = item.name;
                }
                const sourceItem: HTMLElement | null = sourceClone.querySelector('.source__item');
                if (sourceItem instanceof HTMLElement) {
                    sourceItem.setAttribute('data-source-id', item.id);
                }
                fragment.append(sourceClone);
            }
        });
        const sources: HTMLElement | null = document.querySelector('.sources');
        if (sources instanceof HTMLElement) {
            sources.append(fragment);
        }
    }
}

export default Sources;
