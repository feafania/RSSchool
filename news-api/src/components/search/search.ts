import { Callback } from '../../types';

export default function setupSearch(searchArticles: Callback<string>): void {
    const searchInput: HTMLInputElement | null = document.querySelector<HTMLInputElement>('.search-input');
    const clearButton: HTMLButtonElement | null = document.querySelector<HTMLButtonElement>('.clear-button');
    const searchButton: HTMLButtonElement | null = document.querySelector<HTMLButtonElement>('.search-button');

    if (!searchInput || !clearButton || !searchButton) {
        console.warn('Search elements not found!');
        return;
    }

    function manageClearButton(): void {
        if (clearButton instanceof HTMLButtonElement && searchButton instanceof HTMLButtonElement) {
            clearButton.style.display = searchInput?.value ? 'block' : 'none';
        }
    }

    searchButton.addEventListener('click', function (event: MouseEvent): void {
        event.preventDefault();
        this.classList.add('active');
        searchInput.classList.add('active');
        searchArticles(searchInput.value.trim());
    });

    searchInput.addEventListener('focus', function (): void {
        this.classList.remove('active');
        searchButton.classList.remove('active');
    });

    searchInput.addEventListener('keypress', function (event: KeyboardEvent): void {
        if (event.key === 'Enter') {
            event.preventDefault();
            searchArticles(searchInput.value.trim());
        }
    });

    searchInput.addEventListener('input', manageClearButton);

    clearButton.addEventListener('click', (): void => {
        searchInput.value = '';
        clearButton.style.display = 'none';
        searchInput.focus();
    });

    manageClearButton();
}
