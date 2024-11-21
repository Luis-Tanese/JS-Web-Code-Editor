const fs = require('fs');
const path = require('path');

const EXAMPLES_DIR = path.resolve(__dirname, '../../ExampleCodes');

exports.handler = async (event) => {
    const fileName = event.queryStringParameters.filename;
    try {
        if (!fileName) {
            const files = fs.readdirSync(EXAMPLES_DIR).filter(file => file.endsWith('.js'));
            return {
                statusCode: 200,
                body: JSON.stringify(files),
            };
        } else {
            const filePath = path.join(EXAMPLES_DIR, fileName);
            if (!filePath.startsWith(EXAMPLES_DIR)) {
                throw new Error('Invalid file path');
            }
            const content = fs.readFileSync(filePath, 'utf8');
            return {
                statusCode: 200,
                body: content,
            };
        }
    } catch (err) {
        console.error('Error fetching examples:', err);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Failed to process request' }),
        };
    }
};