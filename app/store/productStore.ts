import dayjs from 'dayjs';
import { observable, action, makeObservable } from 'mobx';

class ProductStore {
    selectedProduct: any = null;
    selectedBuyInfoProduct: any[] = [];

    selectedStartDate: string = '';
    selectedEndDate: string = '';

    constructor() {
        makeObservable(this, {
            selectedProduct: observable,
            selectedBuyInfoProduct: observable,
            selectedStartDate: observable,
            selectedEndDate: observable,
            setSelectedProduct: action,
            setselectedBuyInfoProduct: action,
            removeSelectedBuyInfoProduct: action,
            setSelectedDates: action,
            saveToLocalStorage: action,
            loadFromLocalStorage: action,
        });

        const currentDate = dayjs();
        this.selectedStartDate = currentDate.subtract(30, 'day').format('YYYY-MM-DD');
        this.selectedEndDate = currentDate.format('YYYY-MM-DD');

        this.loadFromLocalStorage(); // Load from localStorage when the store initializes
        
    }

    setSelectedProduct(product: any) {
        this.selectedProduct = product;
    }

    setselectedBuyInfoProduct(product: any) {
        this.selectedBuyInfoProduct.push(product);
        this.saveToLocalStorage(); // Save to localStorage when a product is added
    }

    removeSelectedBuyInfoProduct(index: number) {
        this.selectedBuyInfoProduct.splice(index, 1);
        this.saveToLocalStorage(); // Save to localStorage when a product is removed
    }

    setSelectedDates(startDate: string, endDate: string) {
        this.selectedStartDate = startDate;
        this.selectedEndDate = endDate;
        this.saveToLocalStorage(); // Save to localStorage when dates are updated
    }

    saveToLocalStorage() {
        localStorage.setItem('selectedProducts', JSON.stringify(this.selectedBuyInfoProduct));
        localStorage.setItem('selectedStartDate', this.selectedStartDate);
        localStorage.setItem('selectedEndDate', this.selectedEndDate);
    }

    loadFromLocalStorage() {
        if (typeof window !== 'undefined') {
            const selectedProducts = JSON.parse(localStorage.getItem('selectedProducts') || '[]');
            this.selectedBuyInfoProduct = selectedProducts;
        }
    }

    get selectedProductsCount() {
        return this.selectedBuyInfoProduct.length;
    }

}

const productStore = new ProductStore();
export default productStore;
