"use server";
import { revalidatePath } from "next/cache";
import { connectToDB } from "./utils";
import { redirect } from "next/navigation";
import bcrypt from 'bcrypt';
/*import { Client, PurchaseOrder, Supplier, User, Quotation } from "@/app//lib/models"*/
import { signIn } from "../auth";
const { User, Client, Supplier, PurchaseOrder, Quotation } = require('@/app/lib/models')



//USER //
export const addUser = async (formData) => {
  const { username, email, password, phone, address, isAdmin, isActive } = Object.fromEntries(formData);

  try {
     connectToDB();

    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(password, salt)
    const newUser = new User({
      username,
      email,
      password: hashPassword,
      phone,
      address,
      isAdmin,
      isActive
    });

    await newUser.save();
  } catch (err) {
    console.log(err)
    throw new Error('failed to add user!')
  }

  revalidatePath("/dashboard/users");
  redirect("/dashboard/users");
};


export const updateUser = async (formData) => {
  const { id, username, email, password, phone, address, isAdmin, isActive } =
    Object.fromEntries(formData);

  try {
     connectToDB();

    const updateFields = {
      username,
      email,
      password,
      phone,
      address,
      isAdmin,
      isActive,
    };

    Object.keys(updateFields).forEach(
      (key) =>
        (updateFields[key] === "" || undefined) && delete updateFields[key]
    );

    await User.findByIdAndUpdate(id, updateFields);
  } catch (err) {
    console.log(err);
    throw new Error("Failed to update user!");
  }

  revalidatePath("/dashboard/users");
  redirect("/dashboard/users");
};

export const deleteUser = async (formData) => {
  const { id } = Object.fromEntries(formData);

  try {
     connectToDB();        
    await User.findByIdAndDelete(id)

  } catch (err) {
    console.log(err)
    throw new Error('failed to delete user!')
  }

  revalidatePath("/dashboard/users");
};



//Client//

export const addClient = async (formData) => {
  const { name, phone, contactName, contactMobile, email, address } = Object.fromEntries(formData);

  try {
      connectToDB();

    const newClient = new Client({
      name,
      phone,
      contactName,
      contactMobile,
      email,
      address
    });

    await newClient.save();
  } catch (err) {
    console.log(err)
    throw new Error('failed to add client!')
  }

  revalidatePath("/dashboard/clients");
  redirect("/dashboard/clients");
};


export const updateClient = async (formData) => {
  const { id, name, phone, contactName, contactMobile, email, address } =
    Object.fromEntries(formData);

  try {
    connectToDB();

    const updateFields = {
      name,
      phone,
      contactName,
      contactMobile,
      email,
      address
    };

    Object.keys(updateFields).forEach(
      (key) =>
        (updateFields[key] === "" || undefined) && delete updateFields[key]
    );

    await Client.findByIdAndUpdate(id, updateFields);
  } catch (err) {
    console.log(err);
    throw new Error("Failed to update client!");
  }

  revalidatePath("/dashboard/clients");
  redirect("/dashboard/clients");
};



export const deleteClient = async (formData) => {
  const { id } = Object.fromEntries(formData);

  try {
     connectToDB();        
    await Client.findByIdAndDelete(id)

  } catch (err) {
    console.log(err)
    throw new Error('failed to delete client!')
  }

  revalidatePath("/dashboard/clients");
};


//Supplier //

export const addSupplier = async (formData) => {
  const { name, phone, contactName, contactMobile, email, address } = Object.fromEntries(formData);

  try {
      connectToDB();
    const newSupplier = new Supplier({
      name,
      phone,
      contactName,
      contactMobile,
      email,
      address,

    });

    await newSupplier.save();
  } catch (err) {
    console.log(err)
    throw new Error('failed to add supplier!')
  }

  revalidatePath("/dashboard/suppliers");
  redirect("/dashboard/suppliers");
};

