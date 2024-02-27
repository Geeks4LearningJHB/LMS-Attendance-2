import { Injectable } from '@angular/core';
import { MdbModalConfig, MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { MdbModalParameterSettings } from '../interfaces/mdb-modal.interface';

@Injectable({
  providedIn: 'root'
})
export class GoalModalHandlerService<T> {
  private mdbModalRef!: MdbModalRef<T>;

  constructor(private modalService: MdbModalService) { }

  private getMdbModalConfig(
    modalData: any,
    ignoreBackdropClick: boolean,
    modalWidth: number = 50
  ): MdbModalConfig {
    return {
      animation: true,
      backdrop: true,
      data: modalData,
      containerClass: 'modal top fade modal-backdrop',
      ignoreBackdropClick: ignoreBackdropClick,
      keyboard: true,
      modalClass: `modal-xl modal-dialog-centered w-${modalWidth}`,
    }
  }

  openMdbModal<T>({
    data,
    ignoreBackdropClick,
    width,
    component
  }: MdbModalParameterSettings): MdbModalRef<T> {
    this.mdbModalRef = this.modalService.open(component,
      this.getMdbModalConfig(data, ignoreBackdropClick, width)
    );

    return this.mdbModalRef;
  }
}
