import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import Widget from "@hexlet/chatbot-v2";
import { vi, test, describe, beforeEach, beforeAll, expect } from "vitest";
import ChatBotWidget from './models/chatBotWidget';
import steps from '../__fixtures__/defaultSteps';
import unsupportedSteps from '../__fixtures__/unsupportedSteps';
import emptySteps from '../__fixtures__/emptySteps';

let widget;
let mockScroll;

beforeAll(() => {
  mockScroll = Element.prototype.scrollIntoView = vi.fn();
});

beforeEach(() => {
  widget = new ChatBotWidget(screen);
});

describe("Positive scenarios", async () => {

  beforeEach(() => {
    render(Widget(steps));
  });

  test('Test chat bot rendered', async () => {
    await widget.openChatBot();
    widget.checkChatBotIsOpened();
  });

  test("Should be possible to start a conversation", async () => {
    await widget.openChatBot();
    await widget.startConversation();

    widget.checkConversaitionIsStarted();
  });

  test("Should be possible to carry on conversation", async () => {
    await widget.openChatBot();
    await widget.startConversation();
    await widget.carryOnConversation();

    widget.checkConversaitionIsCarryOn();
  });

  test("Should be possible to go back start a conversation", async () => {
    await widget.openChatBot();
    await widget.startConversation();
    await widget.carryOnConversation();
    await widget.goToStartConversation();

    widget.checkConversaitionIsReturnedToBeginning();
  });

  test("Scrolls to the bottom when new message appears", async () => {
    await widget.openChatBot();
    await widget.startConversation();

    expect(mockScroll).toHaveBeenCalled();
  });

  test("Should be possible to close chat", async () => {
    await widget.openChatBot();
    await widget.startConversation();
    await widget.closeChatBot();

    widget.checkChatBotIsClosed();
  });
});

describe("Negative scenarios)", () => {

  test("Crashes when unsupportet steps format was passed", async () => {
    await waitFor(() => {
      expect(() => {
        render(Widget(unsupportedSteps));
      }).toThrow(/e is not iterable/i);
    });
  });

  test("Should show empty chat window when empty steps array was passed", async () => {
    render(Widget(emptySteps));
    expect(await widget.openChatBot()).toMatch('TestingLibraryElementError');
  });
});
