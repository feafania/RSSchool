import './sources.css';
import { NewsSource } from '../../../types';

class Sources {
    public draw(data: NewsSource[]): void {
        const fragment: DocumentFragment = document.createDocumentFragment();
        const sourceItemTemp: HTMLTemplateElement | null =
            document.querySelector<HTMLTemplateElement>('#sourceItemTemp');
        if (sourceItemTemp) {
            data.forEach((item: NewsSource): void => {
                const sourceClone: Node = sourceItemTemp.content.cloneNode(true);
                if (sourceClone instanceof DocumentFragment) {
                    const sourceItemName: Element | null = sourceClone.querySelector('.source__item-name');
                    if (sourceItemName instanceof HTMLElement) {
                        sourceItemName.textContent = item.name ?? 'Unknown Name';
                    }
                    const sourceItem: Element | null = sourceClone.querySelector('.source__item');
                    if (sourceItem instanceof HTMLElement && item.id) {
                        sourceItem.setAttribute('data-source-id', item.id);
                    }
                }
                fragment.append(sourceClone);
            });
        }

        const sourcesContainer: Element | null = document.querySelector('.sources');
        if (sourcesContainer) {
            sourcesContainer.append(fragment);
        }
    }
}

export default Sources;
