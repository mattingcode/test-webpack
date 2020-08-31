import { hello, helloworld } from './hello';
import '../../common';

document.write(helloworld());
setTimeout(() => {
  import('./asy').then(a => {
    console.log(a);
  });
}, 3000);