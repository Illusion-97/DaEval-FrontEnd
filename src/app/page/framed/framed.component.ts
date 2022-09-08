import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-framed',
  templateUrl: './framed.component.html',
  styleUrls: ['./framed.component.css']
})
export class FramedComponent implements OnInit {

  url = '';

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    const paramMap = this.route.snapshot.paramMap;
    this.url = `http://localhost:8080/${paramMap.get('obj')}/generate?etudiantId=${paramMap.get('uId')}&promotionId=${paramMap.get('pId')}`;
  }

}
