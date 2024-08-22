import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ActivatedRoute, ParamMap } from "@angular/router";

import { PostService } from "../posts.sevice";
import { Post } from "../posts.model";
@Component({
    selector:'app-post-create',
    templateUrl: './post-create.component.html',
    styleUrls: ['./post-create.component.css']
  
})

export class  PostCreateComponent implements OnInit {
enteredTitle = '';
enteredContent ='';
post: Post;
private mode = 'create';
private postId:string;


// @Output() postCreated = new EventEmitter<Post>();

constructor(
    public postsService: PostService,
    public route: ActivatedRoute) {}

ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
        if (paramMap.has('postId')) {            
            this.mode = 'edit'
            this.postId = paramMap.get('postId')            
            this.postsService.getPost(this.postId).subscribe(postData => { 
            this.post = {id: postData._id, title: postData.title, content: postData.content};
            })
            console.log('this.mode', this.mode);
            
        }else {
            console.log('this.mode', this.mode);
            this.mode = 'create';
            this.postId = null;
        }
    })
}


onAddPost(form: NgForm) {
    if (form.invalid) {
        return;
    }

    if (this.mode === "create") {
        this.postsService.addPost(form.value.title, form.value.content)
        
    }else {
        this.postsService.updatePost(this.postId, form.value.title, form.value.content);
    }
    
    form.resetForm()
}


}