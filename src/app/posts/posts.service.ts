import { Post } from "./post.model";
import { Injectable } from "@angular/core";
import { Subject } from 'rxjs';

@Injectable()
export class PostsService {
    private posts: Post[] = [];
    private postsUpdated = new Subject<Post[]>();

    getPosts() {
        return [...this.posts]
    }

    addPost(title: String, content: String) {
        const post: Post = {
            title: title,
            content: content
        }
        this.posts.push(post)
        this.postsUpdated.next([...this.posts])
    }

    getPostUpdateListner(){
    return this.postsUpdated.asObservable();   
    }
}