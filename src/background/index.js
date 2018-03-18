import camelCase from 'lodash-es/camelCase';
import capitalize from 'lodash-es/capitalize';
import kebabCase from 'lodash-es/kebabCase';
import lowerCase from 'lodash-es/lowerCase';
import snakeCase from 'lodash-es/snakeCase';
import startCase from 'lodash-es/startCase';
import trim from 'lodash-es/trim';
import upperCase from 'lodash-es/upperCase';
import words from 'lodash-es/words';
import zip from 'lodash-es/zip';

const OPERATION_NAMES = [
  'Camel Case',
  'Capitalize',
  'Kebab Case',
  'Lower Case',
	'Snake Case',
	'Start Case',
	'Trim',
	'Upper Case',
	'Word Count'
];

const OPERATIONS = [
  camelCase,
  capitalize,
  kebabCase,
  lowerCase,
	snakeCase,
	startCase,
	trim,
	upperCase,
	(s) => words(s).length
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
