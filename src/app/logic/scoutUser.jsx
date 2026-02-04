import User from "./user";

export default function CreateScout(User, role, section){ 

    return Object.assign({}, User, role, section);

}