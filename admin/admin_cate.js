//******************************************************** */
//DANH MỤC

//hiện 
const getCate = async () => {
    const response = await fetch(`http://localhost:3000/categories`,{
        //  headers:{
        //    Authorization: `Bearer ${token}`
        //  }
         });
    const data = await response.json();
    console.log(data);
    let cate = "";
    let stt = 1;
    data.map((item) => {
      cate += `
                <tr>
                    <td>${stt}</td>
                    <td>${item.name}</td>
                    <td>${item.description}</td>
                    <td>
                    <a href="./editcate.html"> <button class="edit-button"  onclick="editCate('${item._id}')" idsp='${item._id}'>Chỉnh sửa</button></a>
                    <button class="delete-button" onclick="delCate('${item._id}')" idsp='${item._id}'>Xóa</button>
  
           
                    </td>
                </tr>`;
      stt++;
    });
    document.getElementById("dulieucate").innerHTML = cate;
  };
  
  
  //thêm
  const getId = (id) => {
    localStorage.setItem("idcate", id);
};

const insertCategory = async () => {
    try {
        const name = document.getElementById("name").value;
        const description = document.getElementById("description").value;

        const response = await fetch(`http://localhost:3000/categories`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name,
                description
            }),
        });

        if (!response.ok) {
            throw new Error(`Lỗi thêm danh mục. Mã lỗi: ${response.status}`);
        }

        const result = await response.json();
        console.log(result);
        window.location.href = "./admin_cate.html";
        
    } catch (error) {
        console.error('Lỗi thêm danh mục:', error.message);
        alert(`Đã xảy ra lỗi: ${error}`);
    }
};

  
  //xóa
  const delCate = async (id) => {
    try {
        const idString = id.toString ? id.toString() : id;
  
        const confirmDelete = confirm('Bạn có chắc chắn muốn xóa danh mục này?');
  
        if (!confirmDelete) return;
  
        const response = await fetch(`http://localhost:3000/categories/${idString}`, {
            method: 'DELETE',
        });
  
        if (!response.ok) {
            throw new Error(`Lỗi xóa danh mục. Mã lỗi: ${response.status}`);
        }
  
        getCate();
    } catch (error) {
        console.error('Lỗi xóa danh mục:', error.message);
        alert(`Đã xảy ra lỗi: ${error}`);
    }
  };
  
  
  




  //sửa
  const showEditCate= async () => {
    const getCate = async () => {
      const response = await fetch(`http://localhost:3000/categories`);
      const data = await response.json();
      return data;
    };
    const category = await getCate();
    console.log(category);
    let proupdate = "";
    proupdate += `
    <label for="">Tên danh mục</label><br>
    <input type="text" id="name" name="name" value="${category.name}" placeholder="Nhập tên sản phẩm" required><br>
    <label for="">Mô tả</label><br>
    <textarea name="description" id="description" cols="30" rows="5" style="width:100%; border:1px #CCC solid" >${category.description}</textarea><br>
    <button style="float: left;" class="add-button" type="button" onclick="editCate()">Cập nhật</button>
    <button style="float: right;" class="close-button" type="button">Đóng</button> 
    `;
    document.getElementById("showcate").innerHTML = proupdate;
    
  };
  

const updateProduct = async () => {
    try {
      const id = localStorage.getItem("idpro");
      const name = document.getElementById("name").value;
      const description = document.getElementById("description").value;

  
      let data = new FormData();
      data.append("name", name);
      data.append("description", description);
  
      const response = await fetch(`http://localhost:3000/categories/${id}`, {
        method: "PUT",
        body: data,
      });
  
      if (!response.ok) {
        throw new Error(`Lỗi cập nhật sản phẩm. Mã lỗi: ${response.status}`);
      }
      const updatedProduct = await response.json();
      console.log("Sản phẩm sau khi cập nhật:", updatedProduct);
      await getAll();
  
      alert("Sản phẩm đã được cập nhật thành công");
      const result = await response.json();
      window.location.href = "./admin_cate.html";
      console.log(result);
    } catch (error) {
      console.error("Lỗi cập nhật sản phẩm:", error);
      alert(`Đã xảy ra lỗi: ${error}`);
    }
  };
  
  