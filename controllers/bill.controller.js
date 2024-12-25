import Product from "../models/Product.model.js"; // Import the model
export const getBill = async (req, res) => {
    
    try {
        const { id } = req.params;

        // Fetch the order details from the database
        const order = await Product.findById(id);
        if (!order) {
            return res.status(404).send('Order not found');
        }
        console.log(order);
        
        res.status(200).send(order);
    } catch (error) {
        console.error('Error generating bill:', error);
        res.status(500).send('Error generating bill');
    }
};
