//thực hiện thao tác CRUD với collection categories
const athletesModel = require("./athletes.model");


module.exports={yearOfBirth}

async function yearOfBirth() {
    try {
        const year = await athletesModel.find();
        return year;
      } catch (error) {
        console.log("Lỗi lấy danh sách", error);
        throw error;
      }
  };
  

  