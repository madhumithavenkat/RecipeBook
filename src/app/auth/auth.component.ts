import { Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRouteSnapshot, RouterState,Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceHolderDirective } from '../shared/placeHolder.directive';
import { AuthService, AuthResponseData } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
  
})
export class AuthComponent implements OnInit,OnDestroy {

  isLoginMode = true;
  isLoading = false;
  error :string = null
  @ViewChild(PlaceHolderDirective,{static : false}) alertHost : PlaceHolderDirective;


  closeSub : Subscription;

  authObs : Observable<AuthResponseData>

  constructor(private authService:AuthService,
                private router:Router,
                private alertComponenetResolver : ComponentFactoryResolver) { }

  

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    if(this.closeSub){
      this.closeSub.unsubscribe()
      this.alertHost.viewContainerRef.clear()
    }
    
  }


  onSwitchMode(){
      this.isLoginMode = !this.isLoginMode;
  }

  onFormSubmit(form : NgForm){
    this.isLoading = true

    if(this.isLoginMode){
        this.authObs = this.authService.login(form.value)

    }else{

        this.authObs = this.authService.signup(form.value)
    }
    
    this.authObs.subscribe(responseData =>{
        console.log("router navigate",responseData)
        this.isLoading = false
        this.router.navigate(['../recipes'])

    },errorMessage=>{
      console.log(errorMessage)
        this.isLoading = false
        this.error = errorMessage
        this.showErrorAlert(errorMessage)
        
        
    })
    form.reset()
  }

  onHandleAlertBox(){
    this.error = null;
  }

  private showErrorAlert(errorMessage : string){

    const alertComponentFactory = this.alertComponenetResolver.resolveComponentFactory(AlertComponent)

    this.alertHost.viewContainerRef.clear();

    const componentRef = this.alertHost.viewContainerRef.createComponent(alertComponentFactory);

    componentRef.instance.message = errorMessage;

    this.closeSub = componentRef.instance.close.subscribe(() => {

      this.closeSub.unsubscribe();
      this.alertHost.viewContainerRef.clear()

    })



  }
  
}