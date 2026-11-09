import './scss/styles.scss';
import { apiProducts } from './utils/data';
import { Catalog } from './components/Models/Catalog';
import { Basket } from './components/Models/Basket';
import { Buyer } from './components/Models/Buyer';
import { Api } from './components/base/Api';
import { WebLarekApi } from './components/WebLarekApi';
import { API_URL } from './utils/constants';

// Проверка каталога
const catalog = new Catalog();
catalog.setItems(apiProducts.items);
console.log('Массив товаров из каталога:', catalog.getItems());

const firstProduct = apiProducts.items[0];
console.log('Получение одного товара по id:', catalog.getItem(firstProduct.id));

catalog.setSelected(firstProduct);
console.log('Сохраненный выбранный товар:', catalog.getSelected());

// Проверка корзины
const basket = new Basket();
basket.addItem(firstProduct);
console.log('Товар добавлен в корзину. Текущий массив:', basket.getItems());
console.log('Количество товаров:', basket.getCount());
console.log('Сумма стоимости:', basket.getTotal());
console.log('Проверка наличия товара (true):', basket.hasItem(firstProduct.id));
console.log('Проверка наличия несуществующего товара (false):', basket.hasItem('fake-id'));

basket.removeItem(firstProduct);
console.log('Товар удален из корзины. Текущий массив:', basket.getItems());

basket.addItem(firstProduct);
basket.clear();
console.log('Корзина очищена. Текущий массив:', basket.getItems());

// Проверка покупателя
const buyer = new Buyer();
buyer.setPayment('card');
buyer.setAddress('Spb Vosstania 1');
buyer.setPhone('+71234567890');
buyer.setEmail('test@test.ru');
console.log('Данные покупателя:', buyer.getData());
console.log('Валидация (ошибок нет):', buyer.validate());

buyer.clear();
console.log('Данные покупателя после очистки:', buyer.getData());
console.log('Валидация (все поля с ошибками):', buyer.validate());

// Подключение к серверу
const api = new Api(API_URL);
const webLarekApi = new WebLarekApi(api);

webLarekApi.getProducts()
    .then((data) => {
        catalog.setItems(data.items);
        console.log('Каталог товаров, полученный с сервера:', catalog.getItems());
    })
    .catch((error) => {
        console.error('Ошибка при получении товаров с сервера:', error);
    });