export const deleteSupplier = async (formData) => {
  const { id } = Object.fromEntries(formData);

  try {
     connectToDB();        
    await Supplier.findByIdAndDelete(id)

  } catch (err) {
    console.log(err)
    throw new Error('failed to delete supplier!')
  }

  revalidatePath("/dashboard/suppliers");
};


export const updateSupplier = async (formData) => {
  const { id, name, phone, contactName, contactMobile, email, address } =
    Object.fromEntries(formData);

  try {
     connectToDB();

    const updateFields = {
      name,
      phone,
      contactName,
      contactMobile,
      email,
      address
    };

    Object.keys(updateFields).forEach(
      (key) =>
        (updateFields[key] === "" || undefined) && delete updateFields[key]
    );

    await Supplier.findByIdAndUpdate(id, updateFields);
  } catch (err) {
    console.log(err);
    throw new Error("Failed to update supplier!");
  }

  revalidatePath("/dashboard/suppliers");
  redirect("/dashboard/suppliers");
};

//Quotation//
//products,
//products,

export const addQuotation = async (formData) => {

  const {
    clientName,
    projectName,
    projectLA,
    products,
    paymentTerm,
    paymentDelivery,
    note,
    excluding,
  } = formData;


  try {
    // Connect to the database
     await connectToDB();

    // Create a new Quotation instance
    const newQuotation = new Quotation({
      clientName,
      projectName,
      projectLA,
      products,
      paymentTerm,
      paymentDelivery,
      note,
      excluding,
    });

    // Save the newQuotation to the database
    await newQuotation.save();
  } catch (err) {
    // Handle errors
    console.error(err);
    throw new Error('Failed to add Quotation!');
  }

  // Revalidate the specified path
  revalidatePath('/dashboard/quotations');

  // Redirect to the specified path
  redirect('/dashboard/quotations');
};
//      

export const updateQuotation = async (formData) => {
  const { id, clientName, projectName, projectLA, products, paymentTerm, paymentDelivery, note , excluding } = formData;


  try { 
   await connectToDB();

    const updateFields = {
      clientName,
      projectName,
      projectLA,
      products,
      paymentTerm,
      paymentDelivery,
      note,
      excluding,

      
    };
    console.log("fron actions:" , formData)

    // Remove empty or undefined fields
    Object.keys(updateFields).forEach((key) => {
      if (key !== 'number' && (updateFields[key] === "" || updateFields[key] === undefined)) {
        delete updateFields[key];
      }});

    await Quotation.findByIdAndUpdate(id, updateFields);
  } catch (err) {
    console.error(err);
    throw new Error("Failed to update quotation!");
  }

  revalidatePath("/dashboard/quotations");
  redirect("/dashboard/quotations");
};


/*export const updateQuotation = async (formData) => {
  const { id, clientName, projectName, projectLA, products, paymentTerm, paymentDelivery, note, excluding } =
    formData;
  // console.log(first)
  try {
    // Connect to MongoDB (assuming connectToDB is your connection function)
      await connectToDB();

    // Update quotation fields
    const updateFields = {
      clientName,
      projectName,
      projectLA,
      paymentTerm,
      paymentDelivery,
      note,
      excluding,
    };

    // Remove undefined, null, and empty string values
    Object.keys(updateFields).forEach(
      (key) =>
        (updateFields[key] === undefined || updateFields[key] === null || updateFields[key] === "") &&
        delete updateFields[key]
    );

    // Update quotation document
    await Quotation.findByIdAndUpdate(id, updateFields);

    // Update products
    for (const product of products) {
      const { _id: productId, productCode, unitPrice, unit, qty, description } = product;

      const productUpdateFields = {
        productCode,
        unitPrice,
        unit,
        qty,
        description,
      };

      // Remove undefined, null, and empty string values
      Object.keys(productUpdateFields).forEach(
        (key) =>
          (productUpdateFields[key] === undefined ||
            productUpdateFields[key] === null ||
            productUpdateFields[key] === "") && delete productUpdateFields[key]
      );

      // Update each product individually
      await Quotation.updateOne(
        { _id: id, 'products._id': productId },
        { $set: { 'products.$': productUpdateFields } }
      );
    }

    // Revalidate path and then redirect
    revalidatePath("/dashboard/quotations");
    redirect("/dashboard/quotations");
  } catch (err) {
    console.error(err);
    throw new Error("Failed to update quotation!");
  }
};*/


