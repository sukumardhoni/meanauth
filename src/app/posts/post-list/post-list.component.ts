import { Component } from "@angular/core";
import { Post } from '../post.model'
import { PostsService } from '../posts.service'
import { Subscription } from 'rxjs'

@Component({
    selector: 'app-post-list',
    templateUrl: './post-list.component.html',
    styleUrls: ['./post-list.component.css']
})
export class PostListComponent {

    posts: Post[] = []
    private postsSub: Subscription;

    constructor(public postService: PostsService) { }

    ngOnInit() {
        // this.posts = this.postService.getPosts()


        this.postsSub = this.postService.getPostUpdateListner()
            .subscribe((posts: Post[]) => {
                this.posts = posts
                console.log(this.posts)
            }, err => {
                console.log(err)
            })
        console.log(this.postsSub)
    }

    ngOnDestroy() {
        console.log(this.postsSub)
        
        this.postsSub.unsubscribe();

        console.log(this.postsSub)
    }
}