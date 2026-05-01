export default function handler(req, res) {
    res.status(200).json({ 
        reply: "Halo! API Nova Core AI siap digunakan. Setelah deploy ke Vercel, API akan terhubung ke DeepSeek.", 
        proof: `billions_tee_${Date.now()}`
    });
}
