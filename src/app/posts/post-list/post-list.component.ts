import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { Post } from '../posts.model';
import { PostService } from "../posts.sevice";




@Component({
    selector:'app-post-list',
    templateUrl: './post-list.component.html',
    styleUrls: ['./post-list.component.css']
})

export class PostListComponent implements OnInit, OnDestroy {
//  posts = [
//     {title: 'title', content: 'contenuto-1'},
//     {title: 'title-2', content: 'contenuto-2'},
//     {title: 'title-3', content: 'contenuto-3'}

//  ]

posts:Post[] = []
private postSub: Subscription


constructor(public postsSevice: PostService) {}

 ngOnInit() {
    
    this.postsSevice.getPosts()
    this.postSub = this.postsSevice.getPostsUpdateListener()
    .subscribe((posts: Post[])=> {
        this.posts = posts;
    }) 
}


onDelete(postId: string) {
    this.postsSevice.deletePost(postId);
}


ngOnDestroy() {
    this.postSub.unsubscribe();
}
}