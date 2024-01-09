import mongoose from "mongoose";

const {Schema} =mongoose;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      min: 3,
      max: 20,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    img: {
      type: String,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    phone: {
      type: String,
    },
    address: {
      type: String,
    },
  },
  { timestamps: true }
);




const clientSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: false,
      min: 3,
      max: 20,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    contactName: {
      type: String,
      required: true,
    },
    contactMobile: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    address: {
      type: String,
      required: true,

    },
  },
  { timestamps: true }
);


const supplierSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: false,
      min: 3,
      max: 20,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    contactName: {
      type: String,
      required: true,
    },
    contactMobile: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    address: {
      type: String,
    },
  },
  { timestamps: true }
);



/*const productSchema = new Schema({
  productCode: {
    type: String,
    required: false,
  },
  unitPrice: {
    type: Number,
    required: false,
    min: 0,
  },
  unit: {
    type: Number,
    required: false,
    min: 0,
  },
  qty: {
    type: Number,
    required: false,
    min: 0,
  },
  description: {
    type: String,
    required: false,
  },
});*/

const quotationSchema = new Schema(
  {
    clientName: {
      type: String,
      required: true,
      min: 3,
      max: 20,
    },
    projectName: {
      type: String,
      required: true,
      unique: false,
    },
    projectLA: {
      type: String,
      required: true,
    },
     products:  [
      {
        productCode: {
          type: String,
          required: true,
        },
        unitPrice: {
          type: Number,
          required: true,
        },
        unit: {
          type: Number,
          required: true,
        },
        qty: {
          type: Number,
          required: true,
        },
        description: {
          type: String,
          required: true,
        }, 
      },
    ],
    paymentTerm: {
      type: String,
      required: true,
    },
    paymentDelivery: {
      type: String,
      required: true,
    },
    note: {
      type: String,
      required: true,
    },
    excluding: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);





const purchaseOrderSchema = new Schema(
  {
    supplierName: {
      type: String,
      required: true,
      min: 3,
      max: 20,
    },
    quotationNumber: {
      type: Number,
      required: true,
      unique: true,
    },
    quotationDate: {
      type: String,
      required: true,
    },
    products: [
      {
        productCode: {
          type: String,
          required: true,
        },
        unitPrice: {
          type: Number,
          required: true,
        },
        unit: {
          type: Number,
          required: true,
        },
        qty: {
          type: Number,
          required: true,
        },
        description: {
          type: String,
          required: true,
        },
      },
    ], // Array of products
    paymentTerm: {
      type: String,
      required: true,
    },
    paymentDelivery: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    note: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);






export const PurchaseOrder = mongoose.models.PurchaseOrder || mongoose.model("PurchaseOrder", purchaseOrderSchema);
export const Quotation = mongoose.models.Quotation || mongoose.model("Quotation", quotationSchema);
/*export const Product = mongoose.models.Product || mongoose.model("Product", productSchema);*/
export const Supplier = mongoose.models.Supplier || mongoose.model("Supplier", supplierSchema);
export const User = mongoose.models.User || mongoose.model("User", userSchema);
export const Client = mongoose.models.Client || mongoose.model("Client", clientSchema);



