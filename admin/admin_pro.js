const getAll = async () => {
  const response = await fetch(`http://localhost:3000/products/`,{
      //  headers:{
      //    Authorization: `Bearer ${token}`
      //  }
       });
  const data = await response.json();
  console.log(data);
  let kq = "";
  let stt = 1;
  data.pros.map((item) => {
    kq += `
              <tr>
                  <td>${stt}</td>
                  <td>
      <img src="http://localhost:3000/images/${item.image}" alt="ProductImage" />
  </td>
                  <td><a  style="text-decoration: none;" href="./detail.html" onclick="getId('${item._id}')">${item.name}</a></td>
                  <td>${item.category.categoryName}</td>
                  <td>${item.price_1}</td>
                  <td>${item.price_2}</td>
                  <td>${item.mota_1}</td>
                  <td>${item.mota_2}</td>
                  <td>
                  <a href="./editpro.html"> <button class="edit-button" onclick="getId('${item._id}')" >Chỉnh sửa</button></a>
                  <button class="delete-button" onclick="delPro('${item._id}')">Xóa</button>

         
                  </td>
              </tr>`;
    stt++;
  });
  document.getElementById("dulieu").innerHTML = kq;
};



const getNew = async () => {
  const response = await fetch("http://localhost:3000/products/newpro",{
  headers:{
    Authorization: `Bearer ${token}`
  }
  });
  const data = await response.json();
  console.log(data);
  let kq = "";
  let stt = 1;
  data.Products.map((item) => {
    kq += `
    <tr>
    <td>${stt}</td>
    <td>
<img src="http://localhost:3000/images/${item.image}" alt="ProductImage" />
</td>
    <td><a  style="text-decoration: none;" href="./detail.html" onclick="getId('${item._id}')">${item.name}</a></td>
    <td>${item.category.categoryName}</td>
    <td>${item.price_1}</td>
    <td>${item.price_2}</td>
    <td>${item.mota_1}</td>
    <td>${item.mota_2}</td>
    <td>
    <a href="./editpro.html"> <button class="edit-button" >Chỉnh sửa</button></a>
    <button class="delete-button"onclick="delPro('${item._id}')" idsp='${item._id}' >Xóa</button>

    </td>
</tr`;
    stt++;
  });
  document.getElementById("dulieumoi").innerHTML = kq;
};


//****************************************************************** */
//Chi tiết
const getId = (id) => {
  localStorage.setItem("idpro", id);
};

const getProDetail = async () => {
  const id = localStorage.getItem("idpro");
  const response = await fetch(`http://localhost:3000/products/${id}`);
  const data = await response.json();
  console.log(data);
  document.getElementById("name").innerText = data.pros.name;
  document.getElementById("price_1").innerText = data.pros.price_1;
  document.getElementById("price_2").innerText = data.pros.price_2;
  document.getElementById("mota_1").innerText = data.pros.mota_1;
  document.getElementById("mota_2").innerText = data.pros.mota_2;
  document.getElementById(
    "image"
  ).src = `http://localhost:3000/images/${data.pros.image}`;
};


//****************************************************************** */
//Lấy danh mục
const getCategory = async () => {
  const response = await fetch("http://localhost:3000/categories");
  const data = await response.json();
  let kq = "";
  data.map((i) => {
    kq += `<option value="${i._id}">${i.name}</option>`;
  });

  document.getElementById("category").innerHTML = kq;
};


//****************************************************************** */
//thêm


const insertProduct = async () => {
  const mess = confirm(" Bạn có chắc chắn muốn thêm sản phẩm");
  if (!mess) {
    window.location.href = "./admin_pro.html";
  }
  const name = document.getElementById("name").value;
  const price_1 = document.getElementById("price_1").value;
  const price_2 = document.getElementById("price_2").value;
  const image = document.getElementById("image").files[0];
  const mota_1 = document.getElementById("mota_1").value;
  const mota_2 = document.getElementById("mota_2").value;
  const category = document.getElementById("category").value;

  let data = new FormData();
  data.append("name", name);
  data.append("price_1", price_1);
  data.append("price_2", price_2);
  data.append("image", image);
  data.append("mota_1", mota_1);
  data.append("mota_2", mota_2);
  data.append("category", category);

  try {
    const response = await fetch(`http://localhost:3000/products/new`, {
      method: "POST",
      body: data,
    });
    const result = await response.json();
    window.location.href = "./admin_pro.html";
    console.log(result);
  } catch (error) {
    console.error("Lỗi khi thêm sản phẩm:", error);
  }
};



