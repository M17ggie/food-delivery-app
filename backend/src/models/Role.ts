import mongoose from "mongoose";

const RoleSchema = new mongoose.Schema({
    role: String,
    slug: String
})

const Role = mongoose.model('role', RoleSchema);

export default Role;