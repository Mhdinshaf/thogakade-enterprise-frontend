import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ItemModel } from '../../../../model/type'; 
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-item',
  imports: [CommonModule, FormsModule],
  templateUrl: './item.html',
  styleUrl: './item.css',
})
export class Item implements OnInit {
  itemList: Array<ItemModel> = [];
  

  itemObj: ItemModel = {
    itemCode: '',
    description: '',
    unitPrice: 0.0,
    qtyOnHand: 0,
    packSize: ''
  };

  constructor(private http: HttpClient, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.getall();
  }


  addItem(): void {
    this.http.post("http://localhost:8080/item/additem", this.itemObj).subscribe(data => {
      console.log(data);
      
    
      if(data == true) { 
        Swal.fire({
          title: "Good job! " + this.itemObj.description,
          text: "Item Saved Successfully!",
          icon: "success"
        });
      }
      this.getall(); 
    });
  }


  getall() {
    this.http.get<ItemModel[]>("http://localhost:8080/item/getall").subscribe(data => {
      console.log(data);
      this.itemList = data;
      this.cdr.detectChanges(); 
    });
  }
}