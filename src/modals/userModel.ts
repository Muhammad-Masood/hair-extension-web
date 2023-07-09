// import bcrypt from "bcrypt";
// import User from '../../prisma/schema.prisma'

// interface Methods {
//     comparePassword(password:string): Promise<boolean>
// }

// User.pre("save",async function(next){
//     if(!this.isModified("password")) return next();
//     try{
//     const salt = await bcrypt.genSalt(10);
//     this.password = await bcrypt.hash(this.password,salt);
//     next();
//     }
//     catch(error){
//         throw error;
//     }
// });

// User.methods.comparePassword = async function(password) {
//     try {
//         return await bcrypt.compare(password,this.password);
//     }
//     catch (error){
//         error;
//     }
// };