//****************************************************************** */
//Sửa
const showEditPro = async () => {

  const getPro = async () => {
    const id = localStorage.getItem("idpro");
    const response = await fetch(`http://localhost:3000/products/${id}`);
    const data = await response.json();
    return data;
  };
  const getCate = async () => {
    const response = await fetch(`http://localhost:3000/categories`);
    const data = await response.json();
    return data;
  };
  const product = await getPro();
  const category = await getCate();
  console.log(product, category);
  let proupdate = "";
  proupdate += `
    <label for="">Danh mục</label>
    <select name="cate" id="cate">`;
  category.map(i => {
    if (product.category && i._id == product.category.categoryId) {
      proupdate += `<option value="${i._id}" selected>${i.name}</option>`;
    } else {
      proupdate += `<option value="${i._id}">${i.name}</option>`;
    }
  });
  proupdate += `</select><br><br>
  <label for="">Tên sản phẩm</label><br>
  <input type="text" id="productName" name="productName" value="${product.Product.name}" placeholder="Nhập tên sản phẩm" required><br>
  <label for="">Giá sản phẩm giảm</label><br>
  <input type="number" id="price_1" name="price_1" value="${product.Product.price_1}"  placeholder="Nhập giá sản phẩm cũ" required><br>
  <label for="">Giá sản phẩm</label><br>
  <input type="number" id="price_2" name="price_2" value="${product.Product.price_2}" placeholder="Nhập giá sản phẩm mới" required><br>
  <label for="">Hình ảnh</label><br>
  <img src="http://localhost:3000/images/${product.Product.image}"/>
  <input type="file" id="productImage" name="productImage" placeholder="Nhập hình ảnh">

  <label for="">Mô tả</label><br>
  <textarea name="mota_1" id="mota_1" cols="30" rows="5" style="width:100%; border:1px #CCC solid" >${product.Product.mota_1}</textarea><br>

  <label for="">Thông tin sách</label><br>
  <textarea name="mota_2" id="mota_2" cols="30" rows="5" style="width:100%; border:1px #CCC solid">${product.Product.mota_2}</textarea><br>

  <button style="float: left;" class="add-button" type="button" onclick="updateProduct()">Cập nhật</button>
  <button style="float: right;" class="close-button" type="button">Đóng</button> 
  `;
  document.getElementById("show").innerHTML = proupdate;
  
};

const updateProduct = async () => {
  try {
    const id = localStorage.getItem("idpro");
    const name = document.getElementById("productName").value;
    const price_1 = document.getElementById("price_1").value;
    const price_2 = document.getElementById("price_2").value;
    const mota_1 = document.getElementById("mota_1").value;
    const mota_2 = document.getElementById("mota_2").value;
    const image = document.getElementById("productImage").files[0];
    const cate = document.getElementById("cate").value;

    let data = new FormData();
    data.append("name", name);
    data.append("price_1", price_1);
    data.append("price_2", price_2);
    data.append("mota_1", mota_1);
    data.append("mota_2", mota_2);
    data.append("cate", cate);


    const response = await fetch(`http://localhost:3000/products/update/${id}`, {
      method: "PUT",
      headers : {
        "Accept" : "multipart/form-data"
    },
      body: data,
    });
    console.log(data);
    if (!response.ok) {
      throw new Error(`Lỗi cập nhật sản phẩm. Mã lỗi: ${response.status}`);
    }
    alert("Sản phẩm đã được cập nhật thành công");
    const result = await response.json();
    window.location.href = "./admin_pro.html";
    console.log(result);
  } catch (error) {
    console.error("Lỗi cập nhật sản phẩm:", error);
    alert(`Đã xảy ra lỗi: ${error}`);
  }
};


//****************************************************************** */
//xóa
const delPro = async (id) => {
  try {
    const idString = id.toString ? id.toString() : id;

    const confirmDelete = confirm('Bạn có chắc chắn muốn xóa sản phẩm ra khỏi danh sách?');

    if (!confirmDelete) return;

    const response = await fetch(`http://localhost:3000/products/${idString}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error(`Lỗi xóa sản phẩm. Mã lỗi: ${response.status}`);
    }
    alert("Xóa sản phẩm thành công")
    document.location = './admin_pro.html';
  } catch (error) {
    console.error('Lỗi xóa sản phẩm:', error);
    alert(`Đã xảy ra lỗi: ${error}`);
  }
};

//****************************************************************** */
//Đăng nhập
const login = async () => {
  const email = document.getElementById('email').value;
  const pass = document.getElementById('pass').value;

  const data = {
    email,
    pass
  };

  try {
    const response = await fetch('http://localhost:3000/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      const result = await response.json();
      localStorage.setItem('token', result.token); // Lưu token vào local storage
      alert('Đăng nhập thành công');
      window.location.href = './admin_pro.html';
    } else {
      // Xử lý trường hợp không thành công (ví dụ: thông báo lỗi)
      alert('Đăng nhập không thành công');
    }
  } catch (error) {
    console.error('Lỗi khi đăng nhập:', error);
  }
};



