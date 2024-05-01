const axios = require('axios');

exports.getChatResponse = async (req, res) => {
    const userMessage = req.body.message;
    try {
        const response = await axios.post('https://api.openai.com/v1/engines/davinci/completions', {
            prompt: userMessage,
            max_tokens: 150
        }, {
            headers: {
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
            }
        });
        res.json({ reply: response.data.choices[0].text.trim() });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};