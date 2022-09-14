import {
  Injectable,
  ApplicationRef,
  Component,
  ComponentFactoryResolver,
  EmbeddedViewRef,
  Injector,
  OnInit
} from "@angular/core";
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  //private display: BehaviorSubject<any> = new BehaviorSubject('close');
  componentRef: any

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private injector: Injector
  ) { }

  // watch(): Observable<'open' | 'close'> {
  //   return this.display.asObservable();
  // }

  //open() {
    //this.display.next('open');
  //}

  close() {
    this.appRef.detachView(this.componentRef.hostView);
    this.componentRef.destroy();
  }

  open(component: any, title: string, template: any) {
    // 1. Create a component reference from the component
    this.componentRef = this.componentFactoryResolver
      .resolveComponentFactory(component)
      .create(this.injector);
    this.componentRef.instance.title = title
    this.componentRef.instance.currentTemplate = template

    // 2. Attach component to the appRef so that it's inside the ng component tree
    this.appRef.attachView(this.componentRef.hostView);


    //
    const domElem = (this.componentRef.hostView as EmbeddedViewRef<any>)
      .rootNodes[0] as HTMLElement;

    const rootElementRef = this.injector.get(this.appRef.componentTypes[0])
      .nativeElement;

    rootElementRef.appendChild(domElem);
  }
}
