import { IApi, IProductList, IOrderPayload, IOrderResult } from '../types';
import { API_ENDPOINTS } from '../utils/constants';

export class WebLarekApi {
    constructor(private api: IApi) {}

    getProducts(): Promise<IProductList> {
        return this.api.get<IProductList>(API_ENDPOINTS.PRODUCTS);
    }

    createOrder(data: IOrderPayload): Promise<IOrderResult> {
        return this.api.post<IOrderResult>(API_ENDPOINTS.ORDER, data);
    }
}
