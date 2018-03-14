import camelCase from 'lodash-es/camelCase';
import capitalize from 'lodash-es/capitalize';
import kebabCase from 'lodash-es/kebabCase';
import lowerCase from 'lodash-es/lowerCase';
import snakeCase from 'lodash-es/snakeCase';
import upperCase from 'lodash-es/upperCase';
import zip from 'lodash-es/zip';

const OPERATION_NAMES = [
  'camelCase',
  'capitalize',
  'kebabCase',
  'lowerCase',
  'snakeCase',
  'upperCase',
];

const OPERATIONS = [
  camelCase,
  capitalize,
  kebabCase,
  lowerCase,
  snakeCase,
  upperCase,
];

const OPERATION_MAP = new Map(zip(OPERATION_NAMES, OPERATIONS))

const createContextMenuItem = operation => ({
  id: operation,
  title: operation,
  contexts: ['selection'],
});

chrome.contextMenus.removeAll();

OPERATION_NAMES.forEach((name) => {
	chrome.contextMenus.create(createContextMenuItem(name));
})

chrome.contextMenus.onClicked.addListener(
	({ menuItemId, selectionText }, { id }) => {
		const operation = OPERATION_MAP.get(menuItemId);
		const textToSendToClipboard = operation(selectionText);
		console.log(textToSendToClipboard);
		
		chrome.tabs.sendMessage(id, { textToSendToClipboard });
  }
);
