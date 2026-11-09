import { IProduct } from '../../types';

export class Catalog {
    private items: IProduct[] = [];
    private selected: IProduct | null = null;

    setItems(items: IProduct[]): void {
        this.items = items;
    }

    getItems(): IProduct[] {
        return this.items;
    }

    getItem(id: string): IProduct | undefined {
        return this.items.find(item => item.id === id);
    }

    setSelected(item: IProduct | null): void {
        this.selected = item;
    }

    getSelected(): IProduct | null {
        return this.selected;
    }
}
