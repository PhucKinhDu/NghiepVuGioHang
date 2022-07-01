//?khai báo lớp đối tượng bằng từ khóa "class"

export default class SanPham{
    //?phương thức khởi tạo (khai báo thuộc tính)
    constructor(ten,gia,manHinh,camSau,camTruoc,hinh,mota,loai){
        //thuộc tính
        this.name = ten;
        this.price = gia;
        this.screen = manHinh;
        this.backCamera = camSau;
        this.frontCamera = camTruoc;
        this.img = hinh;
        this.desc = mota;
        this.type = loai;
    }
}