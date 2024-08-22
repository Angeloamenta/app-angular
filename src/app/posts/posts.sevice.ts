import { Post } from "./posts.model"
import { Subject } from "rxjs"
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs";
import { Title } from "@angular/platform-browser";

@Injectable({providedIn:'root'})
export class PostService {
    private posts: Post[] = []
    private postsUpdated = new Subject<Post[]>();

    constructor(private http: HttpClient) {}



    getPosts() {
        // return [...this.posts]
        this.http.get<{message:string, posts:any}>(
            'http://localhost:3000/api/posts'
        )
        .pipe(map((postData)=> {
            console.log(postData);
            
            return postData.posts.map(post => {
                return {
                    title: post.title,
                    content: post.content,
                    id: post._id
                }
            })
            
        }))
        .subscribe((trasformedPosts) => {
            this.posts= trasformedPosts;
            this.postsUpdated.next([...this.posts])
        })
    }

    getPostsUpdateListener() {
        return this.postsUpdated.asObservable()
    }


    getPost(id:string) {
        console.log('id',id);
        console.log(this.http.get<{_id:string, title:string, content:string}>('http://localhost:3000/api/posts/'+ id));
        
        return this.http.get<{ _id: string; title: string; content: string }>(
            "http://localhost:3000/api/posts/" + id
          );
        
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
            console.log('messaggio',responseData.message);
            

          });
      }

      updatePost(id:string, title:string, content:string) {
        const post: Post = {id: id, title: title, content: content}
        this.http.put('http://localhost:3000/api/posts/' + id, post)
        .subscribe(response => {
            console.log(response);
            const updatedPosts = [...this.posts]
            const oldPostIndex = updatedPosts.findIndex(p => p.id === post.id);
            updatedPosts[oldPostIndex] = post
            this.posts = updatedPosts;
            this.postsUpdated.next([...this.posts]);

        })
      }

      deletePost(postId: string) {
        this.http.delete("http://localhost:3000/api/posts/" + postId)
        .subscribe(() => {
            const updatedPosts = this.posts.filter(post => post.id != postId)
            this.posts = updatedPosts
            this.postsUpdated.next([...this.posts ])
        })
      }
}