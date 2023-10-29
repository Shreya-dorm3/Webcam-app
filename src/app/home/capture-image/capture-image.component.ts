import { AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-capture-image',
  templateUrl: './capture-image.component.html',
  styleUrls: ['./capture-image.component.less']
})
export class CaptureImageComponent implements OnInit, AfterViewInit {

  @ViewChild("video") public video!: ElementRef;
  @ViewChild("canvas") public canvas!: ElementRef;
  public captures: string[] = [];
  error: any;
  isCaptured: boolean = false;
  WIDTH = 0;
  HEIGHT = 0;
  name: string = '';

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.WIDTH = window.innerWidth;
    this.HEIGHT = window.innerHeight - 0.4 * (window.innerHeight);
    this.name = localStorage.getItem('name') ?? '';
  }

  async ngAfterViewInit() {
    await this.setupDevices();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    console.log(event.target)
    this.WIDTH = event.target.innerWidth;
    this.HEIGHT = event.target.innerHeight - 0.4 * (event.target.innerHeight);
  }

  async setupDevices() {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true
        });
        if (stream) {
          this.video.nativeElement.srcObject = stream;
          this.video.nativeElement.play();
          this.error = null;
        } else {
          this.error = "You have no output video device";
        }
      } catch (e) {
        this.error = e;
      }
    }
  }

  capture() {
    this.drawImageToCanvas(this.video.nativeElement);
    this.captures.push(this.canvas.nativeElement.toDataURL("profile_picture/png"));
    console.log(this.captures);
    this.isCaptured = true;
  }

  removeCurrent() {
    this.isCaptured = false;
    this.captures = [];
  }

  setPhoto(idx: number) {
    this.isCaptured = true;
    var image = new Image();
    image.src = this.captures[idx];
    this.drawImageToCanvas(image);
  }

  drawImageToCanvas(image: any) {
    this.canvas.nativeElement
      .getContext("2d")
      .drawImage(image, 0, 0, this.WIDTH, this.HEIGHT);
  }

  savePhoto() {
    localStorage.setItem('profile_picture', this.captures[0]);
    localStorage.setItem('name', this.name);
    this.router.navigate(['']);
  }

  close() {
    localStorage.setItem('profile_picture', '');
    localStorage.setItem('name', '');
    this.router.navigate(['']);
  }
}
