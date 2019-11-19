const stripe = require('stripe')(process.env.STRIPE_SECRET);

const charge = async (req, res) => {

    try {
        const { amount, receipt_email, source } = req.body;

        const c = await stripe.charges.create({
            amount,
            currency: 'usd',
            receipt_email,
            source
        });
        
        if (!c) throw new Error('charge unsuccessful');

        res.status(201).json({ 
            message: 'charge posted successfully',
            charge
        });

    } catch(err) {
        res.status(500).json({ message: err.message });
    }
};

const test = (req, res) => res.status(200).json({ message: 'IT WORKS' });

module.exports = {
    charge,
    test
}