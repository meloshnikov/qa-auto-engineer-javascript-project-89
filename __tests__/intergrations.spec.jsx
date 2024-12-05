import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { vi, test, describe, beforeEach, beforeAll } from "vitest";
import ChatBotWidget from './models/chatBotWidget';
import RegistrationForm from './models/registrationForm';
import App from '../src/App';

let widget;
let form;

const registrationData = {
  email: 'test@gmail.com',
  password: 'testPassword',
  address: 'Ленина 7',
  city: 'Питер',
  country: 'Россия',
  confirmationCheckBox: 'true',
};

beforeAll(() => {
  Element.prototype.scrollIntoView = vi.fn();
});

describe("Positive scenarios", async () => {

  beforeEach(() => {
    render(<App />);
    form = new RegistrationForm(screen);
    widget = new ChatBotWidget(screen);
  });

  test('It is possible to sign up to host app after Widget integration', async () => {
    const { email, password, address, city, country, confirmationCheckBox } = registrationData;
    const titlesDataMap = {
      'Email': email,
      'Пароль': password,
      'Адрес': address,
      'Город': city,
      'Страна': country,
      'Принять правила': confirmationCheckBox,
    };

    await form.fillForm(registrationData);
    await form.submitForm();
    form.verifyRegistrationFormIsFilled(titlesDataMap);
  });

  test('Widget renders to the host app the same way as in an isolation', async () => {
    await widget.openChatBot();
    widget.checkChatBotIsOpened();
  });
});
