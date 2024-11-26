import { KeyboardEventHandler } from 'react';

export function doesNotMatchPattern(value: string, pattern: RegExp): boolean {
  return !pattern.test(value);
}

export const creditCardPattern: RegExp = /^\d+$/;

export function notCreditCard(value: string): boolean {
  return doesNotMatchPattern(value, creditCardPattern);
}
export const blockAlpha: KeyboardEventHandler<HTMLInputElement> = event => {
  const allowedKeys = [
    'Backspace',
    'Tab',
    'Enter',
    'Escape',
    'ArrowLeft',
    'ArrowRight',
    'ArrowUp',
    'ArrowDown',
    'Delete',
  ];

  if (
    allowedKeys.includes(event.key) ||
    event.ctrlKey ||
    event.altKey ||
    event.metaKey ||
    event.shiftKey
  ) {
    return;
  }

  const input = event.target as HTMLInputElement;
  // Only block if there's text AND it's not all selected
  if (
    notCreditCard(event.key) &&
    input.value.length > 0 &&
    input.selectionStart === input.selectionEnd
  ) {
    event.preventDefault();
  }
};
