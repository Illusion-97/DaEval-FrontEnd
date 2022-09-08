import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-paginate',
  templateUrl: './paginate.component.html',
  styleUrls: ['./paginate.component.css']
})
export class PaginateComponent implements OnInit {

  @Input() size = 0;
  @Input() sizeChange = new EventEmitter<number>();
  page = 0;
  @Output() pageChange = new EventEmitter<number>();
  @Input() pageSize = 5;

  ngOnInit() {
    // set page if items array isn't empty
    if (this.size > 0) {
      this.setPage(0);
    }
    this.sizeChange.subscribe(size => {
      this.size = size;
      this.setPage(0);
    });
  }

  maxPage(): number {
    return Math.ceil(this.size / this.pageSize);
  }

  setPage(page: number) {
    this.page = page;
    this.pageChange.emit(this.page);
  }
}
