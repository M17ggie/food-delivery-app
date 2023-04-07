import mongoose from "mongoose";

export interface IRole {
    role: String,
    slug: String
}

const RoleSchema = new mongoose.Schema({
    role: String,
    slug: String
})

const Role = mongoose.model('role', RoleSchema);

export default Role;