import {connectToDB} from './utils';
 import { User, Client, Supplier, PurchaseOrder, Quotation, Product } from "@/app/lib/models";



/*const { User, Client, Supplier, PurchaseOrder, Quotation, Product } = require('@/app/lib/models')*/


 let net;
let dns;

if (typeof window === 'undefined') {
  // Server-side code
  net = require('net');
  dns = require('dns'); // Add this line

  // ... additional server-side logic if needed
}


/*export const fetchProducts= async(q, page) => {
  const regex = new RegExp(q, "i");
    const ITEM_PER_PAGE = 5;
    try {
      await connectToDB()
        const count = await Product.find({ productCode: { $regex: regex } }).count();
        const products = await Product.find({ productCode: { $regex: regex } }).limit(ITEM_PER_PAGE).skip(ITEM_PER_PAGE * (page - 1));
        return { count, products };
    } catch (err) {
        console.log(err);
        throw new Error('Failed to fetch Products!')
    }
  
  };

  export const fetchProduct = async (id) => {
    try {
      await connectToDB()
        const product = await Product.findById(id)
        console.log('Fetched Products:', product);
        return product
  
    } catch (err) {
        console.log(err);
        throw new Error('Failed to fetch Product!')
    }
  
  };*/



  export const fetchClientNames = async () => {
    try {
      await connectToDB();
      const clientNames = await Client.find({}, 'name'); // Fetch only the 'name' field
      return clientNames.map(client => client.name);
    } catch (err) {
      console.log(err);
      throw new Error('Failed to fetch Client Names!');
    }
  };


export const fetchUsers = async (q, page) => {

    const regex = new RegExp(q, "i");
    const ITEM_PER_PAGE = 5;
    try {
         await connectToDB()
        const count = await User.find({ username: { $regex: regex } }).count();
        const users = await User.find({ username: { $regex: regex } }).limit(ITEM_PER_PAGE).skip(ITEM_PER_PAGE * (page - 1));
        return { count, users };
    } catch (err) {
        console.log(err);
        throw new Error('Failed to fetch Users!')
    }
  
  };
  
  export const fetchUser = async (id) => {
    try {
      await  connectToDB()
        const user = await User.findById(id)
        return user
  
    } catch (err) {
        console.log(err);
        throw new Error('Failed to fetch User!')
    }
  
  };
  
  
  export const fetchClients = async (q, page) => {
    const regex = new RegExp(q, "i");
    const ITEM_PER_PAGE = 5;
  
    try {
      await connectToDB()
        const count = await Client.find({ name: { $regex: regex } }).count();
        const clients = await Client.find({ name: { $regex: regex } }).limit(ITEM_PER_PAGE).skip(ITEM_PER_PAGE * (page - 1));
        return { count, clients };
    } catch (err) {
        console.log(err);
        throw new Error('Failed to fetch Clients!')
    }
  };
  
  export const fetchClient = async (id) => {
    try {
      await  connectToDB()
        const client = await Client.findById(id)
        return client
    } catch (err) {
        console.log(err);
        throw new Error('Failed to fetch Client!')
    }
  
  };
  
  export const fetchQuotations = async (q, page) => {
    const regex = new RegExp(q, "i");
    const ITEM_PER_PAGE = 5;
  
    try {
        await connectToDB()
        const count = await Quotation.find({ clientName: { $regex: regex } }).count();
        const quotations = await Quotation.find({ clientName: { $regex: regex } }).limit(ITEM_PER_PAGE).skip(ITEM_PER_PAGE * (page - 1));
        return { count, quotations };
    } catch (err) {
        console.log(err);
        throw new Error(err)
    }
  };
  
  // Export a function that fetches a quotation by id

  export const fetchQuotationById = async (quotationId) => {
    try {
      const quotation = await Quotation.findOne({ _id: quotationId });
      return quotation;
    } catch (error) {
      console.error('Error fetching quotation:', error);
      throw error;
    }
  };

  

  
  export const fetchSuppliers = async (q, page) => {
    const regex = new RegExp(q, "i");
    const ITEM_PER_PAGE = 5;
  
    try {
      await connectToDB()
        const count = await Supplier.find({ name: { $regex: regex } }).count();
        const suppliers = await Supplier.find({ name: { $regex: regex } }).limit(ITEM_PER_PAGE).skip(ITEM_PER_PAGE * (page - 1));
        return { count, suppliers };
    } catch (err) {
        console.log(err);
        throw new Error('Failed to fetch Suppliers!')
    }
  };
  
  export const fetchSupplier = async (id) => {
    try {
      await connectToDB()
        const supplier = await Supplier.findById(id)
        return supplier
    } catch (err) {
        console.log(err);
        throw new Error('Failed to fetch Supplier!')
    }
  
  };
  
  export const fetchPurchaseOrders = async (q, page) => {
    const regex = new RegExp(q, "i");
    const ITEM_PER_PAGE = 5;
  
    try {
      await  connectToDB()
        const count = await PurchaseOrder.find({ supplierName: { $regex: regex } }).count();
        const purchaseOrders = await PurchaseOrder.find({ supplierName: { $regex: regex } }).limit(ITEM_PER_PAGE).skip(ITEM_PER_PAGE * (page - 1));
        console.log("purchase:", purchaseOrders)
        return { count, purchaseOrders };
    } catch (err) {
        console.log(err);
        throw new Error('Failed to fetch PO!')
    }
  };
  
  // Using await
/*export const fetchPurchaseOrder = async (id) => {
  try {
    // Connect to MongoDB using await
    await connectToDB();

    // Use the findById method to find the purchase order by id
    const purchaseOrder = await PurchaseOrder.findById(id);

    // Check if the purchase order exists
    if (!purchaseOrder) {
      throw new Error("Purchase order not found!");
    }

    // Return the purchase order
    return purchaseOrder;
  } catch (err) {
    console.error(err);
    throw new Error("Failed to fetch purchase order!");
  }
};*/

// Using .then and .catch
export const fetchPurchaseOrder = async (id) => {
  // Connect to MongoDB using async/await
  await connectToDB();
  // Use the findById method to find the purchase order by id
  const purchaseOrder = await PurchaseOrder.findById(id);
  // Check if the purchase order exists
  if (!purchaseOrder) {
    throw new Error("Purchase order not found!");
  }
  // Return the purchase order
  return purchaseOrder;
};


