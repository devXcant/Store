import { model, models, Schema } from "mongoose";
import { unique } from "next/dist/build/utils";

const customersSchema = new Schema({
  email: {
    type: String,
    require: true,
    unique: true,
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  number: {
    type: String,
  },
});

const Customers = models.Customers || model("Customers", customersSchema);

export default Customers;
