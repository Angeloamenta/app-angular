import { Post } from "./posts.model"
import { Subject } from "rxjs"
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({providedIn:'root'})
export class PostService {
    private posts: Post[] = []
    private postsUpdated = new Subject<Post[]>();

    constructor(private http: HttpClient) {}



    getPosts() {
        // return [...this.posts]
        this.http.get<{message:string, posts: Post[]}>('http://localhost:3000/api/posts').subscribe((postData) => {
            this.posts= postData.posts;
            this.postsUpdated.next([...this.posts])
        })
    }

    getPostsUpdateListener() {
        return this.postsUpdated.asObservable()
    }

    addPost(title: string, content: string) {
        const post: Post = { id: null, title: title, content: content };
        this.http
          .post<{ message: string, postId: string }>("http://localhost:3000/api/posts", post)
          .subscribe(responseData => {
            const id = responseData.postId;
            post.id = id;
            this.posts.push(post);
            this.postsUpdated.next([...this.posts]);
            console.log(responseData.message);
            

          });
      }
}