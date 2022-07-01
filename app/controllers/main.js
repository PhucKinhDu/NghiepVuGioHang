import SanPham from '../models/SanPham.js';
import SanPhamService from '../services/SanPhamService.js'


let spService = new SanPhamService();

let getProductList = () => 
{ //Pending
  let promise = spService.getList();

  promise.then((result)=>{
    // resolve
    hienThiTable(result.data);

  });
  promise.catch(function(error){
    // Reject
    console.log(error);
  });
}

getProductList();


let getFormValue = () => {
    // let tenMon = document.querySelector("#tenMon").value;
    let arrControl = document.querySelectorAll("#myModal .form-control");
    // console.log(arrControl);
    let formValue = {};//id, value
    for (let i = 0; i < arrControl.length; i++) {
      // arrControl[i]: 1 thẻ trên form
      //Destructoring
      let { id, value } = arrControl[i];
      console.log(id, value);
      // lưu các giá trị vào đối tượng formValue
      // object literal
      // Spread Operator => copy các thuộc tính cũ của obj để khi thêm thuộc tính mới không bị ghi đè mất thuộc tính
      // B1: copy các thuộc tính cũ
      //B2: thêm thuộc tính mới 
      //B3: lưu toàn bộ tính tính cũ và mới và biến formValue
      formValue = { ...formValue, [id]: value }
    }
    console.log(formValue);
    return formValue;
  }

let hienThiTable = (mangSP) => 
{
    let content = "";
    let stt = 0;
    for (let index in mangSP) {
       let {id,name,price,screen,backCamera,frontCamera,img,desc,type} = mangSP[index];
       content +=`
       <tr>
           <td>${++stt}</td>
           <td>${name}</td>
           <td>${price}</td>
           <td>${screen}</td>
           <td>${backCamera}</td>
           <td>${frontCamera}</td>
           <td>${img}</td>
           <td>${desc}</td>
           <td>${type}</td>
           <td>
               <button class="btn btn-info" data-toggle="modal" data-target="#myModal" onclick="xemChiTiet('${id}')">Xem</button>
               <button onclick="deleteProduct('${id}')" class="btn btn-danger">Xóa</button>
           </td>
       </tr>
   `
    }

  document.querySelector("#tblDanhSachSP").innerHTML = content;
}


document.querySelector("#btnThemSP").addEventListener("click",() => {  
  document.querySelector("#myModal .modal-footer").innerHTML = `
      <button class="btn btn-success" onclick="addProduct()">Thêm</button>
  `

  //Gọi từ cha tới con || querySelectorAll("#myModal .form-control") || để clear dữ liệu cũ đã ghi trong ô input (nằm trong button thêm mới)
  let controlELE = document.querySelectorAll("#myModal .form-control");
  // console.log(controlELE);
  // Dùng querySelectorAll thì sẽ trả về mảng NodeList (f12 lên xem mảng có NodeList(8) hay k?)

  //Map => chỉ dùng với kiểu mảng (Array) và k dùng đc với NodeList
  // Nên dùng for: kiểu dữ liệu danh sách chạy đc hết

  for(let i = 0; i < controlELE.length; i++)
  {
    // console.log(controlELE[i]);
    controlELE[i].value = ""; // dòng code này là clear giá trị cũ đã ghi trước đó
  }

  /**
   * Tình huống Clear này có khả năng gặp
   * 
   * Nếu có thẻ form bên ngoài thì DOM tới thẻ form đó (id, class) => gọi thẻ form đó .reset tự động Clear các dữ liệu bên trong
   */

});


let addProduct = () => {
    let formValue = getFormValue();

    let { name,price,screen,backCamera,frontCamera,img,desc,type } = formValue;

    let sp = new SanPham(name,price,screen,backCamera,frontCamera,img,desc,type);

    let promise = spService.addItem(sp);

    promise.then((result)=>{
        // console.log(result);
        getProductList();
        //tự động tắt pop-up khi thêm thành công, DOM tới nút X trên pop-up => gọi từ cha tới con ("#myModal .close")
        // .class => là class của nút X
        document.querySelector("#myModal .close").click(); // gọi sự kiện click có sẵn của thẻ để tự động tắt pop-up
        // alert("Thêm thành công!");

    }).catch((error)=>{
        console.log(error);
    });

}
window.addProduct = addProduct;



let deleteProduct = (id) => {
  /**
   * Khi xóa => hiển thị pop-up xác nhận vs user có thực sự xóa hay k?
   * 
   * + button Xóa ở table => gắn hàm gọi modal(pop-up) xác nhận
   * + pop-up hiển thị trc khi gọi API để delete
   * + pop-up chứa 2 button (cancel, confirm)
   * + khi click cancel => chỉ tắt pop-up
   * + khi click confirm => gọi chức năng xóa của BE => gọi deleteProduct
   */

  // console.log(id);
  let promise = spService.deleteItem(id);

  promise.then((result)=>{
    // console.log(result);
    getProductList();

  }).catch(function(error){
    console.log(error);
  });
}
window.deleteProduct = deleteProduct;



let xemChiTiet = (id) => {
  // console.log(id);

  let promise = spService.getProductItem(id);

  promise.then((result)=>{
    // console.log(result);
    console.log(result.data);

    for (const key in result.data) {
        if (document.querySelector(`#${key}`) != null) {
          document.querySelector(`#${key}`).value = result.data[key]
        }
  
    }

    // DOM tới button "thêm" -> sửa thành "cập nhật"
    document.querySelector("#myModal .modal-footer").innerHTML = `
      <button class="btn btn-success" onclick="capNhat('${result.data.id}')">Cập Nhật</button>
    `
    // ('${result.data.id}') =>> truyền id ngầm bên dưới, khách hàng k thể thấy (qua ReactJS sẽ gặp nhiều)
    // onclick="capNhat('${result.data.id}') =>> cái này là gọi hàm rồi truyền, nhớ: khai báo cũng phải truyền (dòng code 137: thêm id cho hàm capNhat)

    // innerHTML => bản chất là ghi đè nội dung của thẻ

  }).catch((error)=>{
    console.log(error);
  });
}
window.xemChiTiet = xemChiTiet;

// + Nghiệp vụ từ client (doc, UI)
// + Dữ liệu từ BE 
// => suy luận viết code FE



let capNhat = () => {
    let formValue = getFormValue();
    console.log(formValue);
    let {name,price,screen,backCamera,frontCamera,img,desc,type} = formValue;


    let sp = new SanPham(name,price,screen,backCamera,frontCamera,img,desc,type);
    console.log(sp);

    let promise = spService.updateProduct(id, sp);

     promise.then((result)=>{
        console.log(result);
         getProductList();

    //tự động tắt pop-up khi cập nhật thành công, DOM tới nút X trên pop-up => gọi từ cha tới con ("#myModal .close")
    // .class => là class của nút X
    document.querySelector("#myModal .close").click(); // gọi sự kiện click có sẵn của thẻ để tự động tắt pop-up
    // alert("Cập nhật thành công!");

  }).catch(function(error){
    console.log(error)
  });
}

