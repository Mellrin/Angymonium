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
  componentRef: any

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private injector: Injector
  ) { }

  close() {
    this.appRef.detachView(this.componentRef.hostView);
    this.componentRef.destroy();
  }

  open(component: any, title: string, template: any) {
    
    this.componentRef = this.componentFactoryResolver
      .resolveComponentFactory(component)
      .create(this.injector);
    this.componentRef.instance.title = title
    this.componentRef.instance.currentTemplate = template

    this.appRef.attachView(this.componentRef.hostView);

    const domElem = (this.componentRef.hostView as EmbeddedViewRef<any>)
      .rootNodes[0] as HTMLElement;

    const rootElementRef = this.injector.get(this.appRef.componentTypes[0])
      .nativeElement;

    rootElementRef.appendChild(domElem);
  }
}
