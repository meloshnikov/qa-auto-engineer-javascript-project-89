import userEvent from '@testing-library/user-event';
import { expect } from 'vitest';

export default class ChatBotWidget {
  constructor(screen) {
    this.screen = screen;
    this.user = userEvent.setup();
  }

  async openChatBot() {
    this.startChatBotButton = this.screen.getByText('Открыть Чат');
    await this.user.click(this.startChatBotButton);

    this.startConversationButton = this.screen.queryByRole('button', { name: 'Начать разговор' });
    this.heading = this.screen.getByText('Виртуальный помощник');
    this.welcomeMessage = this.screen.getByText('Привет! Я ваш виртуальный помощник. Нажмите "Начать разговор", чтобы открыть чат');
    this.closeChatBotButton = this.screen.getByLabelText('Close');
  }

  async startConversation() {
    await this.user.click(this.startConversationButton);

    this.firstMessage = this.screen.getByText('Помогу вам выбрать подходящий курс. Выбирайте категорию вопроса, и буквально через пару шагов я смогу рассказать вам то, что нужно.');
  }

  async carryOnConversation() {
    this.firstQuestionButton = this.screen.queryByRole('button', { name: 'Сменить профессию или трудоустроиться' });
    await this.user.click(this.firstQuestionButton);

    this.secondMessage = this.screen.getByText('У нас есть программы обучения новой профессии. Мы постоянно мониторим, какие компетенции востребованы на рынке, а учебные программы строим в соответствии ними. Учиться можно онлайн в удобном темпе без дедлайнов. К концу обучения у вас будет портфолио на GitHub. А к трудоустройству поможет подготовиться Карьерный трек');
  }

  async goToStartConversation() {
    this.backToStartConversationButton = this.screen.queryByRole('button', { name: 'Вернуться в начало' });
    await this.user.click(this.backToStartConversationButton);

    this.firstMessages = await this.screen.findAllByText('Помогу вам выбрать подходящий курс. Выбирайте категорию вопроса, и буквально через пару шагов я смогу рассказать вам то, что нужно.');
  }

  async closeChatBot() {
    await this.user.click(this.closeChatBotButton);
  }

  checkChatBotIsOpened() {
    expect(this.heading).toBeVisible();
    expect(this.welcomeMessage).toBeVisible();
    expect(this.startConversationButton).toBeVisible();
  }

  checkChatBotIsClosed() {
    expect(this.heading).not.toBeVisible();
  }

  checkConversaitionIsStarted() {
    expect(this.firstMessage).toBeVisible();
  }

  checkConversaitionIsCarryOn() {
    expect(this.secondMessage).toBeVisible();
  }

  checkConversaitionIsReturnedToBeginning() {
    expect(this.firstMessages).toHaveLength(2);
  }
}
