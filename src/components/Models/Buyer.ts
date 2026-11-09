import { IBuyer, TPayment, TValidationErrors } from '../../types';

export class Buyer {
    private payment: TPayment | '' = '';
    private address: string = '';
    private phone: string = '';
    private email: string = '';

    setPayment(payment: TPayment): void {
        this.payment = payment;
    }

    setAddress(address: string): void {
        this.address = address;
    }

    setPhone(phone: string): void {
        this.phone = phone;
    }

    setEmail(email: string): void {
        this.email = email;
    }

    getData(): IBuyer {
        return {
            payment: this.payment as TPayment,
            address: this.address,
            phone: this.phone,
            email: this.email
        };
    }

    clear(): void {
        this.payment = '';
        this.address = '';
        this.phone = '';
        this.email = '';
    }

    validate(): TValidationErrors<IBuyer> {
        const errors: TValidationErrors<IBuyer> = {};

        if (!this.payment) {
            errors.payment = 'Не выбран вид оплаты';
        }
        if (!this.address.trim()) {
            errors.address = 'Укажите адрес доставки';
        }
        if (!this.email.trim()) {
            errors.email = 'Укажите email';
        }
        if (!this.phone.trim()) {
            errors.phone = 'Укажите телефон';
        }

        return errors;
    }
}
