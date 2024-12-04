import { render, screen } from '@testing-library/react';
import { vi, test, describe, beforeEach, beforeAll, expect } from "vitest";
import ChatBotWidget from './models/chatBotWidget';
import RegistrationForm from './models/registrationForm';
import App from '../src/App';

let widget;
let form;
let mockScroll;

const registrationData = {
  email: 'test@gmail.com',
  password: 'testPassword',
  address: 'Ленина 7',
  city: 'Питер',
  country: 'Россия',
  confirmationCheckBox: 'true',
};

beforeAll(() => {
  mockScroll = Element.prototype.scrollIntoView = vi.fn();
});

beforeEach(() => {
  render(<App />);
  widget = new ChatBotWidget(screen);
  form = new RegistrationForm(screen);
});

describe("Positive scenarios", async () => {

  test('Widget renders to the host app the same way as in an isolation', async () => {
    await widget.openChatBot();
    widget.checkChatBotIsOpened();
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

  test("Should be possible to start a conversation in the host app the same way as in an isolation", async () => {
    await widget.openChatBot();
    await widget.startConversation();

    widget.checkConversaitionIsStarted();
  });

  test("Should be possible to carry on conversation in the host app the same way as in an isolation", async () => {
    await widget.openChatBot();
    await widget.startConversation();
    await widget.carryOnConversation();

    widget.checkConversaitionIsCarryOn();
  });

  test("Should be possible to go back start a conversation in the host app the same way as in an isolation", async () => {
    await widget.openChatBot();
    await widget.startConversation();
    await widget.carryOnConversation();
    await widget.goToStartConversation();

    widget.checkConversaitionIsReturnedToBeginning();
  });

  test("Scrolls to the bottom when new message appears in the host app the same way as in an isolation", async () => {
    await widget.openChatBot();
    await widget.startConversation();

    expect(mockScroll).toHaveBeenCalled();
  });

  test("Should be possible to close chat in the host app the same way as in an isolation", async () => {
    await widget.openChatBot();
    await widget.startConversation();
    await widget.closeChatBot();

    widget.checkChatBotIsClosed();
  });

});
