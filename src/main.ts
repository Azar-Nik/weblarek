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
const productA = apiProducts.items[0];
const productB = apiProducts.items[1];

basket.addItem(productA);
console.log('Корзина после добавления первого товара:', basket.getItems());
console.log('Количество товаров:', basket.getCount());
console.log('Сумма стоимости:', basket.getTotal());

basket.addItem(productB);
console.log('Корзина после добавления второго товара:', basket.getItems());
console.log('Количество товаров:', basket.getCount());
console.log('Сумма стоимости:', basket.getTotal());

console.log('Проверка наличия первого товара (true):', basket.hasItem(productA.id));
console.log('Проверка наличия несуществующего товара (false):', basket.hasItem('fake-id'));

basket.removeItem(productA);
console.log('Корзина после удаления первого товара:', basket.getItems());
console.log('Количество товаров:', basket.getCount());
console.log('Сумма стоимости:', basket.getTotal());

basket.clear();
console.log('Корзина после очистки:', basket.getItems());
console.log('Количество товаров:', basket.getCount());
console.log('Сумма стоимости:', basket.getTotal());

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
