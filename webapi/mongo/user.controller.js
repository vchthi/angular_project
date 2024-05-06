const userModel = require("./user.model");
const jwt = require('jsonwebtoken');
module.exports = {
  getAllUsers,
  getUserById,
  addUser,
  deleteUser,
  updateUser,
  register,
  login
};

// Lấy danh sách user
async function getAllUsers() {
  try {
    const users = await userModel.find();
    return users;
  } catch (error) {
    console.log("Lỗi lấy danh sách user", error);
    throw error;
  }
}

// Lấy thông tin của một user dựa trên ID
async function getUserById(id) {
  try {
    const user = await userModel.findById(id);
    return user;
  } catch (error) {
    console.log("Lỗi lấy thông tin user", error);
    throw error;
  }
}

// Thêm mới user
async function addUser(body) {
  try {
    const { name, email, pass, phone, role } = body;
    const newUser = new userModel({ name, email, pass, phone, role });
    const result = await newUser.save();
    return result;
  } catch (error) {
    console.log("Lỗi thêm user", error);
    throw error;
  }
}




// Xóa user
async function deleteUser(id) {
  try {
    const deletedUser = await userModel.findByIdAndDelete(id);
    return deletedUser;
  } catch (error) {
    console.log("Lỗi xóa user", error);
    throw error;
  }
}

// Cập nhật user
async function updateUser(id, body) {
  try {
    const user = await userModel.findById(id);
    if (!user) throw new Error("Không tìm thấy user");
    const { name, email, pass, phone, role } = body;
    const updatedUser = await userModel.findByIdAndUpdate(
      id,
      { name, email, pass, phone, role },
      { new: true }
    );
    return updatedUser;
  } catch (error) {
    console.log("Lỗi cập nhật user", error);
    throw error;
  }
}


const bcrypt = require("bcryptjs");

async function register(body) {
  try {
      //lay du lieu
      const {name, email, pass, phone, role} = body
      //kiem tra email da dc dang ky chua
      let user = await userModel.findOne({email: email}) // kiem tra co trung khong
      if (user) {
          throw new Error ('Email da ton tai')
      }
      // tao ma hoa pass
      var salt = bcrypt.genSaltSync(10);
      var hash = bcrypt.hashSync(pass, salt);
      // tao user moi
      user = new userModel({name, email, pass:hash, phone, role : role || 0})
      // luu db 
      const result = await user.save()
      return result;
  } catch (error) {
      console.log('loi dang ky', error);
      throw error;
  }
}
// async function login(body) {
//   try {
//     // Lấy dữ liệu
//     const { email, pass } = body;
//     // Kiểm tra email
//     let user = await userModel.findOne({ email: email });
//     if (!user) {
//       throw new Error("Email không tồn tại");
//     }
//     // Kiểm tra mật khẩu
//     const checkPassword = bcrypt.compareSync(pass, user.pass);
//     if (!checkPassword) {
//       throw new Error("Mật khẩu không chính xác");
//     }
//     //xóa field pass
//     delete user._doc.pass;

//     //tạo token
//     const token = jwt.sign(
//       {
//         _id: user._id,
//         email: user.email,
//         role: user.role,
//       },
//       "chanhthi",
//       { expiresIn: 1 * 1 * 60 * 60 } //thời gian hết hạn của token
//     );
//     user={...user._doc,token}
//   } catch (error) {
//     console.log("Lỗi đăng nhập: ", error);
//     throw error;
//   }
// }

async function login(body) {
  try {
      // lấy dữ liệu
      const {email , pass} = body;
      // kiem tra email
      let user = await userModel.findOne({email : email})
      if (!user) {
          throw new Error('Email khong ton tai')
      }
      // kiểm tra pass
      const checkpass = bcrypt.compareSync(pass, user.pass)
      if (!checkpass) {
          throw new Error('Mật khẩu không chính xác')
      }
      //xóa field pass
      delete user._doc.pass
      // tạo token
      const token = jwt.sign(
          {_id : user._id, email : user.email, role : user.role},
          'duongdiem', // key secret
          {expiresIn: 1 * 1 *60 *60 } // thời gian hết hạn của token
      )
      user = {...user._doc, token}
      return user
  } catch (error) {
      console.log('LỖI', error);
      throw error;
  }
}