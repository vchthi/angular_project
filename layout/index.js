const getAll = async () =>{
    const response = await fetch('http://localhost:3000/products');
    const data = await response.json();
    console.log(data);
    let show = '';
    let stt = 1;
    data.pros.map(product =>{
        show += `
      <a style="text-decoration: none;" href="./detail.html" onclick="getId('${product._id}')">
      <div class="box1 mr1">
          <img src="http://localhost:3000/images/${product.image}" alt="">
          <h4>${product.name}</h4>
          <p><del>${product.price_1}</del></p>
          <h5>${product.price_2}</h5>
          <button class="btn" style="margin: auto;margin-top: 20px;">Order Now</button>
      </div></a>
        `;
        stt++;
    })
    document.getElementById('showAll').innerHTML= show

}

const getHot = async () =>{
  const token = localStorage.getItem('token')
  const response = await fetch(`http://localhost:3000/products/hot`, {
      headers : {
          Authentication: `Bearer ${token}`
      },
      method: 'GET'
  });    const data = await response.json();
    console.log(data);
    let show = '';
    let stt = 1;
    data.hotProducts.map(product =>{
        show += `
      <a style="text-decoration: none;" href="./detail.html" onclick="getId('${product._id}')">
      <div class="box1 mr1">
          <img src="http://localhost:3000/images/${product.image}" alt="">
          <h4>${product.name}</h4>
          <p><del>${product.price_1}</del></p>
          <h5>${product.price_2}</h5>
          <button class="btn" style="margin: auto;margin-top: 20px;">Order Now</button>
      </div></a>
        `;
        stt++;
    })
    document.getElementById('showHot').innerHTML= show
}




const getSale = async () =>{
    const response = await fetch('http://localhost:3000/products/sale');
    const data = await response.json();
    console.log(data);
    let show = '';
    let stt = 1;
    data.saleProducts.map(product =>{
        show += `
      <a style="text-decoration: none;" href="./detail.html" onclick="getId('${product._id}')">
      <div class="box1 mr1">
          <img src="http://localhost:3000/images/${product.image}" alt="">
          <h4>${product.name}</h4>
          <p><del>${product.price_1}</del></p>
          <h5>${product.price_2}</h5>
          <button class="btn" style="margin: auto;margin-top: 20px;">Order Now</button>
      </div></a>
        `;
        stt++;
    })
    document.getElementById('showSale').innerHTML= show
}

const getNew = async () =>{
    const response = await fetch('http://localhost:3000/products/new');
    const data = await response.json();
    console.log(data);
    let show = '';
    let stt = 1;
    data.newProducts.map(product =>{
        show += `
      <a style="text-decoration: none;" href="./detail.html" onclick="getId('${product._id}')">
      <div class="box1 mr1">
          <img src="http://localhost:3000/images/${product.image}" alt="">
          <h4>${product.name}</h4>
          <p><del>${product.price_1}</del></p>
          <h5>${product.price_2}</h5>
          <button class="btn" style="margin: auto;margin-top: 20px;">Order Now</button>
      </div></a>
        `;
        stt++;
    })
    document.getElementById('showNew').innerHTML= show
}



const getTieuThuyet = async () =>{
    const response = await fetch('http://localhost:3000/products/tieuthuyet');
    const data = await response.json();
    console.log(data);
    let show = '';
    let stt = 1;
    data.tieuthuyet.map(product =>{
        show += `
      <a style="text-decoration: none;" href="./detail.html" onclick="getId('${product._id}')">
      <div class="box1 mr1">
          <img src="http://localhost:3000/images/${product.image}" alt="">
          <h4>${product.name}</h4>
          <p><del>${product.price_1}</del></p>
          <h5>${product.price_2}</h5>
          <button class="btn" style="margin: auto;margin-top: 20px;">Order Now</button>
      </div></a>
        `;
        stt++;
    })
    document.getElementById('showTieuThuyet').innerHTML= show
}


const getVanHoc = async () =>{
    const response = await fetch('http://localhost:3000/products/vanhoc');
    const data = await response.json();
    console.log(data);
    let show = '';
    let stt = 1;
    data.vanhoc.map(product =>{
        show += `
      <a style="text-decoration: none;" href="./detail.html" onclick="getId('${product._id}')">
      <div class="box1 mr1">
          <img src="http://localhost:3000/images/${product.image}" alt="">
          <h4>${product.name}</h4>
          <p><del>${product.price_1}</del></p>
          <h5>${product.price_2}</h5>
          <button class="btn" style="margin: auto;margin-top: 20px;">Order Now</button>
      </div></a>
        `;
        stt++;
    })
    document.getElementById('showVanHoc').innerHTML= show
}





  //Chi tiết
