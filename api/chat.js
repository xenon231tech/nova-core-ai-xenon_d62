export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { message } = req.body;
    
    if (!message) {
        return res.status(400).json({ error: 'Message is required' });
    }

    const DEEPSEEK_API_KEY = 'sk-703673d0781048ffb4bebb5dc1f06227';
    const proof = `billions_tee_${Date.now()}`;

    try {
        const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${DEEPSEEK_API_KEY}`
            },
            body: JSON.stringify({
                model: 'deepseek-chat',
                messages: [
                    { role: 'system', content: 'Kamu adalah Nova Core, AI agent terverifikasi Billions TEE. Ramah dan profesional. Gunakan bahasa Indonesia.' },
                    { role: 'user', content: message }
                ],
                temperature: 0.7,
                max_tokens: 500
            })
        });

        const data = await response.json();
        const reply = data.choices[0].message.content;

        res.status(200).json({ reply, proof });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ 
            reply: 'Maaf, Nova Core sedang sibuk. Coba lagi nanti.', 
            proof 
        });
    }
}
