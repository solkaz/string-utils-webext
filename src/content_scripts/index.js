import camelCase from 'lodash-es/camelCase';
import capitalize from 'lodash-es/capitalize';
import kebabCase from 'lodash-es/kebabCase';
import lowerCase from 'lodash-es/lowerCase';
import snakeCase from 'lodash-es/snakeCase';
import upperCase from 'lodash-es/upperCase';

const getSelectedText = () => {
    let text = "";
    if (window.getSelection) {
        text = window.getSelection().toString();
    } else if (document.selection && document.selection.type != "Control") {
        text = document.selection.createRange().text;
    }
    return text;
}

window.oncontextmenu = () => {
	const selectedText = getSelectedText();
	if (selectedText) {
		console.log('selectedText:', selectedText);
	} else {
		console.log('No text selected');
	}
}
