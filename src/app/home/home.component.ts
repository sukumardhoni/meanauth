import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }
  //storedPosts: Post[] = []
  ngOnInit() {
  }

  // onPostAdded(post){
  //   console.log(post)
  //   this.storedPosts.push(post)
  // }
}