const getId = (id) => {
    localStorage.setItem("idpro", id);
  };
  
  const getProDetail = async () => {
    const id = localStorage.getItem("idpro");
    const response = await fetch(`http://localhost:3000/products/${id}`);
    const data = await response.json();
    console.log(data);
    document.getElementById("name").innerText = data.Product.name;
    document.getElementById("price_1").innerText = data.Product.price_1;
    document.getElementById("price_2").innerText = data.Product.price_2;
    document.getElementById("mota_1").innerText = data.Product.mota_1;
    document.getElementById("mota_2").innerText = data.Product.mota_2;
    document.getElementById(
      "image"
    ).src = `http://localhost:3000/images/${data.Product.image}`;
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
  


//   const getLienQuan = async (productId) =>{
//     const response = await fetch(`http://localhost:3000/products/lienquan/${productId}`);
//     const data = await response.json();
//     console.log(data);
//     let show = '';
//     let stt = 1;
//     data.sanPhamLienQuan.map(product =>{
//         show += `
//       <a style="text-decoration: none;" href="./detail.html" onclick="getId('${product._id}')">
//       <div class="box1 mr1">
//           <img src="http://localhost:3000/images/${product.image}" alt="">
//           <h4>${product.name}</h4>
//           <p><del>${product.price_1}</del></p>
//           <h5>${product.price_2}</h5>
//           <button class="btn" style="margin: auto;margin-top: 20px;">Order Now</button>
//       </div></a>
//         `;
//         stt++;
//     })
//     document.getElementById('showLienQuan').innerHTML= show
// }


const getRelated = async () =>{
  const id = localStorage.getItem('idpro')
  const response = await fetch(`http://localhost:3000/products/related/${id}/related`);
  const data = await response.json();
  console.log(data);
  let show = '';
  let stt = 1;
  data.RelatedProducts.map(product =>{
      show += `
      <a style="text-decoration: none;" href="./detail.html" onclick="getId('${product._id}')">
      <div class="box1 mr1">
          <img src="http://localhost:3000/images/${product.image}" alt="">
          <h4>${product.name}</h4>
          <p><del>${product.price_1}</del></p>
          <h5>${product.price_2}</h5>
          <button class="btn" style="margin: auto;margin-top: 20px;">Order Now</button>
      </div></a>
      `;
      stt++;
  })
  document.getElementById('showLienQuan').innerHTML= show



}

const login = async() =>{
  const email = document.getElementById('email').value
  const pass =  document.getElementById('pass').value
  const data = { email , pass  }
  const response = await fetch(`http://localhost:3000/users/login`,{
      method : 'POST',
      headers : {
          "Content-Type" : "application/json"
      },
      body : JSON.stringify(data)
  })
  if (!response.ok) {
      const errorData = await response.json();
      if (errorData.mess === 'Email khong ton tai') {
          alert('Email không tồn tại')
      } else if (errorData.mess === 'Mật khẩu không chính xác') {
          alert('Mật khẩu không chính xác')
      } else {
          alert('Email hoặc mật khẩu không đúng')
      }
  }
  const result = await response.json()

  localStorage.setItem('token', result.token)
  alert('Đăng nhập thành công')
  window.location.href = './index.html'

}


const register = async() =>{
  const name = document.getElementById('name').value
  const email = document.getElementById('email').value

  const pass =  document.getElementById('pass').value
  const data = { name, email, pass  }
  const response = await fetch(`http://localhost:3000/users`,{
      method : 'POST',
      headers : {
          "Content-Type" : "application/json"
      },
      body : JSON.stringify(data)
  })
  if (!response.ok) {
      const errorData = await response.json();
      alert('Email đã tồn tại')
      throw new Error(errorData.mess || 'Đăng ký không thành công');
  }

  const result = await response.json()
  console.log('NewUser:', data.NewUser);

  console.log(result);
  // localStorage.setItem('token', result.token)
  alert('Đăng ký thành công')
  window.location.href = './dangnhap.html'

}