/*exports.updateQuotation = async (req, res) => {
  const { id } = req.params;
  const { clientName, projectName, projectLA, paymentTerm, paymentDelivery, note, excluding, products } = req.body;

  try {
    const updatedQuotation = await Quotation.findByIdAndUpdate(id, {
      clientName,
      projectName,
      projectLA,
      paymentTerm,
      paymentDelivery,
      note,
      excluding,
      products,
    }, { new: true });

    res.json(updatedQuotation);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};*/




export const deleteQuotation = async (formData) => {
  const { id } = Object.fromEntries(formData);

  try {
     connectToDB();        
    await Quotation.findByIdAndDelete(id)

  } catch (err) {
    console.log(err)
    throw new Error('failed to delete supplier!')
  }

  revalidatePath("/dashboard/quotations");
};


export const addPurchaseOrder = async (formData) => {

  const {
    supplierName,
    quotationNumber,
    quotationDate,
    products,
    paymentTerm,
    paymentDelivery,
    location,
    note,

  } = formData;

  try {
    // Connect to the database
    connectToDB();

    // Create a new Quotation instance
    const newPurchaseOrder = new PurchaseOrder({
      supplierName,
      quotationNumber,
      quotationDate,
      products,
      paymentTerm,
      paymentDelivery,
      location,
      note,

    });

    // Save the newQuotation to the database
    await newPurchaseOrder.save();
  } catch (err) {
    // Handle errors
    console.error(err);
    throw new Error('Failed to add Po!');
  }

  // Revalidate the specified path
  revalidatePath('/dashboard/purchaseOrder');

  // Redirect to the specified path
  redirect('/dashboard/purchaseOrder');
};


export const updatePurchaseOrder = (formData) => {
  const {
    id,
    supplierName,
    quotationNumber,
    quotationDate,
    paymentTerm,
    paymentDelivery,
    location,
    note,
    products,
  } = Object.fromEntries(formData);
  // Connect to MongoDB using .then and .catch
  return connectToDB()
    .then(() => {
      const updateFields = {
        supplierName,
        quotationNumber,
        quotationDate,
        paymentTerm,
        paymentDelivery,
        location,
        note,
        products,
      };

      Object.keys(updateFields).forEach(
        (key) =>
          (updateFields[key] === "" || updateFields[key] === undefined) && delete updateFields[key]
      );

      // Assuming PurchaseOrder is your mongoose model for purchase orders
      return PurchaseOrder.findByIdAndUpdate(id, updateFields);
    })
    .then(() => {
      // Use .then and .catch before revalidatePath and redirect
      return revalidatePath("/dashboard/purchaseOrder");
    })
    .then(() => {
      return redirect("/dashboard/purchaseOrder");
    })
    .catch((err) => {
      console.log(err);
      throw new Error("Failed to update Po!");
    });
};

export const deletePurchseOrder = async (formData) => {
  const { id } = Object.fromEntries(formData);

  try {
       connectToDB();        
    await PurchaseOrder.findByIdAndDelete(id)

  } catch (err) {
    console.log(err)
    throw new Error('failed to delete Po!')
  }

  revalidatePath("/dashboard/purchaseOrder");
};



export const authenticate = async (prevState, formData) => {
  const { username, password } = Object.fromEntries(formData);

  try {
    // Assuming signIn returns a response object
    await signIn("credentials", { username, password });
    
    // Log the response for debugging

    // Check the response and return appropriate message
  } catch (error) {
    if (error.message.includes("CredentialsSignin")) {
      return "Wrong Credentials";
    }
    throw error;
  }
};
