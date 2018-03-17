import camelCase from 'lodash-es/camelCase';
import capitalize from 'lodash-es/capitalize';
import kebabCase from 'lodash-es/kebabCase';
import lowerCase from 'lodash-es/lowerCase';
import snakeCase from 'lodash-es/snakeCase';
import trim from 'lodash-es/trim';
import upperCase from 'lodash-es/upperCase';
import zip from 'lodash-es/zip';

const OPERATION_NAMES = [
  'Camel Case',
  'Capitalize',
  'Kebab Case',
  'Lower Case',
	'Snake Case',
	'Trim',
  'Upper Case',
];

const OPERATIONS = [
  camelCase,
  capitalize,
  kebabCase,
  lowerCase,
	snakeCase,
	trim,
  upperCase
];

const OPERATION_MAP = new Map(zip(OPERATION_NAMES, OPERATIONS))

const createContextMenuItem = operation => ({
  id: operation,
  title: operation,
  contexts: ['selection'],
});

browser.contextMenus.removeAll();

OPERATION_NAMES.forEach((name) => {
	browser.contextMenus.create(createContextMenuItem(name));
})

browser.contextMenus.onClicked.addListener(
	({ menuItemId, selectionText }, { id }) => {
		const operation = OPERATION_MAP.get(menuItemId);
		const textToSendToClipboard = operation(selectionText);
		
		browser.tabs.sendMessage(id, { textToSendToClipboard });
  }
);
