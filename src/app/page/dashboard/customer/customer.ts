import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CustomerModel } from '../../../../model/type';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-customer',
  imports: [CommonModule,FormsModule],
  templateUrl: './customer.html',
  styleUrl: './customer.css',
})
export class Customer implements OnInit {
    customerList:Array<CustomerModel>=[];
    customerObj:CustomerModel ={
      custID: '',
      custTitle: '',
      custName: '',
      custAddress: '',
      city: '',
      province: '',
      postalCode: '',
      dob: new Date(),
      salary: 0.0
    }

    constructor(private http:HttpClient, private cdr:ChangeDetectorRef){
    
    }
    ngOnInit(): void {
      this.getall();
    }

    addCustomer(): void{
      this.http.post("http://localhost:8080/customer/addcustomer", this.customerObj).subscribe(data=>{
        console.log(data);
        if(data=true){
          Swal.fire({
                title: "Good job!"+this.customerObj.custName,
                text: "You clicked the button!",
                icon: "success"
          });
        }
        this.getall();
    })
  }

    getall(){
      this.http.get<CustomerModel[]>("http://localhost:8080/customer/getall").subscribe(data=>{
        console.log(data);
        this.customerList=data;
        this.cdr.detectChanges();
        
      })

  }
}
