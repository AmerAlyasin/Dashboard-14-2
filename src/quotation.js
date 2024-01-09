import { Quotation } from "./app/lib/models";
import { connectToDB } from "./app/lib/utils";

export default async function handler(req, res) {
  await connectToDB();
  try { 
    const { id } = req.query;
    console.log('Received ID:', id);
    const quotation = await Quotation.findById(id).populate('products');
    if (!quotation) {
      return res.status(404).json({ message: 'Quotation not found' });
    }
    console.log('Quotation fetched:', quotation);
    res.status(200).json(quotation);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching quotation' });
  }
}