const runButton = document.getElementById('run-code');
const toggleThemeButton = document.getElementById('toggle-theme');
const clearConsoleButton = document.getElementById('clear-console');
const exportCodeButton = document.getElementById('export-code');
const importCodeButton = document.getElementById('import-code');
const formatCodeButton = document.getElementById('format-code');
const shareCodeButton = document.getElementById('share-code');
const fileInput = document.getElementById('file-input');
const consoleOutput = document.getElementById('console');
const consoleInput = document.getElementById('console-input');
const body = document.body;

const LOCAL_STORAGE_KEY = 'js_code_editor_content';
const VERSIONS_STORAGE_KEY = 'js_code_versions';

const codeEditor = CodeMirror.fromTextArea(document.getElementById('code-editor'), {
    mode: 'javascript',
    theme: 'monokai',
    lineNumbers: true,
    indentWithTabs: true,
    tabSize: 2,
    gutters: ["CodeMirror-lint-markers"],
    lint: true
});

window.addEventListener('load', () => {
    const savedCode = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (savedCode) {
        codeEditor.setValue(savedCode);
    }
});

codeEditor.on('change', () => {
    localStorage.setItem(LOCAL_STORAGE_KEY, codeEditor.getValue());
    saveVersion();
});

const consoleFilters = {
    log: true,
    error: true,
    warn: true
};

const originalConsole = {
    log: console.log,
    error: console.error,
    warn: console.warn
};

const filterLogButton = document.getElementById('filter-log');
const filterErrorButton = document.getElementById('filter-error');
const filterWarnButton = document.getElementById('filter-warn');

function appendToConsole(message, type = 'log') {
    if (!consoleFilters[type]) return;
    const log = document.createElement('div');
    log.textContent = message;
    if (type === 'error') log.style.color = 'red';
    else if (type === 'warn') log.style.color = 'orange';
    consoleOutput.appendChild(log);
    consoleOutput.scrollTop = consoleOutput.scrollHeight;
}

console.log = function (...args) {
    appendToConsole(args.join(' '), 'log');
    originalConsole.log.apply(console, args);
};

console.error = function (...args) {
    appendToConsole(args.join(' '), 'error');
    originalConsole.error.apply(console, args);
};

console.warn = function (...args) {
    appendToConsole(args.join(' '), 'warn');
    originalConsole.warn.apply(console, args);
};

function updateButtonState(button, isActive) {
    if (isActive) {
        button.classList.add('active');
        button.classList.remove('inactive');
    } else {
        button.classList.add('inactive');
        button.classList.remove('active');
    }
}

filterLogButton.addEventListener('click', () => {
    consoleFilters.log = !consoleFilters.log;
    updateButtonState(filterLogButton, consoleFilters.log);
});

filterErrorButton.addEventListener('click', () => {
    consoleFilters.error = !consoleFilters.error;
    updateButtonState(filterErrorButton, consoleFilters.error);
});

filterWarnButton.addEventListener('click', () => {
    consoleFilters.warn = !consoleFilters.warn;
    updateButtonState(filterWarnButton, consoleFilters.warn);
});

updateButtonState(filterLogButton, consoleFilters.log);
updateButtonState(filterErrorButton, consoleFilters.error);
updateButtonState(filterWarnButton, consoleFilters.warn);

runButton.addEventListener('click', () => {
    const code = codeEditor.getValue();
    consoleOutput.innerHTML = '';

    try {
        eval(code);
    } catch (error) {
        console.error(error);
    }
});

formatCodeButton.addEventListener('click', () => {
    const code = codeEditor.getValue();
    const formattedCode = prettier.format(code, { parser: 'babel', plugins: [window.prettierPlugins.babel] });
    codeEditor.setValue(formattedCode);
});

clearConsoleButton.addEventListener('click', () => {
    consoleOutput.innerHTML = '';
});

exportCodeButton.addEventListener('click', () => {
    const code = codeEditor.getValue();
    const blob = new Blob([code], { type: 'text/javascript' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'code.js';
    a.click();
    URL.revokeObjectURL(url);
});

importCodeButton.addEventListener('click', () => {
    fileInput.click();
});

fileInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const content = e.target.result;
            codeEditor.setValue(content);
        };
        reader.readAsText(file);
    }
});

toggleThemeButton.addEventListener('click', () => {
    body.classList.toggle('dark-theme');
    const newTheme = body.classList.contains('dark-theme') ? 'monokai' : 'default';
    codeEditor.setOption('theme', newTheme);
});

function saveVersion() {
    let versions = JSON.parse(localStorage.getItem(VERSIONS_STORAGE_KEY)) || [];
    versions.push({ code: codeEditor.getValue(), timestamp: new Date() });
    localStorage.setItem(VERSIONS_STORAGE_KEY, JSON.stringify(versions));
}

shareCodeButton.addEventListener('click', () => {
    const code = codeEditor.getValue();
    const encodedCode = btoa(unescape(encodeURIComponent(code)));
    const shareableLink = `${window.location.origin}?code=${encodedCode}`;
    prompt('Copy and share this URL:', shareableLink);
});

consoleInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        const command = consoleInput.value.trim();
        if (command) {
            consoleOutput.innerHTML = '';
            try {
                const result = eval(command);
                if (result !== undefined) {
                    console.log(result);
                }
            } catch (error) {
                console.error(error);
            }
        }
        consoleInput.value = '';
        event.preventDefault();
    }
});

function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

window.addEventListener('load', () => {
    const savedCode = localStorage.getItem(LOCAL_STORAGE_KEY);
    const sharedCode = getQueryParam('code');
    if (sharedCode) {
        try {
            const decodedCode = decodeURIComponent(escape(atob(sharedCode)));
            codeEditor.setValue(decodedCode);
            const formattedCode = prettier.format(decodedCode, { parser: 'babel', plugins: [window.prettierPlugins.babel] });
            codeEditor.setValue(formattedCode);
            history.replaceState(null, null, window.location.pathname);
        } catch (e) {
            console.error("Error decoding the shared code: ", e);
        }
    } else if (savedCode) {
        codeEditor.setValue(savedCode);
    }
});
