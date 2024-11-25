import { render } from '@testing-library/react';
import Widget from '@hexlet/chatbot-v2';
// import { debug } from 'vitest-preview';
import { test, expect, describe } from "vitest";
import steps from '../__fixtures__/default';

describe("Positive scenarios", () => {

  test('Test chat bot rendered', async () => {
    render(Widget(steps));
    expect(document.body).toHaveTextContent('Открыть Чат');
  });

});
