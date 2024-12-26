import Product from "../models/Product.model.js"; // Import the model

// Controller to create a new product
const generateTicketNumber = () => {
  return Math.floor(1000000 + Math.random() * 9000000).toString();
};

const generateUniqueTicketNumber = async () => {
  let unique = false;
  let companyId;

  while (!unique) {
    companyId = generateTicketNumber();
    const existingComplaint = await Product.findOne({ companyId });
    if (!existingComplaint) {
      unique = true;
    }
  }

  return companyId;
};
export const createProduct = async (req, res) => {
    console.log("Received request to create a product:", req.body);
    
  try {
    const {
      goodServicesDate,
      purchaserName,
      goodsServicesName,
      quantity,
      amount,
      gst,
      amountPaid,
      amountPending,
      paymentMode,
    } = req.body;

    const companyId = await generateUniqueTicketNumber();

    // Create a new product instance
    const newProduct = new Product({
      goodServicesDate,
      purchaserName,
      goodsServicesName,
      quantity,
      amount,
      gst,
      amountPaid,
      amountPending,
      paymentMode,
      companyId
    });

    // Save the product to the database
    const savedProduct = await newProduct.save();

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: savedProduct,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error creating product",
      error: error.message,
    });
  }
};

export const getData = async (req, res) => {
  console.log('hioh');
  
    try {
      const products = await Product.find(); // Fetch all products from the database
      res.status(200).json({
        success: true,
        message: "Products fetched successfully",
        data: products,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error fetching products",
        error: error.message,
      });
    }
  };