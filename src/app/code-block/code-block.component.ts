import { Component, OnInit, ViewChild, Input } from '@angular/core';

@Component({
  selector: 'ampe-code-block',
  templateUrl: './code-block.component.html',
  styleUrls: ['./code-block.component.scss']
})
export class CodeBlockComponent implements OnInit {

  showFeedback = false;

  @Input() code;

  @ViewChild('codeBlock') codeBlock;
  @ViewChild('clipboardHelper') clipboardHelper;

  constructor() {}

  ngOnInit() {
    setTimeout(() => hljs.highlightBlock($(this.codeBlock.nativeElement)[0]));
  }

  onCopyToClipboardClick() {
    this.clipboardHelper.nativeElement.select();
    document.execCommand('Copy');
    this.showFeedback = true;
    setTimeout(() => (this.showFeedback = false), 2000);
  }

}
