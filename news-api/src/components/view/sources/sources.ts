import './sources.css';
import { Callback, NewsSource } from '../../../types';

class Sources {
    public draw: Callback<NewsSource[]> = (data) => {
        const fragment = document.createDocumentFragment();
        const sourceItemTemp = document.querySelector<HTMLTemplateElement>('#sourceItemTemp');
        if (sourceItemTemp) {
            data.forEach((item) => {
                const sourceClone = sourceItemTemp.content.cloneNode(true);
                if (sourceClone instanceof DocumentFragment) {
                    const sourceItemName = sourceClone.querySelector('.source__item-name');
                    if (sourceItemName instanceof HTMLElement) {
                        sourceItemName.textContent = item.name;
                    }
                    const sourceItem = sourceClone.querySelector('.source__item');
                    if (sourceItem instanceof HTMLElement) {
                        sourceItem.setAttribute('data-source-id', item.id);
                    }
                }
                fragment.append(sourceClone);
            });
        }

        const sourcesContainer = document.querySelector('.sources');
        if (sourcesContainer) {
            sourcesContainer.append(fragment);
        }
    };
}

export default Sources;
