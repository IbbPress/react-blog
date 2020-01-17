
import marked from 'marked'
import hljs from "highlight.js";
import 'highlight.js/styles/monokai-sublime.css';

const renderer = new marked.Renderer();
marked.setOptions({
  renderer: renderer,
  gfm: true,
  pedantic: false,
  sanitize: false,
  tables: true,
  breaks: false,
  smartLists: true,
  smartypants: false,
  sanitize:false,
  xhtml: false,
  highlight (code) {
    return hljs.highlightAuto(code).value;
  }
});

export default marked;