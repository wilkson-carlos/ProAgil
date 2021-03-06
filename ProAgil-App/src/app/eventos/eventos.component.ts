import { templateJitUrl } from '@angular/compiler';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Evento } from '../_models/Evento';
import { EventoService } from '../_services/evento.service';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.css']
})
export class EventosComponent implements OnInit {

  titulo = 'Eventos';
  eventosFiltrados: Evento[] = [];
  eventos: Evento[] = [];
  imagemLargura = 50;
  imagemMargem = 2;
  modalRef!: BsModalRef;

  mostrarImagem = false;
  bodyDeletarEvento = '';

  // tslint:disable-next-line:variable-name
  _filtroLista = '';

  constructor(
    private eventoService: EventoService,
    private modalService: BsModalService
    ) { }

  get filtroLista(): string{
    return this._filtroLista;
  }

  set filtroLista(value: string){
    this._filtroLista = value;
    this.eventosFiltrados = this.filtroLista ? this.filtrarEventos(this.filtroLista) : this.eventos;
  }

  // tslint:disable-next-line:typedef
  openModal(template: TemplateRef<any>){
    this.modalRef = this.modalService.show(template);
  }

  // tslint:disable-next-line:typedef
  ngOnInit() {
    this.getEventos();
  }

  filtrarEventos(filtrarPor: string): Evento[] {
    filtrarPor = filtrarPor.toLocaleLowerCase();
    return this.eventos.filter(
      (evento: { tema: string; }) => evento.tema.toLocaleLowerCase().indexOf(filtrarPor) !== -1
    );
  }

  // tslint:disable-next-line:typedef
  alternarImg(){
    this.mostrarImagem = !this.mostrarImagem;
  }
  // tslint:disable-next-line:typedef
  getEventos() {
    this.eventoService.getAllEvento().subscribe(
    // tslint:disable-next-line:variable-name
    (_eventos: Evento[]) => {
    this.eventos = _eventos;
    console.log(_eventos);
    }, error => {
      console.log(error);
    });
  }

}
